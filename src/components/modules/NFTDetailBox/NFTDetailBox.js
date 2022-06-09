import React from "react";
import seedrandom from "seedrandom";

export default function NftDetailBox({
  id,
  imageData,
  name,
  phrase,
  notes,
  collectionData,
}) {
  return (
    <div
      className="NftDetailBox"
      style={{ display: "flex", justifyContent: "center" }}
    >
      <div
        style={{
          border: "5px solid black",
          width: "90%",
          padding: "1%",
          paddingTop: "5%",
          paddingBottom: "5%",
        }}
      >
        <div
          style={{
            width: "90%",
            marginLeft: "auto",
            marginRight: "auto",
            textAlign: "left",
          }}
        >
          <div style={{ display: "flex" }}>
            <div
              className="NftInfoImageColumn"
              style={{
                width: "30%",
                display: "flex",
                alignItems: "flex-end",
              }}
            >
              <div
                style={{
                  textAlign: "center",
                }}
              >
                <span
                  style={{
                    fontFamily: "Bungee",
                    lineHeight: 0,
                    padding: "1rem",
                  }}
                >
                  {name}
                </span>
              </div>
            </div>
            <div
              style={{
                width: "70%",
                textAlign: "right",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "space-between",
              }}
            >
              <div style={{ fontSize: "1.5rem" }}>
                NFT{" "}
                <a
                  href={
                    "https://opensea.io/assets/" +
                    collectionData.contract +
                    "/" +
                    id
                  }
                  target="_blank"
                >
                  #{id}
                </a>{" "}
                from{" "}
                <a href={collectionData.openSeaUrl} target="_blank">
                  {collectionData.name}
                </a>
              </div>
              <div>Level 1</div>
            </div>
          </div>
          <br />
          <div
            class="NftDialogBox"
            style={{
              height: "1px",
              minHeight: "30vh",
              backgroundColor: "rgba(0,0,0,.75)",
              color: "white",
              display: "flex",
            }}
          >
            <div style={{ width: "30%", height: "100%", position: "relative" }}>
              <img
                style={{
                  position: "absolute",
                  height: "100%",
                  left: "5%",
                  bottom: "10%",
                }}
                src={imageData}
              />
            </div>
            <div
              style={{
                width: "70%",
                marginLeft: "auto",
                marginRight: "0%",
                textAlign: "left",
                fontSize: "3rem",
                display: "flex",
                alignItems: "center",
              }}
            >
              <TypewriterEffect>{phrase}</TypewriterEffect>
            </div>
          </div>
          <div
            style={{
              marginTop: "1rem",
              fontSize: "1.5rem",
            }}
          >
            <b>Notes:</b> {notes}
          </div>
        </div>
      </div>
    </div>
  );
}

function TypewriterEffect(props) {
  // eslint-disable-next-line no-unused-vars
  const [initialText, setInitialText] = React.useState(props.children);
  const [text, setText] = React.useState("");

  React.useEffect(() => {
    //alert("useeffect");
    let characterIndex = -1;
    // Delay typing by 1 second
    setTimeout(() => {
      // Begin typing
      const interval = setInterval(() => {
        if (characterIndex < initialText.length) {
          characterIndex++;
          setText(initialText.substring(0, characterIndex));
        } else {
          clearInterval(interval);
        }
      }, 50);
    }, 1000);
  }, [initialText]);

  React.useEffect(() => {
    setText("");
    setInitialText(props.children);
  }, [props.children]);

  return <>{text} █</>;
}