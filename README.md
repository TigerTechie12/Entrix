# Entrix 🛡️

**Entrix** is a basic, functional authentication app built with **Next.js**. It features user signup, login, email verification, and protected routes. The project integrates several libraries to enhance security and user experience.

## 🔧 Tech Stack

- **Next.js 14 (App Router)**
- **TypeScript**
- **MongoDB** – for persistent data storage
- **Mongoose** – for MongoDB modeling
- **NodeMailer** – to send verification emails
- **React Hot Toast** – for user-friendly toast notifications
- **bcrypt** – for secure password hashing
- **JSON Web Tokens (JWT)** – for authentication

## 📁 Project Structure

```
/my-app
  ├── .next/
  ├── node_modules/
  ├── public/
  ├── src/
  │   ├── app/
  │   │   ├── api/            # API route handlers
  │   │   ├── login/          # Login page
  │   │   ├── profile/        # Protected user profile
  │   │   ├── signup/         # Signup form with email verification
  │   │   └── verifyemail/    # Email verification handling
  │   ├── dbConfig/           # MongoDB connection config
  │   ├── helpers/            # Utility functions (mailer, JWT, token handlers)
  │   └── models/             # Mongoose user model
  ├── .env                    # Environment variables
  ├── next.config.js
  ├── tsconfig.json
  └── README.md
```

## 🔑 Features

- ✅ **User Signup** with email verification
- 🔐 **Secure Login** using bcrypt for password hashing
- 📧 **Email Verification** using NodeMailer
- 🔒 **Protected Routes** with JWT-based authentication
- ⚡ **Toast Notifications** using `react-hot-toast`

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/entrix.git
cd entrix
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory and add the following:

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password_or_app_password
```

> 🔐 Keep your `.env` file private and never commit it to version control.

### 4. Run the Development Server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app in action.
