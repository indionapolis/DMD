import sqlite3
from sqlite3 import Error
from flask import Flask

server = Flask(__name__)

BASE = '/Users/Pavel/programs/'

path = '{}DMD/database/Assignment3.sqlite'.format(BASE)

style = '<style>body {' \
        'font-family: sans-serif; ' \
        'font-size: 20px; ' \
        'text-align: center; ' \
        'background-color: GAINSBORO' \
        '}</style>'


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


@server.route('/3_2/<date>')
def query3_2(date):
    cursor = get_cursor(path)
    with open('{}DMD/SQL/3_2.sql'.format(BASE), 'r') as query:
        result = style
        for row in cursor.execute(query.read(), [date]).fetchall():
            for value in row:
                result += str(value)
            result += '<br>'

        cursor.close()
        return result


@server.route('/3_5/<date>')
def query3_5(date):
    cursor = get_cursor(path)
    with open('{}DMD/SQL/3_5.sql'.format(BASE), 'r') as query:
        result = style
        re = cursor.execute(query.read(), [date]).fetchall()

        for row in re:
            for value in row:
                result += str(value) + ' '
            result += '<br>'

        cursor.close()
        return result