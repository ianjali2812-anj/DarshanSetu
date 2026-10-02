families = {}

def add_member(data):
    family_id = data["family_id"]
    families.setdefault(family_id, []).append({
        "member_id": data["member_id"],
        "name": data["name"],
        "status": data.get("status", "inside-group")
    })
    return {"family_id": family_id, "member": families[family_id][-1]}

def get_family(family_id):
    return families.get(family_id, [])
