const data = require('../../sql3-data.js');

module.exports = (request, response) => {
    let body = '';

    request.on('data', chunk => {
        body += chunk;
    });

    request.on('end', async () => {
        const parsedBody = new URLSearchParams(body);
        const name = parsedBody.get('name');
        const age = parsedBody.get('age');

        if (name && age) {
            const user = { name, age: parseInt(age) };
            const createdUser = await data.addUser(user);
            response.writeHead(201);
            response.end(JSON.stringify(createdUser));
        } else {
            response.writeHead(400);
            response.end(JSON.stringify({ message: 'Name and age are required' }));
        }
    });
};