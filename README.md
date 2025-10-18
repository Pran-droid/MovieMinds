# 🎬 MovieMinds

**MovieMinds** is a full-stack movie management and discovery web application.  
It combines a **Spring Boot backend** with a **JavaScript/HTML/CSS frontend** to let users browse, search, and explore movies easily.  

---

## 🌟 Features

- Browse a catalog of movies with complete details (title, genre, year, rating, etc.)
- Search and filter movies by multiple criteria
- RESTful backend built with **Spring Boot**
- Responsive frontend interface
- Easy integration with databases (H2/MySQL)
- Extendable for adding reviews, recommendations, and user accounts

---

## 🧱 Project Structure

```
MovieMinds/
├── backend/              # Spring Boot backend (Java)
│   ├── src/
│   ├── pom.xml
│   └── application.properties
├── frontend/             # Frontend (HTML/CSS/JS)
│   ├── index.html
│   ├── js/
│   ├── css/
│   └── assets/
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:
- **Java JDK 8+**
- **Maven** or **Gradle**
- **Node.js & npm** (optional, if frontend uses build tools)
- **MongoDB Database**

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/Pran-droid/MovieMinds.git
   cd MovieMinds
   ```

2. **Backend Setup**
   ```bash
   cd backend
   mvn clean install
   mvn spring-boot:run
   ```
   Configure your database in `src/main/resources/application.properties`.

3. **Frontend Setup**
   ```bash
   cd ../frontend
   npm install    # if package.json exists
   npm start      # or open index.html directly
   ```

4. **Access the app**
   Open your browser and visit:  
   👉 `http://localhost:8080`

---

## ⚙️ Configuration

Update the backend configuration file:

`backend/src/main/resources/application.properties`
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/movieminds
spring.datasource.username=root
spring.datasource.password=yourpassword
spring.jpa.hibernate.ddl-auto=update
server.port=8080
```

If needed, adjust API endpoints in the frontend (e.g., inside `js/config.js`).

---

## 🧭 API Endpoints (Sample)

| Method | Endpoint | Description |
|--------|-----------|-------------|
| GET | `/api/movies` | Fetch all movies |
| GET | `/api/movies/{id}` | Get movie details |
| POST | `/api/movies` | Add a new movie |
| PUT | `/api/movies/{id}` | Update existing movie |
| DELETE | `/api/movies/{id}` | Delete a movie |

---

## 💡 Future Enhancements

- 🎥 User authentication and role-based access  
- ⭐ User reviews and ratings  
- 🧠 Recommendation engine using ML  
- 🌐 Docker + CI/CD deployment  
- 📄 Swagger API documentation  
