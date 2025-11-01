import dynamic from "next/dynamic";

const AppSidebar = dynamic(() => import("./AppSidebar").then((f) => f.default));

export { AppSidebar };
