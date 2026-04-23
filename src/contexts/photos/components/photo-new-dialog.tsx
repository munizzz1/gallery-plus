import { useEffect, useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import InputSingleFile from "../../../components/input-single-file";
import ImagePreview from "../../../components/image-preview";
import InputText from "../../../components/input-text";
import Skeleton from "../../../components/skeleton";
import Button from "../../../components/button";
import Alert from "../../../components/alert";
import Text from "../../../components/text";
import {
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "../../../components/dialog";

import { PhotoNewFormSchema, type PhotoNewFormData } from "../schemas";
import useAlbums from "../../albums/hooks/use-albums";
import usePhoto from "../hooks/use-photo";

interface PhotoNewDialogProps {
  trigger: React.ReactNode;
}

export default function PhotoNewDialog({ trigger }: PhotoNewDialogProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [isCreatingPhoto, setIsCreatingPhoto] = useTransition();

  const form = useForm<PhotoNewFormData>({
    resolver: zodResolver(PhotoNewFormSchema),
  });

  const { albums, isLoadingAlbums } = useAlbums();
  const { createPhoto } = usePhoto();

  function handleSubmit(payload: PhotoNewFormData) {
    setIsCreatingPhoto(async () => {
      try {
        await createPhoto(payload);
        setModalOpen(false);
      } catch (error) {
        console.error("Error creating photo:", error);
      }
    });
  }

  const file = form.watch("file");
  const fileSource = file?.[0] ? URL.createObjectURL(file[0]) : undefined;

  const albumsIds = form.watch("albumsIds") || [];

  useEffect(() => {
    if (!modalOpen) {
      form.reset();
    }
  }, [modalOpen, form]);

  function handleToggleAlbumSelection(albumId: string) {
    const albumsIds = form.getValues("albumsIds") || [];
    const albumsSet = new Set(albumsIds);

    if (albumsSet.has(albumId)) {
      albumsSet.delete(albumId);
    } else {
      albumsSet.add(albumId);
    }
    form.setValue("albumsIds", Array.from(albumsSet));
  }

  return (
    <Dialog open={modalOpen} onOpenChange={setModalOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <DialogHeader>Adicionar foto</DialogHeader>

          <DialogBody className="flex flex-col gap-5">
            <InputText
              placeholder="Adicione um título"
              maxLength={255}
              error={form.formState.errors.title?.message}
              {...form.register("title")}
            />
            <Alert>
              Tamanho máximo: 50mb
              <br />
              Você pode selecionar arquivo em PNG, JPG ou JPEG
            </Alert>
            <InputSingleFile
              form={form}
              allowedExtensions={["png", "jpg", "jpeg"]}
              maxFileSizeInMB={50}
              replaceBy={
                <ImagePreview src={fileSource} className="w-full h-56" />
              }
              error={form.formState.errors.file?.message}
              {...form.register("file")}
            />

            <div>
              <Text variant="label-small">Selecionar álbuns</Text>
              <div className="flex flex-wrap gap-3">
                {!isLoadingAlbums &&
                  albums.length > 0 &&
                  albums.map((album) => (
                    <Button
                      key={album.id}
                      variant={
                        albumsIds?.includes(album.id) ? "primary" : "ghost"
                      }
                      size="sm"
                      className="truncate"
                      onClick={() => handleToggleAlbumSelection(album.id)}
                    >
                      {album.title}
                    </Button>
                  ))}

                {isLoadingAlbums &&
                  Array.from({ length: 5 }).map((_, index) => (
                    <Skeleton
                      key={`album-loading-${index}`}
                      className="w-20 h-7"
                    />
                  ))}
              </div>
            </div>
          </DialogBody>

          <DialogFooter>
            <DialogClose asChild>
              <Button disabled={isCreatingPhoto} variant="secondary">
                Cancelar
              </Button>
            </DialogClose>
            <Button
              disabled={isCreatingPhoto}
              handling={isCreatingPhoto}
              type="submit"
            >
              {isCreatingPhoto ? "Adicionando..." : "Adicionar"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
