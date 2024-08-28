"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const Nav = () => {
  const { data: session } = useSession();

  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);

  useEffect(() => {
    const setUpProviders = async () => {
      const providers = await getProviders();
      setProviders(providers);
    };

    setUpProviders();
  }, []);

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

            {/* Profile button */}
            <Link href="/profile">
              <Image
                src={session?.user.image}
                width={28}
                height={28}
                className="rounded-full"
                alt="Profile"
              />
            </Link>
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
          <div className="flex">
            <Image
              src={session?.user.image}
              width={28}
              height={28}
              className="rounded-full"
              alt="profile"
              onClick={() => setToggleDropdown((prev) => !prev)}
            />

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
