const data = require('../../sql3-data.js');

module.exports = (request, response) => {
    const id = parseInt(request.url.split('/')[2]);
    let body = '';

    request.on('data', chunk => {
        body += chunk;
    });

    request.on('end', async () => {
        const parsedBody = new URLSearchParams(body);
        const updatedData = {};
        parsedBody.forEach((value, key) => {
            updatedData[key] = key === 'age' ? parseInt(value) : value;
        });

        const updateUser = await data.updateUser(id, updatedData);

        if (updateUser) {
            response.writeHead(200);
            response.end(JSON.stringify(updateUser));
        } else {
            response.writeHead(404);
            response.end(JSON.stringify({ message: 'User not found' }));
        }
    })
};