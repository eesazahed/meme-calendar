import type { NextPage } from "next";
import { ReactNode } from "react";

interface Props {
  content: string | ReactNode;
  show: boolean;
}

const Tooltip: NextPage<Props> = ({ content, show }) => {
  return show ? (
    <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 z-10 bg-gray-200 text-black text-sm rounded-md px-2 py-1 shadow-lg whitespace-nowrap">
      {content}
    </span>
  ) : (
    <></>
  );
};

export default Tooltip;
