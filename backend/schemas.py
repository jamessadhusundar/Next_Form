
from pydantic import BaseModel, Field, EmailStr

class UserDataCreation(BaseModel):
    name : str
    age : int = Field(gt=0, le=120)
    email : EmailStr

class UserDataResponse(BaseModel):
    id : int
    name : str
    age : int
    email : str

    class config:
        orm_mode = True