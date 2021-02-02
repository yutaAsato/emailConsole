/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import * as colors from "./styles/colors";

import { Results } from "./screens/main";

function App() {
  return (
    <div
      css={{
        margin: "0 auto",
        maxWidth: "1640px",
        width: "100%",
        display: "grid",
        gridGap: "1em",
        border: `1px solid ${colors.gray10}`,
        borderRadius: "3px",
      }}
    >
      <Results />
    </div>
  );
}

export default App;
