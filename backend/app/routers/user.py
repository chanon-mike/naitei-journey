from app.schemas.user import User, UserCreate
from app.schemas.category import CategoryCreate
from app.security.payload import Payload
from fastapi import Depends, APIRouter, HTTPException, status
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.security.verify_token import verify_token
import app.repository.user as user_repo
import app.repository.category as category_repo

router = APIRouter(prefix="/user", tags=["user"])


@router.get("/", response_model=list[User])
def get_users(db: Session = Depends(get_db)):
    """Get all users"""
    return user_repo.get_users(db)


@router.post("/", response_model=User)
def create_user(
    user: UserCreate,
    db: Session = Depends(get_db),
):
    """Create a new user and categories"""
    user_existed = user_repo.get_user(db, user.id)
    if user_existed:
        raise HTTPException(status_code=400, detail="User already registered")

    created_user = user_repo.create_user(db, user)
    category_type = ["インターンシップ", "本選考"]
    category_name = ["気になる", "選考中", "内定", "不通過"]
    for type in category_type:
        for name in category_name:
            category_repo.create_category(
                db, CategoryCreate(user_id=created_user.id, type=type, name=name)
            )

    return created_user


@router.put("/", response_model=User)
def update_user(
    user: UserCreate,
    db: Session = Depends(get_db),
    token: Payload = Depends(verify_token),
):
    """Update an existing user"""
    if token.get("sub") != user.id:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Not authorized"
        )

    db_user = user_repo.update_user(db, user)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user


@router.get("/{auth0_id}", response_model=User)
def get_user(
    auth0_id: str,
    db: Session = Depends(get_db),
    token: Payload = Depends(verify_token),
):
    """Get user by auth0_id"""
    if token.get("sub") != auth0_id:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Not authorized"
        )

    db_user = user_repo.get_user(db, auth0_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user


@router.delete("/{auth0_id}")
def delete_user(
    auth0_id: str,
    db: Session = Depends(get_db),
    token: Payload = Depends(verify_token),
):
    """Delete an existing user"""
    if token.get("sub") != auth0_id:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Not authorized"
        )

    db_user = user_repo.delete_user(db, auth0_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user
