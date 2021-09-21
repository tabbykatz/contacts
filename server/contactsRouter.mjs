import express from "express";

import * as db from "./db.mjs";

const contactsRouter = express.Router();

contactsRouter.get("/", async (request, response) => {
  const contacts = await db.getContacts();
  response.json(contacts);
});

contactsRouter.use(express.json());
contactsRouter.post("/", async (request, response) => {
  const contact = await db.addContact(request.body);
  response.status(201).json(contact);

  contactsRouter.put("/:id", async (request, response) => {
    console.log(request.body);
    const contact = await db.updateContact(request.body, request.params.id);
    response.status(204).json(contact);
  });
});

export default contactsRouter;
