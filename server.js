const http = require('http');

const routerHandler = require('./routes/router');

const server = http.createServer(routerHandler);

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
