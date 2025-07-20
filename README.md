# 🛍️ MERN Stack Multi-Vendor Marketplace

## 🧠 Project Overview

This project is a **multi-vendor e-commerce marketplace** built with the **MERN Stack** (MongoDB, Express.js, React, Node.js). It allows:

- 🛒 Customers to browse and purchase products
- 🧑‍💼 Vendors to manage their own listings and track sales
- 🧑‍💻 Admins to control platform-wide operations, including **approving vendors**

It features a modern UI, JWT authentication, real-time **Tawk.to chatbot**, and **Stripe** payment integration.

---

## 🛠️ Tech Stack

- **Frontend**: React, Tailwind CSS, Axios, React Router
- **Backend**: Node.js, Express.js
- **Database**: MongoDB + Mongoose
- **Authentication**: JWT + Role-based access (admin, vendor, customer)
- **Payments**: Stripe
- **Live Chat**: Tawk.to Chat Widget

---

## 🔐 Role-Based System

| Role     | Capabilities |
|----------|--------------|
| **Customer** | Browse, cart, checkout, chat support |
| **Vendor**   | Register, manage products, view orders |
| **Admin**    | Approve/reject vendors, manage all products, orders, and users |

---

## 🔧 Features

### 🧑‍💼 Vendor Portal
- Vendor signup and approval flow
- Vendor dashboard with:
  - Add/Edit/Delete products
  - Track orders placed on their products

### 🧑‍💻 Admin Panel
- Admin login
- Approve or reject vendor registrations
- Manage all vendors, products, and orders

### 🛍️ Customer Features
- Product browsing with search and filter
- Add to cart, remove, and update quantity
- Secure Stripe checkout
- Chat with support using **Tawk.to**

---

## 💬 Chatbot Support - Tawk.to

- Integrated Tawk.to widget in the frontend
- Real-time support for customers and vendors
- Admins can chat via the [Tawk.to dashboard](https://dashboard.tawk.to)


