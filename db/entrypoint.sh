#!/bin/bash
if [ "$MODE" = "dev" ]; then
  python manage.py migrate
  python manage.py runserver 0.0.0.0:8000
elif [ "$MODE" = "prod" ]; then
  gunicorn --bind 0.0.0.0:8000 --workers 3 my_docker_django_app.wsgi:application
else
  echo "Invalid MODE specified. Use 'dev' or 'prod'."
  exit 1
fi