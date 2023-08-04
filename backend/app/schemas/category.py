from pydantic import BaseModel


class CategoryBase(BaseModel):
    user_id: str
    type: str
    name: str


class CategoryCreate(CategoryBase):
    pass


class Category(CategoryBase):
    id: int

    class Config:
        orm_mode = True
