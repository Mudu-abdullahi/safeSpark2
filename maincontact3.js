const contactForm = document.getElementById('contactForm');
const contactList = document.getElementById('contactList');
const contactId = document.getElementById('contactId');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');
const apiUrl = 'http://localhost:3000/contact';

// Load data
function loadContacts() {
  fetch(apiUrl)
    .then(res => res.json())
    .then(data => {
      contactList.innerHTML = '';
      data.forEach(contact => {
        contactList.innerHTML += `
          <tr>
            <td class="border px-4 py-2">${contact.name}</td>
            <td class="border px-4 py-2">${contact.email}</td>
            <td class="border px-4 py-2">${contact.message}</td>
            <td class="border px-4 py-2 space-x-2">
              <button onclick="editContact('${contact.id}')" class="bg-yellow-500 text-white px-3 py-1 rounded">Edit</button>
              <button onclick="deleteContact('${contact.id}')" class="bg-red-600 text-white px-3 py-1 rounded">Delete</button>
            </td>
          </tr>
        `;
      });
    });
}
loadContacts();

// Add or update contact
contactForm.addEventListener('submit', function (e) {
  e.preventDefault();
  const id = contactId.value;
  const contactData = {
    name: nameInput.value,
    email: emailInput.value,
    message: messageInput.value
  };

  if (id) {
    // Update
    fetch(`${apiUrl}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(contactData)
    })
    .then(() => {
      contactForm.reset();
      contactId.value = '';
      loadContacts();
    });
  } else {
    // Create
    fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(contactData)
    })
    .then(() => {
      contactForm.reset();
      loadContacts();
    });
  }
});

// Delete contact
function deleteContact(id) {
  if (confirm('Are you sure you want to delete this message?')) {
    fetch(`${apiUrl}/${id}`, { method: 'DELETE' })
      .then(() => loadContacts());
  }
}

// Edit contact
function editContact(id) {
  fetch(`${apiUrl}/${id}`)
    .then(res => res.json())
    .then(contact => {
      contactId.value = contact.id;
      nameInput.value = contact.name;
      emailInput.value = contact.email;
      messageInput.value = contact.message;
    });
}
