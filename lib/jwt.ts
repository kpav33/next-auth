import jwt, { JwtPayload } from "jsonwebtoken";

interface SignOption {
  expiresIn?: string | number;
}

// Change this to determine how long is jwt valid
const DEFAULT_SIGN_OPTION: SignOption = {
  expiresIn: "1h",
};

export function signJwtAccessToken(
  payload: JwtPayload,
  options: SignOption = DEFAULT_SIGN_OPTION
) {
  // Since we are reading secret_key from env variable it has type of string or undefined, but in the sign function we need to pass it as type of string, we fix the typescript error, by adding exclamation mark at the end of secret_key value
  const secret_key = process.env.SECRET_KEY;
  // Create jwt
  const token = jwt.sign(payload, secret_key!, options);
  return token;
}

export function verifyJwt(token: string) {
  try {
    // Same as above, exclamation mark is to fix typescript error
    const secret_key = process.env.SECRET_KEY;
    // Verify the jwt
    const decoded = jwt.verify(token, secret_key!);
    return decoded as JwtPayload;
  } catch (error) {
    // If jwt is invalid, the verify throws an error, which we can handle here
    console.log(error);
    return null;
  }
}
