document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form');
  const passwordInput = document.querySelector('input[name="password"]');
  const showPasswordToggle = document.querySelector('.fa-eye-slash');
  const loginButton = document.querySelector('.login-button');

  form.addEventListener('submit', handleLogin);
  showPasswordToggle.addEventListener('click', togglePasswordVisibility);

  function handleLogin(event) {
    event.preventDefault();
    loginButton.textContent = 'Logging In...';
    loginButton.disabled = true;

    const email = document.querySelector('input[name="email"]').value;
    const password = passwordInput.value;

    if (isEmpty(email) || isEmpty(password)) {
      console.error('Email and password are required');
      loginButton.textContent = 'Login';
      loginButton.disabled = false;
      return;
    }

    const user = {
      "email": email,
      "password": password,
    };

    fetch('https://lms-boo.onrender.com/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
      .then(response => response.json())
      .then(data => {
        console.log('', data);
        const user = {
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

        sessionStorage.setItem('user', JSON.stringify(user));
        window.location.href = '../pages/dashboard.html'; 
      })
      .catch(error => {
        alert('Error during login. Please try again!.');
        console.error('Error during login:', error);
        loginButton.textContent = 'Login';
        loginButton.disabled = false;
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