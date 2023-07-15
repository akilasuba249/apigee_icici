const assert = require('assert');
const request = require('request-promise');

describe('Hi! API Endpoint', () => {
    it('should return "Hi!" message', async () => {
        try{
            const response = await request({
                method: 'GET',
                uri: 'https://10.64.112.2.nip.io/REVERSE-proxy',
                json: true
            });
            console.log(response)
            assert.equal(response, 'Hello !');
        }catch(err){
            console.log(err)
        }
    });
});
