import React from "react";

// import { getServerSession } from "next-auth";

import CreateAccount from "@/components/CreateAccount";

// Finished tutorial at 39:00

export default async function Home() {
  // Link to tutorial https://www.youtube.com/watch?v=0eu4_lLFkGk (Full Stack Authentication with Next-Auth and Next.js 13: All You Need to Know)
  // GitHub repo https://github.com/vahid-nejad/next-auth-fullstack

  // Updated Next 14 tutorial => https://www.youtube.com/watch?v=Xa73Xr8PM2k

  // const session = await getServerSession();
  // console.log("SESSION ", session?.user);

  return (
    <main>
      <div>Hello World!</div>
      {/* {!session && <CreateAccount />} */}
    </main>
  );
}
