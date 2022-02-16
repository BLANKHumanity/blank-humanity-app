import React from "react";

import { MerkleTree } from "merkletreejs";
import keccak256 from "keccak256";
import ethUtil from "ethereumjs-utils";

let FREELIST_ADDRESSES = [
  "0x4eC77742fB7B6b319dF2E96E02d0C5887459801D",
  "0xa5C930c4BF30e1cD53fC30677a20574a66B97E20",
  "0x0E71A0516455835ee197826084Ea300a4835F4a4",
  "0xaA7997d518d58daB94a9B199f1500470f83e27eF",
  "0xf9EeFdb0738147bEF77E3b8998Fd8B96618552F0",
  "0x5c4020C9A6cC9C30a127b515cf205ebC980B5aAF",
  "0x527756562172bca8a0624decf6bf758cc67f0e78",
  "0x67B68a9576C5484a56194b4F3132ae203f47dD11",
  "0xeDa1fd7015088a62Cd2192EC872da67d5deBcac9",
  "0x5383Fc41ED11A8e35e2c9F92dF8928e8D71363ED",
  "0xB685b6c3394e57F4Bf9cFD52b2Ff9D1F4793F2bb",
  "0x0e24f8bE98b14a20cd122A999C7340601F5535d3",
  "0xf6158E06D58E36e6A0998185831E2834eBCecA74",
  "0x9Dbb8602B12752b67601eF5e4e7F21e7a820C3b2",
  "0x184E1642E3Afcd1f4FdCC584CC70f969FAE3e3e1",
  "0x60abD7Ef66AbAEb6d84AaD20E427Cf88626A23F0",
  "0x54Bb529eFe28E8DeDc66Cdf4638A71Ff3bd9CFFb",
  "0xe6D8796db42080dF3BF047961d9cFB274865066e",
  "0x0B5be21B2B2c36B9d50DB382331Ed87faCf65D06",
  "0xc043BAe8A02BbB4aA89eD479ca0b1e70ceB7d5e7",
  "0x10e425C42e0166D30e4D7c64e8135329de983ABC",
  "0x9b62065d64b73742ab7163327dccfc4a119c2eab",
  "0xC2d23D96DAB65510C75c90e775b1D386A92b0182",
  "0x299825a1cCfa8a2c4c10a38F8a14d6201f98DAAF",
  "0x85732653a6022c60D369745a9C0f9F4A3C0084e1",
  "0x929F48E6C95DE2be1C0966360c0789Be624A7d30",
  "0x49718137e1f35fb8B5d406718288FB8E35037AfE",
  "0x868D076c195Fd1A1Cc01CF83dD6E65C4E5352568",
  "0x1BD508508236Afd8856162148857D7A9Bb0282aA",
  "0x5e6FF93A0ac631F2196567B720993c04Cf7AbdC7",
  "0xa13b91ed1ddc20ac261c98419667582e5bfa6998",
  "0x00C71F8C497D8950553Fcb874F4A8Cf74Dc88629",
  "0x4c23E6fe44C190dF58D29bd46CB2f313B32Ed770",
  "0xd4200Fe3A594BB675559eb5843032Ac691Bca2e1",
  "0x12048b065277C2381BDb00a3A94E41A4D7444E25",
  "0x91B00Ce58260438da95c220eE86c05A1Eb8B24dc",
  "0xF2CA8e268fF99511AABa1c2aa1D54e4C84823699",
  "0xbBBAA9b374136A2FDEF831758Fd6D00f0aA116F5",
  "0x7d029d01dd0db5be5b7bec76151a49eabd3a081d",
  "0x5d986A56355D5f8F7079633BDD88C77B4BB125Bd",
];

for (let i = 0; i < FREELIST_ADDRESSES.length; i++) {
  let address = FREELIST_ADDRESSES[i];
  FREELIST_ADDRESSES[i] = address.toLowerCase();
}

// leaves, merkleTree, and rootHash are all determined prior to claim.

// Creates a new array 'leafNodes' by hashing all indexes of "FreelistAddresses"
// using keccak256. Then creates a new MerkleTree object using keccak256 as the
// desired hashing algorithm
const leafNodes = FREELIST_ADDRESSES.map((addr) => keccak256(addr));
const merkleTree = new MerkleTree(leafNodes, keccak256, { sortPairs: true });

// Gets the root hash of the merkle tree in hex format.
const rootHash = merkleTree.getRoot();
console.log("Freelist Merkle Tree\n", merkleTree.toString());
console.log("Freelist Root Hash\n", rootHash.toString("hex"));
console.log("Freelist Root Hash\n", rootHash);

// Client side you would use the msg.sender address to query an API that returns
// the merkle proof required to derive the root hash of the Merkle Tree
const claimingAddress = leafNodes[0];
console.log("claimingAddress\n", claimingAddress);
console.log("claimingAddress hex\n", claimingAddress.toString("hex"));

// getHexProof() will return the neighbor leaf and all parent node hashes that
// will be required to derive the Merkle Trees root hash
const hexProof = merkleTree.getHexProof(claimingAddress);
console.log("hexProof\n", hexProof);

// Gas
//  - pre-merkle: 89,030
//  - post-merkle: 116,863
//  - post-remove Counters: 106765 : 106816
//  - merkle-size-at-650: 115607
//  - post-signature-implementation: 109144 : 109090 : 109113

//  - Coolcats: 149,778
//  - Pudgy Penguins: 154,977
//  - Bored Apes: 260,364
//  - Meta thugs: 157,659
//  - Meta Thugs3D: 169,435
//  - Forgotten Runes Wizard Cult: 168,279
//  - Gutter Cat Gang: 150,000 | 77,791
//  - Loot: 229,573 | 148,057

const displayMetamaskErrorString = (errorString) => {
  let parsedErrorMessage = errorString.split("{")[0];
  let parts = parsedErrorMessage.split(":");
  parsedErrorMessage = parts.length > 1 ? parts[1] : parts[0];
  alert(parsedErrorMessage);
};

export default function CreateNFTButton({
  contract,
  accounts,
  web3,
  refreshWalletFunc,
  openModal,
  tokens,
}) {
  const [display, setDisplay] = React.useState("none");

  React.useEffect(async () => {
    //const freelistClaimed = await contract?.methods.freelistClaimed().call();
    //alert(freelistClaimed);

    const index = FREELIST_ADDRESSES.indexOf(accounts[0]?.toLowerCase());
    const cssDisplay = index == -1 ? "none" : "inline";
    setDisplay(cssDisplay);
  }, [contract, accounts]);

  return (
    <button
      style={{ display: display }}
      className="ButtonBlack"
      onClick={async () => {
        console.log("Freelist Merkle Tree\n", merkleTree.toString());
        console.log("Freelist Root Hash\n", rootHash.toString("hex"));
        console.log("Freelist Root Hash\n", rootHash);
        const claimingAddress = accounts[0];
        console.log("accounts[0]\n", claimingAddress);
        console.log(
          "Merkle proof\n",
          merkleTree.getHexProof(keccak256(claimingAddress))
        );

        contract.methods
          .freeMint(merkleTree.getHexProof(keccak256(claimingAddress)))
          .send({
            from: accounts[0],
            value: 0,
          })
          .then((data) => {
            openModal(
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  fontFamily: "Bungee",
                  fontSize: "2.5rem",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                Initializer minted successfully!
              </div>
            );
            refreshWalletFunc();
          })
          .catch((error) => {
            displayMetamaskErrorString(error.message);
          });
      }}
    >
      CLAIM INITIALIZER [FREE]
    </button>
  );
}
