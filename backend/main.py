from fastapi import FastAPI, UploadFile, File
import shutil
import os
from fastapi.middleware.cors import CORSMiddleware
from yolo_model import detect_object
from data import get_product_data
from blockchain import verify_product

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # allow all for now
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)


@app.post("/analyze")
async def analyze(file: UploadFile = File(...)):
    file_path = f"{UPLOAD_DIR}/{file.filename}"
    
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    
    detection = detect_object(file_path)
    
    if detection is None:
        return {"error": "No object detected"}
    
    label = detection["label"]
    
    data = get_product_data(label)
    
    blockchain_result = verify_product(label, data["verified"])
    
    return {
        "object": label,
        "confidence": detection["confidence"],
        "carbon": data["carbon"],
        "score": data["score"],
        "material": data["material"],
        "verification": blockchain_result
    }