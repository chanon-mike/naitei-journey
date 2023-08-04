from typing import Optional

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

import app.repository.application_status as status_repo
import app.repository.category as category_repo
import app.repository.job as job_repo
import app.repository.selection_flow as flow_repo
from app.db.database import get_db
from app.schemas.job import FullJobCreate, FullJobUpdate
from app.security.payload import Payload
from app.security.verify_token import verify_token

router = APIRouter(prefix="/job", tags=["job"])


@router.get("/")
def get_jobs_by_user_id(
    auth0_id: Optional[str] = None,
    skip: int = 0,
    limit: int = 200,
    db: Session = Depends(get_db),
    token: Payload = Depends(verify_token),
):
    """Get all jobs by user id"""
    if not auth0_id:
        return job_repo.get_jobs(db, skip, limit)

    if token.get("sub") != auth0_id:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Not authorized"
        )

    return job_repo.get_jobs_by_user_id(db, auth0_id, skip, limit)


@router.post("/")
def create_job(
    full_job: FullJobCreate,
    db: Session = Depends(get_db),
    token: Payload = Depends(verify_token),
):
    """Create a new job"""
    category_db = category_repo.get_category(db, full_job.job.category_id)
    if token.get("sub") != category_db.user_id:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Not authorized"
        )

    job_repo.create_job(db, full_job.job)
    status_repo.create_application_status(db, full_job.application_status)
    flow_repo.create_selection_flows(db, full_job.selection_flows)

    return {"message": "Successfully created job data"}


@router.get("/{job_id}")
def get_job(
    job_id: int,
    db: Session = Depends(get_db),
    token: Payload = Depends(verify_token),
):
    """Get a job by id"""
    job = job_repo.get_job(db, job_id)
    if job is None:
        raise HTTPException(status_code=404, detail="Job not found")

    category_db = category_repo.get_category(db, job.category_id)
    if token.get("sub") != category_db.user_id:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Not authorized"
        )

    return job


@router.put("/{job_id}")
def update_job(
    full_job: FullJobUpdate,
    job_id: int,
    db: Session = Depends(get_db),
    token: Payload = Depends(verify_token),
):
    """Update an existing job"""
    job_db = job_repo.update_job(db, full_job.job, job_id)
    if job_db is None:
        raise HTTPException(status_code=404, detail="Job not found")

    category_db = category_repo.get_category(db, job_db.category_id)
    if token.get("sub") != category_db.user_id:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Not authorized"
        )

    status_repo.update_application_status(db, full_job.application_status, job_id)
    flow_repo.update_selection_flows(db, full_job.selection_flows)

    return {"message": "Successfully updated job data"}


@router.delete("/{job_id}")
def delete_job(
    job_id: int,
    db: Session = Depends(get_db),
    token: Payload = Depends(verify_token),
):
    """Delete an existing job"""
    job_db = job_repo.delete_job(db, job_id)
    if job_db is None:
        raise HTTPException(status_code=404, detail="Job not found")

    category_db = category_repo.get_category(db, job_db.category_id)
    if token.get("sub") != category_db.user_id:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Not authorized"
        )

    return {"message": f"Job {job_db.id} is deleted successfully"}
