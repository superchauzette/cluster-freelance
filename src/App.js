import React, { useState, useEffect, Fragment } from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { CircularProgress } from "@material-ui/core";
import { Flex } from "rebass";
import { PostsPage } from "./PostsPage";
import { FreelancesPage } from "./FreelancesPage";
import { LoginPage } from "./LoginPage";
import { db, auth } from "./configFirebase";
import { Header } from "./Header";

const withAuth = user => Component => () => {
  return user ? <Component /> : <Redirect to="/login" />;
};

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

export const App = () => {
  const [me, noUser] = useMe();
  const withAuthUser = withAuth(me);

  return (
    <Router>
      <Fragment>
        {noUser && <Redirect to="/login" />}
        <Header />
        <main className="App-header">
          <UserContext.Provider value={me}>
            {!me && !noUser ? (
              <Flex style={{ height: "100vh" }} alignItems="center" justifyContent="center" width="100%">
                <CircularProgress />
                <p style={{ marginLeft: "10px" }}>Loading...</p>
              </Flex>
            ) : (
              <Switch>
                <Route path="/login" component={LoginPage} />
                <Route exact path="/" component={withAuthUser(FreelancesPage)} />
                <Route exact path="/posts" component={withAuthUser(PostsPage)} />
              </Switch>
            )}
          </UserContext.Provider>
        </main>
      </Fragment>
    </Router>
  );
};
