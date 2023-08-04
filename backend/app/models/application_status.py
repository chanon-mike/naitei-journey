from sqlalchemy import Column, String, Integer, ForeignKey, Date
from sqlalchemy.orm import relationship
from app.db.base import Base


class ApplicationStatus(Base):
    __tablename__ = "application_statuses"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    job_id = Column(Integer, ForeignKey("jobs.id"))
    status = Column(String)
    process = Column(String)
    date = Column(Date)

    job = relationship("Job", back_populates="application_status")
