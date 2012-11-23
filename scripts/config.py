import MySQLdb as MDB
from _ctypes import call_function

host = "localhost"
database = "jMarket"
user = "dominik"
password = "password123"

try:
    mysql_db_conn = MDB.connect(host, user, password, database)
except MDB.Error, e:
    print e





