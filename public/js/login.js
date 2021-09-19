async function loginFormHandler(event) {
    event.preventDefault();
  
    const username = document.querySelector('#username-login-input').value.trim();
    const password = document.querySelector('#password-login-input').value.trim();
  
    if (username && password) {
      const response = await fetch('/api/users/login', {
        method: 'post',
        body: JSON.stringify({
          username,
          password
        }),
        headers: { 'Content-Type': 'application/json' }
      });
  
      if (response.ok) {
        document.location.replace('/');
        // const titleEl = document.getElementById('title');
        // titleEl.textContent = 'Your Dashboard'
      } else {
        alert('Your username or password is incorrect!');
      };
    };
  };

  document.querySelector('.login-form').addEventListener('submit', loginFormHandler);