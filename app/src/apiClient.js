export const getContacts = () => _get("/api/contacts");

export const addContact = (contact) => _post("/api/contacts", contact);

export const updateContact = (contact, id) =>
  _put(`/api/contacts/${id}`, contact);

const _get = async (url) => (await fetch(url)).json();

const _put = async (url, body) => {
  const res = await fetch(url, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  let result;
  try {
    result = await res.json();
  } catch {}

  return result;
};

const _post = async (url, body) => {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  let result;
  try {
    result = await response.json();
  } catch {}

  return result;
};
