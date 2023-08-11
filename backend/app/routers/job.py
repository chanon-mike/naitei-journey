from typing import Optional
from app.schemas.selection_flow import SelectionFlowCreate, SelectionFlowUpdate

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

import app.repository.application_status as status_repo
import app.repository.category as category_repo
import app.repository.job as job_repo
import app.repository.selection_flow as flow_repo
from app.db.database import get_db
from app.schemas.job import FullJobCreate, FullJobUpdate, JobPositionUpdate
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

    new_job = job_repo.create_job(db, full_job.job)
    job_id = new_job.id

    status_repo.create_application_status(db, full_job.application_status, job_id)
    flow_repo.create_selection_flows(db, full_job.selection_flows, job_id)

    return {"message": "Successfully created job data"}


@router.patch("/card-position")
def update_job_card_positions(
    jobs_positions: list[JobPositionUpdate],
    db: Session = Depends(get_db),
    token: Payload = Depends(verify_token),
):
    """Update positions of multiple jobs"""
    if len(jobs_positions) == 0:
        raise HTTPException(status_code=400, detail="No jobs to update")

    for job_position in jobs_positions:
        job_db = job_repo.get_job(db, job_position.id)
        if job_db is None:
            raise HTTPException(status_code=404, detail="Job not found")

        category_db = category_repo.get_category(db, job_db.category_id)
        if token.get("sub") != category_db.user_id:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED, detail="Not authorized"
            )

        job_repo.update_job_card_position(
            db, job_position.id, job_position.card_position
        )

    return {"message": f"Updated {len(jobs_positions)} jobs successfully"}


@router.get("/{job_id}")
def get_job(
    job_id: str,
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
    job_id: str,
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
    # flow_repo.update_selection_flows(db, full_job.selection_flows)

    return {"message": "Successfully updated job data"}


@router.delete("/{job_id}")
def delete_job(
    job_id: str,
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


@router.patch("/{job_id}/category")
def update_job_category(
    job_id: str,
    to_category_id: str,
    db: Session = Depends(get_db),
    token: Payload = Depends(verify_token),
):
    """Update an existing job category"""
    category_db = category_repo.get_category(db, to_category_id)
    if category_db is None:
        raise HTTPException(status_code=404, detail="Category not found")

    if token.get("sub") != category_db.user_id:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Not authorized"
        )

    job_db = job_repo.update_job_category(db, job_id, to_category_id)
    if job_db is None:
        raise HTTPException(status_code=404, detail="Job not found")

    return job_db


@router.post("/{job_id}/selection-flow")
def create_selection_flow(
    job_id: str,
    flow: SelectionFlowCreate,
    db: Session = Depends(get_db),
    token: Payload = Depends(verify_token),
):
    """Create a new selection flow"""
    job_db = job_repo.get_job(db, job_id)
    if job_db is None:
        raise HTTPException(status_code=404, detail="Job not found")

    category_db = category_repo.get_category(db, job_db.category_id)
    if token.get("sub") != category_db.user_id:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Not authorized"
        )

    return flow_repo.create_selection_flow(db, flow, job_id)


@router.put("/{job_id}/selection-flow")
def update_selection_flows(
    job_id: str,
    flows: list[SelectionFlowUpdate],
    db: Session = Depends(get_db),
    token: Payload = Depends(verify_token),
):
    """Update existing selection flows"""
    try:
        job_db = job_repo.get_job(db, job_id)
        if job_db is None:
            raise HTTPException(status_code=404, detail="Job not found")

        category_db = category_repo.get_category(db, job_db.category_id)
        if token.get("sub") != category_db.user_id:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED, detail="Not authorized"
            )

        flow_repo.update_selection_flows(db, flows)

        return {"message": f"Successfully updated selection flows for job {job_id}"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.delete("/{job_id}/selection-flow/{flow_id}")
def delete_selection_flow(
    job_id: str,
    flow_id: str,
    db: Session = Depends(get_db),
    token: Payload = Depends(verify_token),
):
    """Delete an existing selection flow"""
    try:
        job_db = job_repo.get_job(db, job_id)
        if job_db is None:
            raise HTTPException(status_code=404, detail="Job not found")

        category_db = category_repo.get_category(db, job_db.category_id)
        if token.get("sub") != category_db.user_id:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED, detail="Not authorized"
            )

        flow_repo.delete_selection_flow(db, flow_id)

        return {"message": f"Selection flow {flow_id} is deleted successfully"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
