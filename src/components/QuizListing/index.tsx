import dynamic from "next/dynamic";

import LoadingScreen from "../Loader";

const QuizListings = dynamic(
  () => import("./components/QuizListing").then((m) => m.QuizListings),
  { loading: () => <LoadingScreen /> }
);

export default QuizListings;
