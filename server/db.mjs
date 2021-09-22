import dotenv from "dotenv";
import pgp from "pg-promise";

const db = initDb();

export const getContacts = () =>
  db.any("SELECT * FROM contacts ORDER BY id ASC");

export const addContact = (contact) =>
  db.one(
    "INSERT INTO contacts(name, email, phone, notes, photo) VALUES( $<name>, $<email>, $<phone>, $<notes>, $<photo>) RETURNING *",
    contact,
  );

export const updateContact = (contact, id) =>
  db.one(
    "UPDATE contacts set name=$<name>, email=$<email>, phone=$<phone>, notes=$<notes>, photo=$<photo> WHERE id=$<id> RETURNING *",
    { ...contact, id },
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
