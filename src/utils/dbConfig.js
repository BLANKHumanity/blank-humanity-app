
const mysql = require('mysql2');
const { Client } = require('ssh2');
// create an instance of SSH Client
const sshClient = new Client();

// define connection config for the database
const dbServer = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
}
// define connection config for the ssh tunnel
const tunnelConfig = {
    host: process.env.DB_SSH_HOST,
    port: 22,
    username: process.env.DB_SSH_USER,
    password: process.env.DB_SSH_PASSWORD
}

const forwardConfig = {
    srcHost: '127.0.0.1', // any valid address
    srcPort: 3306, // any valid port
    dstHost: dbServer.host, // destination database
    dstPort: dbServer.port // destination port
};

const SSHConnection = new Promise((resolve, reject) => {
    try{
        sshClient.on('ready', () => {
            sshClient.forwardOut(
            forwardConfig.srcHost,
            forwardConfig.srcPort,
            forwardConfig.dstHost,
            forwardConfig.dstPort,
            async (err, stream) => {
                if (err) reject(err);
                const updatedDbServer = {
                    ...dbServer,
                    stream
                };                    
                const connection =  mysql.createConnection(updatedDbServer);
                connection.connect((error) => {
                if (error) {
                    reject(error);
                }
                resolve(connection);
                });
            });
        }).connect(tunnelConfig);
    } catch(error) {
        reject(error);
    }
});
module.exports = {SSHConnection: SSHConnection};