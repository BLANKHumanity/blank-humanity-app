// NOT IMPLEMENTED YET

class Web3Asset {
  constructor(collectionId, assetId) {
    this.collectionId = collectionId;
    this.assetId = assetId;
  }

  convert(assetType) {
    if (assetType == Web3Asset.types.FLAT_IMAGE) {
      return nftCollectionData[this.collectionId].entries[this.assetId]
        .imageData;
    }
    return null;
  }
}
Web3Asset.types = {
  FLAT_IMAGE: 0,
  CHARACTER: {
    "2D": {
      TOP_DOWN: 0,
      SIDE_VIEW: 1,
    },
  },
  TEXT: {
    DESCRIPTION: 0,
  },
};

export default Web3Asset;