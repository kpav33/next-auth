import prisma from "@/lib/prisma";
import { verifyJwt } from "@/lib/jwt";

export async function GET(
  request: Request,
  { params }: { params: { id: number } }
) {
  // Unprotected api route
  //   const userPosts = await prisma.post.findMany({
  //     // Use + to convert string to integer
  //     where: { authorId: +params.id },
  //     include: {
  //       author: {
  //         select: {
  //           email: true,
  //           name: true,
  //         },
  //       },
  //     },
  //   });

  //   return new Response(JSON.stringify(userPosts));

  // Protected api route
  // Before retrieving posts from Prisma, check if the access token is in header and verify it
  const accessToken = request.headers.get("authorization");
  if (!accessToken || !verifyJwt(accessToken)) {
    return new Response(
      JSON.stringify({
        error: "unauthorized",
      }),
      {
        status: 401,
      }
    );
  }
  const userPosts = await prisma.post.findMany({
    where: { authorId: +params.id },
    include: {
      author: {
        select: {
          email: true,
          name: true,
        },
      },
    },
  });
  return new Response(JSON.stringify(userPosts));
}
