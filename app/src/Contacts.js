import * as React from "react";

import * as apiClient from "./apiClient";
import Card from "./ui/Card";

const Contacts = () => {
  const [contacts, setContacts] = React.useState([]);

  const loadContacts = async () => setContacts(await apiClient.getContacts());
  const addContact = (contact) =>
    apiClient.addContact(contact).then(loadContacts);

  React.useEffect(() => {
    loadContacts();
  }, []);

  return (
    <section>
      <ContactList {...{ contacts }} />
      <AddContactForm {...{ addContact }} />
    </section>
  );
};

const ContactCard = ({ contact, loadContacts }) => {
  const [isEditing, setIsEditing] = React.useState(false);

  const updateContact = (contact) => {
    console.log(contact);
    setIsEditing(!isEditing);
    apiClient.updateContact(contact).then(loadContacts);
  };

  return (
    <li>
      <Card>
        <details>
          <summary>{contact.name}</summary>
          {!isEditing ? (
            <>
              <img src={contact.photo} alt={contact.name} />
              <h3>{contact.name}</h3>
              <p>{contact.phone}</p>
              <p>{contact.email}</p>
              <p>{contact.notes}</p>
            </>
          ) : (
            <Form onSubmit={updateContact} contact={contact} />
          )}
          <button onClick={() => setIsEditing(!isEditing)}>
            {isEditing ? "Update" : "Edit"}
          </button>
        </details>
      </Card>
    </li>
  );
};

const ContactList = ({ contacts }) => (
  <ul>
    {contacts.map((contact) => (
      <ContactCard key={contact.id} contact={contact} />
    ))}
  </ul>
);

const Form = ({ onSubmit, contact }) => {
  return (
    <form {...{ onSubmit }}>
      <label>
        Name
        <input name="name" value={contact.name} required />
      </label>
      <label>
        Email
        <input name="email" value={contact.email} type="email" required />
      </label>
      <label>
        Phone
        <input name="phone" value={contact.phone} required />
      </label>
      <label>
        Notes
        <textarea name="notes" value={contact.notes} required />
      </label>
      <label>
        Link to image
        <input name="photo" value={contact.photo} type="url" required />
      </label>
    </form>
  );
};

const AddContactForm = ({ addContact }) => {
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
    addContact({ name, email, phone, notes, photo });
    form.reset();
  };

  return (
    <form {...{ onSubmit }}>
      <label>
        Name
        <input name="name" required />
      </label>
      <label>
        Email
        <input name="email" type="email" required />
      </label>
      <label>
        Phone
        <input name="phone" required />
      </label>
      <label>
        Notes
        <textarea name="notes" required />
      </label>
      <label>
        Link to image
        <input name="photo" type="url" required />
      </label>
      <button>Add</button>
    </form>
  );
};

export default Contacts;
