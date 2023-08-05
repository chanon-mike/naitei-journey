import uuid
from sqlalchemy import UUID, Column, ForeignKey, String
from sqlalchemy.orm import relationship

from app.db.base import Base


class Category(Base):
    __tablename__ = "categories"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(String, ForeignKey("users.id"))
    type = Column(String)
    name = Column(String)

    user = relationship("User", back_populates="categories")
    jobs = relationship("Job", back_populates="category", cascade="all, delete-orphan")
