const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 8008;

app.use(express.json());

async function fetchNumbersFromUrl(url) {
  try {
    const response = await axios.get(url, { timeout: 500 });
    return response.data.numbers || [];
  } catch (error) {
    return [];
  }
}

app.get('/numbers', async (req, res) => {
  const requestedUrls = req.query.url || [];
  const fetchPromises = requestedUrls.map(fetchNumbersFromUrl);

  try {
    const numbersByUrls = await Promise.all(fetchPromises);
    const uniqueNumbers = [...new Set(numbersByUrls.flat())].sort((a, b) => a - b);
    res.json({ numbers: uniqueNumbers });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
