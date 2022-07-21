// logic is stored and organised around functions, allowing these functions to be shared around
// functions should be pure and receive all necessary input as parameters
const REQUIRED = 'REQUIRED';
const MIN_LENGTH = 'MIN_LENGTH';

function validateInput(value, flag, validatorValue) {
  if (flag === REQUIRED) {
    return value.trim().length <= 0;
  }

  if (flag === MIN_LENGTH) {
    return value.trim().length < validatorValue;
  }
}

function getUserInput(inputElementId) {
  return document.getElementById(inputElementId).value;
}

function createUser(username, password) {
  if (validateInput(username, REQUIRED) || validateInput(password, MIN_LENGTH, 5)) {
    throw new Error(
      'Please make sure the form is fully completed, with a password length of 6 or more!'
    );
  }
  return { username, password };
}

function signupHandler(event) {
  event.preventDefault();

  const enteredUsername = getUserInput('username');
  const enteredPassword = getUserInput('password');

  try {
    const newUser = createUser(enteredUsername, enteredPassword);
    console.log(newUser);
  } catch (err) {
    alert(err.message);
  }
}

function connectForm(formId, formSubmitHandlerFn) {
  const form = document.getElementById(formId);
  form.addEventListener('submit', formSubmitHandlerFn);
}

connectForm('user-input', signupHandler);
