import Container from "../components/container";
import PhotosList from "../contexts/photos/components/photos-list";

export default function PageHome() {
  return (
    <Container>
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
