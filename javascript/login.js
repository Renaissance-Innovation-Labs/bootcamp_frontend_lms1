document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.login-Form');
    form.addEventListener('submit', handleLogin);

   
  });
  
  function handleLogin(event) {
    event.preventDefault();
  
    const email = document.querySelector('input[name="email"]').value;
    const password = document.querySelector('input[name="password"]').value;
  
   
    const payload = {
      email: email,
      password: password,
    };
  
  
    fetch('https://lms-boo.onrender.com/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
      .then(response => response.json())
      .then(data => {
        console.log('Login successful:', data);
       
        window.location.href = './dashboard.html';
      })




      .catch(error => {
        console.error('Error during login:', error);
      });
  }
  