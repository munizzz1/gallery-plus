import { useParams } from "react-router";

import type { Photo } from "../contexts/photos/models/photo";
import useAlbums from "../contexts/albums/hooks/use-albums";
import usePhoto from "../contexts/photos/hooks/use-photo";

import { AlbumsListSelectable } from "../contexts/albums/components/albums-list-selectable";
import PhotosNavigator from "../contexts/albums/components/photos-navigator";
import ImagePreview from "../components/image-preview";
import Container from "../components/container";
import Skeleton from "../components/skeleton";
import Button from "../components/button";
import Text from "../components/text";

export default function PagePhotoDetails() {
  const { id } = useParams();
  const { photo, previousPhotoId, nextPhotoId, isLoadingPhoto } = usePhoto(id);
  const { albums, isLoadingAlbums } = useAlbums();

  if (!isLoadingPhoto && !photo) {
    return <div>Foto não encontrada!</div>;
  }

  return (
    <Container>
      <header className="flex items-center justify-between gap-8 mb-8">
        {!isLoadingPhoto && photo ? (
          <Text variant="heading-large">{photo?.title}</Text>
        ) : (
          <Skeleton className="w-48 h-8" />
        )}

        <PhotosNavigator
          previousPhotoId={previousPhotoId}
          nextPhotoId={nextPhotoId}
          loading={isLoadingPhoto}
        />
      </header>

      <div className="grid grid-cols-[21rem_1fr] gap-24">
        <div className="space-y-3">
          {!isLoadingPhoto ? (
            <>
              <ImagePreview
                src={`${import.meta.env.VITE_IMAGES_URL}/${photo?.imageId}`}
                title={photo?.title}
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
            photo={photo as Photo}
          />
        </div>
      </div>
    </Container>
  );
}
