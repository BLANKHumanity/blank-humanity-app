const verifyWallet = async (
    req,
    res
  ) => {
    if (req.method !== 'POST') {
        res.status(405).send({ message: 'Only POST requests allowed' })
        return
    }
    console.log(req.body.signature);
    fetch('https://discord.blankhumanity.com/register-wallet', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(req.body),
    }).then(res => res.json())
    .then(json => console.log(json));

};
export default verifyWallet;