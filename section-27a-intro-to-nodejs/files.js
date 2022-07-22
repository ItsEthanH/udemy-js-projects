// playing around with the file system package offered by nodejs
const fs = require('fs');

fs.readFile('./user-data.txt', (err, data) => {
  if (err) {
    console.log(err);
    return;
  }

  console.log(data.toString());
});

fs.writeFile('./user-data.txt', 'username=Ethan', (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('Success!');
  }
});
