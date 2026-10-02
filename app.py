from flask import Flask
from flask_cors import CORS
from routes.lost_person import lost_person_bp
from routes.navigation import navigation_bp
from routes.health import health_bp
from routes.family import family_bp
from routes.guide import guide_bp

app = Flask(__name__)
CORS(app)

app.register_blueprint(lost_person_bp, url_prefix="/api/lost-person")
app.register_blueprint(navigation_bp, url_prefix="/api/navigation")
app.register_blueprint(health_bp, url_prefix="/api/health")
app.register_blueprint(family_bp, url_prefix="/api/family")
app.register_blueprint(guide_bp, url_prefix="/api/guides")

@app.get("/")
def home():
    return {"message": "DarshanSetu backend is running", "status": "success"}

@app.get("/api/health-check")
def health_check():
    return {"service": "DarshanSetu API", "status": "healthy"}

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
