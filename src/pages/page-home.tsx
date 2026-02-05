import AlbumsFilter from "../contexts/albums/components/albums-filter";
import PhotosList from "../contexts/photos/components/photos-list";
import Container from "../components/container";

import useAlbums from "../contexts/albums/hooks/use-albums";
import usePhotos from "../contexts/photos/hooks/use-photos";

export default function PageHome() {
  const { albums, isLoadingAlbums } = useAlbums();
  const { photos, isLoadingPhotos } = usePhotos();

  return (
    <Container>
      <AlbumsFilter
        albums={albums}
        loading={isLoadingAlbums}
        className="mb-9"
      />
      <PhotosList photos={photos} loading={isLoadingPhotos} />
    </Container>
  );
}
