import { useState } from "react";
import "./App.css";

function App() {
  const [source, setSource] = useState("Main Gate");
const [destination, setDestination] = useState("Temple");
const [route, setRoute] = useState(null);
const [loading, setLoading] = useState(false);

const findRoute = async () => {
  setLoading(true);

  try {
    const response = await fetch(
  "http://192.168.1.105:5000/api/navigation/route",
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      source: source,
      destination: destination
    })
  }
);

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Route not found");
    }

    setRoute(data);
  } catch (error) {
    alert(error.message);
  } finally {
    setLoading(false);
  }
};
const [familyId, setFamilyId] = useState("F002");
const [memberId, setMemberId] = useState("");
const [memberName, setMemberName] = useState("");
const [members, setMembers] = useState([]);

const addFamilyMember = async () => {
  if (!memberId || !memberName) {
    alert("Please enter Member ID and Name");
    return;
  }

  try {
    const response = await fetch(
      "http://127.0.0.1:5000/api/family/member",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          family_id: familyId,
          member_id: memberId,
          name: memberName
        })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Failed to add member");
    }

    setMembers([...members, data.member]);
    setMemberId("");
    setMemberName("");

  } catch (error) {
    alert(error.message);
  }
};
const [symptoms, setSymptoms] = useState({
  dizziness: false,
  breathing_difficulty: false,
  chest_pain: false,
  unconscious: false
});

const [healthResult, setHealthResult] = useState(null);
const [healthLoading, setHealthLoading] = useState(false);
const checkHealthRisk = async () => {
  setHealthLoading(true);

  try {
    const response = await fetch(
      "http://127.0.0.1:5000/api/health/assess",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(symptoms)
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Unable to check health risk");
    }

    setHealthResult(data);

  } catch (error) {
    alert(error.message);
  } finally {
    setHealthLoading(false);
  }
};
  return (
    <div className="app">

      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">DARSHANSETU</div>

        <div className="nav-links">
          <span>Home</span>
          <span>Safety</span>
          <span>Navigation</span>
          <span>Assistance</span>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div>
          <h1>DarshanSetu</h1>

          <h2>
            Intelligent Pilgrim Safety & Assistance System
          </h2>

          <p>
            A smart system for safety, navigation and assistance
            of pilgrims and visitors.
          </p>

          <button className="start-btn">
            Get Started
          </button>
        </div>
      </section>

      {/* Features */}
      <section className="features">

        <h2>Our Services</h2>

        <div className="card-container">

          <div className="feature-card">
            <div className="icon">🔍</div>
            <h3>Lost Person Finder</h3>
            <p>
              Find possible matches for a missing person using
              face matching technology.
            </p>
            <button>Open</button>
          </div>

          <div className="feature-card navigation-card">
  <div className="icon">🗺️</div>

  <h3>Smart Navigation</h3>

  <p>
    Find the shortest route using Graph and
    Dijkstra's algorithm.
  </p>

  <select
    value={source}
    onChange={(e) => setSource(e.target.value)}
  >
    <option>Main Gate</option>
    <option>Information Center</option>
    <option>Parking</option>
    <option>Prasad Area</option>
    <option>Main Hall</option>
    <option>Temple</option>
    <option>Exit</option>
  </select>

  <select
    value={destination}
    onChange={(e) => setDestination(e.target.value)}
  >
    <option>Temple</option>
    <option>Main Gate</option>
    <option>Information Center</option>
    <option>Parking</option>
    <option>Prasad Area</option>
    <option>Main Hall</option>
    <option>Exit</option>
  </select>

  <button onClick={findRoute}>
    {loading ? "Finding..." : "Find Route"}
  </button>

  {route && (
    <div className="route-result">
      <h4>Route Found</h4>

      <p>
        <strong>Path:</strong>{" "}
        {route.path.join(" → ")}
      </p>

      <p>
        <strong>Distance:</strong>{" "}
        {route.distance_meters} meters
      </p>

      <p>
        <strong>Algorithm:</strong>{" "}
        {route.algorithm}
      </p>
    </div>
  )}
</div>

          <div className="feature-card health-card">

  <div className="icon">❤️</div>

  <h3>Health Risk Advisor</h3>

  <p>
    Get basic safety guidance based on selected symptoms.
  </p>

  <label>
    <input
      type="checkbox"
      checked={symptoms.dizziness}
      onChange={(e) =>
        setSymptoms({
          ...symptoms,
          dizziness: e.target.checked
        })
      }
    />
    Dizziness
  </label>

  <label>
    <input
      type="checkbox"
      checked={symptoms.breathing_difficulty}
      onChange={(e) =>
        setSymptoms({
          ...symptoms,
          breathing_difficulty: e.target.checked
        })
      }
    />
    Breathing Difficulty
  </label>

  <label>
    <input
      type="checkbox"
      checked={symptoms.chest_pain}
      onChange={(e) =>
        setSymptoms({
          ...symptoms,
          chest_pain: e.target.checked
        })
      }
    />
    Chest Pain
  </label>

  <label>
    <input
      type="checkbox"
      checked={symptoms.unconscious}
      onChange={(e) =>
        setSymptoms({
          ...symptoms,
          unconscious: e.target.checked
        })
      }
    />
    Unconscious
  </label>

  <button onClick={checkHealthRisk}>
    {healthLoading ? "Checking..." : "Check Risk"}
  </button>

  {healthResult && (
    <div className="health-result">

      <h4>
        Risk: {healthResult.risk}
      </h4>

      <p>{healthResult.advice}</p>

    </div>
  )}

</div>
<div className="feature-card family-card">

  <div className="icon">👨‍👩‍👧‍👦</div>

  <h3>Family Tracker</h3>

  <p>
    Add family members and keep track of the group.
  </p>

  <input
    type="text"
    placeholder="Member ID"
    value={memberId}
    onChange={(e) => setMemberId(e.target.value)}
  />

  <input
    type="text"
    placeholder="Member Name"
    value={memberName}
    onChange={(e) => setMemberName(e.target.value)}
  />

  <button onClick={addFamilyMember}>
    Add Member
  </button>

  {members.length > 0 && (
    <div className="member-list">

      <h4>Family Members</h4>

      {members.map((member) => (
        <div className="member" key={member.member_id}>
          <strong>{member.name}</strong>
          <span>{member.member_id}</span>
        </div>
      ))}

    </div>
  )}

</div>
          
          <div className="feature-card">
            <div className="icon">🧑‍💼</div>
            <h3>Smart Tourist Guide</h3>
            <p>
              Get guide recommendations based on availability,
              distance and ratings.
            </p>
            <button>Open</button>
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer>
        <p>
          © 2026 DarshanSetu | BCA(AIDS) | Team T109
        </p>
      </footer>

    </div>
  );
  
}

export default App;