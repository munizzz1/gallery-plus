import Container from "./container";
import { Link } from "react-router";
import cx from "classnames";

import { PhotoNewDialog } from "../contexts/photos/components/photo-new-dialog";
import PhotosSearch from "./photos-search";
import Divider from "./divider";
import Button from "./button";

import Logo from "../assets/images/galeria-plus-full-logo.svg?react";

interface MainHeaderProps extends React.ComponentProps<"div"> {}

export default function MainHeader({ className, ...props }: MainHeaderProps) {
  return (
    <Container
      as="header"
      className={cx("flex justify-between items-center gap-10", className)}
      {...props}
    >
      <Link to="/">
        <Logo className="h-5" />
      </Link>

      <PhotosSearch />
      <Divider orientation="vertical" className="h-10" />

      <div className="flex items-center gap-3">
        <PhotoNewDialog trigger={<Button>Nova foto</Button>} />
        <Button variant="secondary">Criar álbum</Button>
      </div>
    </Container>
  );
}
