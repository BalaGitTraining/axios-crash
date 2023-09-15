// Import Axios library
const axios = require('axios');

// GET REQUEST
function getTodos() {
  axios.get('https://jsonplaceholder.typicode.com/todos')
    .then((response) => {
      showOutput(response);
    })
    .catch((error) => {
      console.error(error);
    });
}

// POST REQUEST
function addTodo() {
  axios.post('https://jsonplaceholder.typicode.com/todos', {
      title: 'New Todo',
      completed: false
    })
    .then((response) => {
      showOutput(response);
    })
    .catch((error) => {
      console.error(error);
    });
}

// PUT/PATCH REQUEST
function updateTodo() {
  axios.put('https://jsonplaceholder.typicode.com/todos/1', {
      title: 'Updated Todo',
      completed: true
    })
    .then((response) => {
      showOutput(response);
    })
    .catch((error) => {
      console.error(error);
    });
}

// DELETE REQUEST
function removeTodo() {
  axios.delete('https://jsonplaceholder.typicode.com/todos/1')
    .then((response) => {
      showOutput(response);
    })
    .catch((error) => {
      console.error(error);
    });
}

// SIMULTANEOUS DATA
function getData() {
  axios.all([
      axios.get('https://jsonplaceholder.typicode.com/todos?_limit=5'),
      axios.get('https://jsonplaceholder.typicode.com/posts?_limit=5')
    ])
    .then(axios.spread((todos, posts) => {
      showOutput(todos);
      showOutput(posts);
    }))
    .catch((error) => {
      console.error(error);
    });
}

// CUSTOM HEADERS
function customHeaders() {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer YourTokenHere'
    }
  };

  axios.post('https://jsonplaceholder.typicode.com/todos', {
      title: 'New Todo',
      completed: false
    }, config)
    .then((response) => {
      showOutput(response);
    })
    .catch((error) => {
      console.error(error);
    });
}

// TRANSFORMING REQUESTS & RESPONSES
function transformResponse() {
  const options = {
    transformResponse: (data) => {
      // Transform the response data
      const parsedData = JSON.parse(data);
      parsedData.newProperty = 'Transformed Data';
      return JSON.stringify(parsedData);
    }
  };

  axios.get('https://jsonplaceholder.typicode.com/todos/1', options)
    .then((response) => {
      showOutput(response);
    })
    .catch((error) => {
      console.error(error);
    });
}

// ERROR HANDLING
function errorHandling() {
  axios.get('https://jsonplaceholder.typicode.com/todoss')
    .then((response) => {
      showOutput(response);
    })
    .catch((error) => {
      if (error.response) {
        // Server responded with a status other than 200
        console.error('Status:', error.response.status);
        console.error('Data:', error.response.data);
      } else if (error.request) {
        // No response received, likely a network error
        console.error('Request:', error.request);
      } else {
        // Something else went wrong
        console.error('Error:', error.message);
      }
    });
}

// CANCEL TOKEN
function cancelToken() {
  const source = axios.CancelToken.source();

  axios.get('https://jsonplaceholder.typicode.com/todos/1', {
      cancelToken: source.token
    })
    .then((response) => {
      showOutput(response);
    })
    .catch((thrown) => {
      if (axios.isCancel(thrown)) {
        console.log('Request canceled:', thrown.message);
      } else {
        console.error(thrown);
      }
    });

  // Cancel the request (you can call this from elsewhere in your code)
  source.cancel('Request canceled by user');
}

// Show output in browser
function showOutput(res) {
  // Replace this with your logic to display the response in the browser
  console.log(res);
}

// Event listeners
document.getElementById('get').addEventListener('click', getTodos);
document.getElementById('post').addEventListener('click', addTodo);
document.getElementById('update').addEventListener('click', updateTodo);
document.getElementById('delete').addEventListener('click', removeTodo);
document.getElementById('sim').addEventListener('click', getData);
document.getElementById('headers').addEventListener('click', customHeaders);
document
  .getElementById('transform')
  .addEventListener('click', transformResponse);
document.getElementById('error').addEventListener('click', errorHandling);
document.getElementById('cancel').addEventListener('click', cancelToken);
