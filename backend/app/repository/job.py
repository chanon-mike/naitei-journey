from sqlalchemy.orm import Session, joinedload

from app.models.job import Job
from app.models.user import User
from app.schemas.job import FullJob, JobCreate


def get_job(db: Session, job_id: int) -> FullJob:
    return (
        db.query(Job)
        .options(joinedload(Job.application_status), joinedload(Job.selection_flows))
        .filter(Job.id == job_id)
        .first()
    )


def get_jobs(db: Session, skip: int = 0, limit: int = 200) -> list[FullJob]:
    return (
        db.query(Job)
        .options(joinedload(Job.application_status), joinedload(Job.selection_flows))
        .offset(skip)
        .limit(limit)
        .all()
    )


def get_jobs_by_user_id(
    db: Session, auth0_id: str, skip: int = 0, limit: int = 200
) -> list[FullJob]:
    return (
        db.query(Job)
        .options(joinedload(Job.application_status), joinedload(Job.selection_flows))
        .filter(User.id == auth0_id)
        .offset(skip)
        .limit(limit)
        .all()
    )


def create_job(db: Session, job: JobCreate) -> Job:
    db_job = Job(
        category_id=job.category_id,
        card_position=job.card_position,
        company_name=job.company_name,
        company_industry=job.company_industry,
        occupation=job.occupation,
        ranking=job.ranking,
        is_internship=job.is_internship,
        internship_duration=job.internship_duration,
        internship_start_date=job.internship_start_date,
        internship_end_date=job.internship_end_date,
        url=job.url,
        description=job.description,
    )
    db.add(db_job)
    db.commit()
    db.refresh(db_job)
    return db_job


def update_job(db: Session, job: JobCreate, job_id: int) -> Job:
    db_job: Job = db.query(Job).filter(Job.id == job_id).first()
    if db_job is None:
        return None
    db_job.category_id = job.category_id
    db_job.card_position = job.card_position
    db_job.company_name = job.company_name
    db_job.company_industry = job.company_industry
    db_job.occupation = job.occupation
    db_job.ranking = job.ranking
    db_job.is_internship = job.is_internship
    db_job.internship_duration = job.internship_duration
    db_job.internship_start_date = job.internship_start_date
    db_job.internship_end_date = job.internship_end_date
    db_job.url = job.url
    db_job.description = job.description
    db.commit()
    db.refresh(db_job)
    return db_job


def delete_job(db: Session, job_id: int) -> Job:
    db_job: Job = db.query(Job).filter(Job.id == job_id).first()
    if db_job is None:
        return None
    db.delete(db_job)
    db.commit()
    return db_job
