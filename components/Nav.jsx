"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const Nav = () => {
  const { data: session } = useSession();

  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);

  const [showTooltip, setShowTooltip] = useState(true);

  useEffect(() => {
    const setUpProviders = async () => {
      const providers = await getProviders();
      setProviders(providers);
    };

    setUpProviders();
  }, []);

  const handleProfileClick = () => {
    setShowTooltip(false); // Hide the tooltip permanently on click
    setToggleDropdown((prev) => !prev); // Toggle the dropdown
  };

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 flex-center">
        {/* <Image
          src="/assets/images/logo.svg"
          alt="Bhabna Logo"
          width={30}
          height={30}
          className="object-contain"
        /> */}
        <div className="font-lipishree text-4xl">ভাবনা</div>
      </Link>

      {/* Desktop Navigation */}
      <div className="sm:flex hidden">
        {session?.user ? (
          <div className="flex gap md:gap-5">
            {/* Create post button */}
            <Link href="/create-post" className="black_btn">
              Create Post
            </Link>

            {/* Sign Out button */}
            <button type="button" onClick={signOut} className="outline_btn">
              Sign Out
            </button>

            {/* Profile button with bottom tooltip */}
            <div className="group relative">
              <Link href="/profile">
                <Image
                  src={session?.user.image}
                  width={28}
                  height={28}
                  className="rounded-full"
                  alt="Profile"
                />
              </Link>
              <div className="bg-gray-200 p-2 rounded-md hidden group-hover:flex absolute -bottom-2 translate-y-full left-1/2 -translate-x-1/2">
                <span className="text-gray-500  whitespace-nowrap">
                  Profile
                </span>
                <div className="bg-inherit rotate-45 p-1 absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2"></div>
              </div>
            </div>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((providers) => (
                <button
                  type="button"
                  key={providers.name}
                  onClick={() => signIn(providers.id)}
                  className="black_btn"
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>

      {/* Mobile Navigation */}
      <div className="sm:hidden flex relative">
        {/* Profile Button toggle */}
        {session?.user ? (
          <div className="group relative flex items-center">
            <div className="group relative">
              <Image
                src={session?.user.image}
                width={28}
                height={28}
                className="rounded-full"
                alt="profile"
                onClick={handleProfileClick} // Hide tooltip and toggle dropdown on click
              />
              {showTooltip && (
                <div className="bg-gray-200 p-2 rounded-md absolute top-1/2 -translate-y-1/2 -left-2 -translate-x-full">
                  <span className="text-gray-500 whitespace-nowrap">
                    Click Here!
                  </span>
                  <div className="bg-inherit rotate-45 p-1 absolute top-1/2 -translate-y-1/2 right-0 translate-x-1/2"></div>
                </div>
              )}
            </div>

            {/* Dropdown menu */}
            {toggleDropdown && (
              <div className="dropdown">
                {/* Menu Item 1 - My Profile Button */}
                <Link
                  href="/profile"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  My Profile
                </Link>

                {/* Menu Item 2 - Create Post */}
                <Link
                  href="/create-post"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  Create Post
                </Link>

                {/* Sign Out button */}
                <button
                  type="button"
                  onClick={() => {
                    setToggleDropdown(false);
                    signOut();
                  }}
                  className="mt-5 w-full black_btn"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((providers) => (
                <button
                  type="button"
                  key={providers.name}
                  onClick={() => signIn(providers.id)}
                  className="black_btn"
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
