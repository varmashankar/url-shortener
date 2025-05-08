# 📎 URL Shortener Microservice

This is a simple URL shortening service built with **Node.js**, **Express**, and **MongoDB**. It shortens long URLs into short ones and redirects requests from the short URL back to the original.

---

## 🚀 Features

- Accepts a valid URL and returns a shortened version.
- Stores original and short URLs in MongoDB.
- Redirects visitors from the short URL to the original.
- Rejects invalid URLs (e.g., missing protocol).
- DNS lookup validation for hostnames.

---

## 📦 Tech Stack

- **Backend**: Node.js + Express
- **Database**: MongoDB (with Mongoose)
- **Validation**: DNS lookup and native URL parsing
- **Frontend**: Basic HTML interface (optional)

---

## 🔧 How to Run Locally

### 1. Clone the repo

```bash
git clone https://github.com/varmashankar/url-shortener.git
cd url-shortener
