import { Card, Container } from "react-bootstrap";
import "./_profile-progress.scss";
export type ProfileProgressProps = {
  children?: JSX.Element | JSX.Element[];
};

export const ProfileProgress: React.FC<ProfileProgressProps> = ({
  children,
}) => (
  <Container>
    <Card className="profile-progress">
      <Card.Body>{children}</Card.Body>
    </Card>
  </Container>
);

export default ProfileProgress;
