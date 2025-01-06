import type { NextPage } from "next";

interface Props {
  parentData: string;
  updateParent: Function;
  label?: string;
  placeholder: string;
  url?: boolean;
  noMargin?: boolean;
  doFunction?: Function;
}

const Input: NextPage<Props> = ({
  label,
  placeholder,
  parentData,
  updateParent,
  url,
  noMargin,
  doFunction,
}) => {
  function keydown(e: any) {
    if (doFunction) {
      if (e.key === "Enter") {
        doFunction();
      }
    }
  }

  return (
    <div className={noMargin ? "m-0" : "mt-7"}>
      {label && (
        <label className="block" htmlFor="input">
          {label}
        </label>
      )}
      <input
        type={url ? "url" : "text"}
        placeholder={placeholder}
        id="input"
        className={`${
          noMargin ? "m-0 h-full mx-1 py-4" : "my-4 py-3 mt-3"
        } text-base shadow appearance-none border-none rounded w-full px-4 leading-tight focus:outline-none focus:shadow-outline`}
        value={parentData}
        onChange={(e) => updateParent(e.target.value)}
        onKeyDown={(e) => keydown(e)}
      />
    </div>
  );
};

export default Input;
