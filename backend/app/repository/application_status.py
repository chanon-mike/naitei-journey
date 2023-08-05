from sqlalchemy.orm import Session

from app.models.application_status import ApplicationStatus
from app.schemas.application_status import ApplicationStatusCreate


def get_application_status(db: Session, job_id: str) -> ApplicationStatus:
    return (
        db.query(ApplicationStatus).filter(ApplicationStatus.job_id == job_id).first()
    )


def create_application_status(
    db: Session, status: ApplicationStatusCreate, job_id: str
) -> ApplicationStatus:
    db_status = ApplicationStatus(
        job_id=job_id,
        status=status.status,
        process=status.process,
        date=status.date,
    )
    db.add(db_status)
    db.commit()
    db.refresh(db_status)
    return db_status


def update_application_status(
    db: Session, status: ApplicationStatusCreate, job_id: str
) -> ApplicationStatus:
    db_status: ApplicationStatus = (
        db.query(ApplicationStatus).filter(ApplicationStatus.job_id == job_id).first()
    )
    if db_status is None:
        return None

    db_status.status = status.status
    db_status.process = status.process
    db_status.date = status.date
    db.commit()
    db.refresh(db_status)
    return db_status
