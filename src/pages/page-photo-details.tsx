import { useParams } from "react-router";

import type { Photo } from "../contexts/photos/models/photo";

import PhotosNavigator from "../contexts/albums/components/photos-navigator";
import ImagePreview from "../components/image-preview";
import Container from "../components/container";
import Skeleton from "../components/skeleton";
import Button from "../components/button";
import Text from "../components/text";
import { AlbumsListSelectable } from "../contexts/albums/components/albums-list-selectable";

export default function PagePhotoDetails() {
  const { id } = useParams();

  const albuns = [
    { id: "123", title: "Album 1" },
    { id: "1234", title: "Album 2" },
    { id: "1235", title: "Album 3" },
  ];

  const isLoading = false;
  const photo = {
    id: "123",
    title: "Test",
    imageId: "portrait-tower.png",
    albums: albuns,
  } as Photo;

  return (
    <Container>
      <header className="flex items-center justify-between gap-8 mb-8">
        {!isLoading ? (
          <Text variant="heading-large">{photo?.title}</Text>
        ) : (
          <Skeleton className="w-48 h-8" />
        )}

        <PhotosNavigator loading={isLoading} />
      </header>

      <div className="grid grid-cols-[21rem_1fr] gap-24">
        <div className="space-y-3">
          {!isLoading ? (
            <>
              <ImagePreview
                src={`/images/${photo?.imageId}`}
                title={photo?.title}
                imageClassName="h-[21rem]"
              />

              <Button variant="destructive">Excluir</Button>
            </>
          ) : (
            <>
              {" "}
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
            loading={isLoading}
            albums={albuns}
            photo={photo}
          />
        </div>
      </div>
    </Container>
  );
}
