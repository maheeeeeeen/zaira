# ZAIRA — Headless E-Commerce Platform

ZAIRA is a high-end, minimalist luxury apparel showcase engineered using a modern decoupled (headless) architecture. The platform separates content management from presentation layer dynamics, using a headless WordPress database instance to serve core item catalogs via high-performance REST APIs to a highly customized, responsive React application.

---

## 🛠️ Tech Stack & Systems Architecture

The platform architecture is built with absolute separation of concerns to maximize core throughput, reduce visual load times, and provide a bespoke luxury user experience.

* **Frontend Showroom:** React (Vite-powered environment) with asynchronous routing modules.
* **Styling Layer:** Tailwind CSS utilizing structural alignment tokens, high-contrast monochrome design variables (`#0B0B0B`, `#C5A880`), and custom media aspect ratio constraints.
* **Content Database Infrastructure:** Decoupled Headless WordPress exposed via the native `/wp-json/wp/v2/` REST API channel.
* **State Sync Engine:** Global React Context API maintaining item memory matrices natively across detached views.
* **Transactional Routing Gate:** Client-side dispatch pipeline using EmailJS protocols for serverless asynchronous transactional fulfillment notifications.

---

## ⚙️ Core Architectural Enhancements

### 1. Decoupled Environment Variable Layer (`.env`)
To ensure enterprise-grade structural portability and repository safety, all logical API endpoints, cryptographic handshakes, and mail execution credentials are decoupled from core component codes. The application maps environment runtimes dynamically through an automated client configuration pipeline:
* `VITE_WP_API_URL` — Dynamic network context pointer mapping post structures natively.
* `VITE_EMAILJS_PUBLIC_KEY` / `VITE_EMAILJS_SERVICE_ID` — Isolated mail access routing nodes.

### 2. State Retention Persistence Engine
The global basket management layer (`CartContext.jsx`) implements a serialized persistent local storage pipeline. Using lifecycle evaluation synchronization, user selections withstand page reload disruptions by serializing in-flight cart data directly into the browser's persistent layer memory array, solving the standard volatile state wipeout vulnerability common in single-page applications.

### 3. Serverless Order Manifest Routing
The checkout layer bypasses standard monolithic storage pipelines, bundling client configurations alongside stringified allocation manifests to broadcast live secure emails natively. This simultaneously targets bcc channels to supply instant administrative alerts alongside real-time receipts.

---

## 🚀 Directory Topology Overview

```text
zaira-frontend/
├── .env                  # Portability Environment Variable Layer (Git Ignored)
├── .gitignore            # Security Firewalls mapping out credentials & node_modules
├── index.html            # Core Base Document Entry Point
├── package.json          # Node Module Configuration & Scripts Manager
├── vite.config.js        # Vite Build Pipeline Configuration
└── src/
    ├── App.jsx           # Logical Master Router & Structural Control Hub
    ├── main.jsx          # React Component Mount Core Execution Node
    ├── assets/           # Editorial static styling media layers
    ├── components/
    │   ├── CartContext.jsx  # Global Storage State Retention Brain
    │   ├── Navbar.jsx    # Global Fixed Interactive Header Matrix
    │   └── Footer.jsx    # Standard Base Layout Module
    └── pages/
        ├── Home.jsx      # Fluid Landing Architecture & Newsletter Gateway
        ├── Shop.jsx      # Product Presentation Index Component
        ├── ProductDetail.jsx# Decoupled Individual Query Component Fetching via .env
        └── Checkout.jsx  # Fulfillment Form & Dynamic Mail Processing Gateway