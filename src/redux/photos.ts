import createAsyncSlice from "../helper/createAsyncSlice";

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
  fetchConfig: (payload = "1") => ({
    url: `https://dogsapi.origamid.dev/json/api/photo/?_page=${payload}&_total=3&_user=0`,
    options: {
      method: "GET",
      cache: "no-store",
    },
  }),
});
export const fetchPhotos = photos.asyncAction;

export default photos;
