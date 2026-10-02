from flask import Blueprint, request, jsonify
from services.family_service import add_member, get_family

family_bp = Blueprint("family", __name__)

@family_bp.post("/member")
def create_member():
    data = request.get_json(silent=True) or {}
    required = ["family_id", "member_id", "name"]
    if any(not data.get(x) for x in required):
        return jsonify({"error": "family_id, member_id and name are required"}), 400
    return jsonify(add_member(data)), 201

@family_bp.get("/<family_id>")
def members(family_id):
    return jsonify({"family_id": family_id, "members": get_family(family_id)})
