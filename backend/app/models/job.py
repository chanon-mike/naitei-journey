from sqlalchemy import Column, String, Integer, ForeignKey, Boolean, Date
from sqlalchemy.orm import relationship
from app.db.base import Base


class Job(Base):
    __tablename__ = "jobs"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    category_id = Column(Integer, ForeignKey("categories.id"))
    company_name = Column(String, nullable=False)
    company_industry = Column(String)
    position = Column(String)
    ranking = Column(String, nullable=False)
    is_internship = Column(Boolean)
    internship_duration = Column(String)
    internship_start_date = Column(Date)
    internship_end_date = Column(Date)
    url = Column(String)
    description = Column(String)

    category = relationship("Category", back_populates="jobs")
    application_status = relationship(
        "ApplicationStatus",
        back_populates="job",
        cascade="all, delete-orphan",
        uselist=False,
    )
    selection_flows = relationship(
        "SelectionFlow", back_populates="job", cascade="all, delete-orphan"
    )
