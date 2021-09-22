export const getContacts = () => _get("/api/contacts");

export const addContact = (contact) => _add("/api/contacts", contact, "POST");

export const updateContact = (contact, id) =>
  _add(`/api/contacts/${id}`, contact, "PUT");

const _get = async (url) => (await fetch(url)).json();

const _add = async (url, body, method) => {
  const response = await fetch(url, {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  let result;
  try {
    result = await response.json();
  } catch {}

  return result;
};
