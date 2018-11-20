import sqlite3
from sqlite3 import Error
from flask import Flask
import pprint
from json import dumps

server = Flask(__name__)

BASE = '../../'
path = '{}DMD/database/Assignment3.sqlite'.format(BASE)


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


def get_json_data(table):
    rows = table.fetchall()
    desc = table.description

    data = {}
    for i, column in enumerate(desc):
        data[column[0]] = [j[i] for j in rows]

    pprint.pprint(data)

    return dumps(data)


@server.route('/3_2/<date>')
def query3_2(date):
    cursor = get_cursor(path)
    with open('{}DMD/SQL/3_2.sql'.format(BASE), 'r') as query:
        table = cursor.execute(query.read(), [date])

        return get_json_data(table)


@server.route('/3_3/<date>')
def query3_3(date):
    cursor = get_cursor(path)
    with open('{}DMD/SQL/3_3.sql'.format(BASE), 'r') as query:
        table = cursor.execute(query.read(), [date, date])

        return get_json_data(table)


@server.route('/3_5/<date>')
def query3_5(date):
    cursor = get_cursor(path)
    with open('{}DMD/SQL/3_5.sql'.format(BASE), 'r') as query:
        table = cursor.execute(query.read(), [date])

        return get_json_data(table)