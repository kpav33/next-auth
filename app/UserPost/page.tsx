import React from "react";

// Protected via middleware in middleware.ts file, different compared to next-fireship, where we instead checked if session has value, from getServerSession and if not redirected the user manually to sign in page
// This way the redirect is done by the middleware automatically
const UserPostPage = () => {
  return <div>Only Authenticated user should access to this page</div>;
};

export default UserPostPage;
