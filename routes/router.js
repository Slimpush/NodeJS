const url = require('url');

const userRoutes = require('./userRoutes/userRoutes.js');

const routerHandler = (request, response) => {
    const parsedUrl = url.parse(request.url, true);
    const path = parsedUrl.pathname;

    if (path === '/users' || path.startsWith('/users/')) {
        userRoutes(request, response);
    } else {
        response.setHeader('Content-Type', 'application/json');
        response.writeHead(404);
        response.end(JSON.stringify({ message: 'Route not found' }));
    }
};

module.exports = routerHandler;