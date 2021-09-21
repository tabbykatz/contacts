import * as React from "react";

import * as apiClient from "./apiClient";
import "./global.module.scss";
import Card from "./ui/Card";

const Contacts = () => {
  const [contacts, setContacts] = React.useState([]);
  const [isAdding, setIsAdding] = React.useState(false);

  const loadContacts = async () => setContacts(await apiClient.getContacts());
  const addContact = (contact) =>
    apiClient.addContact(contact).then(loadContacts).then(setIsAdding(false));

  React.useEffect(() => {
    loadContacts();
  }, []);

  return (
    <section>
      <ContactList contacts={contacts} loadContacts={loadContacts} />
      {!isAdding ? (
        <button onClick={() => setIsAdding(!isAdding)}>Add a contact</button>
      ) : (
        <>
          <Form action={addContact} contact={{}} button={"Add"} />
          <button onClick={() => setIsAdding(!isAdding)}>Cancel</button>
        </>
      )}
    </section>
  );
};

const ContactCard = ({ contact, loadContacts }) => {
  const [isEditing, setIsEditing] = React.useState(false);

  const updateContact = (contact, id) => {
    console.log(contact);
    setIsEditing(!isEditing);
    apiClient.updateContact(contact, id).then(loadContacts);
  };

  return (
    <li>
      <Card>
        <details>
          <summary>
            <img src={contact.photo} alt={contact.name} />
          </summary>
          {!isEditing ? (
            <>
              <h3>{contact.name}</h3>
              <p>{contact.phone}</p>
              <p>{contact.email}</p>
              <p>{contact.notes}</p>
            </>
          ) : (
            <>
              <Form
                action={updateContact}
                contact={contact}
                button={"Update"}
              />
              <button onClick={() => setIsEditing(!isEditing)}>Cancel</button>
            </>
          )}
          {isEditing ? null : (
            <button onClick={() => setIsEditing(!isEditing)}>Edit</button>
          )}
        </details>
      </Card>
    </li>
  );
};

const ContactList = ({ contacts, loadContacts }) => (
  <ul>
    {contacts.map((contact) => (
      <ContactCard
        key={contact.id}
        contact={contact}
        loadContacts={loadContacts}
      />
    ))}
  </ul>
);

const Form = ({ action, contact, button }) => {
  const onSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const {
      name: { value: name },
      email: { value: email },
      phone: { value: phone },
      notes: { value: notes },
      photo: { value: photo },
    } = form.elements;
    console.log(name, email, phone, notes, photo);
    action({ name, email, phone, notes, photo }, contact.id);
    form.reset();
  };

  return (
    <form {...{ onSubmit }}>
      <label>
        Name
        <input name="name" defaultValue={contact.name} required />
      </label>
      <label>
        Email
        <input
          name="email"
          defaultValue={contact.email}
          type="email"
          required
        />
      </label>
      <label>
        Phone
        <input name="phone" defaultValue={contact.phone} required />
      </label>
      <label>
        Notes
        <textarea name="notes" defaultValue={contact.notes ?? ""} />
      </label>
      <label>
        Link to image
        <input name="photo" defaultValue={contact.photo ?? ""} type="url" />
      </label>
      <button>{button}</button>
    </form>
  );
};

export default Contacts;
