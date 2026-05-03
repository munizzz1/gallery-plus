import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { api } from "../../../helpers/api";

export default function usePhotoAlbums() {
  const queryClient = useQueryClient();

  async function managePhotoAlbum(photoId: string, albumsIds: string[]) {
    try {
      await api.put(`/photos/${photoId}/albums`, { albumsIds });

      queryClient.invalidateQueries({ queryKey: ["photo", photoId] });
      queryClient.invalidateQueries({ queryKey: ["photos"] });

      toast.success("Álbuns atualizados com sucesso");
    } catch (error) {
      toast.error("Erro ao gerenciar os álbuns da foto");
      throw error;
    }
  }

  return { managePhotoAlbum };
}
