// NOT IMPLEMENTED YET

export default class ImageCache {
    constructor () {}

    async fetchImage(url) {
        alert(url);
        let cacheKey = "16"+url;
        let cacheResult = this.getItem(cacheKey);
        if (cacheResult) return cacheResult;
        
        let imageData = await fetch(url).then(response => response.blob());
        const imageDataURL = URL.createObjectURL(imageData);
        /*
        .then(imageBlob => {
            // Then create a local URL for that image and print it 
            const imageObjectURL = URL.createObjectURL(imageBlob);
            console.log(imageObjectURL);
        });
        */

        this.setItem(cacheKey, imageDataURL);

        return imageDataURL;
    }

    getItem(itemKey) {
        try {
            let jsonObjectString = window.localStorage.getItem(itemKey);
            let parsedData = JSON.parse(jsonObjectString);
    
            return parsedData.data;
        } catch(e) {
            return null;
        }
    }

    setItem(itemKey, itemValue) {
        try {
            let now = new Date();
            let jsonData = JSON.stringify({time: now, data: itemValue});
    
            window.localStorage.setItem(itemKey, jsonData);
            return true;
        } catch(e) {
            return false;
        }
    }
}