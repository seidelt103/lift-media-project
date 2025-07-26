This project spins up a Exercise Tracker web application

The steps for running the project are as follows:

1. Setup Database
    a) open a terminal instance and navigate to the "db" project directory
    b) run "docker compose -f db.yml up

2. Setup backend
    a) open a terminal instance and navgiate to the "DjangoApi" directory
    b) run "py manage.py runserver"

3. Setup frontend
    a) open a terminal instance and navigate to the "frontend" directory
    b) run npm install 
    c) run npm run dev

** After this you should have an instance of the project running on your local host and you should be able to navigate around the webpage