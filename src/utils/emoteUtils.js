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
    let sendsLove = ['0','313', '355', '137', '66', '730','373','790','642', '868', '34', '556', '196']
    let lovesThis = ['0', '355', '626', '335', '137', '66', '730','373','790','642', '868', '34', '556', '196']
    let cupWinners = ['248', '46', '757', '868', '475', '407', '556', '184', '758', '184', '758', '421']
    let buyMe = ['466','566','47', '634', '724','217', '88', '96', '641', '484']

    switch(emote) {
        case 'sendLove': return sendsLove.indexOf(tokenId) >= 0;
        case 'lovesThis': return lovesThis.indexOf(tokenId) >= 0;
        case 'CUP': return cupWinners.indexOf(tokenId) >= 0;
        case 'buyMe': return buyMe.indexOf(tokenId) >= 0;
        case 'GM': 
        case 'GN': return true;
        default: return false;
    }
}
function getEmotesForInitializer(tokenId, emote) {
    let sendsLove = ['0','313', '355', '137', '66', '730','373','790','642', '868', '34', '556', '196']
    let lovesThis = ['0', '355', '626', '335', '137', '66', '730','373','790','642', '868', '34', '556', '196']
    let cupWinners = ['248', '46', '757', '868', '475', '407', '556', '184', '758', '184', '758', '421']
    let buyMe = ['466','566','47', '634', '724','217', '88', '96', '641', '484']

    if(tokenId == -1) {
        return [];
    }
    let emotes = [{emote:'GM', emoteImg:generateEmoteImage('GM'), caption:generateCaption(tokenId, 'GM')}, {emote:'GN', emoteImg:generateEmoteImage('GN'), caption:generateCaption(tokenId, 'GN')}];
    if(sendsLove.indexOf(tokenId) > -1) {
        emotes.push({emote:'sendLove', emoteImg: generateEmoteImage('sendLove'), caption: generateCaption(tokenId, 'sendLove')})
    } 
    if(lovesThis.indexOf(tokenId) > -1) {
        emotes.push({emote:'lovesThis', emoteImg: generateEmoteImage('lovesThis'), caption: generateCaption(tokenId, 'lovesThis')})
    } 
    if(cupWinners.indexOf(tokenId) > -1) {
        emotes.push({emote:'CUP', emoteImg: generateEmoteImage('CUP'), caption: generateCaption(tokenId, 'CUP')})
    } 
    if(buyMe.indexOf(tokenId) > -1) {
        emotes.push({emote:'buyMe', emoteImg: generateEmoteImage('buyMe'), caption: generateCaption(tokenId, 'buyMe')})
    }
    return emotes;
}
async function drawEmote(context, initializer, emote, caption, blankImage, scale) {
    const img = await Canvas.loadImage(initializerMetadata[initializer][0].imageData);    
    context.fillStyle = '#FFFFFF'
    context.fillRect(0, 0, context.canvas.width, context.canvas.height)
    context.rect(10*scale, 40*scale, context.canvas.width-20*scale , context.canvas.height-50*scale )
    context.stroke();
    context.scale(scale, scale);
    
    context.drawImage(img, 20, 45, 185, 200);
    
    const emoteImg = await Canvas.loadImage(emote);
    context.drawImage(emoteImg, 205, 50);
    
    context.textAlign = 'left'
    context.fillStyle = 'black'
    let fontSize = scale <= .5 ? 2 * scale : .8 * scale;
    context.font = `${fontSize}rem Bungee`;
    context.fillText("BLANK Humanity", 10, 25 )
    
    context.font = `italic ${fontSize}rem Fira Code`;
    context.textAlign = 'center'
    context.fillText(caption, 175, 270);
    
    const blankImg = await Canvas.loadImage(blankImage);
    context.drawImage(blankImg, context.canvas.width-40, 0);
}

export default {
    generateCaption: generateCaption,
    generateEmoteImage: generateEmoteImage,
    validEmoteForToken: validEmoteForToken,
    getEmotesForInitializer: getEmotesForInitializer,
    drawEmote: drawEmote
};
