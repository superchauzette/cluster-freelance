import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import "./App.css";
import * as firebase from "firebase/app";
import "firebase/firestore";
import Logo from "./logo.svg";

const config = {
  apiKey: "AIzaSyCWxXcYiEhI9QOIVP5xfVC5-Dd_AvtSZ94",
  authDomain: "cluster-freelance.firebaseapp.com",
  databaseURL: "https://cluster-freelance.firebaseio.com",
  projectId: "cluster-freelance",
  storageBucket: "cluster-freelance.appspot.com",
  messagingSenderId: "665141570788"
};
firebase.initializeApp(config);

const db = firebase.firestore();
db.settings({ timestampsInSnapshots: true }); // Disable deprecated features

function extractData(querySnapshot) {
  let d = [];
  querySnapshot.forEach(doc => {
    d.push({ ...doc.data(), id: doc.id });
  });
  return d;
}

function useInitFreelance() {
  const [freelances, setFreelances] = useState([]);

  return [freelances, setFreelances];
}

function useFormChange(freelance) {
  console.log("freelance", freelance);
  const [value, setValue] = useState({});

  const handleChange = key => ({ target }) => {
    const valueInput = target.type === "checkbox" ? target.checked : target.value;
    const newValue = typeof key === "object" ? { ...value, ...key } : { ...value, [key]: valueInput };
    console.log(newValue);
    setValue(newValue);
    if (value.id) {
      db.collection("freelances")
        .doc(value.id)
        .set(newValue);
    }
  };

  return [value, handleChange, setValue];
}

function FormProfile({ value, onChange }) {
  return (
    <form
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "20px",
        border: "1px solid #a29e9e",
        boxShadow: "rgba(0, 0, 0, 0.07) 0px 3px 2px 2px",
        width: "1000px"
      }}
    >
      <h2>Mon Profil</h2>
      <div style={{ display: "flex", width: "100%" }}>
        <img src={Logo} alt="profil" />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            justifyContent: "space-around"
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              width: "100%"
            }}
          >
            <label>
              disponible:{" "}
              <input
                type="checkbox"
                checked={value.disponible}
                onChange={e =>
                  onChange({
                    disponible: e.target.checked,
                    dateModifDispo: new Date().getTime()
                  })(e)
                }
              />
            </label>
            <label>
              name: <input value={value.name} onChange={onChange("name")} />{" "}
            </label>
            <label>
              lastname : <input value={value.lastname} onChange={onChange("lastname")} />
            </label>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              width: "100%"
            }}
          >
            societe : <input value={value.societe} onChange={onChange("societe")} />
            techno : <input value={value.techno} onChange={onChange("techno")} />
            email : <input value={value.email} onChange={onChange("email")} />
          </div>
        </div>
      </div>
    </form>
  );
}

function FreelanceForm({ freelances }) {
  return (
    <div>
      {freelances.map(freelance => (
        <div
          key={freelance.id}
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "0 50px"
          }}
        >
          <div
            style={{
              width: "15px",
              height: "15px",
              borderRadius: "50%",
              backgroundColor: freelance.disponible ? "green" : "red"
            }}
          />
          <p>prenom: {freelance.name}</p>
          <p>nom: {freelance.lastname}</p>
          <p>societe : {freelance.societe}</p>
          <p>techno : {freelance.techno}</p>
          <p>email : {freelance.email}</p>
        </div>
      ))}
    </div>
  );
}

function Post({ post }) {
  return (
    <p>
      {post.msg} - {post.dateMsg} - {post.techno}
    </p>
  );
}

function Posts() {
  const [posts, setPosts] = useState([]);
  // ADD Post
  // useEffect(() => {
  //   db.collection("posts")
  //     .add({
  //       msg: "Bonjour je cherche un dev React pour le 2 decembre",
  //       dateMsg: new Date().getTime(),
  //       techno: ["React"]
  //     })
  //     .then(data => console.log("posts", data));
  // }, []);

  useEffect(() => {
    db.collection("posts")
      .get()
      .then(extractData)
      .then(data => setPosts(data));
  }, []);

  return (
    <div>
      <h1>Posts</h1>
      {posts.map(post => (
        <Post post={post} />
      ))}
    </div>
  );
}

export const App = () => {
  const [freelances, setFreelances] = useInitFreelance();
  const [value, handleChange, setValue] = useFormChange();

  useEffect(
    () => {
      db.collection("freelances")
        .limit(50)
        .get()
        .then(extractData)
        .then(data => setFreelances(data));
    },
    [value]
  );

  const me = freelances[0] || {};
  useEffect(() => me.id && setValue(me), [me.id]);

  return (
    <Router>
      <div>
        <header style={{ padding: "10px" }}>
          <h1>Cluster Freelance</h1>
          <NavLink to="/">Frelances</NavLink> <NavLink to="/posts">Posts</NavLink>
        </header>

        <main className="App-header">
          <Route
            exact
            path="/"
            render={() => (
              <div>
                <div style={{ padding: "15px 50px" }}>
                  <FormProfile value={value} onChange={handleChange} />
                </div>
                <FreelanceForm freelances={freelances} />
              </div>
            )}
          />
          <Route exact path="/posts" component={Posts} />
        </main>
      </div>
    </Router>
  );
};

export default App;
