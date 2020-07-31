let request = require('request');

describe('get messages', () => {
    it('should return Status 200', (done) => {
        request.get('http://localhost:3000/messages', (err, res) => {
            expect(res.statusCode).toEqual(200)
            done();
        })
    })

    it('should return a list', (done) => {
        request.get('http://localhost:3000/messages', (err, res) => {
            expect(JSON.parse(res.body).length).toBeGreaterThan(0)
            done();
        })
    })
});

describe('post a message', () => {
    it('should return Status 200', (done) => {
        request.post('http://localhost:3000/messages', (err, res) => {
            expect(res.statusCode).toEqual(200)
            done();
        })
    })
});

