const getWallets = async (
    req,
    res
  ) => {
    if (req.method !== 'GET') {
        res.status(405).send({ message: 'Only GET requests allowed' })
        return
    }
    let { role } = req.query
    let fetchUrl = `https://discord.blankhumanity.com/airdrop-wallet/${role?'role/'+role:'all'}`
    console.log(fetchUrl)
    fetch(fetchUrl, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },        
    }).then(fetchRes => console.log(fetchRes) && fetchRes.json())
    .then(json => console.log(json))    
};
export default getWallets;