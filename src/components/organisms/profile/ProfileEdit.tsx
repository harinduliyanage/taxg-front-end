import { Card, Container } from "react-bootstrap";
import "./_profile-edit.scss";
export type ProfileEditProps = {
  children?: JSX.Element | JSX.Element[];
};

export const ProfileEdit: React.FC<ProfileEditProps> = ({ children }) => (
  <Container>
    <Card className="profile-tabs">{children}</Card>
  </Container>
);

export default ProfileEdit;
