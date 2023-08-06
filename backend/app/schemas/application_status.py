from datetime import date as datetime_date
from typing import Optional

from pydantic import UUID4, BaseModel, validator


class ApplicationStatusBase(BaseModel):
    status: str
    process: str
    date: Optional[datetime_date] = None

    @validator("date", pre=True, always=True)
    def empty_string_to_none(cls, value):
        return value or None


class ApplicationStatusCreate(ApplicationStatusBase):
    pass


class ApplicationStatus(ApplicationStatusBase):
    job_id: UUID4
    id: UUID4

    class Config:
        orm_mode = True
