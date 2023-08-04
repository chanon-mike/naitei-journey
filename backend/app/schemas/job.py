from datetime import date
from app.schemas.application_status import ApplicationStatus, ApplicationStatusCreate
from app.schemas.selection_flow import SelectionFlow, SelectionFlowCreate

from pydantic import BaseModel


class JobBase(BaseModel):
    category_id: int
    company_name: str
    company_industry: str
    position: str
    ranking: str
    is_internship: bool
    internship_duration: str
    internship_start_date: date
    internship_end_date: date
    url: str
    description: str


class JobCreate(JobBase):
    pass


class Job(JobBase):
    id: int

    class Config:
        orm_mode = True


class FullJobCreate(BaseModel):
    job: JobCreate
    application_status: ApplicationStatusCreate
    selection_flows: list[SelectionFlowCreate]


class FullJob(JobBase):
    id: int
    application_status: ApplicationStatus
    selection_flows: list[SelectionFlow]

    class Config:
        orm_mode = True
