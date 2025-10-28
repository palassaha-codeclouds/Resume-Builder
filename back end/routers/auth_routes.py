# routes/auth_routes.py
from fastapi import APIRouter, HTTPException, Response, Depends, Request
from fastapi.security import OAuth2PasswordRequestForm
from sqlmodel.ext.asyncio.session import AsyncSession
from sqlmodel import select
from datetime import timedelta
from models import User, UserCreate, UserRead, Token
from auth import (
    get_password_hash,
    create_access_token,
    verify_password,
    ACCESS_TOKEN_EXPIRE_MINUTES,
    get_current_user
)
from database import get_session

router = APIRouter(prefix="/auth", tags=["Authentication"])

# Signup 
@router.post("/signup", status_code=201)
async def signup(user: UserCreate, session: AsyncSession = Depends(get_session)):
    result = await session.execute(select(User).where(User.email == user.email))
    existing_user = result.scalar_one_or_none()
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    result = await session.execute(select(User).where(User.user_name == user.user_name))
    existing_username = result.scalar_one_or_none()

    if existing_username:
        raise HTTPException(status_code=400, detail="Username already taken")

    hashed_pw = get_password_hash(user.password)
    new_user = User(
        user_name=user.user_name,
        full_name=user.full_name,
        email=user.email,
        hashed_password=hashed_pw,
    )
    session.add(new_user)
    await session.commit()
    await session.refresh(new_user)
    return {"msg": "User created successfully", "user_id": new_user.id}


# Login 
@router.post("/login", response_model=Token)
async def login(
    response: Response,
    form_data: OAuth2PasswordRequestForm = Depends(),
    session: AsyncSession = Depends(get_session),
):
    result = await session.execute(select(User).where(User.user_name == form_data.username))
    user = result.scalar_one_or_none()
    if not user or not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid username or password")

    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(data={"sub": user.user_name}, expires_delta=access_token_expires)
    response.set_cookie(
        key="access_token",
        value=access_token,
        httponly=False,
        samesite="lax",
        max_age=ACCESS_TOKEN_EXPIRE_MINUTES * 60,
    )

    return {"access_token": access_token, "token_type": "bearer"}


# Me 
@router.get("/me", response_model=UserRead)
async def get_me(current_user: User = Depends(get_current_user)):
    return current_user


# Logout 
@router.post("/logout")
async def logout(response: Response):
    response.delete_cookie(key="access_token", httponly=True, samesite="lax")
    return {"msg": "Successfully logged out"}


# Delete User
@router.delete("/delete", status_code=200)
async def delete_user(response: Response, session: AsyncSession = Depends(get_session), user: User = Depends(get_current_user)):
    await session.delete(user)
    await session.commit()
    response.delete_cookie(key="access_token", httponly=True, samesite="lax")
    return {"msg": f"User '{user.user_name}' deleted successfully"}

