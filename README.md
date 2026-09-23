# Project Showcase Tool

A full-stack web application that allows users to create, manage, and
showcase their projects online.

The application provides user authentication, project creation, image
upload, project editing, and project deletion. It is built with Node.js,
Express.js, EJS, MongoDB, and Cloudinary.

## 🌐 Live Application

**Live App:** https://projectshowcasetool.duckdns.org

## 💻 Source Code

**GitHub:** https://github.com/AdityaKadage96/Project-Showcase-Tool

------------------------------------------------------------------------

## 📌 Features

-   User registration and login
-   Secure authentication using Passport.js
-   Create new projects
-   Add project title, description, and image
-   Upload project images using Cloudinary
-   View projects
-   Edit existing projects
-   Delete projects
-   Session-based authentication
-   Flash messages for user feedback
-   Responsive web interface
-   Deployed on Amazon EC2
-   HTTPS enabled using Let's Encrypt and Certbot

------------------------------------------------------------------------

## 🛠️ Tech Stack

### Frontend

-   HTML
-   CSS
-   EJS (Embedded JavaScript Templates)
-   JavaScript

### Backend

-   Node.js
-   Express.js

### Database

-   MongoDB
-   Mongoose

### Authentication & Sessions

-   Passport.js
-   passport-local
-   passport-local-mongoose
-   express-session
-   connect-mongo
-   bcrypt

### Image Upload & Storage

-   Multer
-   Cloudinary
-   multer-storage-cloudinary

### Other Tools

-   Git
-   GitHub
-   VS Code
-   dotenv
-   connect-flash
-   method-override

### Deployment

-   Amazon EC2
-   Ubuntu
-   Nginx
-   PM2
-   DuckDNS
-   Let's Encrypt
-   Certbot

------------------------------------------------------------------------

## 🏗️ Application Architecture

``` text
User
  │
  ▼
HTTPS
  │
  ▼
DuckDNS Domain
  │
  ▼
Nginx
  │
  ▼
PM2
  │
  ▼
Node.js + Express.js
  │
  ├──────────────► MongoDB Atlas
  │
  └──────────────► Cloudinary
```

### Deployment Flow

``` text
User Browser
     │
     │ HTTPS
     ▼
projectshowcasetool.duckdns.org
     │
     ▼
Amazon EC2
     │
     ├── Nginx
     │
     ├── PM2
     │
     └── Node.js + Express
             │
             ├── MongoDB Atlas
             └── Cloudinary
```

------------------------------------------------------------------------

## 📂 Project Structure

``` text
Project-Showcase-Tool/
│
├── app.js
├── package.json
├── package-lock.json
├── .gitignore
│
├── models/
│   ├── project.js
│   └── user.js
│
├── routes/
│   ├── projects.js
│   └── users.js
│
├── views/
│   ├── layouts/
│   ├── includes/
│   ├── projects/
│   └── users/
│
├── public/
│   ├── css/
│   └── js/
│
└── utils/
```

> The exact folders/files may change as the project evolves. Check the
> repository for the current structure.

------------------------------------------------------------------------

## ⚙️ Installation and Setup

### 1. Clone the repository

``` bash
git clone https://github.com/AdityaKadage96/Project-Showcase-Tool.git
```

### 2. Move into the project directory

``` bash
cd Project-Showcase-Tool
```

### 3. Install dependencies

``` bash
npm install
```

### 4. Create a `.env` file

Create a `.env` file in the project root.

Example:

``` env
MONGO_URI=your_mongodb_connection_string
SESSION_SECRET=your_session_secret
CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret
```

**Never commit your `.env` file or real credentials to GitHub.**

### 5. Start the application

``` bash
node app.js
```

The application normally runs on:

``` text
http://localhost:3000
```

------------------------------------------------------------------------

## 🔐 Environment Variables

The application requires the following environment variables:

  Variable             Purpose
  -------------------- -----------------------------
  `MONGO_URI`          MongoDB database connection
  `SESSION_SECRET`     Session security
  `CLOUD_NAME`         Cloudinary cloud name
  `CLOUD_API_KEY`      Cloudinary API key
  `CLOUD_API_SECRET`   Cloudinary API secret

Keep all credentials private.

------------------------------------------------------------------------

## ☁️ Deployment on AWS

The application is deployed on **Amazon EC2**.

### Deployment architecture

``` text
Internet
   │
   ▼
DuckDNS
   │
   ▼
HTTPS / Port 443
   │
   ▼
AWS Security Group
   │
   ▼
Nginx
   │
   ▼
PM2
   │
   ▼
Node.js + Express
   │
   ├── MongoDB Atlas
   └── Cloudinary
```

### AWS and deployment technologies used

-   Amazon EC2 --- cloud server
-   Ubuntu --- operating system
-   Security Group --- network access control
-   Nginx --- reverse proxy
-   PM2 --- Node.js process manager
-   DuckDNS --- domain/DNS
-   Let's Encrypt --- SSL/TLS certificate
-   Certbot --- HTTPS certificate management

------------------------------------------------------------------------

## 🧪 Testing

The deployed application was tested for the following core workflows:

-   User login
-   Project creation
-   Project image upload
-   Project editing
-   Project deletion
-   User logout
-   User login again
-   HTTPS access
-   MongoDB connectivity
-   Cloudinary image handling

------------------------------------------------------------------------

## 🚀 Future Improvements

Possible future improvements include:

-   User profile pages
-   Project search and filtering
-   Project categories and tags
-   Project likes and comments
-   Pagination
-   Improved project analytics
-   Role-based authorization
-   API endpoints
-   Automated testing
-   CI/CD pipeline
-   Docker containerization

------------------------------------------------------------------------

## 📚 What I Learned

Deploying this project helped me gain practical experience with:

-   Amazon EC2
-   Linux server administration
-   Node.js deployment
-   Nginx reverse proxy configuration
-   PM2 process management
-   DNS configuration
-   HTTPS and SSL certificates
-   AWS Security Groups
-   Environment variables
-   Cloud deployment troubleshooting

The project was originally developed locally and was later deployed as a
publicly accessible application on Amazon EC2.

------------------------------------------------------------------------

## 👨‍💻 Author

**Aditya Kadage**

GitHub: https://github.com/AdityaKadage96

------------------------------------------------------------------------

## 📄 License

This project is intended for educational and portfolio purposes.
