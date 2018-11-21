import os
import sqlite3
from sqlite3 import Error
from flask import Flask
import pprint
from json import dumps

server = Flask(__name__)

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
    except Error as e:
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

    pprint.pprint(data)

    return dumps(data)


@server.route('/')
def hello():
    return '<h1 style="color:green;text-align:center;">Hello</h1>'


@server.route('/3_2/<date>')
def query3_2(date):
    cursor = get_cursor(path)
    with open('{}SQL/3_2.sql'.format(BASE), 'r') as query:
        table = cursor.execute(query.read(), [date])

        return table_to_json(table)


@server.route('/3_3/<date>')
def query3_3(date):
    cursor = get_cursor(path)
    with open('{}SQL/3_3.sql'.format(BASE), 'r') as query:
        table = cursor.execute(query.read(), [date, date])

        return table_to_json(table)


@server.route('/3_5/<date>')
def query3_5(date):
    cursor = get_cursor(path)
    with open('{}SQL/3_5.sql'.format(BASE), 'r') as query:
        table = cursor.execute(query.read(), [date])

        return table_to_json(table)


@server.route('/3_6/')
def query3_6():
    cursor = get_cursor(path)
    with open('{}SQL/3_6.sql'.format(BASE), 'r') as query:
        table = cursor.execute(query.read())

        return table_to_json(table)


@server.route('/3_8/<date>')
def query3_8(date):
    cursor = get_cursor(path)
    with open('{}SQL/3_8.sql'.format(BASE), 'r') as query:
        table = cursor.execute(query.read(), [date])

        return table_to_json(table)


@server.route('/3_9/')
def query3_9():
    cursor = get_cursor(path)
    with open('{}SQL/3_9.sql'.format(BASE), 'r') as query:
        table = cursor.execute(query.read())

        return table_to_json(table)


@server.route('/3_10/')
def query3_10():
    cursor = get_cursor(path)
    with open('{}SQL/3_10.sql'.format(BASE), 'r') as query:
        table = cursor.execute(query.read())

        return table_to_json(table)


if __name__ == '__main__':
    server.run(debug=True, host='0.0.0.0', port=os.environ.get('PORT'))