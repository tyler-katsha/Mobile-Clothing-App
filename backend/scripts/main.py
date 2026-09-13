import io
import requests
from fastapi import FastAPI,HTTPException
from pydantic import BaseModel
from PIL import Image
from rembg import remove

app = FastAPI()

class ImageRequest(BaseModel):
    imageUrl:str

@app.post("/api/v1/remove-bg")
def remove_background(request: ImageRequest):
    try:
        response = requests.get(request.imageUrl,timeout=10)
        response.raise_for_status()

        input_image = Image.open(io.BytesIO(response.content))
        output_image = remove(input_image)

        byte_arr = io.BytesIO()
        output_image.save(byte_arr,format="PNG")
        byte_arr.seek(0)

        return {
            "status": "SUCCESS",
            "message": "Background removed successfully",
            # "outputUrl": uploaded_cloudinary_url
        }
    except Exception as e:
        raise HTTPException(status_code=500,detail=str(e))