import dotenv from "dotenv";
import pgp from "pg-promise";

const db = initDb();

export const getContacts = () => db.any("SELECT * FROM contacts");

export const addContact = ({ name, email, phone, notes, photo }) =>
  db.one(
    "INSERT INTO contacts(name, email, phone, notes, photo) VALUES( $1, $2, $3, $4, $5) RETURNING *",
    [name, email, phone, notes, photo],
  );

function initDb() {
  let connection;

  if (process.env.DATABASE_URL === undefined) {
    dotenv.config({ path: "../.env" });
    connection = {
      user: "postgres",
      database: process.env.POSTGRES_DB,
      password: process.env.POSTGRES_PASSWORD,
      port: 5442,
    };
  } else {
    connection = {
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
    };
  }

  return pgp()(connection);
}
