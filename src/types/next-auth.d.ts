import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      firstName: string;
      lastName: string;
      role: "shipper" | "transporter" | "driver" | "admin";
      companyId: string | null;
      isVerified: boolean;
      isActive: boolean;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: "shipper" | "transporter" | "driver" | "admin";
    companyId: string | null;
    isVerified: boolean;
    isActive: boolean;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: "shipper" | "transporter" | "driver" | "admin";
    firstName: string;
    lastName: string;
    companyId: string | null;
    isVerified: boolean;
    isActive: boolean;
  }
}