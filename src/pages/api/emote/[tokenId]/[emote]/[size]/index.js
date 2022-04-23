import { registerFont, createCanvas } from 'canvas'
import emoteUtils from "../../../../../../utils/emoteUtils";

const createEmote = async (
  req,
  res
) => {
  let { tokenId, emote, size } = req.query
  let scale = 1;
  switch(size) {
    case "sm": scale = 1; break;
    case "small": scale = 1; break;
    case "med": scale = 1; break;
    case "medium": scale = 1; break;
    case "lg": scale = 1; break;
    case "large": scale = 1; break;
  }
  if ( !emoteUtils.validEmoteForToken(tokenId, emote) ) { res.status(402); res.send(); return; }

  registerFont('public/Bungee-Regular.ttf', { family: 'Bungee' });
  registerFont('public/FiraCode-Regular.ttf', { family: 'Fira Code' });

  const WIDTH = 1080 * scale;
  const HEIGHT = 500 * scale;
  const DX = 0
  const DY = 0
  const canvas = createCanvas(WIDTH, HEIGHT);
  const context = canvas.getContext("2d");
  console.log(tokenId)
  console.log(emote)
  await emoteUtils.drawEmote(context, tokenId, emote, emoteUtils.generateCaption(tokenId, emote), 'public/BLANK.png', scale)

  const buffer = canvas.toBuffer();

  res.writeHead(200, {
    "Content-Type": "image/png",
    "Content-Length": buffer.length,
  });
  res.end(buffer, "binary");
};

export default createEmote;