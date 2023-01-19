from fastapi import FastAPI, APIRouter, HTTPException

from fastapi.middleware.cors import CORSMiddleware
from .schema import photo_serializer, photos_serializer
from .models import Photos
from bson import ObjectId
from bson.objectid import ObjectId

from .database import collection_name, post_photos, fetch_one_photos
origins = [
    "http://localhost:3000",
]


app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)
photo_api_router = APIRouter()
app.include_router(photo_api_router)


@app.get("/api/images")
async def getimages():
    response = photos_serializer(collection_name.find())
    return response


@app.get("/api/images/{id}", response_model=Photos)
async def getbyID(id: str):
    response = await fetch_one_photos(id)

    return response


@app.post("/api/photos", response_model=Photos)
async def create_photos(photos: Photos):
    response = await post_photos(photos.dict())
    if response:
        return response

    raise HTTPException(400, 'wrong')


@app.put("/api/update/{id}")
async def update_images(id: str, photos: Photos):
    collection_name.find_one_and_update({"_id": ObjectId(id)}, {
        "$set": dict(photos)
    })
    return photos_serializer(collection_name.find({"_id": ObjectId(id)}))


@app.delete("/api/{id}")
async def delete_photos(id: str):
    collection_name.find_one_and_delete({"_id": ObjectId(id)})
    return {"status": "ok"}
