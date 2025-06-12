import { useSelector } from "react-redux";
import type { RootState } from "../redux/configureStore";
import style from "./PhotosContent.module.css";

const PhotosContent = () => {
  const { data } = useSelector((state: RootState) => state.reducers.photos);
  return (
    <ul>
      {data &&
        data.map((photo) => (
          <li className={style.item} key={photo.id}>
            <img className={style.img} src={photo.src} alt={photo.title} />
            <h2 className={style.title}>{photo.title}</h2>
            <span className={style.visits}>{photo.acessos}</span>
          </li>
        ))}
    </ul>
  );
};

export default PhotosContent;
