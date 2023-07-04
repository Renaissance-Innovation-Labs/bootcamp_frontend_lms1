document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    const confirmPasswordInput = document.querySelector('input[name="confirmPassword"]');
    const showPasswordToggle = document.querySelector('.show-password-toggle');
  
    form.addEventListener('submit', handleSignup);
  
    function handleSignup(event) {
      event.preventDefault();
   

      const firstname= document.querySelector('input[name="firstname"]').value;
      const lastname= document.querySelector('input[name="lastname"]').value;
      const phone= document.querySelector('input[name="phone"]').value;
      const email = document.querySelector('input[name="email"]').value;
      const password = document.querySelector('input[name="password"]').value;
      const confirmPassword = document.querySelector('input[name="confirm-password"]').value;
  
      if (isEmpty(firstname)  || isEmpty(lastname) || isEmpty(phone) || isEmpty(email) || isEmpty(password) || isEmpty(confirmPassword)) {
        console.error('All fields are required');
        return;
      }
  
      if (!isValidEmail(email)) {
        console.error('Invalid email format');
        return;
      }
  
      if (!passwordsMatch(password, confirmPassword)) {
        console.error('Passwords do not match');
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
            console.log(`sign-up successful`)
          console.log( res);
          const user = {
            "firstname": firstname,
            "lastname": lastname,
            // "token": token,
            "phone": phone,
            "email": email,
            "password": password,
          }
              // Save the code to session storage
            sessionStorage.setItem('user', JSON.stringify(user));
          window.location.href = '../index.html'; // Redirect to the signin page
        })
        .catch(error => {
          console.error('Error during signup:', error);
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

