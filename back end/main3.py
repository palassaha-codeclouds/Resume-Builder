# main3.py
from fastapi import FastAPI
from routers import auth_routes, resume_routes
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

app = FastAPI(title="Supabase Auth API (Modular)")

app.include_router(auth_routes.router)
app.include_router(resume_routes.router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/test")
def root():
    return {"All OK": True}

if __name__ == "__main__":
    uvicorn.run("main3:app", host="0.0.0.0", port=8000)
