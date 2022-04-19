import { Check, DoorExit } from "tabler-icons-react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@mantine/core";
import { showNotification } from "@mantine/notifications";

export default function LogoutButton() {
  const { logout } = useAuth0();
  return (
    <Button
      variant="subtle"
      radius="sm"
      size="xs"
      uppercase
      leftIcon={<DoorExit size={20} strokeWidth={2} color={"#bf4040"} />}
      onClick={() => {
        showNotification({
          icon: <Check />,
          color: "teal",
          title: "SIGN OUT",
          message: "You are now signed out.",
        });
        logout();
      }}
    >
      Sign out
    </Button>
  );
}
