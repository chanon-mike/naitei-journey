import uuid
from sqlalchemy import UUID, Column, Date, ForeignKey, String
from sqlalchemy.orm import relationship

from app.db.base import Base


class ApplicationStatus(Base):
    __tablename__ = "application_statuses"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    job_id = Column(UUID(as_uuid=True), ForeignKey("jobs.id"))
    status = Column(String)
    process = Column(String)
    date = Column(Date)

    job = relationship("Job", back_populates="application_status")
