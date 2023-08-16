const axios = require('axios');

axios.get('http://localhost:8008/numbers', {
  params: {
    url: [
      'http://20.244.56.144/numbers/fibo',
      'http://20.244.56.144/numbers/odd'
    ]
  }
})
.then(response => {
  console.log(response.data);
})
.catch(error => {
  console.error('Error:', error);
});
