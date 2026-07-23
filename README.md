# Localite

**Live Website:** [https://localiteapp.netlify.app](https://localiteapp.netlify.app)

## 💻 How to Run the Project Locally
### Option 1: Manual Start
1. **Start Backend (Maven)**
   Open a terminal, navigate to the backend folder, and run:
   ```bash
   cd localite-backend
   mvn spring-boot:run
   ```
   *The backend API will be available at `http://localhost:8080`.*

2. **Start Frontend Web App**
   Open a new terminal, navigate to the web folder, and start the Vite server:
   ```bash
   cd localite-web
   npm install
   npm run dev
   ```
   *The web app will be available at `http://localhost:5173`.*
