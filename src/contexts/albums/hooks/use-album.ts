import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import usePhotoAlbums from "../../photos/hooks/use-photo-albums";
import usePhotos from "../../photos/hooks/use-photos";
import type { AlbumNewFormSchema } from "../schemas";
import type { Album } from "../models/album";
import { api } from "../../../helpers/api";

export function useAlbum() {
  const queryClient = useQueryClient();
  const { photos } = usePhotos();
  const { managePhotoAlbum } = usePhotoAlbums();

  async function createAlbum(payload: AlbumNewFormSchema) {
    try {
      const { data: album } = await api.post<Album>("/albums", {
        title: payload.title,
      });

      if (payload.photosIds && payload.photosIds.length > 0) {
        await Promise.all(
          payload.photosIds.map((photoId) => {
            const photoAlbumsIds =
              photos
                .find((photo) => photo.id === photoId)
                ?.albums?.map((album) => album.id) || [];

            return managePhotoAlbum(photoId, [...photoAlbumsIds, album.id]);
          }),
        );
      }

      queryClient.invalidateQueries({ queryKey: ["albums"] });
      queryClient.invalidateQueries({ queryKey: ["photos"] });

      toast.success("Álbum criado com sucesso");
    } catch (error) {
      toast.error("Error ao criar álbum");
      throw error;
    }
  }

  return {
    createAlbum,
  };
}
