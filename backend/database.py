from pymongo import MongoClient
from .models import Photos
from bson import ObjectId
from bson.objectid import ObjectId

client = MongoClient(
    "mongodb+srv://aravind:aravind@cluster0.kqzhyym.mongodb.net/?retryWrites=true&w=majority")
db = client.photos_app
collection_name = db.photos


async def post_photos(photos):
    document = photos
    result = collection_name.insert_one(document)
    return document


async def fetch_one_photos(id: str):
    document = collection_name.find_one({"_id": ObjectId(id)})
    return document
