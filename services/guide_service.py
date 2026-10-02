def recommend_guides(data):
    guides = [g.copy() for g in data.get("guides", []) if g.get("available", False)]
    for g in guides:
        g["_score"] = float(g.get("rating", 0))*10 - float(g.get("distance_km", 999))
    guides.sort(key=lambda x: x["_score"], reverse=True)
    for g in guides:
        g.pop("_score", None)
    return {"recommended_guides": guides}
