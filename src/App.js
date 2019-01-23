import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { CircularProgress } from "@material-ui/core";
import { Flex } from "rebass";
import { PostsPage } from "./PostsPage";
import { FreelancesPage } from "./FreelancesPage";
import { LoginPage } from "./LoginPage";
import { db, auth } from "./configFirebase";
import { Header } from "./Header";

export const UserContext = React.createContext();

function useMe() {
  const [me, setMe] = useState();
  const [noUser, setNoUser] = useState(false);

  useEffect(() => {
    auth().onAuthStateChanged(user => {
      if (user) {
        db.collection("freelances")
          .doc(user.uid)
          .get()
          .then(doc => doc.data())
          .then(freelance => {
            if (!freelance) {
              const [name, lastname] = user.displayName && user.displayName.split(" ");
              const userData = {
                uid: user.uid,
                name,
                lastname,
                displayName: user.displayName,
                email: user.email,
                photoURL: user.photoURL
              };
              setMe(userData);
            } else {
              setMe(freelance);
            }
          });
      } else {
        setNoUser(true);
      }
    });
  }, []);

  return [me, noUser];
}

const withAuth = user => Component => () => (user ? <Component /> : <Redirect to="/login" />);

function Main({ me }) {
  const withAuthUser = withAuth(me);

  return (
    <>
      <Header />
      <main className="App-header">
        <Route exact path="/" component={withAuthUser(FreelancesPage)} />
        <Route path="/posts" component={withAuthUser(PostsPage)} />
      </main>
    </>
  );
}

function Lodaer() {
  return (
    <Flex style={{ height: "100vh" }} alignItems="center" justifyContent="center" width="100%">
      <CircularProgress />
      <p style={{ marginLeft: "10px" }}>Loading...</p>
    </Flex>
  );
}

export const App = () => {
  const [me, noUser] = useMe();

  return (
    <UserContext.Provider value={me}>
      <Router>
        <Switch>
          {noUser && <Redirect to="/login" />}
          <Route path="/login" component={LoginPage} />
          {!me && !noUser ? <Lodaer /> : <Main me={me} />}
        </Switch>
      </Router>
    </UserContext.Provider>
  );
};
