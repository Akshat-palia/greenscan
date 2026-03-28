PRODUCT_DATA = {
    "chair": {
        "carbon": "25 kg CO2",
        "score": 6.5,
        "material": "Wood + Synthetic Finish",
        "verified": False
    },
    "bottle": {
        "carbon": "5 kg CO2",
        "score": 4.0,
        "material": "Plastic",
        "verified": False
    },
    "laptop": {
        "carbon": "200 kg CO2",
        "score": 7.5,
        "material": "Aluminum + Electronics",
        "verified": True
    }
}

def get_product_data(label):
    return PRODUCT_DATA.get(label, {
        "carbon": "Unknown",
        "score": 5.0,
        "material": "Unknown",
        "verified": False
    })