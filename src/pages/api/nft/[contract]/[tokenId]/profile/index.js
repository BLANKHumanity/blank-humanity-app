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
        res.setHeader(
            'Cache-Control',
            'public, s-maxage=10, stale-while-revalidate=59'
        )
        let dbConnection = await dbUtils.SSHConnection;
        let query = `SELECT *  FROM \`blankbot\`.\`nft_token_metadata\` where \`nft_contract\`='${contract}' and \`nft_token_id\`=${tokenId}`;
        console.log(query);
        dbConnection.query(query, function (error, result, fields) {
            if (error) {
                return res.status(500).json({error: error});
            } else {
                return res.json(result);
            }
        });
    } else if (req.method === 'POST') {
        //const token = req.headers['authorization']  
        //const { address, body } = await Web3Token.verify(token);
        let account='peterish.eth'
        let dbConnection = await dbUtils.SSHConnection;
        let query = `INSERT INTO \`blankbot\`.\`nft_token_metadata\`(\`nft_contract\`,\`nft_token_id\`,\`nft_token_name\`,\`nft_token_phrase\`,\`nft_token_notes\`,\`last_set_by_owner\`) VALUES ('${contract}',${tokenId},"${req.body.tokenName}","${req.body.tokenPhrase}","${req.body.tokenNotes}",'${account}') ON DUPLICATE KEY UPDATE \`nft_token_name\`= "${req.body.tokenName}",\`nft_token_phrase\` = "${req.body.tokenPhrase}",\`nft_token_notes\` = "${req.body.tokenNotes}",\`last_set_by_owner\` = '${account}'`;         
        console.log(query);
        dbConnection.query(query, function (error, result, fields) {
            if (error) {
                return res.status(500).json({error: error});
            } else {
                return res.json(result);
            }
        });
    }
};
export default profile;