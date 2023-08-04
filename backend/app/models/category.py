from sqlalchemy import Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship

from app.db.base import Base


class Category(Base):
    __tablename__ = "categories"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    user_id = Column(String, ForeignKey("users.id"))
    type = Column(String)
    name = Column(String)

    user = relationship("User", back_populates="categories")
    jobs = relationship("Job", back_populates="category", cascade="all, delete-orphan")
