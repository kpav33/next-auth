import prisma from "@/lib/prisma";
import * as bcrypt from "bcrypt";
import { signJwtAccessToken } from "@/lib/jwt";

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
    // If login successful, return jwt access token as well
    const accessToken = signJwtAccessToken(userWithoutPass);
    const result = {
      ...userWithoutPass,
      accessToken,
    };
    // return new Response(JSON.stringify(userWithoutPass));
    return new Response(JSON.stringify(result));
  } else return new Response(JSON.stringify(null));
}
