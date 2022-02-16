import React from "react";

import { MerkleTree } from "merkletreejs";
import keccak256 from "keccak256";
import ethUtil from "ethereumjs-utils";

let WHITELIST_ADDRESSES = [
  // <First Class>
  "0xb36a66271b2c99043fe07c93fc4bd723300d67ae",
  "0xf9eefdb0738147bef77e3b8998fd8b96618552f0",
  "0xaa7997d518d58dab94a9b199f1500470f83e27ef",
  "0xeef44ca98eb0c7e412366c020c6bd3cfaff8b33e",
  "0xcd38e361c232ce889cb4458d90ebc031d63c2a8a",
  "0xc9ecea6ba57f265da0487da2d04cc91469be6ebb",
  "0x5bef93a613d78b3ff56c2439d3ae58a26b3353c1",
  "0x184e1642e3afcd1f4fdcc584cc70f969fae3e3e1",
  "0x91b00ce58260438da95c220ee86c05a1eb8b24dc",
  "0x4c23e6fe44c190df58d29bd46cb2f313b32ed770",
  "0x4df8db1ba624065570712830580de8b39ca3e12f",
  "0x83c4de7ac57dea1a9e1cdb131aabc38f30e015f9",
  "0xd1834a78c8aa03fbefd6a91b1d74c1b1d8837151",
  "0x720bf57f67b6b00b97cbd9d967a0af2427352435",
  "0x5e6ff93a0ac631f2196567b720993c04cf7abdc7",
  "0x399b672b0b7a88eb0cde1b4592b5e7afada2cc05",
  "0x5361d4a080b04bd8db7e4cf3ae7460710bc8191b",
  "0x66c3959b636bea1a86e3133de6c23df342c5c4c3",
  "0x0e24f8be98b14a20cd122a999c7340601f5535d3",
  "0x0e71a0516455835ee197826084ea300a4835f4a4",
  "0x527756562172bca8a0624decf6bf758cc67f0e78",
  "0x10e425c42e0166d30e4d7c64e8135329de983abc",
  "0x59891e64c54e4fc96927d26090377a5a3504b49b",
  "0x18a4ebeea97aaf45d7de8c248b09ab9c25bc1906",
  "0x193cf2a0a1e2002b2b19ae05627cc3f72b9824f2",
  "0x6669eaa1cee9520dcce64b73a71a32cca1d10557",
  "0xb685b6c3394e57f4bf9cfd52b2ff9d1f4793f2bb",
  "0xc94dd5caa29fb3681f08594668db10bdb1ebf316",
  "0x4c9dba5fbbfddf8e006f28d0534f918d8fcf4daa",
  "0x929f48e6c95de2be1c0966360c0789be624a7d30",
  "0xaafb164259d27122530aef535dcd059f5b3dc844",
  "0xc2956790f439e90f018dac98b0058a1187dcdfdd",
  "0x868d076c195fd1a1cc01cf83dd6e65c4e5352568",
  "0xa13b91ed1ddc20ac261c98419667582e5bfa6998",
  "0x85732653a6022c60d369745a9c0f9f4a3c0084e1",
  "0x12048b065277c2381bdb00a3a94e41a4d7444e25",
  "0xa667d416b346222c8e218f68266b530d4b3666e6",
  "0xf6158e06d58e36e6a0998185831e2834ebceca74",
  "0x46e33df60c4d54840c4346c7ca329f48e6cb65da",
  "0xf0bf1c59ee9b78a2ce5763165e1b6b24cb35fd8a",
  "0xa931c46056bd676dd5f7ece7c3dcb11f26f53d1b",
  "0xc2d23d96dab65510c75c90e775b1d386a92b0182",
  "0xd4200fe3a594bb675559eb5843032ac691bca2e1",
  "0x1747b0864c452ed0ed73e25cb3eaa96166eca88d",
  "0xf578475b51f9f77b2421c321d4c0d530942a5448",
  "0xf236cd1526609dd36b5f650f5bcc4e3f8d0b9c58",
  "0x51384e26aabacebb2e770cfe0e0f04f2fecb25cc",
  "0x0bff926237388495e68d58c1616f3d147ff33dbd",
  "0x4978a0ad290b630af892f9fd069e04d92aff170c",
  "0x086f6e29884590b38ab4a6098fac628057454f1e",
  "0xbab64597e8d0eb511a356b56b8dc46c7b01097c5",
  "0xc887aef7267d6369943afbe1ab404807fe08bbd3",
  "0x2ad5a6bd95d37b3c82310a97c5c90c5b86c88d6b",
  "0x299825a1ccfa8a2c4c10a38f8a14d6201f98daaf",
  "0xe666357001eb9e23a7df12fe3c6d53207a673969",
  "0xba357331135ae6a4714b82c95be523ef7ff4748a",
  "0xef205e1a13587ad52759cf675b8142120caffc4a",
  "0x5d986a56355d5f8f7079633bdd88c77b4bb125bd",
  "0x64abb85cc94de5e0b56b2a1139b7da70a7cd3b01",
  "0x54bb529efe28e8dedc66cdf4638a71ff3bd9cffb",
  "0x83448a9cdcb456bb58577c141cd77e311244a156",
  "0xeaf7814cdf7236bc5992d19cc455f9c92b00aa9e",
  "0xa159370375239b83bd8e23c09fb6470188b751ea",
  "0xeb546f8dece2463b7ee9c5a09bf2f741ec705daa",
  "0x367cdff10f1b6c9801741677f943d18942cbc841",
  "0x0b5be21b2b2c36b9d50db382331ed87facf65d06",
  "0x6e7b6b98d55b42ecd81607d6eed8013ba80e63c8",
  "0x9156f20136360aabc3f940af745aa989c0761017",
  "0x4fcf1faa1e54763b196dd33c2bc58c060e9e2dba",
  "0xbbbaa9b374136a2fdef831758fd6d00f0aa116f5",
  "0x1bd508508236afd8856162148857d7a9bb0282aa",
  "0xa7ef08585b7188bcc140053b039933620bf7e04f",
  "0x653b49aae6f7c897496e50eb5744c00bf63ab468",
  "0xd874f397202b032e2611cf999ff737da419233e9",
  "0x6fcd24d4d7eed10b9ffc14994fc90bac3b1f8074",
  "0x6d5a7407c87dfcbb9b287ea22fefdf48f601096a",
  "0x99ecdf9c2d86646756f1e22b428f31479145896f",
  "0x0e88cbaeeae8d34cf6b1f160e27ec01bcbc3c8cd",
  "0xa3c731882bbb5c2f19abcbbab06c22f20745ef2b",
  "0xd49cd47e11ae663c74942c4f75f16f0ac9ad891a",
  "0x63389e216b926ec5f705d47028765c35c89825be",
  "0x803028dd9d3b5fc1b12e48b4f3f4218cc6470146",
  "0x60abd7ef66abaeb6d84aad20e427cf88626a23f0",
  "0x5383fc41ed11a8e35e2c9f92df8928e8d71363ed",
  "0xd3d5338526ca1a4ce83ab3e43750e100bfffa698",
  "0xc000f1c46f62872baab948ec6e8593c73c1c41d7",
  "0x6232d7a6085d0ab8f885292078eeb723064a376b",
  "0x2cdaaf054a63c2eaea23a7a071e39be872f2f808",
  "0x976a9848e2784d67ce1d1b51e70c3da05b98d65a",
  "0xa137e571d0db7e29f216c09cc1e421daff76b54b",
  "0x743427b10a4f9cc62ef3c2a1837c9332b1e10639",
  "0x1f7208e63517810ad4e74d553ec0a627f58df5c6",
  "0x9dbb8602b12752b67601ef5e4e7f21e7a820c3b2",
  "0x2319a6bf662f53407b196391c6ec02b4c134ff00",
  "0x2eb7735ec78c556ca3ca79a31dd8f733c2c97bad",
  "0xb35d79b2e0352847e8b86b29dc901d57f29a3a60",
  "0xc043bae8a02bbb4aa89ed479ca0b1e70ceb7d5e7",
  "0xe7e73eeb0adc93a413c3058dbba80e7b406d7b16",
  "0xa8d0978af3ccd66db6b241c671c49ab43d1ad21a",
  "0x81bd310a8209ea967d7eb1e48e2790dc7574a4ea",
  "0x6e7268d5d6867d85c8c54940275d50f14ec493aa",
  "0x870b901de303326e34214b54ff0aa5564b912739",
  "0x8bf6209c94376455a7d451569e1a119e3bb5e26d",
  "0x9b62065d64b73742ab7163327dccfc4a119c2eab",
  "0x7a16d8f5ebe68295b99d623c33845a41c3c015c7",
  "0x5d8c4ea57b8607ce3d3e220574e291ac98797e9a",
  "0xe6d8796db42080df3bf047961d9cfb274865066e",
  "0xc88370e40d7d958f5d8b2267df46991200019081",
  "0x15d3ffac9b7d5dbbee095910db6380040222b99f",
  "0x7d422cf705af9ea93919b1a6e843b2f9f387562d",
  "0xedcf12b46f57207ec537eb73c4e2c103a32b233a",
  "0xb8d7ce8a5bccb9a17daec5f55d334f1522a0ff13",
  "0x86ebc443fe43198284e2a87221973d6d357d77af",
  "0xcd0033cf0d951aeb24b41755ccf1f2bfbe39afd5",
  "0x90a6571aeb708f880d8e24e2f382814255b1d808",
  "0x4eee48c710b2253dcfce9df38d72c39e05a8d3d5",
  "0x0ec9a2b522bac8f7fe0cc80cfe9246e0194bae1e",
  "0x3330777cc5270db65e7df1d738e989dc16dd49f2",
  "0xd816815d7b494751b67f1476259f50d6ae98acd7",
  "0xd0a7163287b66b3ff6b131b1f4d9158234aa9d21",
  "0xcd80cc9f5c2dfa096513ec2c8be3ab80c5da692f",
  "0x2b6991a61dea4523f234a38cc05433ed48c8de43",
  "0xaae3595a5407361a49e8d17c1fb27bebe4f044fc",
  "0x00c71f8c497d8950553fcb874f4a8cf74dc88629",
  "0x49718137e1f35fb8b5d406718288fb8e35037afe",
  "0xfe538941511816fff651bd8dde0de33aaa7df1ce",
  "0xc55c754b9f11198bfcb5b6f1315d47daada0c4ab",
  "0xa78cf0a7ebf25c0b76e87f79ab350259a682802b",
  "0xf2ca8e268ff99511aaba1c2aa1d54e4c84823699",
  "0x728f1973c71f7567de2a34fa2838d4f0fb7f9765",
  "0x11052cdaa23263ce7de883e031e0230772cd4337",
  "0x60b27b6aca4d8613123eef40fe8147b4e416a322",
  "0x93a7a53a503957288df0ec9a7ca65c9252445e98",
  "0xd048645bff3f2767c3481e3f267baa3a5eed83cf",
  "0x92a394fcdfc8c1cbedc9419247928354a13de535",
  "0x3ad00a76e919e2ca896aa1ad7fc4014dbe5beb30",
  "0xced7c7da1e1ac247f27774983cde4eb009168177",
  "0xe8223c581be532520c8b48a8658df4948536b2d0",
  "0x0e1ca0c78c85457e04dd6f256b290f6c31b7629a",
  "0xf256c4c027ce81cd471200a862f11124010e0d1d",
  "0x97a98831cd8e567666720433c0d3a88b6f01406a",
  "0xc6b476ea210154ab1b598a4ac437e9af7961128b",
  "0x36c9f61fcc140888e5abae2da48649f58337abd7",
  "0x676e09fac0b651c767c20d142a5df7fac8dbd027",
  "0x5aa14cbbb35263e1aa4e3957a8edbe849a8c736c",
  "0xe7279bdb852bb53ce598c46c56187f8880a3b589",
  "0x0263ddf9b96c6ded997564bd7f3b427411230936",
  "0x0622a43efd3b403ee8ecbedc661baca51a21a25e",
  "0x476be792a8b1d9b9d1c19376a9f8ab7d1e8dbbf6",
  "0x28834f2c5643c7d490f51ca60175beda7729ec89",
  "0x92a021c3b21dfff0192175831791fa261bdf7018",
  "0xe07d7EFb3D15E121AF895b0348E4fB9a0843ae30",
  "0xeDa1fd7015088a62Cd2192EC872da67d5deBcac9",
  "0x13c9C034E4b8d7d3A074952286566Cd5CE6BAE54",
  "0x7d029d01dd0db5be5b7bec76151a49eabd3a081d",
  "0xda3845B44736b57E05Ee80fC011A52a9c777423A",
  "0xbf1d492a4886C2A8C494872A31F9fd07b5055314",
  "0x6E7268d5d6867d85C8c54940275D50F14eC493aa",
  "0x46F993030f1e16Af2c29306B21560e52ec3958F1",
  "0x04Cba99bf19958470d03BE77Fd1936C1AC73784D",
  // </First Class>

  // <Form>
  "0x29dc34ac5cd703df0781ce4e625f4e7bf5ad3dbe",
  "0xf0bf3b6a7277e56d0bfe36d97599ed0c8a7a8826",
  "0x009e4fed716e4dd1afa7b724262bfd8b33f0f352",
  "0xa0a4f39ff25f51f3ddd0a64398b1140f807c35b0",
  "0x44076da9b8900ee43b4592ecb8c9d5427c676fca",
  "0x49e375566cdec21741266166c9bbd1cd1d0e1a7e",
  "0xcb65eb6e9c48d110c02f89d3c9a13255f5f865a6",
  "0xb069965b9ebb09f18e4e44fff2908b32677ced09",
  "0x47c233c3134576c12204e0b8b9e5a10bd7036ca5",
  "0x06cb63810382d38670a4d0c374f1b6ab0357db76",
  "0xd048645bff3f2767c3481e3f267baa3a5eed83cf",
  "0x6a4ab14ac091fb7bfe777b98b4eb921d9df9630e",
  "0x969e52e0b130899ca2d601bd5366c33f1bf6e393",
  "0xc33d66f54a3a77ba2832d55303a6330a4d69257d",
  "0x44ee1f8ebbb0c2724ea4e6e946e02fef646920a5",
  "0x975f1be5fbd4ab7a9b77b6dc32fea6f4e26908ad",
  "0x4fb5ae963c4fda03d98fc3ff8ff287fdf49de548",
  "0x61dd5a121b61b7eccfd765a96ae36885cabd089e",
  "0xa0ba9d15defb5e4667fd14d2a65be5b4b191948e",
  "0xca28c224f5c4e8f491747d95f06c569757eaef95",
  "0xa86b1ab5bc759fb0b7fc8611e1705688b747f487",
  "0x17cedda24ce320f5a9eb1d1223f92edad5294efe",
  "0x8daff7be83f1066de2873449ada2b7a33e3f6a22",
  "0x36c9f61fcc140888e5abae2da48649f58337abd7",
  "0xb44406147e7b39cbc6f697c6002331c33d334f85",
  "0xe7f4fb77920dc6ce633bd90544cfc3c4288135b9",
  "0x1e32a4f28772c2be8e73d950ae29637f3c222b5f",
  "0x571e62e75238c840601ffa42238e9eaf0f7b52fa",
  "0xbca7ad7ccd22eace6b4147392abe19645801e180",
  "0x2cf3a60e7e30b1947920458a2c132beed0608952",
  "0xba595d92a314d7da8d31971bb227c0c002a04041",
  "0xa1d2ab323eaf3b1f79e4392a307bc8aee2ffe4a8",
  "0xe120eddd8a1fea7d73aad75d8ed8406988b2c98d",
  "0x33f9e0cedcb2d94fdc89fd81cb57399e370ca768",
  "0x14e63ebf08494c7b2f9934ec9dec6154d529d033",
  "0xc6949d02e6348d5d16ba32d8ec4439e9174ca897",
  "0x0a9dd8abc25b76220220c1cc6821e923e446dc69",
  "0x93a7a53a503957288df0ec9a7ca65c9252445e98",
  "0x9160a89fad3d0ab0f3c8a80047389190d0424bc1",
  "0xa9b1bdb7ef96a6d9ed06baff6887463e18ae1b93",
  "0x5aa14cbbb35263e1aa4e3957a8edbe849a8c736c",
  "0x4b47b59c5b8119bb7afb41361303ef0f1c1d662a",
  "0x8bace3a49a375027868cdd34e84521eed1f1b01d",
  "0x89e61810011d8f032f92ff1f3f9680e2d2fee83f",
  "0xe44037734ca7997dc263f2cd98c2876ec42b780f",
  "0xa07ce69f0b838b9d3e6f4e03bd7bedf34fce3088",
  "0x3913d13611d2f128e3e1d3ee7daba53e4d37a2c8",
  "0xeaaa433c3ab4f150c713d12732b75c8962169205",
  "0x2fbd2271fb7c58091fedfbec1207d14685b803b1",
  "0xaf8e191994e4b1024257becd94a22d097c2f958a",
  "0x31231036ed51376a70b3824d7da1a4e036def5a4",
  "0x5fb998b8024e38867558fd5e2b87b6d13da730f8",
  "0x261f7bd1d1534feba8233ada20344c3a71bf5854",
  "0x5030af6967df26a2bd7788b1d830c952e8ae66e4",
  "0xc8798b25d002ff2173be5dba9c2a092aac9bf045",
  "0x0e1ca0c78c85457e04dd6f256b290f6c31b7629a",
  "0x1510a36fe74d0929255e77ffdd03306eaecba7a5",
  "0x1101fae93a2179fbb3ae3329d92aeaafa9882078",
  "0xaf0b33e976fc2d980dcfdc79d481560a5ba3ea76",
  "0xf8063f60f29c82561f13b42ffd7c5d1be89b462e",
  "0x05362b3aca6da7a176ab819a8350f26384962169",
  "0x915b472dfa70c8fe9d074a8c859089c44252d6b8",
  "0x5b25e6ae547ba6a26ef5bbab21d413d872a1c538",
  "0xc781196abe064a21171045732e674121533d338c",
  "0x4f9601e3915fe3fb1e769c155c8453fd9372becb",
  "0xba0fa0b8c5970c7822dff0b0b56b78e5a67dd578",
  "0x8b01553bce7f63864058dc632a25f2b0f56810c2",
  "0x339e2f6baa1e2d607095adfc032f1d9161ca34d9",
  "0x8f289fdee17ac14fd4f6af03663aae19a6959015",
  "0x26c9fc612b005781127246bbc5dc39f823e3106e",
  "0x0ff0cc6ded3fef4224b2716531ba55df59d96a06",
  "0xd4c709cfdc3f68abc798ac5e2219c0780699c3b0",
  "0x0263ddf9b96c6ded997564bd7f3b427411230936",
  "0x021d5abea6efbcd5dba2c8ae9237471448ea0856",
  "0x43652e08291de9dd77170c0b010fa34310d8c1cf",
  "0x27085dbded6d7608d3bfc8e576cc719b50bd53b0",
  "0xbfdbffd80741f83c4c8a86ae706c83a721e2583e",
  "0x73efda13bc0d0717b4f2f36418279fd4e2cd0af9",
  "0x92a394fcdfc8c1cbedc9419247928354a13de535",
  "0x500898b272d3454d7ce39c1e99b469deffd92b74",
  "0x46de1f4ace0d9d45c026e6fd2f70c51e6b74ad03",
  "0x003960e60110fbd8e2b790f1db1948a798258016",
  "0xbcdb110bed266c068b0fbf937e4701b07727a583",
  "0x78684661261cf386764f683f24e7bcc73ef21c04",
  "0x7c62be81b4372202e090ee22cae8a8f643f4469e",
  "0x79d16570483afc8c749216bfc0b8abf759ead7c4",
  "0x8c971904ecefdd1dd958e8073fc14d369fcec4a3",
  "0xc439c6537d0f6c6ec208589abe077de66dc38592",
  "0x83c1baf7de0f9846f0fac84fab2b3242e43c25a7",
  "0xc2dd87e991f2eeeb196b2b5e4db15d0cb11448de",
  "0xbfe440c533f6861c00e71ce187f37a1a70b7b7e9",
  "0x92a021c3b21dfff0192175831791fa261bdf7018",
  "0x94b6623e1b6d36a3f9d9e4c156f6937206edb256",
  "0xb43d184ec7d4d2acb4ebc8db53f4031bca9319a4",
  "0x54e01761b31463f9a7975f346ca9694411dca533",
  "0x68c5a8cc46f4598a973137afb9bb9e4fb62e3f4f",
  "0x0622a43efd3b403ee8ecbedc661baca51a21a25e",
  "0x4b2aad37a7d72daf30bb012033bb4ddcb6779daa",
  "0xa20c73a59868df6afff7c96cc3233ddc07efc818",
  "0xdd17577f94f3bbe861abf9156b5960c28ca01e2d",
  "0x210abbe2558d5f5b9de448904242a8d9b4af4474",
  "0xae85cbd28fd67a7cc24c481372d4f1c3a6f5ebaf",
  "0xb8dd73e2ea229aaa8b8f8371527a5c0a4271dc82",
  "0x246fdee8bcd65db79fc1f4a1104f041fa6c94c84",
  "0xae150fe9af090eceded52dbadeda6236f3acb865",
  "0x28834f2c5643c7d490f51ca60175beda7729ec89",
  "0x548c3a549341422d293ca069a096886d3ed2489a",
  "0x2a881f5c9bf385621f1ba9e5a26eb767886e1705",
  "0xcba202f6c6684c497c3fb7740a6f6ba14041cde8",
  "0xf84a8732215516b9b084c0e0a341660d131f2f04",
  "0x7b577aebddbf0a921b0d33e133b42830da319281",
  "0xb21d08fbaab4a1bfd2e3a01d3dc8eb62bb159a54",
  "0xdf3759cc2277adcdb0a97b8ac1469a6eddbc6a8d",
  "0xead191450217f8e0fb0b2339746417552c9db542",
  "0xf839be76b49d329886216a024a7d3ea2a3ca2ce0",
  "0xc683c8bd3421dc04f0e240fa13633d20c0969da1",
  "0x26f2c4a2ee5b816e2fa7cefc0f5b2b77cab793f1",
  "0xbf692a5c58f40789be47b532d6277143cfd4d0ef",
  "0x79fba65f42731e4a4db8472f0b2a5b48d0b4e7f9",
  "0x1c65a404561d5c7279387ecf17cae224a2c07f69",
  "0xe7279bdb852bb53ce598c46c56187f8880a3b589",
  "0x5bcb5827db0a2c6bcbe02585ec26a2b09f35c612",
  "0x49396a88550d8a6c733fd09da9184986cd724065",
  "0x827bf5006a21275919879182c8fb5f7287c1dbb4",
  "0x8b7ae9db845ff3eae47fe1070224f62e12b2aea9",
  "0xec497fea4e5ffc001b4974badf2f099b3e968623",
  "0xfc081acdae2419d6cd9765fa56d999e6936d3364",
  "0x0fb1b32ac9777a0d4fffb63f0a66447a9744fec4",
  "0xe7c876e2df13c51c0772b64e0cc49b271dd86660",
  "0xced67633ad12813c68701a0e4cc171711f700de1",
  "0xf256c4c027ce81cd471200a862f11124010e0d1d",
  "0x38b175755d17e6967131d4f8b22d42e58e33d1f8",
  "0xf84a8732215516b9b084c0e0a341660d131f2f04",
  "0x44c732305b07c4cd9f9a80bfe69ba0c33994f81f",
  "0xe1d8aa55aeb8d31e37fea45bc20e728350f79ad3",
  "0x521136a331357a646d3807b80cd53b9580a9fe72",
  "0x9553803357f9441ee426e701a1bd8031f814fcf0",
  "0xc2060395eb0524105c78946545c68499ea5fb904",
  "0xd9391e91e53ae4de86e2fc81709b98d0c4350aaa",
  "0xe466fbb1789906df3cdfa9367f71f455124fb1b1",
  "0x5a67664a62e96ede5e11b470c27e1bc66e2e52ae",
  "0x2ac0b77652cfb7ebde8190d7c3e1a41e18dcc66f",
  "0x0ff01f45d1182d0bbed1cdeca3d2fa04a418b9f0",
  "0xc0acaa668af06267e1c8850bdda28c0431d313b4",
  "0x7c9f1366d665e9119d316fe6b39769df7c77333d",
  "0x45e8f725f517510c8572a677e82f7530c879fa02",
  "0x82a9629ffac41e73c20bbff329c330977b49152d",
  "0x1c2ec842aee90d5a704b0c4d81dec4562a09e256",
  "0x2e8d1ead7ba51e04c2a8ec40a8a3ed49cc4e1cef",
  "0x9b50f5d1418ddc165be9d9fcfd43b2f4b661b445",
  "0x3e44938a81fb0dd0379985f019e0833f5ed279da",
  "0x43589c959522fcb973777fb906fe5855eb4e17d4",
  "0x679cb6d704e5c29d0c635a7efcd6eb7c05e29359",
  "0xa0b08e1036a2de64bfad268ba7f829a52004391d",
  "0x93f1df2f8186dc9b4299791beab811b0dbf1eb50",
  "0x1f771818c74a052226c01ebad909640a3fd97b43",
  "0x181dbf806698770eb535fbb71197e8c56c743567",
  "0x8d5ba2b764356ddc9997fed94dcf83367e8a10a2",
  "0xf342918ba2d0fcafd4f95cdcc42942ea239ba58b",
  "0x31fb7a1a1ae56a90e27a60d89dd9fcb9143ba4a4",
  "0xf8de9086e7c1b942b26c97632499b852069c513b",
  "0xafbdd2d869bd8345f33d39b69b45a43ff9014289",
  "0x73dd241ba9d8a377a8dbc574ae80a41e99a0c44f",
  "0x475c3edf728712510b2cadf65207254e18ee5134",
  "0x4bc2d0ee93208efcf5683a2ca680f28270b7de6e",
  "0x5529e0608cfc0cab5bb86b59cba7e88f0f66dfef",
  "0x8c04d9e45c8af805a5877b7f6611e7bd2bddac38",
  "0x02921b748ceaa69aeed87873f2d224dfc104a0be",
  "0xbb9a59009b299c1a0f341579744cbeb223a29703",
  "0xdb7c46bce47aeeeef1c77dd6795f032807e4a3cc",
  "0xb98c6c44122c2d4e78f7d3fb39560e79af47a987",
  "0x8d1f252306964cf4e7ff8171f2e361e8897fd997",
  "0x0aba23c36cbb13ec28ebf56c9a65390d51765269",
  "0x5c818f2134150d7d487447b6e2dab7508d411268",
  "0x9bd4e0a81d4f46d7cd5c76a27f914def62bef507",
  "0xf7fdeeed754b2e5fd9d826bfdf18844ee7e2d303",
  "0x925051bea66cf6e88879667249f972f71a002c0b",
  "0x3b0b262b187001522c34edcafc378500133ab230",
  "0xe2bff4f622990a6f5a7c5083727f5ac2ffe81548",
  "0xa1d9f391f2ac4c479829789448c7489cf39d632e",
  "0xba76f21f81030fd6a853450036de90a54aa127b0",
  "0x62eaa51dcac065abb55eed7047785a0080e7dfb4",
  "0xc9a4ddbc437d2dd5ea8a69b1d803122818a39a0a",
  "0x6247647abe2c5a1bc34a479ea88274654d48f820",
  "0xffaef01b3b7439e799e72614cedf5e6b8a413e0f",
  "0x6354af3b0aae01361d23eca76a7ad1b1538d9e1c",
  "0xe0abd47028621951376e95b2a167d2cdec4239b3",
  "0x2def8426c472e52be12500e9735024f64ded8388",
  "0x345f0fd499d1f2001890eb4a2e78456de0903499",
  "0x6e4e939b5f16b4e3e8fe1af51b30a99b33b5be37",
  "0x9435ebd1a2d75df7d1969ead01959d09a39ad4ee",
  "0x6e366c4945ff7ff4421a2ff5a2d7c06d55f40a66",
  "0x2e3c41e8f8278532326673c598fdd240a620e518",
  "0xc082bdb52b9f341d8ab5d8ae9da708d13c230cca",
  // </Form>

  // <LastChance>
  "0xC39a9E81F589B9D4AED50257798a96f72AA52fa8",
  "0x6f577d9ffedde24d678bdfa47891a2712a74106c",
  "0xcb881662bb82e56fc0e8b4494c12b3ab7e6d866a",
  "0x8252dd05a6c4b70b67819ecc90222b2cfaac816c",
  "0x9dcaa39a7fb46f6d7281c636253473e43912dd04",
  "0xac65102bb7d79488a32d84c5d61efe27b19fb9f6",
  "0x6edb821d904c54bdffbcf82a8e85625eb4747c66",
  "0x4d96140fa1d4aa736fc8d882fab7d42cf454a4e9",
  "0xe46bfc3ac7743e2d693d60ebad719525634e23e4",
  "0xa17fab77e4618102311a884ae43613818aeb8182",
  "0x3052fd569c9eacb7124b992fc08a753e8f349e30",
  "0x1795011ea0d47f3dbd757b77fdaa3f0366208237",
  "0xf6e0ccbfea6405e3d6773c218c58c4273b602dba",
  "0xa57a335a9bed55758cae084953a6993778aa9ef0",
  "0xc5c0b23f6f3fcf82e3fa8b8b3b5141a8ec67e04f",
  "0x4660fbb1e7c72abddcf4d90b244887e3521ad3b2",
  "0xdbcbc399f03cfaddf331bd34e2671483531bc8d7",
  "0x8965972f68f45c8960d490ca1924de744ef4173b",
  "0x3b1b5fc4c0387f5b6669a0c5d00d55ae3cc2a96e",
  "0x0de8a2518c237034c74d17993ec0b7bea6d84ecb",
  "0x877167231d569c9fcf5e7a5e2b073c7cd41f2cff",
  "0x26e1c74f2fc8d762da3ba04d2e6e9cca1c237dd7",
  "0x14f13489d3d9226804c11469670adbe3836986d1",
  "0xeb6f3eaa5d0e30f1b860b913fcab911f904907c9",
  "0xf80d855cb496bed01098e153a7f51cf8466fc5bd",
  "0x442bb35922f74ffa159ec22a9e0734e5b72f7d7c",
  "0xb7095d17208d3b46535dec1c4e402fc9f18e088d",
  "0xbe9861bea57bdc42db809859d8dfce8ec6158bbb",
  "0x23c374174ac4fa50a4419eded8cc269931458064",
  "0xb3506d27b8a3141bb3a33031c1cf6b1069957bf3",
  "0xa7dc01d857b60399065d28217274733fb1e1af41",
  "0x77e90e761c7db3e174bf9df3abda5aa606d6a6ea",
  "0xa8fb2a98531028ed2a8de346c260eb51e8f69c13",
  "0xe27f9992d1f1aab8733e40253c969f51a273e2fb",
  "0xffebb19a0b600e9cff9e4ec12f5af51e94233c11",
  "0x75412da25455760f5ede303bd4d092b03215844e",
  "0x9e635293c11f5f30a5c581d334449c024099ae35",
  "0xf36222036ff16cfdd1ddbf0c1a1d9ef513ba2864",
  "0xbba1d8028cc2a942ea678e6fcbc17946784b1030",
  "0x38ed9bc1a1e17662cafbebd359f6e9122fab7314",
  "0x078a5f2769d9f610aba0611448d926cf1dd40a6a",
  "0xdabe12325b3b39983ca631e6db0c3ebaaee72322",
  "0x464ea24d56457fa6495c1d1029e4fc575d10e967",
  "0x9772b0b9e7d88dc1908dc4d1bf2e12308d4da4f9",
  "0xbc3e746c622a4b8b3f70fcf43c0ff0d4c66452fe",
  "0x3d8e8d37a368e66938df83614aa9b42505323688",
  "0x1a2945671fa4fb433700e1549da9180c795ec33d",
  "0x6fcfac1161dd95c2fdf01876c243fcf72e0fbbe4",
  "0xbbc345e069268ff9a54481cf6bb5845a51a351bb",
  "0x7dbed7cd1d00446e8daba39d65b819e5e429b20c",
  "0x7729b443074f14ecc550e95ad17572abf353833f",
  "0x4502073918CDdA06F73924B958F685Fa0aB07624",
  "0x05B2D5aEd4d07ABea2c2C9867E4bfE22b322777D",
  "0x187022f33B178d17d1369fB0b82115B6415cFdc4",
  "0x7DBEd7cD1d00446E8daBa39D65B819e5E429B20c",
  "0xd67D4226DAA040F969b1181B6cd4e5F8BF6cAF8d",
  "0x3b1b5fc4c0387f5b6669a0c5d00d55ae3cc2a96e",
  "0x078a5f2769d9f610aba0611448d926cf1dd40a6a",
  // </LastChance>
];

for (let i = 0; i < WHITELIST_ADDRESSES.length; i++) {
  let address = WHITELIST_ADDRESSES[i];
  WHITELIST_ADDRESSES[i] = address.toLowerCase();
}

// leaves, merkleTree, and rootHash are all determined prior to claim.

// Creates a new array 'leafNodes' by hashing all indexes of "whitelistAddresses"
// using keccak256. Then creates a new MerkleTree object using keccak256 as the
// desired hashing algorithm
const leafNodes = WHITELIST_ADDRESSES.map((addr) => keccak256(addr));
const merkleTree = new MerkleTree(leafNodes, keccak256, { sortPairs: true });

// Gets the root hash of the merkle tree in hex format.
const rootHash = merkleTree.getRoot();
console.log("Whitelist Merkle Tree\n", merkleTree.toString());
console.log("Whitelist Root Hash\n", rootHash.toString("hex"));
console.log("Whitelist Root Hash\n", rootHash);

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
  const [openToPublic, setOpenToPublic] = React.useState(false);
  const [price, setPrice] = React.useState(0);
  const [inWhitelist, setInWhitelist] = React.useState(false);

  React.useEffect(async () => {
    let _inWhitelist =
      WHITELIST_ADDRESSES.indexOf(accounts[0]?.toLowerCase()) == -1
        ? false
        : true;
    let _openToPublic = await contract?.methods.openToPublic().call();
    let _price = await contract?.methods.price().call();
    setInWhitelist(_inWhitelist);
    setOpenToPublic(_openToPublic);
    setPrice(_price);
  }, [contract, accounts]);

  return (
    <>
      {!accounts.length ? (
        <span style={{ color: "rgb(0,255,0)" }}>Connecting...</span>
      ) : !inWhitelist && !openToPublic ? (
        <div style={{ color: "rgb(0,255,0)", fontSize: "1.5rem" }}>
          Detected address not whitelisted
        </div>
      ) : (
        <button
          className="ButtonBlack"
          onClick={async () => {
            console.log("Whitelist Merkle Tree\n", merkleTree.toString());
            console.log("Whitelist Root Hash\n", rootHash.toString("hex"));
            console.log("Whitelist Root Hash\n", rootHash);
            const claimingAddress = accounts[0];
            console.log("accounts[0]\n", claimingAddress);
            console.log(
              "Merkle proof\n",
              merkleTree.getHexProof(keccak256(claimingAddress))
            );

            if (openToPublic) {
              contract.methods
                //.whitelistMint()
                .publicMint()
                .send({
                  from: accounts[0],
                  value: price,
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
                  //alert("ERROR");
                  console.log(error);
                  displayMetamaskErrorString(error.message);
                });
            } else {
              contract.methods
                //.whitelistMint()
                .whitelistMint(
                  merkleTree.getHexProof(keccak256(claimingAddress))
                )
                .send({
                  from: accounts[0],
                  value: price,
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
                  //alert("ERROR");
                  console.log(error);
                  displayMetamaskErrorString(error.message);
                });
            }
          }}
        >
          MINT INITIALIZER
        </button>
      )}
    </>
  );
}
