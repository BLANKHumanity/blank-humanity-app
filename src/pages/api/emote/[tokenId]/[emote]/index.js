import { registerFont, createCanvas } from 'canvas'
import emoteUtils from "../../../../../utils/emoteUtils";

const createEmote = async (
  req,
  res
) => {
  let { tokenId, emote } = req.query
  let url = new URL(`http://localhost${req.url}`)
  let scale = url.searchParams.get("scale") || 1;
  
  if ( !emoteUtils.validEmoteForToken(tokenId, emote) ) { emote = "GM" }
  if (!scale) { scale = 1; }
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