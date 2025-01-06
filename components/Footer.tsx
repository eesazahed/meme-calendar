import { NextPage } from "next";
import Link from "./Link";

const Footer: NextPage = () => {
  return (
    <footer className="py-8 mb-8 md:mt-8 bg-black text-white text-center">
      <p>
        designed and developed by{" "}
        <Link text="eesa zahed" href="https://eesa.zahed.ca" />
      </p>
    </footer>
  );
};

export default Footer;
