import React from "react";

const Footer = () => {
  return (
    <footer className="bg-white rounded-lg shadow ml-4 mr-4 mb-4 ">
      <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between ">
        <span className="text-lg text-gray-500 sm:text-center ">
          Thank you for visiting ❤
        </span>
        <ul className="text-lg flex flex-wrap items-center  font-medium text-gray-500  sm:mt-0">
          <li>
            <a href="/" className="mr-4 hover:underline md:mr-6 p-3">
              About
            </a>
          </li>
          <li>
            <a href="/" className="mr-4 hover:underline md:mr-6 p-3">
              Privacy Policy
            </a>
          </li>
          <li>
            <a href="/" className="mr-4 hover:underline md:mr-6 p-3">
              Licensing
            </a>
          </li>
          <li>
            <a href="/" className="hover:underline">
              Contact
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
