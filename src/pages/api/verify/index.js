const verifyWallet = async (
    req,
    res
  ) => {
    if (req.method !== 'POST') {
        console.log(`Only POST requests allowed, requested method was ${req.method}`)
        res.status(405).send({ message: `Only POST requests allowed, requested method was ${req.method}` })
        return
    }
    let testUrl = "https://test.jectrum.de/wallets/discord/registerVerifiedWallet"
    let prodUrl = 'https://discord.blankhumanity.com/register-wallet'
    
    await fetch(prodUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(req.body),
    }).then(fetchRes => res.status(fetchRes.status))
    
    res.send();
};
export default verifyWallet;