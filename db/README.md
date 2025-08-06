The database for this project is controlled by a Postgre V 17 container, the instructions for running that container are included in this readme:

1. Install docker desktop
2. pull the postgres 17.5 docker image
    -- docker pull postgres:17.5
3. run a container from the docker compose file (if you just want to run the existing images you've built you can omit the --build tag)
    -- docker compose up --build
4. OPTIONAL: start an interactive terminal session in your container
    -- docker exec -it <container-name> psql -U <user> -W <db-name>

Links used for init creation:
https://www.docker.com/blog/how-to-use-the-postgres-docker-official-image/
https://github.com/docker-library/docs/blob/master/postgres/README.md#database-configuration
https://docs.docker.com/engine/containers/run/
https://www.docker.com/blog/how-to-dockerize-django-app/