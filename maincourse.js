document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('studentCourseForm');
  const confirmation = document.getElementById('joinConfirmation');

  form?.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('studentName').value.trim();
    const email = document.getElementById('studentEmail').value.trim();
    const course = document.getElementById('selectedCourse').value;

    const studentData = {
      name,
      email,
      course,
      date: new Date().toISOString()
    };

    try {
      const res = await fetch('http://localhost:3000/courseSignups', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(studentData)
      });

      if (res.ok) {
        form.reset();
        confirmation.classList.remove('hidden');
        setTimeout(() => confirmation.classList.add('hidden'), 4000);
      }
    } catch (err) {
      alert("Error submitting form.");
      console.error(err);
    }
  });
});
