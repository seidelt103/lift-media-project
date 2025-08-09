import os
import sys
import psycopg2
import dotenv

###
# This schema drop script allows you to drop either the entire schema or just the lift tables.
# Usage:
#   python dropSchema.py [schema|lifts]
# If no argument is given, defaults to 'lifts'.
###

dotenv.load_dotenv(dotenv_path="../.env")

# Get command line argument to determine which SQL to run
action = sys.argv[1] if len(sys.argv) > 1 else "lifts"

if action == "schema":
    sql = """
    DROP SCHEMA public CASCADE;
    CREATE SCHEMA public;
    """
elif action == "lifts":
    sql = """
    DROP TABLE IF EXISTS "LiftTracker_liftname", "LiftTracker_lifttemplate", "LiftTracker_workouts";
    """
else:
    print("Unknown action. Use 'schema' or 'lifts'.")
    sys.exit(1)

try:
    conn = psycopg2.connect(
        host="127.0.0.1",
        database=os.getenv('DATABASE_NAME', 'polls'),
        user=os.getenv('DATABASE_USERNAME', 'myprojectuser'),
        password=os.getenv('DATABASE_PASSWORD', 'password'),
        port=os.getenv('DATABASE_PORT', 5432)
    )
    print("Successfully connected to the database.")
    
    cur = conn.cursor()

    try:
        cur.execute(sql)
        conn.commit()
        print(f"Action '{action}' executed successfully.")
    except psycopg2.Error as e:
        print(f"Error executing SQL commands: {e}")

    finally:
        if cur:
            cur.close()
        if conn:
            conn.close()
        print("Database connection closed.")

except psycopg2.Error as e:
    print(f"Error connecting to the database: {e}")