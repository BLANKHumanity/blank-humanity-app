import { registerFont, createCanvas } from 'canvas'
import emoteUtils from "../../../../../utils/emoteUtils";

const createEmote = async (
  req,
  res
) => {
  let { tokenId, emote, scale } = req.query
  if ( !emoteUtils.validEmoteForToken(tokenId, emote) ) { emote = "GM" }
  registerFont('public/Bungee-Regular.ttf', { family: 'Bungee' });
  registerFont('public/FiraCode-Regular.ttf', { family: 'Fira Code' });
  const WIDTH = 540 * scale;
  const HEIGHT = 490 * scale;
  const DX = 0
  const DY = 0
  const canvas = createCanvas(WIDTH, HEIGHT);
  const context = canvas.getContext("2d");
  let img = 'public'+emoteUtils.generateEmoteImage(emote)
  console.log(tokenId)
  console.log(img)
  await emoteUtils.drawEmote(context, tokenId, img, emoteUtils.generateCaption(tokenId, emote), 'public/BLANK.png', scale)

  const buffer = canvas.toBuffer();

  res.writeHead(200, {
    "Content-Type": "image/png",
    "Content-Length": buffer.length,
  });
  res.end(buffer, "binary");
};

export default createEmote;