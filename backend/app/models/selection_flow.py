from sqlalchemy import Column, String, Integer, ForeignKey
from sqlalchemy.orm import relationship
from app.db.base import Base


class SelectionFlow(Base):
    __tablename__ = "selection_flows"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    job_id = Column(Integer, ForeignKey("jobs.id"))
    process = Column(String)
    step = Column(Integer)

    job = relationship("Job", back_populates="selection_flows")
