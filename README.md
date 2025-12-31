# NGO Backend API

This is the backend for an NGO management system built with **Node.js**, **Express**, **MongoDB**, and **Mongoose**. It includes modules for banners, about us, chat, donation management, footer, QR-based payments, and authentication. Admins receive **WhatsApp notifications** for new donations and messages.

---

## Table of Contents

- [Technologies](#technologies)
- [Project Setup](#project-setup)
- [Environment Variables](#environment-variables)
- [Modules](#modules)
  - [Authentication](#authentication)
  - [Banner](#banner)
  - [About Us](#about-us)
  - [Chat](#chat)
  - [Donation](#donation)
  - [QR Payment](#qr-payment)
  - [Footer](#footer)
- [Notifications](#notifications)
- [API Documentation](#api-documentation)
- [File Upload](#file-upload)
- [Error Handling](#error-handling)
- [License](#license)

---

## Technologies

- Node.js
- Express.js
- MongoDB & Mongoose
- Multer for file uploads
- Cloudinary for image storage
- Twilio for WhatsApp notifications
- Joi for request validation
- Cors for cross-origin requests

---

## Project Setup

1. Clone the repository:

git clone https://github.com/yourusername/NGO.git
cd NGO
Install dependencies:

2.
Copy code
npm install
Start the server:

3.
Copy code
npm run dev
The server will run on the port defined in .env (default 9005).
4.
Environment Variables
Create a .env file with the following variables:
5.
env
Copy code
PORT=9005
MONGODB_URI=your_mongo_uri
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
TWILIO_ACCOUNT_SID=your_twilio_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_WHATSAPP_NUMBER=whatsapp:+14155238886
ADMIN_WHATSAPP_NUMBER=whatsapp:+977XXXXXXXXX
JWT_SECRET=your_jwt_secret
Modules
Authentication
Admin and User authentication.

JWT-based login and authorization.

Protects sensitive routes (create/update/delete).

Banner
Manage website banners.

Fields: title, image, link, status.

Admin can create, update, delete, and list banners.

About Us
Manage About Us section.

Fields: title, shortDescription, mission, vision, history, chairmanMessage, images.

Admin can create, update, delete, and fetch About Us info.

Chat
Users can submit messages via contact form.

Fields: name, email, phone, message, isRead (optional).

Admin receives WhatsApp notifications for new messages.

Donation
Users submit donations with a screenshot of the transaction.

Fields: name, phone, email, image, amount, status, verifiedBy.

Admin verifies donations manually.

WhatsApp notifications sent to admin for new donations.

QR Payment
Admin sets a single QR code with:

phone, bankAccount, bankName, image

Only one record allowed at a time.

Users can scan QR to make payments.

Footer
Manage footer content.

Fields: title, link, status, image.

Admin can create, update, delete footer items.

Notifications
Twilio WhatsApp integration.

Admin receives notifications for:

New messages in chat.

New donations submitted.

API Documentation
All endpoints are RESTful:

Banners: /api/banner

About Us: /api/about

Chat Messages: /api/chat

Donations: /api/donation

Footer: /api/footer

QR Payment: /api/qr

Auth: /api/auth

Each module supports:

POST - Create

PUT - Update

DELETE - Delete

GET - List/Show

For file uploads (images/screenshots), use multipart/form-data with the respective field names.

File Upload
Images and files are uploaded via Multer.

Stored locally in /public/uploads and then uploaded to Cloudinary.

Supported file types:

Images: jpg, png, jpeg, svg, bmp, webp, gif

Documents: pdf, doc, docx, csv, xlsx, txt

Videos: mp4, mov, wav, mkv

Error Handling
Centralized error handler in app.js.

Handles:

Validation errors

MongoDB unique constraints

Multer upload errors

Generic server errors

License
This project is licensed under MIT License.

pgsql
Copy code

This is a **full `.md` file** that covers your backend project entirely, including **banner, about, chat, donation, QR, footer, and auth modules**, as well as **WhatsApp notifications**.  

If you want, I can **also create a diagram of all modules and their relationships** and embed it in the README. Do you want me to do that?






You said:
also include the content form install dependency inside .md file 


ChatGPT said:
Sure! I can update the README to include all installation steps, dependency commands, and setup instructions so that it’s fully ready to use. Here’s the revised complete README.md file:

markdown
Copy code
# NGO Backend API

This is the backend for an NGO management system built with **Node.js**, **Express**, **MongoDB**, and **Mongoose**. It includes modules for banners, about us, chat, donation management, footer, QR-based payments, and authentication. Admins receive **WhatsApp notifications** for new donations and messages.

---

## Table of Contents

- [Technologies](#technologies)
- [Project Setup](#project-setup)
- [Install Dependencies](#install-dependencies)
- [Environment Variables](#environment-variables)
- [Modules](#modules)
  - [Authentication](#authentication)
  - [Banner](#banner)
  - [About Us](#about-us)
  - [Chat](#chat)
  - [Donation](#donation)
  - [QR Payment](#qr-payment)
  - [Footer](#footer)
- [Notifications](#notifications)
- [API Documentation](#api-documentation)
- [File Upload](#file-upload)
- [Error Handling](#error-handling)
- [License](#license)

---

## Technologies

- Node.js
- Express.js
- MongoDB & Mongoose
- Multer for file uploads
- Cloudinary for image storage
- Twilio for WhatsApp notifications
- Joi for request validation
- Cors for cross-origin requests
- dotenv for environment variables
- JWT for authentication

---

## Project Setup

1. Clone the repository:

```bash
git clone https://github.com/yourusername/NGO.git
cd NGO
Install dependencies:

bash
Copy code
npm install
Run the development server:

bash
Copy code
npm run dev
The server will run on the port defined in .env (default 9005).

Install Dependencies
Install required packages for the backend:

bash
Copy code
npm install express mongoose cors dotenv joi multer cloudinary twilio bcryptjs jsonwebtoken
npm install --save-dev nodemon
express: Web framework for Node.js

mongoose: MongoDB ODM

cors: Cross-Origin Resource Sharing

dotenv: Environment variables

joi: Request validation

multer: File uploads

cloudinary: Cloud image storage

twilio: WhatsApp notifications

bcryptjs: Password hashing

jsonwebtoken: JWT-based authentication

nodemon: Development auto-reloading

Update package.json scripts:

json
Copy code
"scripts": {
  "start": "node server.js",
  "dev": "nodemon server.js"
}
Environment Variables
Create a .env file with the following variables:

env
Copy code
PORT=9005
MONGODB_URI=your_mongo_uri
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
TWILIO_ACCOUNT_SID=your_twilio_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_WHATSAPP_NUMBER=whatsapp:+14155238886
ADMIN_WHATSAPP_NUMBER=whatsapp:+977XXXXXXXXX
JWT_SECRET=your_jwt_secret
Modules
Authentication
Admin and User authentication.

JWT-based login and authorization.

Protects sensitive routes (create/update/delete).

Banner
Manage website banners.

Fields: title, image, link, status.

Admin can create, update, delete, and list banners.

About Us
Manage About Us section.

Fields: title, shortDescription, mission, vision, history, chairmanMessage, images.

Admin can create, update, delete, and fetch About Us info.

Chat
Users can submit messages via contact form.

Fields: name, email, phone, message, isRead (optional).

Admin receives WhatsApp notifications for new messages.

Donation
Users submit donations with a screenshot of the transaction.

Fields: name, phone, email, image, amount, status, verifiedBy.

Admin verifies donations manually.

WhatsApp notifications sent to admin for new donations.

QR Payment
Admin sets a single QR code with:

phone, bankAccount, bankName, image

Only one record allowed at a time.

Users can scan QR to make payments.

Footer
Manage footer content.

Fields: title, link, status, image.

Admin can create, update, delete footer items.

Notifications
Twilio WhatsApp integration.

Admin receives notifications for:

New messages in chat.

New donations submitted.

API Documentation
All endpoints are RESTful:

Banners: /api/banner

About Us: /api/about

Chat Messages: /api/chat

Donations: /api/donation

Footer: /api/footer

QR Payment: /api/qr

Auth: /api/auth

Each module supports:

POST - Create

PUT - Update

DELETE - Delete

GET - List/Show

For file uploads (images/screenshots), use multipart/form-data with the respective field names.

File Upload
Images and files are uploaded via Multer.

Stored locally in /public/uploads and then uploaded to Cloudinary.

Supported file types:

Images: jpg, png, jpeg, svg, bmp, webp, gif

Documents: pdf, doc, docx, csv, xlsx, txt

Videos: mp4, mov, wav, mkv

Error Handling
Centralized error handler in app.js.

Handles:

Validation errors

MongoDB unique constraints

Multer upload errors

Generic server errors

