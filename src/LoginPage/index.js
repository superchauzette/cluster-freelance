import React, { useEffect } from "react";
import { ui, auth } from "../configFirebase";

export const LoginPage = () => {
  useEffect(() => {
    ui.start("#auth-container", {
      signInOptions: [auth.GoogleAuthProvider.PROVIDER_ID, auth.GithubAuthProvider.PROVIDER_ID],
      signInSuccessUrl: "/"
    });
  }, []);

  return <div id="auth-container" />;
};
