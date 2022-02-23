# Drop Bear Table

## Overview
Drop Bear Table is a web application designed to make table reservations at restaurants online. This project was created as a part of my software development portfolio to demonstrate my ability to work across the full web tech stack and learn both new technologies and concepts as I go.

In terms of a general overview, the project was made using MongoDB, Express.js, Vue 3, and Node.js. There is full CRUD functionality implemented in terms of both restaurants and reservations, with authorisation and authentication handled through the use of JWT’s and three distinct user groups.

If you have any questions about the project, or simply would like to know more about it, please feel free to get in contact with me.  

---
## Table of Contents
- [Overview](#overview)
- [Starting & Stopping the Project](#starting--stopping-the-project)

## Starting & Stopping the Project
### Running the Project
- Creating a clone of the project in a directory of your choice.
- Ensure that both [Docker](https://www.docker.com/products/docker-desktop) and [Docker Compose](https://docs.docker.com/compose/install/) are installed.
- In the terminal, run the command `docker-compose up -d` or `docker compose up -d` in the project directory.
- Server-side: visit [http://localhost:3000](http://localhost:3000).
- MongoDB: visit [http://localhost:8081](http://localhost:8081).
- Client-side: visit [http://localhost:8080](http://localhost:8080).

### Shutting Down the Project
- Run the command `docker-compose down -v` in a terminal in the project directory to stop the running containers and remove the volumes.


