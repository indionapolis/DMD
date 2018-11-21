FROM python:3.6

WORKDIR /usr/src/app

COPY . .

RUN pip install flask

WORKDIR /usr/src/app/server

RUN adduser myuser

USER myuser

CMD ["python", "app.py"]