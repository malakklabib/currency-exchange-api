# Currency Exchange API

This project implements a simple Node.js application that provides a public API for currency exchange. It integrates with an external currency conversion API to fetch the latest exchange rates and allows users to retrieve these rates through a RESTful API.

## Features

- **Currency Conversion**: Users can query exchange rates between different currencies.
- **Caching**: Reduces the frequency of requests to the external API by caching results.
- **Error Handling**: Provides meaningful feedback on errors encountered during API requests.

## Technologies

- Node.js
- Express
- Axios for HTTP requests
- NodeCache for caching results

## Getting Started

### Prerequisites

- Node.js installed on your system.
- API key for the external currency conversion API (place your API key in `currencyService.js`).

### Installation

1. Clone the repository:
```bash
git clone https://github.com/malakklabib/currency-exchange-api.git
```
   
3. Navigate to the project directory:
  ```bash
cd [project-directory]
```

4. Install the dependencies:
  ```bash
npm install
```

### Running the Application
Start the server:
```bash
npm start
```
This will run the server on http://localhost:3000.

### Using the API
Make a GET request to the /api/exchange endpoint with the following query parameters:

source: The currency you are converting from (e.g., 'USD').
target: The currency you are converting to (e.g., 'EUR').
Example request using curl:

```bash
curl "http://localhost:3000/api/exchange?source=USD&target=EUR"
```

### Responses
Successful responses will return a JSON object with the exchange rate:

```json 
{
  "rate": 0.85
}
```
Errors will return a JSON object with an error message, for example:

```json 
{
  "error": "Exchange rate not found for the specified currencies."
}
```

### Testing
Run the unit tests to ensure everything is functioning correctly:
```bash
npm test
```

### Documentation
Further documentation and details about API endpoints can be found using the Swagger documentation provided at http://localhost:3000/docs.
