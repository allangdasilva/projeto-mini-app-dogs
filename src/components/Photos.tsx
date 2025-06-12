import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../redux/configureStore";
import React from "react";
import { fetchPhotos } from "../redux/photos";
import PhotosContent from "./PhotosContent";

function Photos() {
  const { data } = useSelector((state: RootState) => state.reducers.user);
  const dispatch = useDispatch<AppDispatch>();

  React.useEffect(() => {
    if (data) {
      dispatch(fetchPhotos(String(1)));
    }
  }, [dispatch]);

  return (
    <>
      <section>{data && <PhotosContent />}</section>
    </>
  );
}
export default Photos;
