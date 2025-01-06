import { NextPage } from "next";
import { useRef, useState } from "react";

interface Props {
  label: string;
  name: string;
  whenClicked: Function;
  updateParent: Function;
}

const ImageUploadForm: NextPage<Props> = ({
  label,
  name,
  whenClicked,
  updateParent,
}) => {
  const [fileName, setFileName] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleSubmit = async (e: React.ChangeEvent<HTMLInputElement>) => {
    whenClicked();

    const imageFile = e.currentTarget.files?.[0];

    setFileName(imageFile?.name || null);

    const reader = new FileReader();
    reader.onload = async () => {
      if (typeof reader.result === "string") {
        const imageData = await convertToWebP(reader.result);
        updateParent(imageData);
      }
    };

    if (imageFile) {
      reader.readAsDataURL(imageFile);
    }
  };

  const convertToWebP = async (imageDataURL: string): Promise<string> => {
    const img = new Image();
    img.src = imageDataURL;
    await img.decode();
    const canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext("2d");
    ctx?.drawImage(img, 0, 0);
    return canvas.toDataURL("image/webp");
  };

  const clearFile = () => {
    setFileName(null);
    updateParent("");
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <form className="mt-8 mb-4">
      <p className="text-left">{label}</p>
      <div className="w-full flex mt-3">
        <label
          htmlFor={name}
          className="text-center block w-full py-3 my-2 text-base text-white leading-tight focus:outline-none focus:shadow-outline bg-blue-500 text-white duration-200 hover:bg-blue-600 cursor-pointer rounded-lg"
        >
          select image file
          <input
            type="file"
            accept="image/*"
            name={name}
            id={name}
            className="hidden"
            ref={inputRef}
            onChange={handleSubmit}
          />
        </label>
      </div>
      {fileName && (
        <div className="flex items-center justify-between w-full pt-3">
          <p className="truncate text-gray-400">{fileName}</p>
          <button
            type="button"
            onClick={clearFile}
            className="ml-2 text-xl text-red-600 hover:text-red-800 focus:outline-none"
          >
            &#x2715;
          </button>
        </div>
      )}
    </form>
  );
};

export default ImageUploadForm;
