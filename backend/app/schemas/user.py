from datetime import datetime
from pydantic import BaseModel


class UserBase(BaseModel):
    id: str
    name: str
    email: str


class UserCreate(UserBase):
    pass


class User(UserBase):
    created_at: datetime

    class Config:
        orm_mode = True
