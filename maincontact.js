
document.getElementById('contactForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();

  if (!name || !email || !message) {
    alert("Please fill in all fields.");
    return;
  }

  const contactData = {
    name,
    email,
    message
  };

  fetch('http://localhost:3000/contact', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(contactData)
  })
  .then(res => res.json())
  .then(data => {
    alert("✅ Message sent successfully!");
    // Reset form
    document.getElementById('contactForm').reset();
  })
  .catch(err => {
    console.error("Error sending message:", err);
    alert("❌ Failed to send message. Please try again.");
  });
});

