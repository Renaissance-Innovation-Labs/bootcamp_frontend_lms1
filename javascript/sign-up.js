document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form');
  const signUpButton = document.querySelector('.signup-button');

  form.addEventListener('submit', handleSignup);

  function handleSignup(event) {
    event.preventDefault();
    signUpButton.textContent = 'Loading...'; // Display loading text on the signup button

    const firstname = document.querySelector('input[name="firstname"]').value;
    const lastname = document.querySelector('input[name="lastname"]').value;
    const phone = document.querySelector('input[name="phone"]').value;
    const email = document.querySelector('input[name="email"]').value;
    const password = document.querySelector('input[name="password"]').value;
    const confirmPassword = document.querySelector('input[name="confirm-password"]').value;

    if (isEmpty(firstname) || isEmpty(lastname) || isEmpty(phone) || isEmpty(email) || isEmpty(password) || isEmpty(confirmPassword)) {
      console.error('All fields are required');
      signUpButton.textContent = 'Sign Up'; // Restore the signup button text
      return;
    }

    if (!isValidEmail(email)) {
      console.error('Invalid email format');
      signUpButton.textContent = 'Sign Up'; // Restore the signup button text
      return;
    }

    if (!passwordsMatch(password, confirmPassword)) {
      alert('Passwords do not match.');
      console.error();('Passwords do not match');
      signUpButton.textContent = 'Sign Up'; // Restore the signup button text
      return;
    }

    const user = {
      "firstname": firstname,
      "lastname": lastname,
      "phone": phone,
      "email": email,
      "password": password,
    };

    fetch('https://lms-boo.onrender.com/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
      .then(response => response.json())
      .then(res => {
        console.log('', res);
        const user = {
          "firstname": firstname,
          "lastname": lastname,
          "phone": phone,
          "email": email,
          "password": password,
        };
        signUpButton.textContent = 'Sign Up'; // Restore the signup button text
        sessionStorage.setItem('user', JSON.stringify(user));
        window.location.href = '../index.html'; // Redirect to the signin page
      })
      .catch(error => {
        alert('Error during login. Please try again!.');
        console.error('Error during signup:', error);
        signUpButton.textContent = 'Sign Up'; // Restore the signup button text
      });
  }

  function isEmpty(value) {
    return value.trim() === '';
  }

  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  function passwordsMatch(password, confirmPassword) {
    return password === confirmPassword;
  }
});