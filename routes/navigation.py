from flask import Blueprint, request, jsonify
from services.navigation_service import shortest_path

navigation_bp = Blueprint("navigation", __name__)

@navigation_bp.post("/route")
def route():
    data = request.get_json(silent=True) or {}
    source, destination = data.get("source"), data.get("destination")
    if not source or not destination:
        return jsonify({"error": "source and destination are required"}), 400
    result = shortest_path(source, destination)
    return jsonify(result) if result else (jsonify({"error": "No route found"}), 404)
