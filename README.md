# Howudoin - A Secure Messaging Backend with Spring Boot

**Howudoin** is a backend messaging system built using **Spring Boot**, designed to support real-time messaging, friend management, and group communication—similar to WhatsApp. The backend provides **secure authentication**, **friend request handling**, **group messaging**, and **efficient data storage** using MongoDB.

## 🚀 Features

### 🔹 User Authentication & Registration
- **JWT-based authentication** for secure login and session management.
- Users can register using **email and password**.

### 🔹 Friend Request System
- Users can **send and accept friend requests**.
- Only friends can exchange messages.

### 🔹 Real-Time Messaging
- One-to-one messaging between friends.
- Secure storage of conversation history.

### 🔹 Group Messaging
- Users can **create groups**, add members, and send messages.
- Messages are stored in MongoDB, associated with the **Group ID**.

### 🔹 Database
- Uses **MongoDB** for flexible document-based storage.
- Collections include **Users, Groups, and Messages**.

### 🔹 Security
- Implements **JWT authentication** for authorization.
- Secure REST API endpoints for user interactions.

---

## 📌 API Endpoints

### **Public Endpoints**
| Method | Endpoint | Description |
|--------|---------|-------------|
| `POST` | `/register` | Register a new user (name, last name, email, password). |
| `POST` | `/login` | Authenticate a user with email and password. |

### **Secure Endpoints**
| Method | Endpoint | Description |
|--------|---------|-------------|
| `POST` | `/friends/add` | Send a friend request. |
| `POST` | `/friends/accept` | Accept a friend request. |
| `GET`  | `/friends` | Retrieve the friend list. |
| `POST` | `/messages/send` | Send a message to a friend. |
| `GET`  | `/messages` | Retrieve conversation history. |
| `POST` | `/groups/create` | Create a new group. |
| `POST` | `/groups/{groupId}/add-member` | Add a user to a group. |
| `POST` | `/groups/{groupId}/send` | Send a message in a group. |
| `GET`  | `/groups/{groupId}/messages` | Retrieve group message history. |
| `GET`  | `/groups/{groupId}/members` | Get group member list. |

---

## 🛠️ Tech Stack
✅ **Spring Boot** – Backend framework  
✅ **MongoDB** – NoSQL database for flexible data storage  
✅ **JWT Authentication** – Secure login and session management  
✅ **REST API** – Exposes endpoints for communication  
