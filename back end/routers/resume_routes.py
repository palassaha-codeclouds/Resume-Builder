# routers/resume_routes.py
from fastapi import APIRouter, HTTPException, Depends
from sqlmodel import select, delete
from typing import List
import uuid
from models import (
    Resume, ResumeFullCreate, PersonalInfo, Skill, Experience, Education, Project, ResumeRead
)
from database import get_session
from sqlmodel.ext.asyncio.session import AsyncSession
from datetime import datetime
from auth import get_current_user
from sqlalchemy.orm import selectinload
from datetime import datetime

router = APIRouter(
    prefix="/resumes",
    tags=["resumes"]
)


# Create full resume
@router.post("/create", response_model=ResumeRead)
async def create_resume_full(resume_data: ResumeFullCreate, session: AsyncSession = Depends(get_session), current_user=Depends(get_current_user)):
    user_id = current_user.id

    new_resume = Resume(**resume_data.model_dump(exclude={"personal_info","skills","experience","education","projects"}), user_id=user_id)
    session.add(new_resume)

    await session.flush()

    if resume_data.personal_info:
        pi = PersonalInfo(**resume_data.personal_info.model_dump(), resume_id=new_resume.id)
        session.add(pi)

    for skill in resume_data.skills:
        s = Skill(**skill.model_dump(), resume_id=new_resume.id)
        session.add(s)

    for exp in resume_data.experience:
        e = Experience(**exp.model_dump(), resume_id=new_resume.id)
        session.add(e)

    for edu in resume_data.education:
        ed = Education(**edu.model_dump(), resume_id=new_resume.id)
        session.add(ed)

    for proj in resume_data.projects:
        p = Project(**proj.model_dump(), resume_id=new_resume.id)
        session.add(p)

    await session.commit()
    await session.refresh(new_resume)
    return ResumeRead(
    id=new_resume.id,
    title=new_resume.title,
    professional_summary=new_resume.professional_summary,
    template=new_resume.template,
    accent_color=new_resume.accent_color,
    is_public=new_resume.is_public,
    user_id=new_resume.user_id,
    created_at=new_resume.created_at,
    updated_at=new_resume.updated_at,
)


# Update full resume
@router.put("/update/{resume_id}", response_model=ResumeRead)
async def update_resume(
    resume_id: uuid.UUID,
    resume_data: ResumeFullCreate,
    session: AsyncSession = Depends(get_session),
    current_user=Depends(get_current_user)
):

    existing_resume = await session.get(Resume, resume_id)
    if not existing_resume or existing_resume.user_id != current_user.id:
        raise HTTPException(status_code=404, detail="Resume not found")

    for key, value in resume_data.model_dump(
        exclude={"personal_info", "skills", "experience", "education", "projects"}
    ).items():
        setattr(existing_resume, key, value)

    existing_resume.updated_at = datetime.utcnow()

    await session.execute(delete(PersonalInfo).where(PersonalInfo.resume_id == resume_id))
    if resume_data.personal_info:
        pi = PersonalInfo(**resume_data.personal_info.model_dump(), resume_id=resume_id)
        session.add(pi)

    await session.execute(delete(Skill).where(Skill.resume_id == resume_id))
    for skill in resume_data.skills:
        s = Skill(**skill.model_dump(), resume_id=resume_id)
        session.add(s)

    await session.execute(delete(Experience).where(Experience.resume_id == resume_id))
    for exp in resume_data.experience:
        e = Experience(**exp.model_dump(), resume_id=resume_id)
        session.add(e)

    await session.execute(delete(Education).where(Education.resume_id == resume_id))
    for edu in resume_data.education:
        ed = Education(**edu.model_dump(), resume_id=resume_id)
        session.add(ed)

    await session.execute(delete(Project).where(Project.resume_id == resume_id))
    for proj in resume_data.projects:
        p = Project(**proj.model_dump(), resume_id=resume_id)
        session.add(p)

    await session.commit()
    
    query = (
        select(Resume)
        .where(Resume.id == resume_id)
        .options(
            selectinload(Resume.personal_info),
            selectinload(Resume.skills),
            selectinload(Resume.experience),
            selectinload(Resume.education),
            selectinload(Resume.projects)
        )
    )
    result = await session.execute(query)
    updated_resume = result.scalar_one()

    return updated_resume


# Get all resumes
@router.get("/", response_model=List[ResumeRead])
async def get_all_resumes(session: AsyncSession = Depends(get_session)):
    query = select(Resume).options(
        selectinload(Resume.personal_info),
        selectinload(Resume.skills),
        selectinload(Resume.experience),
        selectinload(Resume.education),
        selectinload(Resume.projects)
    )
    result = await session.exec(query)
    resumes = result.all()
    return resumes


# Get resume by ID
@router.get("/{resume_id}", response_model=ResumeRead)
async def get_resume(resume_id: str, session: AsyncSession = Depends(get_session)):
    query = (
        select(Resume)
        .where(Resume.id == resume_id)
        .options(
            selectinload(Resume.personal_info),
            selectinload(Resume.skills),
            selectinload(Resume.experience),
            selectinload(Resume.education),
            selectinload(Resume.projects)
        )
    )

    result = await session.execute(query)
    resume = result.scalar_one_or_none()  

    if not resume:
        raise HTTPException(status_code=404, detail="Resume not found")

    resume.skills = resume.skills or []
    resume.experience = resume.experience or []
    resume.education = resume.education or []
    resume.projects = resume.projects or []
    resume.personal_info = resume.personal_info or {}

    return resume


# Delete resume
@router.delete("/{resume_id}")
async def delete_resume(
    resume_id: uuid.UUID,
    session: AsyncSession = Depends(get_session),
    current_user = Depends(get_current_user),
):
    resume = await session.get(Resume, resume_id)
    if not resume:
        raise HTTPException(status_code=404, detail="Resume not found")

    if resume.user_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized to delete this resume")

    await session.execute(delete(PersonalInfo).where(PersonalInfo.resume_id == resume.id))
    await session.execute(delete(Skill).where(Skill.resume_id == resume.id))
    await session.execute(delete(Experience).where(Experience.resume_id == resume.id))
    await session.execute(delete(Education).where(Education.resume_id == resume.id))
    await session.execute(delete(Project).where(Project.resume_id == resume.id))

    await session.delete(resume)
    await session.commit()

    return {"detail": "Resume deleted successfully"}
