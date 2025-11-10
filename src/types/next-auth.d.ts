import "next-auth";
import { DefaultSession } from "next-auth";

import { Permissions } from "./permissions";

declare module "next-auth" {
  interface User {
    _id: string;
    role: "admin" | "user";
    permissions: Permissions;
  }

  interface Session {
    user: {
      _id: string;
      role: "admin" | "user";
      permissions: Permissions;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    _id: string;
    role: "admin" | "user";
    permissions: Permissions;
  }
}
