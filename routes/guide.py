from flask import Blueprint, request, jsonify
from services.guide_service import recommend_guides

guide_bp = Blueprint("guide", __name__)

@guide_bp.post("/recommend")
def recommend():
    return jsonify(recommend_guides(request.get_json(silent=True) or {}))
