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
