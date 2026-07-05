# TalentBridge AI - Career & Placement Prep Engine

TalentBridge AI is a comprehensive career preparation platform leveraging Google Gemini AI. The platform provides automated resume parsing and ATS scoring, interactive study schedules, progress analytics, visual roadmap generation, and mock interview simulations.

---

## Getting Started

Follow these instructions to run the project locally on your system.

### Prerequisites
- **Java**: JDK 21 (or newer) installed on your system.
- **Node.js**: Node 18+ and npm installed.
- **MySQL**: MySQL database service running (port 3306 or configured via environment variables).

---

## Running the Backend

You do **not** need Maven installed globally on your machine. The project is equipped with the Maven Wrapper (`mvnw`).

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Run the Spring Boot application using the wrapper:
   - **Windows (CMD/PowerShell)**:
     ```powershell
     .\mvnw.cmd spring-boot:run
     ```
   - **Linux / macOS**:
     ```bash
     chmod +x mvnw
     ./mvnw spring-boot:run
     ```

The backend server starts on **[http://localhost:8080](http://localhost:8080)**.

### Configuration (`application.properties`)
The app automatically detects configurations or falls back to standard developer defaults:
*   **MySQL Database Host**: Configurable via `DATABASE_HOST` environment variable (defaults to `localhost`).
*   **MySQL Database Port**: Configurable via `DATABASE_PORT` environment variable (defaults to `3306`).
*   **Gemini API Key**: Configurable via `GEMINI_API_KEY` environment variable. If not configured, the app runs in **Offline Mock Mode** using pre-configured mock data blocks instead of crashing.

---

## Running the Frontend

The React frontend utilizes Vite for quick builds.

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the local Vite development server:
   ```bash
   npm run dev
   ```

The frontend panel is accessible on **[http://localhost:3000](http://localhost:3000)** (or the port specified in the Vite console).

---

## Running with Docker (Optional)

If Docker is installed on your system, you can boot up the database, backend API, and frontend client concurrently:

```bash
docker compose up -d --build
```
- Host MySQL binds to port `3307` to prevent port conflicts with any pre-installed host MySQL services.
- Web Client binds to port `3000` (accessible at `http://localhost:3000`).
