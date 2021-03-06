import time
import os
import urllib
import threading
from flask import make_response
from flask import Flask
from json import dumps
from flask_cors import CORS
import sqlite3
from random import randint as ri

server = Flask(__name__)
CORS(server)

start_time = 0

BASE = '../'
path = '{}database/Assignment3.sqlite'.format(BASE)


def create_connection(db_file):
    """ create a database connection to the SQLite database
        specified by the db_file
    :param db_file: database file
    :return: Connection object or None
    """
    try:
        conn = sqlite3.connect(db_file)
        return conn
    except sqlite3.Error as e:
        print(e)

    return None


def get_cursor(path):
    connection = create_connection(path)
    return connection.cursor()


def table_to_json(table):
    rows = table.fetchall()
    desc = table.description

    data = {}
    for i, column in enumerate(desc):
        data[column[0]] = [j[i] for j in rows]

    return dumps(data)


@server.route('/')
def hello():
    data = '<head>' \
           '<link href="https://fonts.googleapis.com/css?family=Abril+Fatface" rel="stylesheet">' \
           '<link href="https://fonts.googleapis.com/css?family=Faster+One" rel="stylesheet">' \
           '</head>' \
           '<h1 style="color:green;text-align:center;font-family:\'Abril Fatface\',cursive;">Hello</h1>' \
           '<h2 style="color:red;text-align:center;font-family:\'Faster One\', cursive">' \
           'time since start up: {} min</h2>'.format(int((time.time() - start_time)//60))
    resp = make_response(data)
    return resp


@server.route('/ping')
def resp():
    res = make_response('hello')
    return res


@server.route('/3_1/')
def query3_1():
    cursor = get_cursor(path)
    with open('{}SQL/3_1.sql'.format(BASE), 'r') as query:
        table = cursor.execute(query.read())

        resp = make_response(table_to_json(table))
        return resp


@server.route('/3_2/<date>')
def query3_2(date):
    cursor = get_cursor(path)
    with open('{}SQL/3_2.sql'.format(BASE), 'r') as query:
        table = cursor.execute(query.read(), [date])

        resp = make_response(table_to_json(table))
        return resp


@server.route('/3_3/<date>')
def query3_3(date):
    cursor = get_cursor(path)
    with open('{}SQL/3_3.sql'.format(BASE), 'r') as query:
        table = cursor.execute(query.read(), [date, date])

        resp = make_response(table_to_json(table))
        return resp


@server.route('/3_4/')
def query3_4():
    cursor = get_cursor(path)
    with open('{}SQL/3_4.sql'.format(BASE), 'r') as query:
        table = cursor.execute(query.read())

        resp = make_response(table_to_json(table))
        return resp


@server.route('/3_5/<date>')
def query3_5(date):
    cursor = get_cursor(path)
    with open('{}SQL/3_5.sql'.format(BASE), 'r') as query:
        table = cursor.execute(query.read(), [date])

        resp = make_response(table_to_json(table))
        return resp


@server.route('/3_6/')
def query3_6():
    cursor = get_cursor(path)
    with open('{}SQL/3_6.sql'.format(BASE), 'r') as query:
        table = cursor.execute(query.read())

        resp = make_response(table_to_json(table))
        return resp


@server.route('/3_7/')
def query3_7():
    cursor = get_cursor(path)
    with open('{}SQL/3_7.sql'.format(BASE), 'r') as query:
        table = cursor.execute(query.read())

        resp = make_response(table_to_json(table))
        return resp


@server.route('/3_8/<date>')
def query3_8(date):
    cursor = get_cursor(path)
    with open('{}SQL/3_8.sql'.format(BASE), 'r') as query:
        table = cursor.execute(query.read(), [date, date])

        resp = make_response(table_to_json(table))
        return resp


@server.route('/3_9/')
def query3_9():
    cursor = get_cursor(path)
    with open('{}SQL/3_9.sql'.format(BASE), 'r') as query:
        table = cursor.execute(query.read())

        resp = make_response(table_to_json(table))
        return resp


@server.route('/3_10/')
def query3_10():
    cursor = get_cursor(path)
    with open('{}SQL/3_10.sql'.format(BASE), 'r') as query:
        table = cursor.execute(query.read())

        resp = make_response(table_to_json(table))
        return resp


def ping():
    while True:
        try:
            urllib.request.urlopen('https://young-tundra-15922.herokuapp.com/ping')
            time.sleep(ri(200, 500))
        except urllib.error.HTTPError:
            pass


if __name__ == '__main__':
    threading.Thread(target=ping).start()
    start_time = time.time()
    server.run(debug=True, host='0.0.0.0', port=os.environ.get('PORT'))