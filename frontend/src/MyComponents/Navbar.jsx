import React from "react";
import { MdProductionQuantityLimits } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const Navbar = ({ page, buttonData }) => {
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (page === "home") {
      navigate("/create");
    } else {
      navigate("/");
    }
  };

  return (
    <header className="bg-white shadow-lg">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="md:flex md:items-center md:gap-12">
            <a className="block text-teal-600" href="#">
              <div className="flex gap-2 justify-center items-center">
                <span className="sr-only">Home</span>
                <div className="bg-teal-600 rounded-full p-2">
                  <MdProductionQuantityLimits className="text-2xl text-white " />
                </div>
                <h2 className="font-bold text-2xl ">My Kart</h2>
              </div>
            </a>
          </div>

          <div className="flex items-center gap-4">
            <div className="sm:flex sm:gap-4">
              <button
                className="rounded-md bg-teal-600 px-5 py-2.5 text-sm font-medium text-white shadow"
                onClick={handleSubmit}
              >
                {buttonData}
              </button>
            </div>

            <div className="block md:hidden">
              <button className="rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
