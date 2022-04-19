import { BrandGoogle } from "tabler-icons-react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@mantine/core";

export default function LoginButton() {
  const { loginWithRedirect } = useAuth0();
  return (
    <Button
      variant="outline"
      radius="md"
      size="lg"
      uppercase
      leftIcon={<BrandGoogle size={20} strokeWidth={2} color={"#bf4040"} />}
      onClick={() => {
        loginWithRedirect();
      }}
    >
      Google Sign in
    </Button>
  );
}
