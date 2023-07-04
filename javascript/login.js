document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form');
  const passwordInput = document.querySelector('input[name="password"]');
  const showPasswordToggle = document.querySelector('.fa-eye-slash');

  form.addEventListener('submit', handleLogin);
  showPasswordToggle.addEventListener('click', togglePasswordVisibility);

  function handleLogin(event) {
    event.preventDefault();

    const email = document.querySelector('input[name="email"]').value;
    const password = passwordInput.value;

    if (isEmpty(email) || isEmpty(password)) {
      console.error('Email and password are required');
      return;
    }

    const user = {
            "email": email,
            "password": password,
          };
          console.log({user})

    fetch('https://lms-boo.onrender.com/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
      .then(response => response.json())
      .then(data => {
        console.log('Login successful:', data);
        const payload = {
          "access_token": data.access_token,
          "token_type": data.token_type,
          "user": {
            "firstname": data.user.firstname,
            "lastname": data.user.lastname,
            "phone": data.user.phone,
            "id": data.user.id,
            "email": data.user.email
          }
        }

        sessionStorage.setItem('payload', JSON.stringify(payload));
        window.location.href = '../pages/dashboard.html'; 
      })
      .catch(error => {
        console.error('Error during login:', error);
      });
  }

  function isEmpty(value) {
    return value.trim() === '';
  }

  function togglePasswordVisibility() {
    const type = passwordInput.getAttribute('type');
    passwordInput.setAttribute('type', type === 'password' ? 'text' : 'password');
  }
});