from app.models.user import User
from app.schemas.user import UserCreate
from sqlalchemy.orm import Session


def get_users(db: Session):
    return db.query(User).all()


def get_user(db: Session, auth0_id: str):
    return db.query(User).filter(User.id == auth0_id).first()


def create_user(db: Session, user: UserCreate):
    db_user = User(id=user.id, name=user.name, email=user.email)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


def update_user(db: Session, user: UserCreate):
    db_user: User = db.query(User).filter(User.id == user.id).first()
    if db_user is None:
        return None

    db_user.name = user.name
    db_user.email = user.email
    db.commit()
    db.refresh(db_user)
    return db_user


def delete_user(db: Session, auth0_id: str):
    db_user: User = db.query(User).filter(User.id == auth0_id).first()
    if db_user is not None:
        db.delete(db_user)
        db.commit()
