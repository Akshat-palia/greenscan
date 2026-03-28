from ultralytics import YOLO

model = YOLO("yolov8n.pt")  # lightweight model

def detect_object(image_path):
    results = model(image_path)
    
    names = results[0].names
    boxes = results[0].boxes
    
    if boxes is None or len(boxes) == 0:
        return None
    
    cls_id = int(boxes.cls[0])
    confidence = float(boxes.conf[0])
    
    return {
        "label": names[cls_id],
        "confidence": confidence
    }