
require('dotenv').config('../.env');

module.exports = {
    user: process.env.QUEUE_USERNAME,
    pass: process.env.QUEUE_PASSWORD,
    server: process.env.QUEUE_SERVER,
    port: process.env.QUEUE_PORT
}
