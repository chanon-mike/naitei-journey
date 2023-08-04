from sqlalchemy.orm import Session

from app.models.selection_flow import SelectionFlow
from app.schemas.selection_flow import SelectionFlowCreate
from app.schemas.selection_flow import SelectionFlow as SelectionFlowSchema


def get_selection_flow(db: Session, job_id: int) -> SelectionFlow:
    return db.query(SelectionFlow).filter(SelectionFlow.job_id == job_id).first()


def create_selection_flows(
    db: Session, flows: list[SelectionFlowCreate]
) -> list[SelectionFlowSchema]:
    db_flows = [
        SelectionFlow(
            **{
                "job_id": flow.job_id,
                "step": flow.step,
            }
        )
        for flow in flows
    ]

    db.bulk_save_objects(db_flows)
    db.commit()
    return db_flows


# TODO: Currently, bulk update is not working without primary key
# Primary key needed to be update in SelectionFlow schema
# Migrate database first to add step and process too
def update_selection_flows(db: Session, flows: list[SelectionFlowCreate]):
    mappings = [{**flow.model_dump()} for flow in flows]
    db.bulk_update_mappings(SelectionFlowCreate, mappings)
    db.commit()
    return mappings


def delete_selection_flows(db: Session, ids: list[int]):
    db.query(SelectionFlow).filter(SelectionFlow.id.in_(ids)).delete(
        synchronize_session=False
    )
    db.commit()
