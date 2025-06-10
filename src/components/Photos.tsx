import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../redux/configureStore";
import React from "react";
import { getPhotos } from "../redux/photos";

function Photos() {
  const { data } = useSelector((state: RootState) => state.reducers.user);
  const photosData = useSelector(
    (state: RootState) => state.reducers.photos.data
  );
  const dispatch = useDispatch<AppDispatch>();
  React.useEffect(() => {
    if (data) {
      dispatch(getPhotos());
    }
  }, [dispatch]);
  return (
    <>
      <ul>
        {photosData &&
          photosData.map((photo) => (
            <li key={photo.id}>
              <img src={photo.src} alt={photo.title} />
              <h2>{photo.title}</h2>
              <span>{photo.acessos}</span>
            </li>
          ))}
      </ul>
      <button>Carregar mais</button>
    </>
  );
}
export default Photos;
