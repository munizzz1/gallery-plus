import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { api, fetcher } from "../../../helpers/api";
import type { PhotoNewFormData } from "../schemas";
import usePhotoAlbums from "./use-photo-albums";
import type { Photo } from "../models/photo";

interface PhotoDetailResponse extends Photo {
  nextPhotoId?: string;
  previousPhotoId?: string;
}

export default function usePhoto(id?: string) {
  const { data, isLoading } = useQuery<PhotoDetailResponse>({
    queryKey: ["photo", id],
    queryFn: () => fetcher(`/photos/${id}`),
    enabled: !!id,
  });

  const queryClient = useQueryClient();
  const { managePhotoAlbum } = usePhotoAlbums();

  async function createPhoto(payload: PhotoNewFormData) {
    try {
      const { data: photo } = await api.post<Photo>("/photos", {
        title: payload.title,
      });

      await api.post(
        `/photos/${photo.id}/image`,
        { file: payload.file[0] },
        { headers: { "Content-Type": "multipart/form-data" } },
      );

      if (payload.albumsIds && payload.albumsIds.length > 0) {
        await managePhotoAlbum(photo.id, payload.albumsIds);
      }

      queryClient.invalidateQueries({ queryKey: ["photos"] });
      toast.success("Foto criada com sucesso!");
    } catch (error) {
      toast.error("Erro ao criar foto.");
      throw error;
    }
  }

  return {
    photo: data,
    nextPhotoId: data?.nextPhotoId,
    previousPhotoId: data?.previousPhotoId,
    isLoadingPhoto: isLoading,
    createPhoto,
  };
}
