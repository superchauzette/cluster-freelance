import React, { useEffect } from "react";
import { ui, auth } from "../configFirebase";
import { Flex, Image } from "rebass";

export const LoginPage = () => {
  useEffect(() => {
    ui.start("#auth-container", {
      signInOptions: [auth.GoogleAuthProvider.PROVIDER_ID, auth.GithubAuthProvider.PROVIDER_ID],
      signInSuccessUrl: "/"
    });
  }, []);

  return (
    <Flex
      style={{
        height: "100vh",
        background:
          "url(https://images.pexels.com/photos/573271/pexels-photo-573271.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260)"
        // backgroundRepeat: "no-repeat",
        // backgroundAttachment: "fixed",
        // backgroundSize: "cover"
      }}
      width="100%"
      alignItems="center"
      justifyContent="center"
    >
      <Flex mt="-200px" flexDirection="column" alignItems="center" justifyContent="center">
        <Image
          src="https://cluster-freelance.io/src/images/dist/logo-main.png"
          style={{ width: "625px", height: "300px" }}
        />
        <div id="auth-container" />
      </Flex>
    </Flex>
  );
};
