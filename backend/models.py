from pydantic import BaseModel


class Photos(BaseModel):
    title:str
    images:str