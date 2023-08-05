from sqlalchemy.orm import Session

from app.models.category import Category
from app.schemas.category import CategoryCreate


def get_categories(db: Session, auth0_id: str, type: str) -> list[Category]:
    return (
        db.query(Category)
        .filter(Category.user_id == auth0_id)
        .filter(Category.type == type)
        .all()
    )


def get_category(db: Session, category_id: str) -> Category:
    return db.query(Category).filter(Category.id == category_id).first()


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
