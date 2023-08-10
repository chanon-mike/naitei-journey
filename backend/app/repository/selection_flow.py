from sqlalchemy.orm import Session

from app.models.selection_flow import SelectionFlow
from app.schemas.selection_flow import SelectionFlowCreate, SelectionFlowUpdate


def get_selection_flow(db: Session, job_id: str) -> SelectionFlow:
    return db.query(SelectionFlow).filter(SelectionFlow.job_id == job_id).first()


def create_selection_flow(db: Session, flow: SelectionFlowCreate, job_id: str):
    db_flow = SelectionFlow(
        **{
            "job_id": job_id,
            "step": flow.step,
            "process": flow.process,
        }
    )

    db.add(db_flow)
    db.commit()
    db.refresh(db_flow)
    return db_flow


def create_selection_flows(
    db: Session, flows: list[SelectionFlowCreate], job_id: str
) -> list[SelectionFlow]:
    db_flows = [
        SelectionFlow(
            **{
                "job_id": job_id,
                "step": flow.step,
                "process": flow.process,
            }
        )
        for flow in flows
    ]

    db.bulk_save_objects(db_flows)
    db.commit()
    return db_flows


def update_selection_flows(db: Session, flows: list[SelectionFlowUpdate]):
    mappings = [{**flow.model_dump()} for flow in flows]
    db.bulk_update_mappings(SelectionFlow, mappings)
    db.commit()
    return mappings


def delete_selection_flows(db: Session, ids: list[str]):
    db.query(SelectionFlow).filter(SelectionFlow.id.in_(ids)).delete(
        synchronize_session=False
    )
    db.commit()
