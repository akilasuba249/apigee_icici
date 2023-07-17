const assert = require('assert');
const request = require('request-promise');

describe('Hi! API Endpoint', () => {
    it('should return "Hi!" message', async () => {
        try{
            const response = await request({
                method: 'GET',
                uri: 'https://34.36.188.6.nip.io/iciciproxy',
                json: true
            });
            console.log(response)
            assert.equal(response, 'Hello !');
        }catch(err){
            console.log(err)
        }
    });
});
