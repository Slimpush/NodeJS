const data = require('../../sql3-data.js');

module.exports = async (request, response) => {
    response.writeHead(200);
    response.end(JSON.stringify(await data.getUsers()));
};