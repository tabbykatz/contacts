import express from "express";

import * as db from "./db.mjs";

const contactsRouter = express.Router();

contactsRouter.get("/", async (request, response) => {
  const contacts = await db.getContacts();
  response.json(contacts);
});

contactsRouter.use(express.json());
contactsRouter.post("/", async (request, response) => {
  const contact = await db.addContact(request.body.name);
  response.status(201).json(contact);
});

export default contactsRouter;
