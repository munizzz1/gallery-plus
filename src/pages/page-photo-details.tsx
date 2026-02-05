import { useParams } from "react-router";

import { AlbumsListSelectable } from "../contexts/albums/components/albums-list-selectable";

import PhotosNavigator from "../contexts/albums/components/photos-navigator";
import ImagePreview from "../components/image-preview";
import Container from "../components/container";
import Skeleton from "../components/skeleton";
import Button from "../components/button";
import Text from "../components/text";

import useAlbums from "../contexts/albums/hooks/use-albums";
import usePhotos from "../contexts/photos/hooks/use-photos";

export default function PagePhotoDetails() {
  const { id } = useParams();
  const { albums, isLoadingAlbums } = useAlbums();
  const { photos, isLoadingPhotos } = usePhotos();

  const photo = photos.filter((p) => p.id === id);

  return (
    <Container>
      <header className="flex items-center justify-between gap-8 mb-8">
        {!isLoadingPhotos && photo ? (
          <Text variant="heading-large">{photo[0]?.title}</Text>
        ) : (
          <Skeleton className="w-48 h-8" />
        )}

        <PhotosNavigator loading={isLoadingPhotos} />
      </header>

      <div className="grid grid-cols-[21rem_1fr] gap-24">
        <div className="space-y-3">
          {!isLoadingPhotos ? (
            <>
              <ImagePreview
                src={`${import.meta.env.VITE_IMAGES_URL}/${photo[0]?.imageId}`}
                title={photo[0]?.title}
                imageClassName="h-[21rem]"
              />

              <Button variant="destructive">Excluir</Button>
            </>
          ) : (
            <>
              <Skeleton className="h-[21rem]" />
              <Skeleton className="w-20 h-10" />
            </>
          )}
        </div>

        <div className="py-3">
          <Text as="h3" variant="heading-medium" className="mb-6">
            Álbuns
          </Text>

          <AlbumsListSelectable
            loading={isLoadingAlbums}
            albums={albums}
            photo={photo[0]}
          />
        </div>
      </div>
    </Container>
  );
}
