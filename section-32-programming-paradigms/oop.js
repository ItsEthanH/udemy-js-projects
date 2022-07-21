// using objects to organise logic and data, with an object for each major component of the app

class User {
  constructor(username, password) {
    (this.username = username), (this.password = password);
  }

  greet() {
    console.log('Hi! My name is ' + this.username);
  }
}

class UserInputForm {
  constructor() {
    this.form = document.getElementById('user-input');
    this.usernameInput = document.getElementById('username');
    this.passwordInput = document.getElementById('password');

    this.form.addEventListener('submit', this.signupHandler.bind(this));
  }

  signupHandler(event) {
    event.preventDefault();

    const enteredUsername = this.usernameInput.value;
    const enteredPassword = this.passwordInput.value;

    if (
      Validator.validate(enteredUsername, Validator.REQUIRED) ||
      Validator.validate(enteredPassword, Validator.MIN_LENGTH, 5)
    ) {
      alert('Please make sure the form is fully completed, with a password length of 6 or more!');
      return;
    }

    const newUser = new User(enteredUsername, enteredPassword);
    console.log(newUser);
    newUser.greet();
  }
}

// takes a value to validate, and a validation 'flag', with an optional validation value
// returns true if it passes the test, defined by the flag. returns false if not.
class Validator {
  static REQUIRED = 'REQUIRED';
  static MIN_LENGTH = 'MIN_LENGTH ';

  static validate(value, flag, validatorValue) {
    if (flag === this.REQUIRED) {
      return value.trim().length <= 0;
    }

    if (flag === this.MIN_LENGTH) {
      return value.trim().length < validatorValue;
    }
  }
}

new UserInputForm();
