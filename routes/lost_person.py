from flask import Blueprint, request, jsonify
from services.face_service import find_possible_matches

lost_person_bp = Blueprint("lost_person", __name__)

@lost_person_bp.post("/")
def search_lost_person():
    if "photo" not in request.files:
        return jsonify({"error": "photo file is required"}), 400
    photo = request.files["photo"]
    if not photo.filename:
        return jsonify({"error": "empty filename"}), 400
    return jsonify({
        "status": "possible_match_search_completed",
        "matches": find_possible_matches(photo),
        "note": "Possible matches require authorized verification."
    })
