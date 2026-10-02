from flask import Blueprint, request, jsonify
from services.health_service import assess_health_risk

health_bp = Blueprint("health", __name__)

@health_bp.post("/assess")
def assess():
    return jsonify(assess_health_risk(request.get_json(silent=True) or {}))
