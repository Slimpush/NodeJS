const data = require('../../sql3-data.js');

module.exports = async (request, response) => {
    const id = parseInt(request.url.split('/')[2]);
    const success = await data.deleteUser(id);

    if (success) {
        response.writeHead(204);
        response.end();
    } else {
        response.writeHead(404);
        response.end(JSON.stringify({ message: 'User not found' }));
    }
};