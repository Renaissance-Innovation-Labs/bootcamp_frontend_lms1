document.getElementById('logoutdiv').addEventListener('click', function() {
    sessionStorage.clear();
    window.location.href = '../index.html'; 
});
