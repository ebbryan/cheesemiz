type JwtPayload = {
  exp: number;
  iat: number;
  data: {
    id: string;
    email: string;
    otp: string;
    createdAt: string;
    updatedAt: string;
  };
};
