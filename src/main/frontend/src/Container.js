import React from "react";

const Container = (props) => {
  return (
    <div style={{ width: "1400px", margin: "0 auto" }}>{props.children}</div>
  );
};
export default Container;
