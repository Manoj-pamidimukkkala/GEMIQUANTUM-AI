# GEMIQUANTUM-AI

# GEMIQUANTUM-AI

An advanced hybrid artificial intelligence platform integrating high-performance quantum computing algorithms, Java backend orchestration, and Python microservices with an intuitive web dashboard interface.

The application combines multi-tier backend services to execute asynchronous AI tasks, quantum circuit operations, and system telemetry across a clean microservice architecture.

---

## Tech Stack & Architecture

* **Frontend:** HTML5, CSS3, JavaScript (`index.html`, `styles.css`, `app.js`, `frontend/`)
* **Java Backend:** Java Spring Boot (`java-backend/`, `pom.xml`, `java-service/` with REST controllers)
* **Python Microservice:** Python FastAPI (`frontend/main.py` / `backend/` engine logic)
* **Database Layer:** Relational SQL (`backend/schema.sql` for state persistence and table schema)

---

## Project Structure

```text
GEMIQUANTUM-AI/
├── backend/               # Python AI/Quantum core services & schema.sql setup
│   └── schema.sql         # Relational database table structure
├── frontend/              # Web application assets & Python API handlers (main.py)
├── java-backend/          # Java Spring Boot backend configuration (pom.xml)
├── java-service/          # System routing and REST controllers (SystemController.java)
├── app.js                 # Client-side interactive script logic
├── index.html             # User interface markup
├── styles.css             # Frontend UI styling
└── README.md              # Project documentation
