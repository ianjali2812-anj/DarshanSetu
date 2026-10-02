def assess_health_risk(data):
    emergency = bool(data.get("chest_pain") or data.get("unconscious"))
    breathing = bool(data.get("breathing_difficulty"))
    dizziness = bool(data.get("dizziness"))
    if emergency or breathing:
        risk, advice = "HIGH", "Seek immediate professional medical/emergency assistance."
    elif dizziness:
        risk, advice = "MEDIUM", "Rest and seek professional help if symptoms persist."
    else:
        risk, advice = "LOW", "Follow basic safety precautions and seek help if concerned."
    return {"risk": risk, "advice": advice,
            "note": "Educational project guidance, not a medical diagnosis."}
