"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";

// This takes us to default next-auth sign in page for credentials, we can make a custom login page as well
// https://www.youtube.com/watch?v=hADeo48SATU => Custom login page example
const SigninButton = () => {
  const { data: session } = useSession();
  // console.log(session?.user);

  if (session && session.user) {
    return (
      <div className="flex gap-4 ml-auto">
        <p className="text-sky-600">{session.user.name}</p>
        <button onClick={() => signOut()} className="text-red-600">
          Sign Out
        </button>
      </div>
    );
  }

  return (
    <button onClick={() => signIn()} className="text-green-600 ml-auto">
      Sign In
    </button>
  );
};

export default SigninButton;
