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
      <ContactList contacts={contacts} addContact={addContact} />
      <Form action={addContact} contact={{}} />
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
            <Form action={updateContact} contact={contact} />
          )}
          {isEditing ? null : (
            <button onClick={() => setIsEditing(!isEditing)}>Edit</button>
          )}
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

const Form = ({ action, contact }) => {
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

    action({ name, email, phone, notes, photo }, contact.id);
    // can't i send more args than needed?
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
      <button>Update</button>
    </form>
  );
};

export default Contacts;
