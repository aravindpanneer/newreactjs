def photo_serializer(data) -> dict:
    return {
        "id": str(data["_id"]),
        'title': str(data['title']),
        "images": data["images"],

    }


def photos_serializer(datas) -> list:
    return [photo_serializer(data) for data in datas]
