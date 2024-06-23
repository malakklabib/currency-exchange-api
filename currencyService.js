const axios = require('axios');
const API_KEY = 'APY037kciTEzxQD9AndMROC4UetLWsJWPcnkSnMbXDSqh2gqo2IDc6pyCqjKmmQcvdB7OO';
const API_URL = 'https://api.apyhub.com/data/convert/currency/multiple';

const NodeCache = require('node-cache');
const cache = new NodeCache({ stdTTL: 600 }); // Cache for 10 minutes

async function convertCurrency(sourceCurrency, targetCurrency, date = null) {
    // Check cache first
    const cacheKey = `${sourceCurrency}_${targetCurrency}_${date || 'today'}`;
    const cachedResult = cache.get(cacheKey);
    if (cachedResult)
        return cachedResult;

    // If not found, make the post request to the public API
    const body = {
        source: sourceCurrency,
        targets: [targetCurrency],
    };
    if (date) 
        body.date = date;

    try {
        const response = await axios.post(API_URL, body, {
            headers: {
                'Content-Type': 'application/json',
                'apy-token': API_KEY
            }
        });
        const result = response.data;

        // Cache the result
        cache.set(cacheKey, result);

        return result;

    } catch (error) {
        throw new Error(`Failed to retrieve exchange rates: ${error.message}`);
    }
    
}

module.exports = { cache, convertCurrency };

