#!/bin/sh

echo "Waiting for database to be ready..."
until nc -z -v -w30 $DB_HOST $DB_PORT
do
  echo "Waiting for database to be ready..."
  sleep 1
done
echo "Database is up and running"

echo "Installing dependencies"
pip install -U pip
pip install -r requirements.txt | grep -v 'already satisfied'

echo "Collecting Static Files"
python manage.py collectstatic --no-input

echo "Run Migrations"
python manage.py migrate --no-input

echo "Invalidating Cache"
python manage.py invalidate_cachalot

echo "DEBUG=$DEBUG"

echo "Starting Server"
gunicorn core.wsgi:application --bind 0.0.0.0:8000 --log-file - --access-logfile - --workers 3
