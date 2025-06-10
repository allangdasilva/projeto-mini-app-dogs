import createAsyncSlice from "../helper/createAsyncSlice";
import type { AppDispatch, RootState } from "./configureStore";

interface PhotosResponse {
  id: number;
  author: string;
  title: string;
  date: string;
  src: string;
  peso: string;
  idade: string;
  acessos: number;
}

const photos = createAsyncSlice<PhotosResponse[], string>({
  name: "photos",
  fetchConfig: (payload) => ({
    url: payload as string,
    options: {
      method: "GET",
      cache: "no-store",
    },
  }),
});
const fetchPhotos = photos.asyncAction;
export const getPhotos =
  () => async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      if (getState().reducers.user.data)
        await dispatch(
          fetchPhotos(
            "https://dogsapi.origamid.dev/json/api/photo/?_page=1&_total=3&_user=0"
          )
        );
    } catch (error) {
      if (error instanceof Error) throw new Error(`Erro: ${error.message}`);
    }
  };
export default photos;
