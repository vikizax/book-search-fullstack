import LogoutButton from "../logoutButton";
import { Header, Group } from "@mantine/core";
import { useAuth0 } from "@auth0/auth0-react";
import BrandIcon from "../../assets/icons/brand50.png";

export default function Navbar({ loginPage }: { loginPage: boolean }) {
  const { isAuthenticated } = useAuth0();
  return (
    <Header
      style={{
        display: loginPage ? "none" : "block",
      }}
      height={60}
    >
      <Group position="apart" px={20}>
        <img src={BrandIcon} alt="SEARCH BOOK" />
        {isAuthenticated && <LogoutButton />}
      </Group>
    </Header>
  );
}
