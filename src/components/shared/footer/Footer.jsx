import { Diameter } from "lucide-react";
import { FaFacebook, FaLinkedin, FaYoutube } from "react-icons/fa";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-900">
      <div className="container flex flex-col items-center justify-between p-6 min-h-20 mx-auto space-y-4 sm:space-y-0 sm:flex-row">
        <div className="">
          <Link
            to={"/"}
            className="flex justify-between items-center gap-2 leading-none text-secondary-foreground"
          >
            <Diameter className="size-8 font-bold text-secondary p-0.5 bg-primary rounded-full" />{" "}
            <span className="text-2xl font-bold">Nihonify</span>
          </Link>
        </div>

        <p className="text-sm text-gray-600 dark:text-gray-300">
          © Copyright 2025. All Rights Reserved.
        </p>
        <div className="flex -mx-2 gap-2 text-xl">
          <a
            href="https://www.facebook.com/maksud51"
            target="_blank"
            className="hover:text-blue-600"
          >
            <FaFacebook />
          </a>
          <a
            href="https://www.youtube.com/"
            target="_blank"
            className="hover:text-red-700"
          >
            <FaYoutube />
          </a>
          <a
            href="https://www.linkedin.com/in/abdullahalmaksud/"
            target="_blank"
            className="hover:text-sky-700"
          >
            <FaLinkedin />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
