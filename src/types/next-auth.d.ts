import "next-auth";
import { DefaultSession } from "next-auth";

// Typescript Over-ride to include id in Session (on Server/ Client) for performing CRUD operations on MongoDB Documents
declare module "next-auth" {
  interface User {
    _id: string;
  }

  interface Session {
    user: {
      _id: string;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    _id: string;
  }
}
