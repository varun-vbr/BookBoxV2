
# BookBoxV2

A modern web application for managing books — viewing, categorizing, and maintaining a library. BookBoxV2 includes a UI frontend, a backend API, and MySQL scripts to manage the data.

---

## Table of Contents

* [Features](#features)
* [Tech Stack](#tech-stack)
* [Repo Structure](#repo-structure)
* [Getting Started](#getting-started)

  * [Prerequisites](#prerequisites)
  * [Setup](#setup)
* [Usage](#usage)
* [Data Scripts](#data-scripts)
* [Contributing](#contributing)
* [License](#license)
* [Contact](#contact)

---

## Features

* CRUD operations for books, authors, publishers, and categories
* RESTful API backend
* Web UI for interacting with the data
* MySQL database scripts/DDL and seed data for populating authors, publishers, categories
* Separation of concerns: API, UI, and database layers

---

## Tech Stack

| Component         | Technology                                                    |
| ----------------- | ------------------------------------------------------------- |
| Backend / API     |  Java,  Node.js, JavaScript, Spring Boot, Express JS          |
| Frontend / UI     | HTML, CSS, JavaScript, TypeScript, Angular                    |
| Database          | MySQL, MongoDB                                                |
| Data / Seed Files | CSV files (authors.csv, publishers.csv, categories.csv, etc.) |
| Deployment        | Docker and Kubernetes                                         |

---

## Repo Structure

```
BookBoxV2/
├── BookBoxAPI/               ← Backend / API server code  
├── BookBoxUI/                ← Frontend / interface code  
├── MySQL/                    ← Database related scripts, DDL  
├── DDL Scripts/              ← Database Definition Language scripts  
├── authors.csv               ← Seed data for authors  
├── categories.csv            ← Seed data for categories  
├── publishers.csv            ← Seed data for publishers  
├── tbl_books_FINAL_Script     ← Script for books table / data  
└── .vscode/                  ← Editor settings (optional)  
```

---

## Getting Started

### Prerequisites

Make sure you have the following installed:

* Node.js (if the API or UI depend on it)
* npm or yarn
* MySQL server
* (Optional) A tool like Postman / HTTP client for testing API

### Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/varun-vbr/BookBoxV2.git
   cd BookBoxV2
   ```

2. **Setup the database**

   * Create a MySQL database (e.g. `bookboxdb`)
   * Run the DDL scripts in `MySQL/` or `DDL Scripts/` to create necessary tables
   * Import seed CSVs (`authors.csv`, `publishers.csv`, `categories.csv`) into respective tables

3. **Configure backend**

   * In the `BookBoxAPI/` folder, set up your config (database credentials, ports, etc.)

   * Install dependencies:

     ```bash
     cd BookBoxAPI
     npm install
     ```

   * Start the API:

     ```bash
     npm start
     ```

4. **Setup frontend**

   * In the `BookBoxUI/` folder

     ```bash
     cd ../BookBoxUI
     npm install
     npm start
     ```

   * Ensure frontend is pointing to the API endpoint (if needed in some config file)

---

## Usage

* Use the UI to browse books, authors, categories, publishers
* Use the API endpoints for integrations or for developing more features
* Extend data by adding new CSVs or expanding seed data

---

## Data Scripts

* **authors.csv**, **publishers.csv**, **categories.csv**: initial data load
* **tbl\_books\_FINAL\_Script**: Script (SQL) containing data for the `books` table
* **DDL Scripts**: SQL scripts to create tables, set up relationships, indexes, etc.

---

## Contact

* **Author**: Varun VBR
* **Email**: varun.vbr@gmail.com
* **GitHub**: [varun-vbr](https://github.com/varun-vbr)

