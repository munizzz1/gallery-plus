import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import PhotoImageSelectable from "../../photos/components/photo-image-selectable";
import InputText from "../../../components/input-text";
import Skeleton from "../../../components/skeleton";
import Button from "../../../components/button";
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

import SelectCheckboxIllustration from "../../../assets/images/select-checkbox.svg?react";

import { albumNewFormSchema, type AlbumNewFormSchema } from "../schemas";
import usePhotos from "../../photos/hooks/use-photos";

interface AlbumNewDialogProps {
  trigger: React.ReactNode;
}

export default function AlbumNewDialog({ trigger }: AlbumNewDialogProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const form = useForm<AlbumNewFormSchema>({
    resolver: zodResolver(albumNewFormSchema),
  });
  const { photos, isLoadingPhotos } = usePhotos();

  useEffect(() => {
    if (!modalOpen) {
      form.reset();
    }
  }, [modalOpen, form]);

  function handleTogglePhoto(selected: boolean, photoId: string) {
    const photosIds = form.getValues("photosIds") || [];
    let newValue: string[];

    if (selected) {
      newValue = [...photosIds, photoId];
    } else {
      newValue = photosIds.filter((id) => id !== photoId);
    }
    form.setValue("photosIds", newValue);
  }

  function handleSubmit(data: AlbumNewFormSchema) {
    console.log(data);
  }

  return (
    <Dialog open={modalOpen} onOpenChange={setModalOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <DialogHeader>Criar álbum</DialogHeader>

          <DialogBody className=" flex flex-col gap-5">
            <InputText
              placeholder="Adicione um título"
              error={form.formState.errors.title?.message}
              {...form.register("title")}
            />

            <div className="space-y-3">
              <Text as="div" variant="label-small" className="mb-3">
                Fotos cadastradas
              </Text>

              {!isLoadingPhotos && photos.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {photos.map((photo) => (
                    <PhotoImageSelectable
                      key={photo.id}
                      src={`${import.meta.env.VITE_IMAGES_URL}/${photo.imageId}`}
                      title={photo.title}
                      imageClassName="w-20 h-20 roundend"
                      onSelectImage={(selected) =>
                        handleTogglePhoto(selected, photo.id)
                      }
                    />
                  ))}
                </div>
              )}

              {isLoadingPhotos && (
                <div className="flex flex-wrap gap-2">
                  {Array.from({ length: 4 }).map((_, index) => (
                    <Skeleton
                      key={`photo-loading-${index}`}
                      className="w-20 h-20 rounded"
                    />
                  ))}
                </div>
              )}

              {!isLoadingPhotos && photos.length === 0 && (
                <div className="w-full flex flex-col justify-center items-center gap-3">
                  <SelectCheckboxIllustration />
                  <Text variant="paragraph-medium" className="text-center">
                    Nenhuma foto disponivel para seleção
                  </Text>
                </div>
              )}
            </div>
          </DialogBody>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="secondary">Cancelar</Button>
            </DialogClose>
            <Button type="submit">Criar</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
