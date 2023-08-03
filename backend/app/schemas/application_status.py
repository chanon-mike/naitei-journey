from datetime import date
from pydantic import BaseModel


class ApplicationStatusBase(BaseModel):
    job_id: int
    status: str
    process: str
    date: date


class ApplicationStatusCreate(ApplicationStatusBase):
    pass


class ApplicationStatus(ApplicationStatusBase):
    id: int

    class Config:
        orm_mode = True
