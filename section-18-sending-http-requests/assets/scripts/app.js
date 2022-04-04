const listElement = document.querySelector('.posts');
const postTemplate = document.getElementById('single-post');
const form = document.querySelector('#new-post form');
const fetchButton = document.querySelector('#available-posts button');
const postList = document.querySelector('ul');

function sendHttpRequest(method, url, data) {
  const promise = new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.responseType = 'json';

    xhr.onload = function () {
      resolve(xhr.response);
    };

    xhr.send(JSON.stringify(data));
  });
  return promise;
}

function fetchPosts() {
  sendHttpRequest('GET', 'https://jsonplaceholder.typicode.com/posts').then(
    (responseData) => {
      const listOfPosts = responseData;

      for (const post of listOfPosts) {
        const postElement = document.importNode(postTemplate.content, true);
        postElement.querySelector('h2').textContent = post.title.toUpperCase();
        postElement.querySelector('p').textContent = post.body;
        postElement.querySelector('li').id = post.id;
        listElement.append(postElement);
      }
    }
  );
}

async function createPost(title, content) {
  const userId = Math.random();
  const post = {
    title: title,
    body: content,
    userId: userId,
  };

  sendHttpRequest('POST', 'https://jsonplaceholder.typicode.com/posts', post);
}

fetchButton.addEventListener('click', fetchPosts);
form.addEventListener('submit', (event) => {
  event.preventDefault();
  const userTitle = document.querySelector('#title').value;
  const userBody = document.getElementById('content').value;

  createPost(userTitle, userBody);
});

postList.addEventListener('click', (event) => {
  if (event.target.tagName === 'BUTTON') {
    const postId = event.target.closest('li').id;
    sendHttpRequest(
      'DELETE',
      `https://jsonplaceholder.typicode.com/posts/${postId}`
    );
  }
});
