from typing import Optional
from pydantic import BaseModel


class SelectionFlowBase(BaseModel):
    job_id: int
    step: str


class SelectionFlowCreate(SelectionFlowBase):
    pass


class SelectionFlow(SelectionFlowBase):
    id: int

    class Config:
        orm_mode = True


class SelectionFlowOperations(BaseModel):
    create: Optional[list[SelectionFlowCreate]]
    update: Optional[list[SelectionFlowCreate]]
    delete: Optional[list[SelectionFlowCreate]]
