from fastapi import FastAPI, Depends
from schemas import UserDataCreation, UserDataResponse
from sqlalchemy.orm import Session
import models
from database import engine, get_db

from fastapi.middleware.cors import CORSMiddleware

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# users_list = [
#     UserDataCreation(id = 1, name = "James", age = 22, email = "james@gmail.com")
# ]

@app.get("/")
def welcome():
    return "Hello!"


@app.get("/users", response_model=list[UserDataResponse])
def get_ratings(db : Session = Depends(get_db)):
    return db.query(models.UserDataBase).all()


@app.post("/user/add", response_model=UserDataResponse)
def add(new_user_data : UserDataCreation, db : Session = Depends(get_db)):
    new_user = models.UserDataBase(
        name = new_user_data.name,
        age = new_user_data.age,
        email = new_user_data.email
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user