const express = require('express');
const { convertCurrency } = require('./currencyService');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/api/exchange', async (req, res) => {
    try {
        const { source, target, date } = req.query;
        if (!source || !target) {
            return res.status(400).json({ error: 'Please specify both source and target currencies.' });
        }
        const rates = await convertCurrency(source, target, date);
        const key = `${source}_${target}`;
        const rate = rates[key];
        if (rate === undefined) {
            return res.status(404).json({ error: 'Exchange rate not found for the specified currencies.' });
        }
        res.json({ rate });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
