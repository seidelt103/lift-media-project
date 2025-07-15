import sqlite3

database_path = "C:\\Users\\Micha\\lift-media-project\\db"
try:
    # Connect to SQLite Database and create a cursor
    connection = sqlite3.connect(database_path)
    cursor = connection.cursor()
    print('DB Init')

    # Execute a query to get the SQLite version
    query = 'INSERT INTO test (name, id) VALUES (michael, 2000)'
    cursor.execute(query)

    # Fetch and print the result
    result = cursor.fetchall()
    print('SQLite Version is {}'.format(result[0][0]))

    # Close the cursor after use
    cursor.close()

except sqlite3.Error as error:
    print('Error occurred -', error)

finally:
    # Ensure the database connection is closed
    if 'connection' in locals() and connection:
        connection.close()
        print("Database connection closed.")