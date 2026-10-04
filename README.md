# Practical 8: Deploy the Full-Stack App to a Cloud Platform

## Aim
To deploy a full-stack MERN application consisting of a React frontend, Express/Node.js backend, and MongoDB database to a cloud platform and make the application accessible through a public URL.

## Objectives
- Prepare a full-stack MERN application for cloud deployment
- Configure the backend server for production deployment
- Deploy the backend application on a cloud platform
- Deploy the React frontend on a cloud platform
- Connect the frontend with the deployed backend using an environment variable
- Connect the backend with MongoDB Atlas
- Test the complete application using the public URL

## Software Requirements
- Windows 10/11
- Visual Studio Code
- Node.js and npm
- Git
- GitHub account
- MongoDB Atlas account
- Cloud platform account (Render, Railway, Heroku, etc.)
- Web browser

## Project Structure
```
practical-8-cloud-deployment/
├── backend/
│   ├── server.js
│   ├── package.json
│   ├── .env
│   └── .gitignore
│
└── frontend/
    ├── src/
    │   └── App.jsx
    ├── index.html
    ├── package.json
    ├── vite.config.js
    └── .env
```

## How to Run Locally

### Backend Setup
```bash
cd backend
npm install
npm start
```
Backend runs on: `http://localhost:5000`

Test API: `http://localhost:5000/api/students`

### Frontend Setup (new terminal)
```bash
cd frontend
npm install
npm run dev
```
Frontend runs on: `http://localhost:5173`

## Deployment Steps

### Step 1: Prepare MongoDB Atlas
1. Create account at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a new cluster (free tier M0)
3. Create database user with username/password
4. Configure Network Access (Allow access from anywhere: 0.0.0.0/0)
5. Get connection string:
   ```
   mongodb+srv://username:password@cluster.mongodb.net/studentdb
   ```

### Step 2: Push to GitHub
```bash
git init
git add .
git commit -m "Initial MERN application for deployment"
git remote add origin YOUR_GITHUB_REPOSITORY_URL
git branch -M main
git push -u origin main
```

### Step 3: Deploy Backend on Render

1. Login to [Render](https://render.com)
2. Connect GitHub account
3. Click "New Web Service"
4. Select your repository
5. Configure:
   - **Name:** `mern-backend` (or your choice)
   - **Root Directory:** `backend` (if mono-repo)
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
6. Add Environment Variables:
   - `MONGO_URI` = Your MongoDB Atlas connection string
   - `PORT` = `5000` (Render will override with its own port)
7. Click "Create Web Service"
8. Wait for deployment to complete
9. Copy the backend URL: `https://your-backend-name.onrender.com`

### Step 4: Configure Frontend for Production
Update frontend `.env` (or set in Render dashboard):
```
VITE_API_URL=https://your-backend-name.onrender.com
```

### Step 5: Deploy Frontend on Render
1. Click "New Static Site"
2. Connect same GitHub repository
3. Configure:
   - **Name:** `mern-frontend`
   - **Root Directory:** `frontend`
   - **Build Command:** `npm run build`
   - **Publish Directory:** `dist`
4. Add Environment Variable:
   - `VITE_API_URL` = `https://your-backend-name.onrender.com`
5. Click "Create Static Site"
6. Wait for deployment
7. Copy frontend URL: `https://your-frontend-name.onrender.com`

### Step 6: Test Deployed Application
1. Open frontend URL in browser
2. Verify:
   - React frontend loads
   - Student data displays
   - No CORS/console errors
   - Backend API accessible

## Architecture After Deployment
```
                    Internet
                       |
                       v
            +----------------------+
            |   React Frontend     |
            |    (Render Static)   |
            +----------------------+
                       |
                       | REST API (HTTPS)
                       v
            +----------------------+
            | Express + Node.js    |
            |    (Render Web Svc)  |
            +----------------------+
                       |
                       | Mongoose
                       v
            +----------------------+
            |    MongoDB Atlas     |
            |    (Cloud Database)  |
            +----------------------+
```

## Important Notes

### Environment Variables
- **Never commit `.env` files** to GitHub
- Use platform's environment variable settings
- Frontend uses `VITE_API_URL` (Vite requires `VITE_` prefix)

### CORS Configuration
For production, you may want to restrict CORS:
```javascript
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:5173"
}));
```

### MongoDB Atlas Connection String Format
```
mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>?retryWrites=true&w=majority
```
Replace `<password>` with actual password (not literal `<password>`)

## Troubleshooting

| Issue | Solution |
|-------|----------|
| CORS Error | Ensure backend CORS allows frontend domain |
| MongoDB Connection Failed | Check Atlas IP whitelist (0.0.0.0/0 for all) |
| Frontend can't reach backend | Verify `VITE_API_URL` is set correctly |
| Build fails | Check Node version compatibility |
| 502 Bad Gateway | Backend not starting; check logs on Render |

## Expected Output

### Local Output
```
Backend:
Server running on port 5000
MongoDB Connected Successfully

API: http://localhost:5000/api/students
[
  { "id": 1, "name": "Amit", "course: "BCA" },
  { "id": 2, "name": "Sneha", "course": "BCA" }
]
```

### Deployed Output
- Frontend URL: `https://your-frontend.onrender.com`
- Displays student list from deployed backend
- Backend URL: `https://your-backend.onrender.com/api/students`

## Screenshots to Capture
1. GitHub repository with code
2. MongoDB Atlas cluster overview
3. Render backend deployment dashboard
4. Render backend live URL working
5. Render frontend deployment dashboard
6. Render frontend live URL working
7. Browser showing complete working app

## Conclusion
The full-stack MERN application was successfully prepared and deployed to a cloud platform. The React frontend was connected to the deployed Express/Node.js backend, and the backend was connected to MongoDB Atlas. The application was tested using its public URL and made accessible over the Internet.