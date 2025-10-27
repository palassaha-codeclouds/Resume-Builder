# main3.py
from fastapi import FastAPI
from routers import auth_routes, resume_routes
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Supabase Auth API (Modular)")

app.include_router(auth_routes.router)
app.include_router(resume_routes.router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/test")
def root():
    return {"All OK": True}
