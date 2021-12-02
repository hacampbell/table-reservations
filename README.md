# Table Reservations
A web applicaiton for making table reservations.

# Running the Project

- Install [Docker](https://www.docker.com/products/docker-desktop) and [Docker Compose](https://docs.docker.com/compose/install/) on your machine.
- In the terminal, run the command `docker-compose up -d` or `docker compose up -d` in the project directory.
- Server-side: visit [http://localhost:3000](http://localhost:3000).
- MongoDB: visit [http://localhost:8081](http://localhost:8081), you should see the mongo-express admin panel.
- Client-side: visit [http://localhost:8080](http://localhost:8080).

# Shutting Down the Project

- To back up the data:
	- Visit [http://localhost:8081](http://localhost:8081).
	- Select database and export the data.
- Run the command `docker-compose down -v` to stop the running containers and remove the volumes.


