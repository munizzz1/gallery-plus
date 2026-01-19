import type { Photo } from "../contexts/photos/models/photo";

import PhotoWidget from "../contexts/photos/components/photo-widget";
import Container from "../components/container";

export default function PageHome() {
  return (
    <Container>
      <div className="grid grid-cols-4 gap-9">
        <PhotoWidget
          photo={{
            id: "123",
            title: "Test",
            imageId: "portrait-tower.png",
            albums: [
              { id: "123", title: "Album 1" },
              { id: "1234", title: "Album 2" },
              { id: "1235", title: "Album 3" },
            ],
          }}
        />

        <PhotoWidget
          photo={{
            id: "123",
            title: "Test",
            imageId: "portrait-tower.png",
            albums: [
              { id: "123", title: "Album 1" },
              { id: "1234", title: "Album 2" },
              { id: "1235", title: "Album 3" },
            ],
          }}
        />

        <PhotoWidget photo={{} as Photo} loading />
      </div>
    </Container>
  );
}
