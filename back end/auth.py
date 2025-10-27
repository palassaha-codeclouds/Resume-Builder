# auth.py
from datetime import datetime, timedelta
from jose import jwt, JWTError
from passlib.context import CryptContext
from fastapi import HTTPException, Request, Depends
from sqlmodel.ext.asyncio.session import AsyncSession
from sqlmodel import select
from dotenv import load_dotenv
from models import User
import os
from database import get_session

load_dotenv()

SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM", "HS256")
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", 30))

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# ---------------- Password ----------------
def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password):
    return pwd_context.hash(password)

# ---------------- JWT ----------------
def create_access_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=15))
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

# ---------------- Dependencies ----------------
async def get_current_user(request: Request, session: AsyncSession=Depends(get_session)):
    token = None
    cookie_auth = request.cookies.get("access_token")
    if cookie_auth and cookie_auth.startswith("Bearer "):
        token = cookie_auth.split("Bearer ")[1]

    if not token:
        auth_header = request.headers.get("Authorization")
        if auth_header and auth_header.startswith("Bearer "):
            token = auth_header.split("Bearer ")[1]

    if not token:
        raise HTTPException(status_code=401, detail="Not authenticated")

    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username = payload.get("sub")
        if username is None:
            raise HTTPException(status_code=401, detail="Invalid token payload")
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid or expired token")

    # --- Async query ---
    result = await session.exec(select(User).where(User.user_name == username))
    user = result.one_or_none()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    return user

async def get_current_active_user(request: Request, session: AsyncSession = Depends(get_session)):
    user = await get_current_user(request, session)
    if user.disabled:
        raise HTTPException(status_code=400, detail="Inactive user")
    return user
