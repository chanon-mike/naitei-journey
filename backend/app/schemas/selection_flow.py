from pydantic import UUID4, BaseModel


class SelectionFlowBase(BaseModel):
    step: int
    process: str


class SelectionFlowCreate(SelectionFlowBase):
    pass


class SelectionFlowUpdate(SelectionFlowBase):
    id: UUID4
    job_id: UUID4


class SelectionFlow(SelectionFlowBase):
    id: UUID4
    job_id: UUID4

    class Config:
        orm_mode = True
