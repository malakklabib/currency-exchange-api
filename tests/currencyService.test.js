const { cache, convertCurrency } = require('../currencyService');
const axios = require('axios');

jest.mock('axios');

describe('convertCurrency', () => {
    beforeEach(() => {
        cache.flushAll();
        axios.post.mockClear();
    });

    it('should fetch exchange rates', async () => {
        axios.post.mockResolvedValue({
            data: { usd_inr: 74.57 }
        });
        const rate = await convertCurrency('usd', 'inr');
        expect(rate).toEqual({ usd_inr: 74.57 });
        expect(axios.post).toHaveBeenCalledTimes(1);
        expect(axios.post).toHaveBeenCalledWith(
            expect.stringContaining('api.apyhub.com'),
            expect.anything(),
            expect.anything()
        );
    });

    it('should handle failures', async () => {
        axios.post.mockRejectedValue(new Error('API Failure'));
        await expect(convertCurrency('usd', 'inr')).rejects.toThrow('Failed to retrieve exchange rates: API Failure');
    });
});
