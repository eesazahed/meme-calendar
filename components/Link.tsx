import { NextPage } from "next";

interface Props {
  text: string;
  href: string;
  dontOpenInNewTab?: boolean;
}

const Link: NextPage<Props> = ({ text, href, dontOpenInNewTab }) => {
  return (
    <a
      rel="noreferrer"
      target={!dontOpenInNewTab ? "_blank" : "_self"}
      href={href}
    >
      {text}
    </a>
  );
};

export default Link;
