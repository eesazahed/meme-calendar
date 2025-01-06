import type { NextPage } from "next";

interface Props {
  text: string;
  onClick?: Function;
  submit?: boolean;
  color?: string;
  noMargin?: boolean;
}

const Btn: NextPage<Props> = ({ text, onClick, color, submit, noMargin }) => {
  return (
    <button
      style={{ background: color || "#1E90FF" }}
      className={`${
        noMargin ? "m-0 h-full mx-1" : "my-2 py-3"
      } hover:brightness-90 w-full text-white text-base px-4 rounded-lg duration-200`}
      onClick={() => (onClick ? onClick() : {})}
      type={submit ? "submit" : "button"}
    >
      {text}
    </button>
  );
};

export default Btn;
