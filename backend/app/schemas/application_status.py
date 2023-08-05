from datetime import date

from pydantic import UUID4, BaseModel


class ApplicationStatusBase(BaseModel):
    status: str
    process: str
    date: date


class ApplicationStatusCreate(ApplicationStatusBase):
    pass


class ApplicationStatus(ApplicationStatusBase):
    job_id: UUID4
    id: UUID4

    class Config:
        orm_mode = True
