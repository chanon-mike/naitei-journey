from sqlalchemy import Column, String, Integer, ForeignKey
from sqlalchemy.orm import relationship
from app.db.database import Base


class Category(Base):
    __tablename__ = "categories"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(String, ForeignKey("users.id"))
    type = Column(String)
    name = Column(String)

    user = relationship("User", back_populates="categories")
    jobs = relationship("Job", back_populates="category", cascade="all, delete-orphan")
