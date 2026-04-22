import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import InputSingleFile from "../../../components/input-single-file";
import ImagePreview from "../../../components/image-preview";
import InputText from "../../../components/input-text";
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
import Skeleton from "../../../components/skeleton";

import { PhotoNewFormSchema, type PhotoNewFormData } from "../schemas";
import useAlbums from "../../albums/hooks/use-albums";

interface PhotoNewDialogProps {
  trigger: React.ReactNode;
}

export default function PhotoNewDialog({ trigger }: PhotoNewDialogProps) {
  const form = useForm<PhotoNewFormData>({
    resolver: zodResolver(PhotoNewFormSchema),
  });
  const { albums, isLoadingAlbums } = useAlbums();

  function handleSubmit(payload: PhotoNewFormData) {
    console.log(payload);
  }

  const file = form.watch("file");
  const fileSource = file?.[0] ? URL.createObjectURL(file[0]) : undefined;

  return (
    <Dialog>
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
                      variant="ghost"
                      size="sm"
                      className="truncate"
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
              <Button variant="secondary">Cancelar</Button>
            </DialogClose>
            <Button type="submit">Adicionar</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
