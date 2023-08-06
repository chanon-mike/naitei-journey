from typing import Optional

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

import app.repository.category as category_repo
from app.db.database import get_db
from app.security.payload import Payload
from app.security.verify_token import verify_token

router = APIRouter(prefix="/category", tags=["category"])


@router.get("/{auth0_id}")
def get_full_categories(
    auth0_id: str,
    type: Optional[str],
    db: Session = Depends(get_db),
    token: Payload = Depends(verify_token),
):
    """Get all categories by user id"""
    if token.get("sub") != auth0_id:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Not authorized"
        )

    return category_repo.get_full_categories(db, auth0_id, type)
