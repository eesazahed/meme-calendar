import { useState } from "react";
import type { NextPage } from "next";
import Tooltip from "./Tooltip";
import getTimeFormatted from "../utils/getTimeFormatted";

interface Props {
  timestamp: string;
}

const FormattedTime: NextPage<Props> = ({ timestamp }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <span
      className="relative inline-block"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <span className="cursor-pointer">{getTimeFormatted(timestamp)}</span>
      <Tooltip
        content={new Date(timestamp).toLocaleString()}
        show={showTooltip}
      />
    </span>
  );
};

export default FormattedTime;
