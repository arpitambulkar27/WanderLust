# 🏕️ WanderLust — Property Listing Platform

> A full-stack Airbnb-inspired web application for exploring, creating, and managing property listings — built with secure authentication, role-based authorization, and cloud-based image storage.

<img width="1919" height="962" alt="image" src="https://github.com/user-attachments/assets/0d2317df-3d3b-411f-8452-092dd58bb90c" />
<img width="1919" height="907" alt="image" src="https://github.com/user-attachments/assets/41df0056-f078-4eea-982a-8447e282e3e3" />

---

[![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express.js-000000?style=flat&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Cloudinary](https://img.shields.io/badge/Cloudinary-3448C5?style=flat&logo=cloudinary&logoColor=white)](https://cloudinary.com/)
[![Render](https://img.shields.io/badge/Deployed%20on-Render-46E3B7?style=flat&logo=render&logoColor=white)](https://wanderlust-zh1o.onrender.com)

---

## 🚀 Live Demo

👉 **[https://wanderlust-zh1o.onrender.com](https://wanderlust-zh1o.onrender.com)**

---

## 📌 Features

- 🔐 **User Authentication** — Session-based login & signup using Passport.js
- 🛡️ **Role-Based Authorization** — Only listing owners can edit or delete their properties
- 📋 **Full CRUD** — Create, read, update, and delete listings and reviews
- 💬 **Review System** — Reviews are user-linked with restricted deletion to prevent misuse
- ☁️ **Cloud Image Uploads** — Images stored and served via Cloudinary using Multer
- ✅ **Server-Side Validation** — Input sanitized and validated before every DB operation
- ⚠️ **Centralized Error Handling** — Custom error middleware for clean and consistent responses
- 🧱 **MVC Architecture** — Scalable folder structure separating concerns across Models, Views, and Controllers
- 📱 **Responsive UI** — Templated with EJS and reusable layouts for consistent design

---

## 🛠️ Tech Stack

| Layer          | Technology                        |
|----------------|-----------------------------------|
| Frontend       | HTML, CSS, EJS                    |
| Backend        | Node.js, Express.js               |
| Database       | MongoDB, Mongoose                 |
| Authentication | Passport.js (Local Strategy)      |
| File Uploads   | Multer + Cloudinary               |
| Deployment     | Render (App) + MongoDB Atlas (DB) |

---

## 📂 Project Structure

```
wanderlust/
├── controllers/     → Business logic for listings, reviews, users
├── models/          → Mongoose schemas (Listing, Review, User)
├── routes/          → Express route definitions
├── views/           → EJS templates and layouts
├── middleware/      → Auth guards, validation, error handling
├── public/          → Static assets (CSS, JS, images)
├── utils/           → Helper functions and custom error class
├── app.js           → App entry point
└── .env             → Environment variables (not committed)
```

---

## ⚙️ Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/arpitambulkar27/wanderlust.git
cd wanderlust
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the root directory and add the following:

```env
ATLASDB_URL=your_mongodb_atlas_connection_string
CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret
SESSION_SECRET=your_session_secret_key
```

### 4. Run the application

```bash
node app.js
```

App will run at `http://localhost:8080`

---

## 📸 Screenshots

| Homepage | Listing Page | Create Listing |
|----------|--------------|----------------|
| ![Homepage](https://github.com/user-attachments/assets/75e0e152-4379-421d-a78d-4a32547eb317) | ![Listing Page](https://github.com/user-attachments/assets/6ec7da1b-5f1d-42d5-bf6d-2ff1aae51653) | ![Create Listing](https://github.com/user-attachments/assets/44f45acf-2788-4df2-aa81-f7f60623f9c9) |

---

## 💡 Future Improvements

- [ ] Map integration using Mapbox for location-based browsing
- [ ] Search and filter listings by location, price, or category
- [ ] Pagination for large listing sets
- [ ] Frontend migration to React for a more dynamic UI
- [ ] Booking and availability management system

---

## 👨‍💻 Author

**Arpit Ambulkar**

[![GitHub](https://img.shields.io/badge/GitHub-arpitambulkar27-181717?style=flat&logo=github)](https://github.com/arpitambulkar27)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0A66C2?style=flat&logo=linkedin)](https://www.linkedin.com/in/arpit-ambulkar-955842345/)
