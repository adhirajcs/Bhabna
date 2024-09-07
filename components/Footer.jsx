"use client";

import Link from "next/link";
import { FaHeart, FaLinkedin, FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="w-full bg-gray-100 text-center pt-1 py-2 fixed bottom-0 left-0">
      <div className="container mx-auto">
        <div className="mt-2 flex justify-center items-center gap-4">
          <Link href="https://www.linkedin.com/in/adhirajsaha" target="_blank">
            <FaLinkedin
              className="text-blue-500 hover:text-blue-700"
              size={24}
            />
          </Link>
          {" | "}
          <p className="text-gray-500 text-base">
            Made with <FaHeart className="inline text-red-500" /> by Adhiraj
            Saha
          </p>
          {" | "}
          <Link href="https://github.com/adhirajcs" target="_blank">
            <FaGithub className="text-gray-800 hover:text-gray-900" size={24} />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
