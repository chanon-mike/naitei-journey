from datetime import date

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


class FullJob(Job):
    pass
