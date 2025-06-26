# Conference app

Install dependencies by going to `frontend` then running `npm install`. Run app in dev mode with `npm run dev`.

To deploy on the server, in the root folder of the project (currently /run the following commands:

0. `git pull` to update the project
1. `sudo docker-compose down`, to take down the currently running container
2. `sudo docker-compose build frontend`, to build the frontend image
3. `sudo docker-compose --file compose.yaml up --detach`, to run the containers on the server
