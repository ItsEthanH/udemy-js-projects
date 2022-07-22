// playing around with the traditional way of creating servers in nodejs
const http = require('http');

const server = http.createServer((request, response) => {
  let body = [];
  request.on('data', (chunk) => {
    body.push(chunk);
  });
  request.on('end', () => {
    body = Buffer.concat(body).toString();
    const name = body.split('=')[1];

    response.setHeader('Content-Type', 'text/html');

    response.write(`<h1 style="color:red">Hello there, ${name}!</h1>`);
    response.write('<h2>I can have as many lines as I want!)');
    response.write(
      '<form method="POST" action="/"><input type="text" name="name"/><button type="submit">Send</button></form>'
    );

    response.end();
  });
});

server.listen(3000);
