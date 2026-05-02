# 💇 Book My Salon - Premium Salon Booking Platform

![Book My Salon Banner](C:\Users\Dell Latitude\.gemini\antigravity\brain\497d578d-6d37-468e-a4fb-afed09892198\book_my_salon_banner_1776940107279.png)

## 📁 Project Folder Structure

```text
Book_My_Salon/
│
├── 📂 client/                   # React + Vite Frontend
│   ├── 📂 src/
│   │   ├── 📂 admin/            # Admin-specific modules
│   │   ├── 📂 components/       # Reusable UI components (Navbar, SearchBar, SalonCard, etc.)
│   │   ├── 📂 pages/            # View components (Home, Booking, Dashboard, SalonDetails)
│   │   ├── 📂 context/          # State management (AuthContext, etc.)
│   │   ├── 📂 services/         # API service layers
│   │   ├── 📄 App.jsx           # Main application router
│   │   └── 📄 main.jsx          # Entry point
│   ├── 📄 tailwind.config.js    # Modern UI constraints
│   └── 📄 vite.config.js        # Build configurations
│
├── 📂 server/                   # Node.js + Express Backend
│   ├── 📂 controllers/          # Business logic handlers
│   ├── 📂 models/               # MongoDB Schemas (User, Salon, Booking)
│   ├── 📂 routes/               # API Endpoint definitions
│   ├── 📂 middleware/           # Auth and error handling filters
│   ├── 📂 config/               # Database and environment configurations
│   ├── 📂 utils/                # Helper functions
│   └── 📄 server.js             # API entry point
│
└── 📄 README.md                 # Core Documentation
```

---

## 🌟 Project Purpose & Problem Statement

### ❌ The Problem
Traditional salon visits often result in frustration due to:
- **Long Waiting Times:** Customers often wait 30 minutes to 2 hours without knowing when they'll be served.
- **Lack of Transparency:** No way to check service prices or stylist availability beforehand.
- **Manual Management:** Salon owners struggle with chaotic paper-based booking systems and phone calls.
- **Zero Online Presence:** Many high-quality local salons remain undiscovered by digital-savvy users.

### ✅ The Solution
**Book My Salon** is a sophisticated digital ecosystem designed to bridge the gap between premium grooming services and busy professionals. It provides a **seamless, queue-free experience** where:
- Customers can discover top-rated salons, view live availability, and book slots instantly.
- Salon owners gain a powerful dashboard to manage their business, staff, and appointments with surgical precision.

---

## 🎨 Figma Design
The entire user experience and visual interface were meticulously crafted on Figma to ensure a premium look and feel.

🔗 **[View Figma Design (Untitled Design)](https://www.figma.com/design/J34yi9O6nIyt4XJKMIRHun/Untitled?node-id=0-1&t=nTFGjQPC7Lg3UVnE-1)**

---

## 🚀 Key Features

### 👤 For Customers
- **Smart Discovery:** Filter salons by city, category, and ratings.
- **Instant Booking:** Interactive time-slot selection to avoid queues.
- **Personalized Profile:** Manage bookings, view history, and save favorite salons.
- **Special Offers:** Access exclusive deals and seasonal packages.

### 🏢 For Salon Owners
- **Owner Dashboard:** Live tracking of today's appointments and revenue.
- **Service Management:** Easily add/edit services, timings, and prices.
- **Onboarding:** Step-by-step process to get your salon online in minutes.
- **Review Management:** Build trust by interacting with customer feedback.

### 🛡️ Core Security
- **JWT Authentication:** Secure user sessions and protected routes.
- **Role-Based Access:** Distinct permissions for Admins, Owners, and Customers.

---

## 🛠️ Technology Stack

| Layer | Technology |
|---|---|
| **Frontend** | React.js (Vite), Tailwind CSS, Lucide Icons, Framer Motion |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB (Mongoose) |
| **Payment** | Razorpay / Stripe (Planned Integration) |
| **Auth** | JSON Web Tokens (JWT) |

---

## ⚙️ Installation & Setup

### Prerequisites
- Node.js (v18.x or higher)
- MongoDB account (Atlas or Local)

### 1. Backend Configuration
```bash
cd server
npm install
```
Create a `.env` file in the `server` directory and add:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_key
```

### 2. Frontend Configuration
```bash
cd client
npm install
```

### 3. Running the Application
**Start Backend:**
```bash
cd server
npm run dev
```

**Start Frontend:**
```bash
cd client
npm run dev
```

---

## 📄 License
This project is licensed under the MIT License.

---
*Created with ❤️ by the Book My Salon Team*
# 💇 Book My Salon - Premium Salon Booking Platform

![Book My Salon Banner](C:\Users\Dell Latitude\.gemini\antigravity\brain\497d578d-6d37-468e-a4fb-afed09892198\book_my_salon_banner_1776940107279.png)

## 📁 Project Folder Structure

```text
Book_My_Salon/
│
├── 📂 client/                   # React + Vite Frontend
│   ├── 📂 src/
│   │   ├── 📂 admin/            # Admin-specific modules
│   │   ├── 📂 components/       # Reusable UI components (Navbar, SearchBar, SalonCard, etc.)
│   │   ├── 📂 pages/            # View components (Home, Booking, Dashboard, SalonDetails)
│   │   ├── 📂 context/          # State management (AuthContext, etc.)
│   │   ├── 📂 services/         # API service layers
│   │   ├── 📄 App.jsx           # Main application router
│   │   └── 📄 main.jsx          # Entry point
│   ├── 📄 tailwind.config.js    # Modern UI constraints
│   └── 📄 vite.config.js        # Build configurations
│
├── 📂 server/                   # Node.js + Express Backend
│   ├── 📂 controllers/          # Business logic handlers
│   ├── 📂 models/               # MongoDB Schemas (User, Salon, Booking)
│   ├── 📂 routes/               # API Endpoint definitions
│   ├── 📂 middleware/           # Auth and error handling filters
│   ├── 📂 config/               # Database and environment configurations
│   ├── 📂 utils/                # Helper functions
│   └── 📄 server.js             # API entry point
│
└── 📄 README.md                 # Core Documentation
```

---

## 🌟 Project Purpose & Problem Statement

### ❌ The Problem
Traditional salon visits often result in frustration due to:
- **Long Waiting Times:** Customers often wait 30 minutes to 2 hours without knowing when they'll be served.
- **Lack of Transparency:** No way to check service prices or stylist availability beforehand.
- **Manual Management:** Salon owners struggle with chaotic paper-based booking systems and phone calls.
- **Zero Online Presence:** Many high-quality local salons remain undiscovered by digital-savvy users.

### ✅ The Solution
**Book My Salon** is a sophisticated digital ecosystem designed to bridge the gap between premium grooming services and busy professionals. It provides a **seamless, queue-free experience** where:
- Customers can discover top-rated salons, view live availability, and book slots instantly.
- Salon owners gain a powerful dashboard to manage their business, staff, and appointments with surgical precision.

---

## 🎨 Figma Design
The entire user experience and visual interface were meticulously crafted on Figma to ensure a premium look and feel.

🔗 **[View Figma Design (Untitled Design)](https://www.figma.com/design/J34yi9O6nIyt4XJKMIRHun/Untitled?node-id=0-1&t=nTFGjQPC7Lg3UVnE-1)**

---

## 🚀 Key Features

### 👤 For Customers
- **Smart Discovery:** Filter salons by city, category, and ratings.
- **Instant Booking:** Interactive time-slot selection to avoid queues.
- **Personalized Profile:** Manage bookings, view history, and save favorite salons.
- **Special Offers:** Access exclusive deals and seasonal packages.

### 🏢 For Salon Owners
- **Owner Dashboard:** Live tracking of today's appointments and revenue.
- **Service Management:** Easily add/edit services, timings, and prices.
- **Onboarding:** Step-by-step process to get your salon online in minutes.
- **Review Management:** Build trust by interacting with customer feedback.

### 🛡️ Core Security
- **JWT Authentication:** Secure user sessions and protected routes.
- **Role-Based Access:** Distinct permissions for Admins, Owners, and Customers.

---

## 🛠️ Technology Stack

| Layer | Technology |
|---|---|
| **Frontend** | React.js (Vite), Tailwind CSS, Lucide Icons, Framer Motion |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB (Mongoose) |
| **Payment** | Razorpay / Stripe (Planned Integration) |
| **Auth** | JSON Web Tokens (JWT) |

---

## ⚙️ Installation & Setup

### Prerequisites
- Node.js (v18.x or higher)
- MongoDB account (Atlas or Local)

### 1. Backend Configuration
```bash
cd server
npm install
```
Create a `.env` file in the `server` directory and add:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_key
```

### 2. Frontend Configuration
```bash
cd client
npm install
```

### 3. Running the Application
**Start Backend:**
```bash
cd server
npm run dev
```

**Start Frontend:**
```bash
cd client
npm run dev
```

---

## 📄 License
This project is licensed under the MIT License.

---
*Created with ❤️ by the Book My Salon Team*
