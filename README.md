# Welcome to CS3219 Group 51's Peer Prep app!

<p align="center">
<img src="./images/Peer Prep Logo.png" align="center" height=auto width="300">
</p>

Welcome to Peer Prep, your ultimate destination for collaborative learning and problem-solving! At Peer Prep, we've created a dynamic web application designed to empower users to come together, discuss curated questions, and enhance their problem-solving skills. With our innovative features, you can seamlessly collaborate with peers, engage in real-time discussions through our integrated chat feature, and even visualize code as you tackle challenges together. We take the guesswork out of finding the right study partner by matching you with individuals who share your interest and are at a similar difficulty level. Our interactive platform ensures that learning is not only effective but also enjoyable. Join us on this exciting journey to elevate your skills, anytime and anywhere at Peer Prep!

## Features

🔒 Authenticate with email/password, Google, Twitter, Facebook & Github

👀 View questions curated by our team

💬 Chat with other users \*

💻 Collaborate with other users with a live code-editor \*

🔗 Match with other users based on question difficulty and chosen language \*

✍️ Customize personal profile\*

👁️ View main dashboard \*

`*` refers to ongoing development!

## Tech Stack

**Client:** React, Redux Toolkit, React Router v6, Axios, MaterialUI

**Animations:** Lottiefiles

**Server:** Node, Express

**Containerization:** Docker, Docker Compose

**Cloud:** Google Cloud

**Authentication:** Google Firebase SSO

**Databases:** MongoDB, PostgreSQL

**Message Broker:**: RabbitMQ

**API Gateway:** NGINX Proxy Manager

**DNS Server:** GoDaddy

**CI/CD Tools:** Watchtower, Github Actions

## Notable Links

[1. Peer Prep Web App](https://app.peerprepgroup51sem1y2023.xyz)

[2. Trello Kanban Board](https://trello.com/b/Cln8WZMI/cs3219-group-51-kanban)

[3. Figma Wireframes](https://www.figma.com/file/KH7a2ZONAF1fZEdaRzTcm1/PeerPrep-Full-Wireframe?type=design&node-id=0%3A1&mode=design&t=siju64nLq9VpRDgM-1)

## Run Locally (for the tech inclined)

### Prerequisites:

1. Git
2. Docker or Docker Desktop
3. Web browser of your choice (best supported on Chromium)

### Steps:

Clone the project

```bash
  git clone https://github.com/CS3219-AY2324S1/ay2324s1-course-assessment-g51.git
```

Go to the project directory & run Docker / Docker Desktop

```bash
  cd ~/ay2324s1-course-assessment-g51
```

Deploy all containers

```bash
  docker compose up -d
```

Access Peer Prep

```bash
  http://localhost:3000
```
