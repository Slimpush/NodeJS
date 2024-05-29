const data = require('../../sql3-data.js');

module.exports = async (request, response) => {
    const id = parseInt(request.url.split('/')[2]);
    const user = await data.getUserById(id);

    if (user) {
        response.writeHead(200);
        response.end(JSON.stringify(user));
    } else {
        response.writeHead(404);
        response.end(JSON.stringify({ message: 'User not found' }));
    }
};