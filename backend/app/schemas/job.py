from datetime import date

from pydantic import UUID4, BaseModel

from app.schemas.application_status import ApplicationStatus, ApplicationStatusCreate
from app.schemas.selection_flow import (
    SelectionFlow,
    SelectionFlowCreate,
    SelectionFlowUpdate,
)


class JobBase(BaseModel):
    category_id: UUID4
    card_position: int
    company_name: str
    company_industry: str
    occupation: str
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
    id: UUID4

    class Config:
        orm_mode = True


class FullJobCreate(BaseModel):
    job: JobCreate
    application_status: ApplicationStatusCreate
    selection_flows: list[SelectionFlowCreate]


class FullJobUpdate(BaseModel):
    job: JobCreate
    application_status: ApplicationStatusCreate
    selection_flows: list[SelectionFlowUpdate]


class FullJob(JobBase):
    id: UUID4
    application_status: ApplicationStatus
    selection_flows: list[SelectionFlow]

    class Config:
        orm_mode = True
