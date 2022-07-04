import Web3Token from 'web3-token';
import dbUtils from '../../../../../../../utils/dbUtils';

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
        let name = await dbUtils.getName("0x881D9c2F229323aad28a9c9045111e30e1F1eB25", tokenId);
        return res.json({name:name}); 
    } 
    return res.status(405);
};
export default profile;