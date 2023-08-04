from app.models.category import Category
from app.schemas.category import CategoryCreate
from sqlalchemy.orm import Session


def get_categories(db: Session, auth0_id: str = None):
    if not auth0_id:
        return db.query(Category).all()
    return db.query(Category).filter(Category.user_id == auth0_id)


def get_category(db: Session, category_id: int):
    return db.query(Category).filter(Category.id == category_id).first()


def create_category(db: Session, category: CategoryCreate):
    db_category = Category(
        user_id=category.user_id,
        type=category.type,
        name=category.name,
    )
    db.add(db_category)
    db.commit()
    db.refresh(db_category)
    return db_category