import dynamic from "next/dynamic";

import LoadingScreen from "../Loader";

const QuizBuilder = dynamic(
  () => import("./components/QuizBuilder").then((m) => m.QuizBuilder),
  { loading: () => <LoadingScreen /> }
);

export default QuizBuilder;
