from sqlalchemy import case
from sqlalchemy.orm import Session, joinedload

from app.models.category import Category
from app.models.job import Job
from app.schemas.category import CategoryCreate, FullCategory

ORDER = ["気になる", "選考中", "内定", "不通過"]


def get_categories(db: Session, auth0_id: str, type: str) -> list[Category]:
    return (
        db.query(Category)
        .filter(Category.user_id == auth0_id)
        .filter(Category.type == type)
        .all()
    )


def get_category(db: Session, category_id: str) -> Category:
    return db.query(Category).filter(Category.id == category_id).first()


def get_full_categories(db: Session, auth0_id: str, type: str) -> list[FullCategory]:
    order_case = case(
        {value: index for index, value in enumerate(ORDER)},
        value=Category.name,
        else_=len(ORDER),
    )

    return (
        db.query(Category)
        .filter(Category.user_id == auth0_id)
        .filter(Category.type == type)
        .options(
            joinedload(Category.jobs).options(
                joinedload(Job.application_status),
                joinedload(Job.selection_flows),
            )
        )
        .order_by(order_case)
        .all()
    )


def create_category(db: Session, category: CategoryCreate) -> Category:
    db_category = Category(
        user_id=category.user_id,
        type=category.type,
        name=category.name,
    )
    db.add(db_category)
    db.commit()
    db.refresh(db_category)
    return db_category
