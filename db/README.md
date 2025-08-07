The database for this project is controlled by a Postgre V 17 container, the instructions for running that container are included in this readme:

1. Install docker desktop
2. pull the postgres 17.5 docker image
    -- docker pull postgres:17.5
3. run a container from the docker compose file (make sure you are in the db directory or the path to the db.yml file will be different)
    -- docker compose -f db.yml up
4. OPTIONAL: start an interactive terminal session in your container
    -- docker exec -it <container-name> psql -U <user> -W <db-name>


TODO create a yml file for docker compose that spins up the psql instance and the django instance

Links used for init creation:
https://www.docker.com/blog/how-to-use-the-postgres-docker-official-image/
https://github.com/docker-library/docs/blob/master/postgres/README.md#database-configuration
https://docs.docker.com/engine/containers/run/

NOTE: this is all subject to change as the project is developed but is serving as a template for how the readme for the db should look


When migrating models:

1. Delete existing migrations in migrations folder except for _init_.py

2. In pgAdmin4 the existing tables need to be dropped first using:
-- DROP TABLE "LiftTracker_liftname","LiftTracker_lifttemplate"; 
(drops liftname and lifttemplate tables from LiftTracker app)

3. May need to also reset migration history (check if dropping the pre-existing tables does the job though first)
Run the query in pgAdmin4:
-- DELETE FROM django_migrations WHERE app = 'LiftTracker';
(for the LiftTracker app)

4. Then run in the terminal (after navigating to \django\DjangoApi):
-- py manage.py makemigrations
-- py manage.py migrate

5. Then refresh the Tables in pgAdmin4 and they should appear