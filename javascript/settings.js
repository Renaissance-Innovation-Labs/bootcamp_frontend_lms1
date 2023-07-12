
const users = sessionStorage.getItem('user');
let profile = JSON.parse(users);

const confirmPassInput = document.querySelector('.confirm-pass');





function profileData () {
fetch('https://lms-boo.onrender.com/users/user-detail', {
  method: 'GET',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${profile.access_token}`
  }
})
.then(response => response.json())
.then(userProfile => {
  fetchUserData(userProfile);
  console.log(userProfile);
sessionStorage.setItem("userProfile", userProfile)
})
.catch(error => {
console.error("An error occurred", error);
});
}profileData ();


const firstName = document.querySelector('.first');
const lastName = document.querySelector('.last');
const phoneNumber = document.querySelector('.phone-no');


function fetchUserData(userProfile) {
  document.querySelector('.jj').textContent = `${userProfile.firstname} ${userProfile.lastname}`;
  document.querySelector('.file').textContent = `${userProfile.firstname} ${userProfile.lastname}`;
  document.querySelector('.user-name-name').textContent = `${userProfile.firstname} ${userProfile.lastname}`;
  document.querySelector('.user-email').textContent = `${userProfile.email}`;
 firstName.value = userProfile.firstname;
 lastName.value = userProfile.lastname;
phoneNumber.value = userProfile.phone;
}

let userProfile = sessionStorage.getItem("userProfile");



function updateUser (){
const userData = {
  firstname:firstName.value,
  lastname: lastName.value,
  phone: phoneNumber.value,
};
fetch('https://lms-boo.onrender.com/users', {
  method: 'PATCH',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${profile.access_token}`
  },
  body: JSON.stringify(userData),
})
.then(response => response.json())
  .then(data => {
    alert("Profile updated successfully");
    profileData ();
  })
  .catch(error => {
    displayErrorMessage('An error occurred: ' + error.message);
  });
}
document.querySelector('.form-user').addEventListener('submit', (event) => {
    event.preventDefault();
    updateUser ();

});


// document.querySelector('.form-pass').addEventListener('submit', (event) => {
//   event.preventDefault();
//   const newPassword = document.querySelector('.new-pass').value;
//   const confirmPassword = document.querySelector('.confirm-pass').value;
//   // Validate password length and match
//   if (newPassword.length < 8 || newPassword !== confirmPassword) {
//     displayErrorMessage('Password must be at least 8 characters long and match.');
//     return;
//   }
//   // Show loading indicator on the button
//   showLoadingButton('.form-pass .changes');
//   // Construct the payload
//   const payload = {
//     new_password: newpassword,
//     confirm_password: confirmpassword,
//   };
//   // Perform the API request
//   fetch('https://lms-boo.onrender.com/login/change-password', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: `Bearer ${profile.token}`
//     },
//     body: JSON.stringify(payload),
//   })
//     .then(response => {
//       if (response.ok) {
//         displaySuccessMessage('User information updated successfully.');
//         // Reset the form if needed
//         document.querySelector('.form-pass').reset();
//       } else {
//         throw new Error('Error updating user information.');
//       }
//     })
//     .catch(error => {
//       displayErrorMessage(error.message);
//     })
//     .finally(() => {
//       setTimeout(() => {
//         resetButton('.form-pass .changes', 'Change Password');
//       }, 5000);
//     });
// });
// // document.getElementById('footericon4').addEventListener('click', function() {
// //   sessionStorage.clear();
// //   window.location.href = '../index.html';
// // });
// function showLoadingButton(selector) {
//   const button = document.querySelector(selector);
//   button.textContent = 'Updating...';
//   button.disabled = true;
// }
// function resetButton(selector, text) {
//   const button = document.querySelector(selector);
//   button.textContent = text;
//   button.disabled = false;
// }
// function displayErrorMessage(message) {
//   const errorMessage = document.querySelector('.error-message');
//   errorMessage.textContent = message;
//   errorMessage.style.display = 'block';
//   setTimeout(() => {
//     errorMessage.textContent = '';
//     errorMessage.style.display = 'none';
//   }, 5000);
// }
// function displaySuccessMessage(message) {
//   const successMessage = document.querySelector('.success-message');
//   successMessage.textContent = message;
//   successMessage.style.display = 'block';
//   setTimeout(() => {
//     successMessage.textContent = '';
//     successMessage.style.display = 'none';
//   }, 5000);
// }

































































































































































































// const payload = sessionStorage.getItem('user');


// let profile = JSON.parse(payload);



// // Make the profile name dynamic
// document.querySelector('.jj').textContent = `${profile.user.firstname} ${profile.user.lastname}`;
// document.querySelector('.file').textContent = `${profile.user.firstname} ${profile.user.lastname}`;
// document.querySelector('.user-name-name').textContent = `${profile.user.firstname} ${profile.user.lastname}`;
// document.querySelector('.user-email').textContent = `${profile.user.email}`;
// const confirmPassInput = document.querySelector('.confirm-pass');
// const toggleIcon = document.querySelector('.toggle-icon');
// const togglePasswordVisibility = () => {
//   if (confirmPassInput.type === 'password-input') { 
//     confirmPassInput.type = 'text';
//     toggleIcon.classList.remove ('fa eye-slash');
//     toggleIcon.classList.add('fa eye');
//   } else {
//     confirmPassInput.type = 'password-input';
//     toggleIcon.classList.remove('fa eye');
//     toggleIcon.classList.add('fa eye-slash');
//   }
// };
// toggleIcon.addEventListener('click', togglePasswordVisibility);
// const apiUrl = 'https://lms-boo.onrender.com/users';
// const firstName = profile.firstname;
// const lastName = profile.lastName;
// const phoneNumber = profile.phoneNumber;
// const userData = {
//   firstname: firstName,
//   lastname: lastName,
//   phone: phoneNumber,
// };
// fetch(apiUrl, {
//   method: 'PATCH',
//   headers: {
//     'Accept': 'application/json',
//     'Content-Type': 'application/json',
//     Authorization: `Bearer ${profile.token}`
//   },
//   body: JSON.stringify(userData),
// })
//   .then(response => {
//     if (response.ok) {
//       return response.json();
//     } else {
//       throw new Error('Error updating user profile');
//     }
//   })
//   .then(data => {
//     console.log('User profile updated successfully:', data);
//   })
//   .catch(error => {
//     displayErrorMessage('An error occurred: ' + error.message);
//   });
// document.querySelector('.form-pass').addEventListener('submit', (event) => {
//   event.preventDefault();
//   const newPassword = document.querySelector('.new-pass').value;
//   const confirmPassword = document.querySelector('.confirm-pass').value;
//   // Validate password length and match
//   if (newPassword.length < 8 || newPassword !== confirmPassword) {
//     displayErrorMessage('Password must be at least 8 characters long and match.');
//     return;
//   }
//   // Show loading indicator on the button
//   showLoadingButton('.form-pass .changes');
//   // Construct the payload
//   const payload = {
//     newPassword: newPassword,
//   };
//   // Perform the API request
//   fetch('https://lms-boo.onrender.com/login/change-password', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: `Bearer ${profile.token}`
//     },
//     body: JSON.stringify(payload),
//   })
//     .then(response => {
//       if (response.ok) {
//         displaySuccessMessage('User information updated successfully.');
//         // Reset the form if needed
//         document.querySelector('.form-pass').reset();
//       } else {
//         throw new Error('Error updating user information.');
//       }
//     })
//     .catch(error => {
//       displayErrorMessage(error.message);
//     })
//     .finally(() => {
//       setTimeout(() => {
//         resetButton('.form-pass .changes', 'Change Password');
//       }, 5000);
//     });
// });
// // document.getElementById('footericon4').addEventListener('click', function() {
// //   sessionStorage.clear();
// //   window.location.href = '../index.html';
// // });
// function showLoadingButton(selector) {
//   const button = document.querySelector(selector);
//   button.textContent = 'Loading...';
//   button.disabled = true;
// }
// function resetButton(selector, text) {
//   const button = document.querySelector(selector);
//   button.textContent = text;
//   button.disabled = false;
// }
// function displayErrorMessage(message) {
//   const errorMessage = document.querySelector('.error-message');
//   errorMessage.textContent = message;
//   errorMessage.style.display = 'block';
//   setTimeout(() => {
//     errorMessage.textContent = '';
//     errorMessage.style.display = 'none';
//   }, 5000);
// }
// function displaySuccessMessage(message) {
//   const successMessage = document.querySelector('.success-message');
//   successMessage.textContent = message;
//   successMessage.style.display = 'block';
//   setTimeout(() => {
//     successMessage.textContent = '';
//     successMessage.style.display = 'none';
//   }, 5000);
// }







