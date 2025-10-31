import React, { PropsWithChildren } from "react";

import Header from "@/components/header";

const PublicLayout = ({ children }: PropsWithChildren): React.JSX.Element => (
  <>
    <Header />
    {children}
  </>
);

export default PublicLayout;
