export const getContacts = () => _get("/api/contacts");

export const addContact = (contact) => _post("/api/contacts", contact);

export const updateContact = (contact, id) =>
  _put(`/api/contacts/${id}`, contact);

const _get = async (url) => (await fetch(url)).json();

const _post = _base("POST");
const _put = _base("PUT");

function _base(method) {
  return async (url, body) => {
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
}
