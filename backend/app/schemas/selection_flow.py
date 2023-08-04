from pydantic import BaseModel


class SelectionFlowBase(BaseModel):
    job_id: int
    step: int
    process: str


class SelectionFlowCreate(SelectionFlowBase):
    pass


class SelectionFlowUpdate(SelectionFlowBase):
    id: int


class SelectionFlow(SelectionFlowBase):
    id: int

    class Config:
        orm_mode = True
