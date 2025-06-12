import { useSelector } from "react-redux";
import type { RootState } from "../redux/configureStore";
import Photos from "./Photos";
import Form from "./Form";
import Loading from "./Loading";

const Content = () => {
  const { user, token } = useSelector((state: RootState) => state.reducers);

  if (user.loading || token.loading) return <Loading />;
  if (user.data) return <Photos />;
  else return <Form />;
};

export default Content;
