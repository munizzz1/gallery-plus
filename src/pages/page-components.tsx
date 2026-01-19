import { useForm } from "react-hook-form";

import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
  DialogClose,
} from "../components/dialog";
import InputSingleFile from "../components/input-single-file";
import InputCheckbox from "../components/input-checkbox";
import ImagePreview from "../components/image-preview";
import ButtonIcon from "../components/button-icon";
import InputText from "../components/input-text";
import Divider from "../components/divider";
import Button from "../components/button";
import Badge from "../components/badge";
import Alert from "../components/alert";
import Text from "../components/text";

import ChevronRightIcon from "../assets/icons/chevron-right.svg?react";
import ChevronLeftIcon from "../assets/icons/chevron-left.svg?react";
import SearchIcon from "../assets/icons/search.svg?react";

export default function PageComponents() {
  const form = useForm();
  const file = form.watch("file");
  const fileSource = file?.[0] ? URL.createObjectURL(file[0]) : undefined;

  return (
    <div className="grid gap-7 p-6">
      <div className="flex gap-3">
        <Button>Button</Button>
        <Button variant="secondary">Button</Button>
        <Button disabled>Button</Button>
        <Button handling>Loading</Button>
        <Button icon={ChevronRightIcon}>Próxima Imagem</Button>
        <Button variant="ghost" size="sm">
          Button
        </Button>
        <Button variant="primary" size="sm">
          Button
        </Button>
      </div>

      <div className="flex gap-3">
        <ButtonIcon icon={ChevronLeftIcon} />
        <ButtonIcon icon={ChevronRightIcon} variant="secondary" />
      </div>

      <div className="flex gap-3">
        <Badge>Todos</Badge>
        <Badge>Natureza</Badge>
        <Badge>Viagem</Badge>
        <Badge loading>Viagem</Badge>
        <Badge loading>Viagem</Badge>
        <Badge loading>Viagem</Badge>
      </div>

      <div>
        <Alert>
          Tamanho máximo: 50MB
          <br />
          Você pode selecionar arquivos em PNG, JPG, JPEG ou WEBP
        </Alert>
      </div>

      <div>
        <Divider />
      </div>

      <div>
        <InputText placeholder="Buscar" icon={SearchIcon} />
      </div>
      <div>
        <InputCheckbox />
      </div>

      <div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>Abrir Modal</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>Test Dialog</DialogHeader>

            <DialogBody>
              <Text as="div" className="mb-4">
                Test Body
              </Text>
              <InputSingleFile
                form={form}
                allowedExtensions={["png", "jpg", "jpeg", "webp"]}
                maxFileSizeInMB={50}
                replaceBy={<ImagePreview src={fileSource} alt="Image" />}
                {...form.register("file")}
              />
            </DialogBody>

            <DialogFooter>
              <DialogClose asChild>
                <Button variant="secondary">Cancelar</Button>
              </DialogClose>
              <Button>Adicionar</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
