"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

type Post = {
  id: number;
  title: string;
  content: string;
  authorId: number;
  author: {
    email: string;
    name: string;
  };
};

type SessionUser = {
  id: number;
  name: string;
  email: string;
  accessToken: string;
};

type Session = {
  user: SessionUser;
};

// Protected via middleware in middleware.ts file, different compared to next-fireship, where we instead checked if session has value, from getServerSession and if not redirected the user manually to sign in page
// This way the redirect is done by the middleware automatically
const UserPostPage = () => {
  const { data: session, status } = useSession();
  // console.log(session);
  // console.log(status);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (status === "loading") return; // Do nothing while loading
    if (!session) {
      setError("Unauthorized");
      setLoading(false);
      return;
    }

    const fetchPosts = async () => {
      try {
        const res = await fetch(`/api/user/${session.user.id}`, {
          headers: {
            authorization: session.user.accessToken,
          },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch posts");
        }

        const data = await res.json();
        setPosts(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [session, status]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  // return <div>Only Authenticated user should access to this page</div>;

  return (
    <div>
      <h1>Posts by {session!.user.name}</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserPostPage;
