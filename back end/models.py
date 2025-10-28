# models.py
from sqlmodel import SQLModel, Field, Relationship
from typing import Optional, List
from datetime import datetime
import uuid
from pydantic import EmailStr, BaseModel
from uuid import UUID

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


# Resume Models 

class ResumeBase(SQLModel):
    title: str
    professional_summary: Optional[str] = None
    template: Optional[str] = None
    accent_color: Optional[str] = None
    is_public: bool = False

class Resume(ResumeBase, table=True):
    __tablename__ = "resumes"

    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    user_id: uuid.UUID = Field(foreign_key="users.id", nullable=False)
    created_at: datetime = Field(default_factory=datetime.utcnow, nullable=False)
    updated_at: datetime = Field(default_factory=datetime.utcnow, nullable=False)

    # Relationships
    personal_info: Optional["PersonalInfo"] = Relationship(back_populates="resume")
    skills: List["Skill"] = Relationship(back_populates="resume")
    experience: List["Experience"] = Relationship(back_populates="resume")
    education: List["Education"] = Relationship(back_populates="resume")
    projects: List["Project"] = Relationship(back_populates="resume")

class ResumeCreate(ResumeBase):
    pass

class ResumeRead(ResumeBase):
    id: uuid.UUID
    user_id: uuid.UUID
    created_at: datetime
    updated_at: datetime

# Personal Info 
class PersonalInfo(SQLModel, table=True):
    __tablename__ = "personal_info"

    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    resume_id: uuid.UUID = Field(foreign_key="resumes.id", nullable=False, unique=True)
    full_name: Optional[str] = Field(default="")
    email: Optional[str] = Field(default="")
    phone: Optional[str] = Field(default="")
    location: Optional[str] = Field(default="")
    linkedin: Optional[str] = Field(default="")
    website: Optional[str] = Field(default="")
    profession: Optional[str] = Field(default="")

    resume: Optional[Resume] = Relationship(back_populates="personal_info")

# Skills 
class Skill(SQLModel, table=True):
    __tablename__ = "skills"

    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    resume_id: uuid.UUID = Field(foreign_key="resumes.id", nullable=False)
    skill_name: str

    resume: Optional[Resume] = Relationship(back_populates="skills")

# Experience
class Experience(SQLModel, table=True):
    __tablename__ = "experience"

    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    resume_id: uuid.UUID = Field(foreign_key="resumes.id", nullable=False)
    company: str
    position: str
    start_date: Optional[datetime] = None
    end_date: Optional[datetime] = None
    description: Optional[str] = None
    is_current: bool = False

    resume: Optional[Resume] = Relationship(back_populates="experience")

# Education 
class Education(SQLModel, table=True):
    __tablename__ = "education"

    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    resume_id: uuid.UUID = Field(foreign_key="resumes.id", nullable=False)
    institution: str
    degree: Optional[str] = None
    field: Optional[str] = None
    graduation_date: Optional[datetime] = None
    gpa: Optional[str] = None

    resume: Optional[Resume] = Relationship(back_populates="education")

# Projects 
class Project(SQLModel, table=True):
    __tablename__ = "projects"

    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    resume_id: uuid.UUID = Field(foreign_key="resumes.id", nullable=False)
    name: str
    type: Optional[str] = None
    description: Optional[str] = None

    resume: Optional[Resume] = Relationship(back_populates="projects")

# Create and Read Operations

class PersonalInfoCreate(SQLModel):
    full_name: Optional[str] = ""
    email: Optional[str] = ""
    phone: Optional[str] = ""
    location: Optional[str] = ""
    linkedin: Optional[str] = ""
    website: Optional[str] = ""
    profession: Optional[str] = ""

class SkillCreate(SQLModel):
    skill_name: str

class ExperienceCreate(SQLModel):
    company: str
    position: str
    start_date: Optional[datetime] = None
    end_date: Optional[datetime] = None
    description: Optional[str] = None
    is_current: bool = False

class EducationCreate(SQLModel):
    institution: str
    degree: Optional[str] = None
    field: Optional[str] = None
    graduation_date: Optional[datetime] = None
    gpa: Optional[str] = None

class ProjectCreate(SQLModel):
    name: str
    type: Optional[str] = None
    description: Optional[str] = None

class ResumeFullCreate(ResumeBase):
    personal_info: Optional[PersonalInfoCreate] = None
    skills: Optional[List[SkillCreate]] = []
    experience: Optional[List[ExperienceCreate]] = []
    education: Optional[List[EducationCreate]] = []
    projects: Optional[List[ProjectCreate]] = []



class PersonalInfoRead(BaseModel):
    id: UUID
    resume_id: UUID
    full_name: str
    email: str
    phone: Optional[str]
    location: Optional[str]
    linkedin: Optional[str]
    website: Optional[str]
    profession: Optional[str]

class SkillRead(BaseModel):
    id: UUID
    resume_id: UUID
    skill_name: str

class ExperienceRead(BaseModel):
    id: UUID
    resume_id: UUID
    company: str
    position: str
    start_date: Optional[datetime]
    end_date: Optional[datetime]
    description: Optional[str]
    is_current: Optional[bool]

class EducationRead(BaseModel):
    id: UUID
    resume_id: UUID
    institution: str
    degree: str
    field: str
    graduation_date: Optional[datetime]
    gpa: Optional[str]

class ProjectRead(BaseModel):
    id: UUID
    resume_id: UUID
    name: str
    type: Optional[str]
    description: Optional[str]

class ResumeRead(BaseModel):
    id: UUID
    title: str
    professional_summary: Optional[str]
    template: Optional[str]
    accent_color: Optional[str]
    is_public: bool
    user_id: UUID
    created_at: datetime
    updated_at: datetime

    personal_info: Optional[PersonalInfoRead] = None
    skills: List[SkillRead] = []
    experience: List[ExperienceRead] = []
    education: List[EducationRead] = []
    projects: List[ProjectRead] = []

    class Config:
        orm_mode = True