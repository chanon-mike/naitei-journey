import uuid

from sqlalchemy import UUID, Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship

from app.db.base import Base


class SelectionFlow(Base):
    __tablename__ = "selection_flows"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    job_id = Column(UUID(as_uuid=True), ForeignKey("jobs.id"))
    process = Column(String)
    step = Column(Integer)

    job = relationship("Job", back_populates="selection_flows")
