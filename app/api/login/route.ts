import prisma from "@/lib/prisma";
import * as bcrypt from "bcrypt";

interface RequestBody {
  username: string;
  password: string;
}

export async function POST(request: Request) {
  const body: RequestBody = await request.json();

  const user = await prisma.user.findFirst({
    where: {
      email: body.username,
    },
  });

  if (user && (await bcrypt.compare(body.password, user.password))) {
    // Extract password and the rest into userWithoutPass object
    const { password, ...userWithoutPass } = user;
    // const accessToken = signJwtAccessToken(userWithoutPass);
    // const result = {
    //   ...userWithoutPass,
    //   accessToken,
    // };
    return new Response(JSON.stringify(userWithoutPass));
  } else return new Response(JSON.stringify(null));
}
