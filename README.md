# DarshanSetu Backend

Student-level Flask backend for React + Firebase + ML/DSA integration.

## Run
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python app.py

Server: http://127.0.0.1:5000

## APIs
GET /
GET /api/health-check
POST /api/lost-person/       form-data: photo=<image>
POST /api/navigation/route   JSON: {"source":"Main Gate","destination":"Temple"}
POST /api/health/assess      JSON: {"dizziness":true}
POST /api/family/member      JSON: {"family_id":"F001","member_id":"M001","name":"Rahul"}
GET /api/family/F001
POST /api/guides/recommend   JSON: {"guides":[{"name":"Guide A","available":true,"rating":4.8,"distance_km":1.2}]}

The face service is a placeholder; replace it with a properly tested, consent-based face embedding pipeline.
