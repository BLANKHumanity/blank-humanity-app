import React from "react";

/**
 * Redirects /demo to demo.blankhumanity.com
 */

export default function Demo(props) {

    React.useEffect(() => {
        window.location = "https://demo.blankhumanity.com/";
    }, []);

  return (
    <div>
      Redirecting...
    </div>
  );
}
