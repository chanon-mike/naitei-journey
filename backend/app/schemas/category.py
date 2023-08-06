from pydantic import UUID4, BaseModel

from app.schemas.job import FullJob


class CategoryBase(BaseModel):
    user_id: str
    type: str
    name: str


class CategoryCreate(CategoryBase):
    pass


class Category(CategoryBase):
    id: UUID4

    class Config:
        orm_mode = True


class FullCategory(CategoryBase):
    id: UUID4
    jobs: list[FullJob]

    class Config:
        orm_mode = True
