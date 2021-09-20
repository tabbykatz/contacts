import * as React from "react";

import * as apiClient from "./apiClient";

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

const ContactCard = ({ contact }) => {
  return <li key={contact.id}>{contact.name}</li>;
};

const ContactList = ({ contacts }) => (
  <ul>
    {contacts.map((contact) => (
      <ContactCard key={contact.id} contact={contact} />
    ))}
  </ul>
);

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
