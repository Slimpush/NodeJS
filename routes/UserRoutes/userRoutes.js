const createUser = require('./createUser');
const deleteUser = require('./deleteUser');
const getUser = require('./getUser');
const listUsers = require('./listUser');
const updateUser = require('./updateUser');

const url = require('url');

const userRoutes = (request, response) => {
    const parsedUrl = url.parse(request.url, true);
    const method = request.method;
    const path = parsedUrl.pathname;

    response.setHeader('Content-Type', 'application/json');

    if (path === '/users' && method === 'GET') {
        listUsers(request, response);
    } else if (path === '/users' && method === 'POST') {
        createUser(request, response);
    } else if (path.startsWith('/users/') && method === 'GET') {
        getUser(request, response);
    } else if (path.startsWith('/users/') && method === 'PUT') {
        updateUser(request, response);
    } else if (path.startsWith('/users/') && method === 'DELETE') {
        deleteUser(request, response);
    } else {
        response.writeHead(404);
        response.end(JSON.stringify({ message: 'Route not found in users' }));
    }
};

module.exports = userRoutes;
