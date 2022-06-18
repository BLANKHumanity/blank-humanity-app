import Web3Token from 'web3-token';
import dbUtils from '../../../../../../utils/dbConfig';

const profile = async (
    req,
    res
  ) => {
    let { contract, tokenId } = req.query
    if (req.method === 'GET') {
        //const token = req.headers['authorization']  
        //const { address, body } = await Web3Token.verify(token);
        
        let dbConnection = await dbUtils.SSHConnection;
        let query = `SELECT \`nft_token_name\`, \`nft_token_description\` FROM \`blankbot\`.\`nft_token_metadata\` where \`nft_contract\`='${contract}' and \`nft_token_id\`=${tokenId}`;
        console.log(query);
        dbConnection.query(query, function (error, result, fields) {
            if (error) {
                return res.error(error);
            } else {
                return res.json(result);
            }
        });
    } else if (req.method === 'POST') {
        //const token = req.headers['authorization']  
        //const { address, body } = await Web3Token.verify(token);
        let account='peterish.eth'
        let dbConnection = await dbUtils.SSHConnection;
        let query = `INSERT INTO \`blankbot\`.\`nft_token_metadata\`(\`nft_contract\`,\`nft_token_id\`,\`nft_token_name\`,\`nft_token_description\`,\`last_set_by_owner\`) VALUES ('${contract}',${tokenId},"${req.body.tokenName}","${req.body.tokenPhrase}",'${account}') ON DUPLICATE KEY UPDATE \`nft_token_name\`= "${req.body.tokenName}",\`nft_token_description\` = "${req.body.tokenPhrase}",\`last_set_by_owner\` = '${account}'`;         
        console.log(query);
        dbConnection.query(query, function (error, result, fields) {
            if (error) {
                return res.error(error);
            } else {
                return res.json(result);
            }
        });
    }
};
export default profile;