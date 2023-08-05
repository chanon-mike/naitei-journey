from pydantic import BaseModel, UUID4


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
