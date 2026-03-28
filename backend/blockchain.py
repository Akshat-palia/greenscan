import hashlib
import time

def generate_hash(data):
    block = f"{data}-{time.time()}"
    return hashlib.sha256(block.encode()).hexdigest()

def verify_product(product_name, verified):
    timestamp = time.strftime("%Y-%m-%d %H:%M:%S")

    return {
        "status": "Verified" if verified else "Not Verified",
        "hash": generate_hash(product_name),
        "timestamp": timestamp
    }