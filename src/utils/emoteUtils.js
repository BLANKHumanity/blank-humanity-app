import initializerMetadata from "./initializers-metadata-lookup.json";
import Canvas from 'canvas'

const sendsLove = ['0','313', '355', '137', '66', '730','373','790','642', '868', '34', '556', '196']
const lovesThis = ['0', '355', '626', '335', '137', '66', '730','373','790','642', '868', '34', '556', '196', '313']
const cupWinners = ['248', '46', '757', '868', '475', '407', '556', '184', '758', '184', '758', '421', '313']
const buyMe = ['466','566','47', '634', '724','217', '88', '96', '641', '484']
const GL = ['0','355','313','143']
const NICE = ['0','355','313','143', '493']
const puzzleSolvers = ['11','62','342','192','248','66']

function generateCaption(initializer, emote) {
    let caption = "";
    switch(emote) {
        case "GL": caption = 'wishes you luck'; break;
        case "GL": caption = 'says NICE'; break;
        case "WOW": caption = 'is amazed'; break;        
        case "TY": caption = 'is grateful'; break;
        case "lovesThis": caption = 'loves this'; break;
        case "sendLove": caption = 'sends love'; break;
        case "isAWinner": caption = 'is a winner'; break;
        case "buyMe": caption = 'says "Buy me on OpenSea"'; break;
        case "WAGMI": caption = 'insists We\'re All Gonna Make It'; break;
        case "earth": caption = 'says Happy Earth Day'; break;
        case "Puzzle": caption = 'can solve it'; break;
        default: caption = `says "${emote}"`
    }
    return `Initializer #${initializer} ${caption}`;
}
function generateEmoteImage(emote) {
    let emoji = "/";
    switch(emote) {
        case "earth": emoji += 'heart'; break;
        case "lovesThis": emoji += 'heart'; break; 
        case "sendLove": emoji += 'heart'; break;
        case "buyMe": emoji += 'MONEY'; break;
        case "isAWinner": emoji += 'CUP'; break;
        default: emoji += emote
    }
    return `${emoji}.png`
}
function validEmoteForToken(tokenId, emote) {
    switch(emote) {
        case 'sendLove': return sendsLove.indexOf(tokenId) >= 0;
        case 'lovesThis': return lovesThis.indexOf(tokenId) >= 0;
        case 'isAWinner': return cupWinners.indexOf(tokenId) >= 0;
        case 'buyMe': return buyMe.indexOf(tokenId) >= 0;
        case 'GL': return GL.indexOf(tokenId) >= 0;
        case 'NICE': return NICE.indexOf(tokenId) >= 0;
        case 'Puzzle': return puzzleSolvers.indexOf(tokenId) >= 0;
        case 'earth': return tokenId == 900;
        case 'GM': 
        case 'GN': return true;
        default: return false;
    }
}
function getEmotesForInitializer(tokenId, emote) {
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
        emotes.push({emote:'isAWinner', emoteImg: generateEmoteImage('isAWinner'), caption: generateCaption(tokenId, 'isAWinner')})
    } 
    if(buyMe.indexOf(tokenId) > -1) {
        emotes.push({emote:'buyMe', emoteImg: generateEmoteImage('buyMe'), caption: generateCaption(tokenId, 'buyMe')})
    }
    if(GL.indexOf(tokenId) > -1) {
        emotes.push({emote:'GL', emoteImg: generateEmoteImage('GL'), caption: generateCaption(tokenId, 'GL')})
    }
    if(NICE.indexOf(tokenId) > -1) {
        emotes.push({emote:'NICE', emoteImg: generateEmoteImage('NICE'), caption: generateCaption(tokenId, 'NICE')})
    }
    if(puzzleSolvers.indexOf(tokenId) > -1) {
        emotes.push({emote:'Puzzle', emoteImg: generateEmoteImage('Puzzle'), caption: generateCaption(tokenId, 'Puzzle')})
    }
    if(tokenId == 900) {
        emotes.push({emote:'earth', emoteImg: generateEmoteImage('earth'), caption: generateCaption(tokenId, 'earth')})
    }
    return emotes;
}
function getInitializerTrait(initializer, trait) {
    let traitReturn = ""
    initializerMetadata[initializer][0].traits.map((metaTrait)=>{
        if(metaTrait['trait_type'] == trait) {
            traitReturn = metaTrait["value"];
        }
    })
    return traitReturn;
}

async function drawEmote(context, initializer, emote, caption, blankImage, scale) {
    const img = await Canvas.loadImage(initializerMetadata[initializer][0].imageData);    
    const initializerColor = colorLookup(getInitializerTrait(initializer, "Color"));
    const initializerBackground = getInitializerTrait(initializer, "Background");
    console.log(`color: ${initializerColor}`);
    console.log(`background: ${initializerBackground}`);

    const baseImg = await Canvas.loadImage(`public/emote-template--${initializerBackground.toLowerCase()}.png`)    
    context.drawImage(baseImg, 0, 0);
    drawInitializer(img, context, initializerColor, 215, 135);
    
    context.textAlign = 'left'
    context.fillStyle = 'white'
    let fontSize = scale <= .5 ? 1.5 * scale : .8 * scale;
    context.font = `1.5rem Bungee`;
    context.fillText(caption, 320, 470 )
    console.log(emote)
    if(['lovesThis', 'sendLove', 'sendsLove', 'CUP', 'isAWinner', 'earth', 'Puzzle'].indexOf(emote) >= 0) {
        const emoteImg = await Canvas.loadImage(`public/${generateEmoteImage(emote)}`);
        context.drawImage(emoteImg, 675, 50, 150, 150);
    } else {
        context.fillStyle = 'black'
        
        if(emote.length == 2) {
            context.font = `5rem Bungee`;
            context.fillText(emote, 650, 160)
        } else {
            context.font = `4rem Bungee`;
            context.fillText(emote, 635, 150)
        }
    }
}
function colorLookup(color) {
    const colorNameMapping = {
        "White": "#ffffff",
        "Black": "#000000",
        "Yellow": "#fcf400",
        "Orange": "#ff8a01",
        "Red": "#ed0303",
        "Magenta": "#ff0de5",
        "Purple": "#a724e4",
        "Blue": "#003ace",
        "Cyan": "#06faf7",
        "Green": "#16ef05",
        "Silver": "#c1c1c1",
      };
      
    return hexToRgb(colorNameMapping[color]);
}
async function drawInitializer(
    image,
    textureContext,
    initializerColor,
    x,
    y
  ) {
    let initializerImage = image;
  
    let offscreenCanvas = Canvas.createCanvas(
      initializerImage.width,
      initializerImage.height
    );
    let offscreenCtx = offscreenCanvas.getContext("2d");
    offscreenCtx.imageSmoothingEnabled = false;

    offscreenCtx.filter = "contrast(100) grayscale(100)";
    offscreenCtx.drawImage(initializerImage, 0, 0);
    
    offscreenCanvas = colorToAlpha(offscreenCanvas, initializerColor[0], initializerColor[1], initializerColor[2]);
  
    textureContext.drawImage(offscreenCanvas, x, y, 300, 300);
  
    return offscreenCanvas;
  }
  function hexToRgb(hex) {
    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function(m, r, g, b) {
      return r + r + g + g + b + b;
    });
  
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? [
      parseInt(result[1], 16),
      parseInt(result[2], 16),
      parseInt(result[3], 16)
    ] : null;
  }
  function colorToAlpha(canvas, colorR, colorG, colorB, keepColor) {
    const context = canvas.getContext("2d");
    const imgData = context.getImageData(0, 0, canvas.width, canvas.height);
    const data = imgData.data;
    
    // enumerate all pixels
    // each pixel's r,g,b,a datum are stored in separate sequential array elements
    for (let i = 0; i < data.length; i += 4) {
        const red = data[i];
        const green = data[i + 1];
        const blue = data[i + 2];
        const alpha = data[i + 3];        
        
        if (red == colorR && green == colorG && blue == colorB) {
            data[i + 3] = 255;
        } else {
            data[i + 3] = 0;
        }
    }
    context.putImageData(imgData, 0, 0);

    return canvas;
}
export default {
    generateCaption: generateCaption,
    generateEmoteImage: generateEmoteImage,
    validEmoteForToken: validEmoteForToken,
    getEmotesForInitializer: getEmotesForInitializer,
    drawEmote: drawEmote,
    drawInitializer: drawInitializer
};
