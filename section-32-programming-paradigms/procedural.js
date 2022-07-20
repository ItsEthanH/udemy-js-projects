// listing steps out one-by-one, giving a 'top to bottom' style script

function signUpHandler(event) {
  event.preventDefault();

  const usernameInput = document.getElementById('username');
  const passwordInput = document.getElementById('password');

  const enteredUsername = usernameInput.value;
  const enteredPassword = passwordInput.value;

  if (enteredUsername.trim() === '' || enteredPassword.trim() === '') {
    alert('Please make sure the form is fully completed!');
    return;
  }

  const user = {
    username: enteredUsername,
    password: enteredPassword,
  };

  console.log(user);
  usernameInput.value = '';
  passwordInput.value = '';
}

const formElement = document.getElementById('user-input');
formElement.addEventListener('submit', signUpHandler);
