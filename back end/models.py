# models.py
from sqlmodel import SQLModel, Field
from typing import Optional
from datetime import datetime
import uuid
from pydantic import EmailStr

class User(SQLModel, table=True):
    __tablename__ = "users"

    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    user_name: str = Field(nullable=False)
    full_name: Optional[str] = Field(default="", nullable=True)
    email: str = Field(nullable=False, unique=True)
    hashed_password: str = Field(nullable=False)
    disabled: Optional[bool] = Field(default=False)
    created_at: datetime = Field(default_factory=datetime.utcnow, nullable=False)

class UserCreate(SQLModel):
    user_name: str
    full_name: str
    email: EmailStr
    password: str

class UserRead(SQLModel):
    id: uuid.UUID
    user_name: str
    full_name: str
    email: EmailStr
    disabled: Optional[bool]
    created_at: datetime

class Token(SQLModel):
    access_token: str
    token_type: str