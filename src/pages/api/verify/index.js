const verifyWallet = async (
    req,
    res
  ) => {
    if (req.method !== 'POST') {
        res.status(405).send({ message: 'Only POST requests allowed' })
        return
    }
    
    let testUrl = "https://test.jectrum.de/wallets/discord/registerVerifiedWallet"
    let prodUrl = 'https://discord.blankhumanity.com/register-wallet'
    
    await fetch(prod, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(req.body),
    }).then(fetchRes => res.status(fetchRes.status))
    
    res.send();
};
export default verifyWallet;