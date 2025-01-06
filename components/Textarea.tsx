import { NextPage } from "next";

interface Props {
  parentData: string;
  updateParent: Function;
  label?: string;
  placeholder: string;
  small?: boolean;
  autoFocus?: boolean;
}

const Textarea: NextPage<Props> = ({
  label,
  placeholder,
  parentData,
  updateParent,
  small,
  autoFocus,
}) => {
  return (
    <div className="mt-7">
      <label className="block" htmlFor="textarea">
        {label}
      </label>
      <textarea
        placeholder={placeholder}
        id="textarea"
        className={`${
          small ? "h-[75px]" : "h-[100px] mt-3"
        } text-base shadow appearance-none border-none rounded py-2 px-3 w-full resize-none leading-tight focus:outline-none focus:shadow-outline`}
        value={parentData}
        onChange={(e) => updateParent(e.target.value)}
        autoFocus={autoFocus}
      />
    </div>
  );
};

export default Textarea;
