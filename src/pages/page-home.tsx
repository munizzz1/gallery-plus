import AlbumsFilter from "../contexts/albums/components/albums-filter";
import PhotosList from "../contexts/photos/components/photos-list";
import Container from "../components/container";

export default function PageHome() {
  return (
    <Container>
      <AlbumsFilter
        albums={[
          { id: "123", title: "Album 1" },
          { id: "1234", title: "Album 2" },
          { id: "1235", title: "Album 3" },
        ]}
        className="mb-9"
      />
      <PhotosList
        photos={[
          {
            id: "123",
            title: "Test",
            imageId: "portrait-tower.png",
            albums: [
              { id: "123", title: "Album 1" },
              { id: "1234", title: "Album 2" },
              { id: "1235", title: "Album 3" },
            ],
          },
        ]}
      />
    </Container>
  );
}
