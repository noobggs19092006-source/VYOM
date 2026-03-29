# Vyom Club 🌌

Vyom Club is a full-stack MERN (MongoDB, Express, React, Node.js) web application built for astronomy and astrophotography enthusiasts. It features a stunning immersive, interactive UI powered by WebGL (`ogl`), Three.js, and custom React-Bits physics engines.

## 🚀 Features
- **Dynamic Deep Space Background**: Real-time Interactive Galaxy (`Galaxy.jsx`) reacting to the user pointer.
- **Glassmorphic UI**: Smooth translucent frosted-glass modal cards matching a futuristic `#020617` dark slate theme.
- **Interactive Particle Effects**: `ClickSpark` visual explosions, custom animated Orbitron `ShinyText` headers.
- **Live Fully-Functional Admin Dashboard**: Complete CRUD (Create, Read, Update, Delete) capability specifically tailored for Gallery Images, Organization Events, and Published Blogs.
- **Automated Media Integration**: Silent background syncs to `ImgBB` for high-resolution gallery hosting without stressing your local database!

## ⚙️ Tech Stack
- **Frontend**: React.js, Vite, Tailwind CSS v4, Lucide Icons
- **Backend**: Node.js, Express.js, Mongoose, Multer
- **Database**: MongoDB Atlas 
- **Media Hosting**: ImgBB API

## 🛠️ Local Development

1. **Clone the repository:**
```bash
git clone https://github.com/noobggs19092006-source/VYOM.git
cd VYOM
```

2. **Backend Setup:**
```bash
cd server
npm install
```
- Create a `.env` file in the `server` directory and add:
  ```env
  PORT=5000
  MONGO_URI=your_mongodb_cluster_uri
  IMGBB_API_KEY=your_imgbb_key
  JWT_SECRET=super_secret_jwt_string
  ```
- Start the Express Node Server:
```bash
npm start
# OR npm run dev for nodemon
```

3. **Frontend Setup:**
```bash
cd vyom-club
npm install
npm run dev
```

4. **Access the application:**
- Navigate to `http://localhost:5173` in your browser.
- Head to `/admin` to access the Control Dashboard!
  - **Username**: `vyom`
  - **Password**: `vyom@123`

---

## ☁️ Production Deployment (Render)

Follow these exact steps to host this platform completely free using **Render**:

### Step 1: Deploying the Backend (Web Service)
1. Go to your Render Dashboard and create a new **Web Service**.
2. Connect your GitHub account and select your `VYOM` repository.
3. Configure the service:
   - **Name**: `vyom-club-backend`
   - **Root Directory**: `server`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
4. Add the following **Environment Variables**:
   ```env
   PORT = 5000
   MONGO_URI = [Your MongoDB URL]
   IMGBB_API_KEY = [Your ImgBB API Key]
   JWT_SECRET = [A random strong password string]
   ```
5. Click **Deploy Web Service** and copy the live `onrender.com` URL once it's up.

### Step 2: Deploying the Frontend (Static Site)
1. Go to your Render Dashboard and create a new **Static Site**.
2. Connect to the exact same `VYOM` repository.
3. Configure the service:
   - **Name**: `vyom-club`
   - **Root Directory**: `vyom-club`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`
4. Add the following **Environment Variable**:
   ```env
   VITE_API_BASE_URL = [Paste the backend URL you generated in Step 1, e.g., https://vyom-club-backend.onrender.com]
   ```
5. In Render's **Redirects/Rewrites** settings for the frontend, set up a rewrite rule to fix React Router pages acting as 404s:
   - **Source**: `/*`
   - **Destination**: `/index.html`
   - **Action**: `Rewrite`
6. Click **Deploy Static Site**.

Once both instances spin up, your app is fully live to the world!
