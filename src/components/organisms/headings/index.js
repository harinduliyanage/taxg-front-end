import React from "react";
import "./_heading.scss";
const HeadingH1 = (props) => {
  const { text, style } = props;
  return <h1 className={"txt txt--headingH1 " + style}>{text}</h1>;
};

const HeadingH2 = (props) => {
  const { text, style } = props;
  return <h2 className={"txt txt--headingH2 " + style}>{text}</h2>;
};

const HeadingH3 = (props) => {
  const { text, style } = props;
  return <h3 className={"txt txt--headingH3 " + style}>{text}</h3>;
};

const Paragraph = (props) => {
  const { text, style } = props;
  return <p className={"para_txt " + style}>{text}</p>;
};
export { HeadingH1, HeadingH2, HeadingH3, Paragraph };
