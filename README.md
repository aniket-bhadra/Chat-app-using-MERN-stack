# 💬 Talk2Owl

<p align="center">
  <img src="READMEASSETS/logo-modified.png" alt="Talk2Owl Logo" width="250"/>
</p>

**Talk2Owl** is a real-time messaging platform built and maintained as a production-style web application.
It focuses on reliable real-time communication, clear state management, and a responsive, user-friendly interface across devices.

This project is actively maintained and designed to reflect real-world messaging system.

---

## 🚀 Live Deployment

🌐 **Live URL:** [Live Demo Link](https://aniket-bhadra.github.io/)

> The application is currently undergoing infrastructure updates.
> The live deployment will be available soon.

---

## What the Project Does

Talk2Owl enables users to communicate in real time through one-on-one and group conversations.

The system implements:

* Real-time bidirectional messaging using WebSockets
* Message delivery acknowledgment handling
* Typing indicators scoped per user and per conversation
* Group chat creation with role-based permissions
* Notification handling for inactive conversations
* Responsive UI behavior across desktop and mobile

The goal is to simulate real messaging platform behavior with clean separation between real-time events and REST-based data access.

---

## 📸 Preview

### 🏠 Chat Page

<img src="READMEASSETS/chatPage.png" alt="Chat Dashboard" width="800"/>

*A centralized view of conversations with message previews and user avatars.*

---

## 🎞️ Interactive Previews

### 🔑 Getting Started

<img src="READMEASSETS/GIFs/signup.gif" alt="signup GIF" width="300"/>

*User registration, authentication, and initial chat access.*

### 💬 Real-Time Messaging

<img src="READMEASSETS/GIFs/messaging.gif" alt="Messaging GIF" width="300"/>

*Live messaging with delivery status, notifications, and typing indicators.*

---

## 📷 Additional Screenshots

### SignUp Page



<img src="READMEASSETS/login.png" alt="SignUp Page" width="800"/>

*User authentication and account access.*



### Chat Interface



<img src="READMEASSETS/chatting.png" alt="Chat Interface" width="800"/>

*Main messaging interface with conversation history and real-time updates.*



### Group Chat Management



<img src="READMEASSETS/createGroupChat.png" alt="Group Chat Management" width="800"/>

*Group creation and participant management.*



### Update Group Chat



<img src="READMEASSETS/updateGroupChat.png" alt="Update Group Chat" width="800"/>

*Admin-controlled group updates including member management.*



### User Search


<img src="READMEASSETS/search.png" alt="User Search" width="800"/>

*Search and discover users to start conversations.*


### Realtime Messaging

<img src="READMEASSETS/chattingRealtime.png" alt="Realtime Messaging" width="800"/>

*Live typing indicators and delivery acknowledgments.*


### Mobile Responsive Design



<img src="READMEASSETS/mobile.png" alt="Mobile View" width="800"/>

*Fully responsive layout optimized for mobile usage.*


---

## ✨ Core Features

* **Authentication**

  * JWT-based authentication
  * Secure password hashing with bcrypt

* **Real-Time Messaging**

  * Socket.IO-based bi-directional communication
  * Message delivery status tracking
  * Live typing indicators

* **Group Chats**

  * Group creation and updates
  * Admin-only controls
  * Join and leave handling in real time

* **Notifications**

  * Alerts for new messages outside the active chat
  * Unread message indicators

* **User Experience**

  * Minimal, clean UI
  * Responsive layout across devices
  * Scroll-aware message feeds

---

## 🛠 Tech Stack

### Frontend

* React
* Context API
* Axios
* Socket.IO Client
* React Router DOM
* Chakra UI
* react-scrollable-feed

### Backend

* Node.js
* Express.js
* MongoDB (Mongoose)
* JWT authentication
* bcrypt
* Socket.IO

---

## 🧩 Architecture Overview

* WebSockets handle real-time events such as:

  * Message delivery
  * Typing state
  * Group updates
* REST APIs manage:

  * Authentication
  * User data
  * Chat metadata
* MongoDB stores users, chats, and message history
* Frontend maintains optimistic UI updates synchronized with backend state

---

## 🔧 Local Setup

### Prerequisites

* Node.js
* MongoDB

### Installation

```bash
git clone https://github.com/yourusername/talk2owl.git
cd talk2owl
```

Frontend:

```bash
cd client
npm install
```

Backend:

```bash
cd server
npm install
```

### Run Locally

Backend:

```bash
npm run dev
```

Frontend:

```bash
npm start
```

* Frontend: [http://localhost:3000](http://localhost:3000)
* Backend: [http://localhost:5000](http://localhost:5000)

---

## 🗺 Roadmap

* File and media sharing
* Message search within conversations
* Improved notification controls
* Performance optimizations for large group chats

---

## 🤝 Contributing

Contributions are welcome.

1. Fork the repository
2. Create a feature branch
3. Commit clear, focused changes
4. Open a pull request with context

---

## 📬 Contact

**Maintainer:** Aniket
- linkedin - [https://www.linkedin.com/in/aniket-bhadra/](https://www.linkedin.com/in/aniket-bhadra/)
- Email - aniketbhadra2@gmail.com

