import React from "react";
import Head from 'next/head'
import { useRouter } from 'next/router'

import EmoteSection from "../../../components/modules/Emote/EmoteSection/EmoteSection.js";

export default function Emote(props) {  
  let router = useRouter();
  let { tokenId, emote } = router.query
  return (
    <div>      
      <Head>
        <title>{`BLANK Humanity Initializer ${tokenId} Emotes`}</title>
        <meta property="og:title" content={`BLANK Humanity Initializer ${tokenId} Emotes`} key="title"/>
        <meta property="og:url" content={`https://app.blankhumanity.com/Emote/${tokenId}`} />
        <meta property="og:image" content={`https://app.blankhumanity.com/api/emote/${tokenId}/GM`} />
        <meta property="og:type" content="website" />
        <meta property="og:description" content={`Check out all of the Emotes for BLANK Humanity Initializer #${tokenId}`} />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />

      </Head>
      <EmoteSection />
    </div>
  );
}
