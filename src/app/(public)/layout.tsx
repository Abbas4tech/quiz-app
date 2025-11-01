import React, { PropsWithChildren } from "react";
import { Metadata } from "next";

import Header from "@/components/Header";

export const generateMetadata = (): Metadata => ({
  title: "Quiz Arena",
});

const PublicLayout = ({ children }: PropsWithChildren): React.JSX.Element => (
  <>
    <Header />
    {children}
  </>
);

export default PublicLayout;
