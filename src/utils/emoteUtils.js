import initializerMetadata from "./initializers-metadata-lookup.json";
import Canvas from 'canvas'

function generateCaption(initializer, emote) {
    let caption = "";
    switch(emote) {
        case "GL": caption = 'wishes you luck'; break;
        case "WOW": caption = 'is amazed'; break;
        case "TY": caption = 'is grateful'; break;
        case "lovesThis": caption = 'loves this'; break;
        case "sendLove": caption = 'sends love'; break;
        case "CUP": caption = 'is a winner'; break;
        case "buyMe": caption = 'says "Buy me on OpenSea"'; break;
        case "WAGMI": caption = 'insists We\'re All Gonna Make It'; break;
        default: caption = `says "${emote}"`
    }
    return `Initializer #${initializer} ${caption}`;
}
function generateEmoteImage(emote) {
    let emoji = "/";
    switch(emote) {
        case "lovesThis": emoji += 'heart'; break;
        case "sendLove": emoji += 'heart'; break;
        case "buyMe": emoji += 'MONEY'; break;
        default: emoji += emote
    }
    return `${emoji}.png`
}
function validEmoteForToken(tokenId, emote) {
    let sendsLove = ['0','313', '137', '66', '730' ]
    let lovesThis = ['0', '355', '626', '335', '137', '66', '730']
    let cupWinners = ['248', '46', '757', '868', '475', '407', '556', '184', '758', '184', '758', '421']
    let buyMe = ['466','566','47', '634', '724','217', '88', '96', '641', '484']

    switch(emote) {
        case 'sendLove': return sendsLove.indexOf(tokenId) >= 0;
        case 'lovesThis': return lovesThis.indexOf(tokenId) >= 0;
        case 'cupWinners': return cupWinners.indexOf(tokenId) >= 0;
        case 'buyMe': return buyMe.indexOf(tokenId) >= 0;
        case 'GM': 
        case 'GN': return true;
        default: return false;
    }
}
function getEmotesForInitializer(tokenId, emote) {
    let sendsLove = ['0','313', '137', '66', '730' ]
    let lovesThis = ['0', '355', '626', '335', '137', '66', '730']
    let cupWinners = ['248', '46', '757', '868', '475', '407', '556', '184', '758', '184', '758', '421']
    let buyMe = ['466','566','47', '634', '724','217', '88', '96', '641', '484']

    if(tokenId == -1) {
        return [];
    }
    let emotes = [{emote:generateEmoteImage('GM'), caption:generateCaption(tokenId, 'GM')}, {emote:generateEmoteImage('GN'), caption:generateCaption(tokenId, 'GN')}];
    if(sendsLove.indexOf(tokenId) > -1) {
        emotes.push({emote: generateEmoteImage('sendLove'), caption: generateCaption(tokenId, 'sendLove')})
    } 
    if(lovesThis.indexOf(tokenId) > -1) {
        emotes.push({emote: generateEmoteImage('lovesThis'), caption: generateCaption(tokenId, 'lovesThis')})
    } 
    if(cupWinners.indexOf(tokenId) > -1) {
        emotes.push({emote: generateEmoteImage('CUP'), caption: generateCaption(tokenId, 'CUP')})
    } 
    if(buyMe.indexOf(tokenId) > -1) {
        emotes.push({emote: generateEmoteImage('buyMe'), caption: generateCaption(tokenId, 'buyMe')})
    }
    return emotes;
}
async function drawEmote(context, initializer, emote, caption) {
    console.log("drawEmote loading image")
    const img = await Canvas.loadImage(initializerMetadata[initializer][0].imageData);    
    console.log("drawEmote image loaded")
    context.fillStyle = '#FFFFFF'
    context.fillRect(0, 0, context.canvas.width, context.canvas.height)
    context.rect(10, 10, context.canvas.width-20 , context.canvas.height-20 )
    context.stroke();
    context.drawImage(img, 20, 20, 370, 370);

    const emoteImg = await Canvas.loadImage(emote);
    context.drawImage(emoteImg, 390, 20);

    context.font = 'italic 1rem Fira Code';
    context.fillStyle = 'black'
    context.textAlign = 'center'
    context.fillText(caption, 270, 420);
}

export default {
    generateCaption: generateCaption,
    generateEmoteImage: generateEmoteImage,
    validEmoteForToken: validEmoteForToken,
    getEmotesForInitializer: getEmotesForInitializer,
    drawEmote: drawEmote
};
