
const mysql = require('mysql2');
const { Client } = require('ssh2');
// create an instance of SSH Client
const sshClient = new Client();
const cache = require('memory-cache');

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
const tokenCache = [];
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
async function populateCache(contract) {
    let dbConnection = await SSHConnection;  
  
    let query = `SELECT nft_token_id, nft_token_name  FROM \`blankbot\`.\`nft_token_metadata\` where \`nft_contract\`='${contract}'`;
    console.log(query);
    dbConnection.query(query, function (error, result, fields) {
        if (error) {
            console.log(`error: ${error}`)          
        } else if(result.length) {            
          for(let i = 0; i < result.length; ++i) {
            cache.put(result[i].nft_token_id, decodeURIComponent(result[i].nft_token_name));
          }          
        } 
    });
  }
async function getName (contract, tokenId) {
    if(tokenId >= 0) {    
        let name = cache.get(tokenId);
        if(name)  return name;
        else await populateCache(contract);
        
        name = cache.get(tokenId);
        if(name) return name;
        else return `Initializer # ${tokenId}`;   
    } else {        
        return null;
    } 
  }
module.exports = {SSHConnection: SSHConnection, tokenCache: tokenCache, getName: getName};