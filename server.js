const express = require('express');
const axios = require('axios');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.get('/api/users', async (req, res) => {
    const { query } = req.query;
    const url = `https://jsonjet.vercel.app/mocks/?users=${query}`;

    console.log('Received request with query:', query);

    try {
        const response = await axios.get(url);
        console.log('Received response from external API:', response.data);
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching data from external API:', error);
        res.status(500).json({ error: 'Failed to fetch data' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
