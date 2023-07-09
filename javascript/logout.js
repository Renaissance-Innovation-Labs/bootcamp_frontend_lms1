document.addEventListener('DOMContentLoaded', () => {
    const logoutButton = document.querySelector('.logout-button');
  
    logoutButton.addEventListener('click', handleLogout);
  
    function handleLogout() {
      sessionStorage.removeItem('user');
      window.location.href = '../index.html'; // Redirect to the login page after logout
    }
  });
  