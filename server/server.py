import sqlite3
from sqlite3 import Error
from server import server

path = '/Users/Pavel/programs/DMD/Assignment3.sqlite'


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
def hello(date):
    cursor = get_cursor(path)
    with open('/Users/Pavel/programs/DMD/SQL/3_2.sql', 'r') as query:
        result = '<style>body {font-family: sans-serif; font-size: 20px;}</style>'
        for row in cursor.execute(query.read(), [date]).fetchall():
            for value in row:
                result += str(value)
            result += '<br>'

        cursor.close()
        return result