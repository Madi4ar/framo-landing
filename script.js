const questions = document.querySelectorAll('.question');

questions.forEach((question) => {
  question.addEventListener('click', function () {
    document.querySelectorAll('.answer').forEach((answer) => {
      if (answer !== this.nextElementSibling) {
        answer.style.display = 'none';
      }
    });
    document.querySelectorAll('.arrow-question').forEach((arrow) => {
      if (arrow !== this.querySelector('.arrow-question')) {
        arrow.classList.remove('rotate-180');
      }
    });

    const answer = this.nextElementSibling;
    const arrow = this.querySelector('.arrow-question');

    if (answer.style.display === 'block') {
      answer.style.display = 'none';
      arrow.classList.remove('rotate-180');
    } else {
      answer.style.display = 'block';
      arrow.classList.add('rotate-180');
    }
  });
});

document.querySelector('.open-play').onclick = function () {
  document.querySelector('.popup').classList.remove('hidden');
};

document.querySelector('.close-btn').onclick = function () {
  const iframe = document.querySelector('iframe');
  iframe.src = iframe.src;
  document.querySelector('.popup').classList.add('hidden');
};

document.querySelector('.join-waitlist').onclick = function () {
  document.querySelector('.waitlist').classList.remove('hidden');
};

document.querySelector('.close-waitlist').onclick = function () {
  document.querySelector('.waitlist').classList.add('hidden');
};

document
  .getElementById('waitlistForm')
  .addEventListener('submit', async function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const field = document.getElementById('field').value.trim();

    const message = document.getElementById('message');
    const error = document.getElementById('error');

    message.classList.add('hidden');
    error.classList.add('hidden');

    if (!name || !email.includes('@') || !field) {
      alert('Please fill out all fields correctly.');
      return;
    }

    try {
      const response = await fetch('https://backend.framo.ai/api/waitlist/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, field }),
      });

      if (response.ok) {
        message.classList.remove('hidden');
        this.reset();
      } else {
        throw new Error('Server error');
      }
    } catch (err) {
      error.classList.remove('hidden');
    }
  });
