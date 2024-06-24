const express = require('express');
// Swagger setup
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const { convertCurrency } = require('./currencyService');
const app = express();
const PORT = process.env.PORT || 3000;


require('dotenv').config();

const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Currency Exchange API',
        version: '1.0.0', 
        description: 'This is a simple API for currency exchange rates', 
        contact: {
          name: 'API Support', 
          url: 'http://www.example.com/support',
          email: 'support@example.com', 
        },
      },
      servers: [{
        url: 'http://localhost:3000', 
        description: 'Development Server' 
      }],
    },
    apis: ['./app.js'],
  };
  
  const swaggerDocs = swaggerJsdoc(options);
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

  /**
 * @openapi
 * /api/exchange:
 *   get:
 *     tags:
 *       - Exchange
 *     description: Retrieve currency exchange rates
 *     parameters:
 *       - in: query
 *         name: source
 *         required: true
 *         schema:
 *           type: string
 *         description: Source currency code (e.g., USD)
 *       - in: query
 *         name: target
 *         required: true
 *         schema:
 *           type: string
 *         description: Target currency code (e.g., EUR)
 *     responses:
 *       200:
 *         description: Successful response with the exchange rate
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 rate:
 *                   type: number
 *                   example: 0.85
 *       400:
 *         description: Bad request if required parameters are missing
 *       404:
 *         description: Not found if the rate does not exist
 *       500:
 *         description: Internal server error
 */

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

