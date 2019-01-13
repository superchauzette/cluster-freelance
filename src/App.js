import React, { useState, useEffect, Fragment } from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { PostsPage } from "./PostsPage";
import { FreelancesPage } from "./FreelancesPage";
import { LoginPage } from "./LoginPage";
import { db, auth } from "./configFirebase";
import { Header } from "./Header";

const withAuth = Component => () => {
  const user = JSON.parse(localStorage.getItem("firebaseui::rememberedAccounts"));
  return user ? <Component /> : <Redirect to="/login" />;
};

export const UserContext = React.createContext();

function useMe() {
  const [me, setMe] = useState();

  useEffect(() => {
    auth().onAuthStateChanged(user => {
      if (user) {
        db.collection("freelances")
          .doc(user.uid)
          .get()
          .then(doc => doc.data())
          .then(freelance => setMe(freelance));
      }
    });
  }, []);

  return me;
}

export const App = () => {
  const me = useMe();

  return (
    <Router>
      <Fragment>
        <Header />
        <main className="App-header">
          <UserContext.Provider value={me}>
            <Switch>
              <Route path="/login" component={LoginPage} />
              <Route exact path="/" component={withAuth(FreelancesPage)} />
              <Route exact path="/posts" component={withAuth(PostsPage)} />
            </Switch>
          </UserContext.Provider>
        </main>
      </Fragment>
    </Router>
  );
};
