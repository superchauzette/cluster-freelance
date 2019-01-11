import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, NavLink } from "react-router-dom";
import "./App.css";
import * as firebase from "firebase/app";
import "firebase/firestore";
import Logo from "./logo.svg";
import dateFns from "date-fns";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Paper from "@material-ui/core/Paper";
import Chip from "@material-ui/core/Chip";
import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Button from "@material-ui/core/Button";

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

function Input({ ...props }) {
  return <TextField InputLabelProps={{ shrink: true }} {...props} />;
}

function FormProfile({ value, onChange }) {
  return (
    <Paper>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "20px"
        }}
        noValidate
        autoComplete="off"
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
            <div style={{ display: "flex", justifyContent: "space-around", width: "100%" }}>
              <label>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={value.disponible}
                      onChange={e =>
                        onChange({ disponible: e.target.checked, dateModifDispo: new Date().getTime() })(e)
                      }
                    />
                  }
                  label="Disponible"
                />
              </label>
              <Input label="Prenom" value={value.name} onChange={onChange("name")} />
              <Input label="Nom" value={value.lastname} onChange={onChange("lastname")} />
            </div>
            <div style={{ display: "flex", justifyContent: "space-around", width: "100%" }}>
              <Input label="Société" value={value.societe} onChange={onChange("societe")} />
              <Input label="Techno" value={value.techno} onChange={onChange("techno")} />
              <Input label="Email" value={value.email} onChange={onChange("email")} />
            </div>
          </div>
        </div>
      </form>
    </Paper>
  );
}

function Dot({ color }) {
  return (
    <div
      style={{
        width: "10px",
        height: "10px",
        borderRadius: "50%",
        backgroundColor: color
      }}
    />
  );
}

function FreelanceForm({ freelances }) {
  return (
    <div style={{ padding: "20px 50px" }}>
      {freelances.map(freelance => (
        <ExpansionPanel key={freelance.id}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <div style={{ display: "flex", alignItems: "center", width: "600px", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <Dot color={freelance.disponible ? "green" : "red"} />
                <Typography style={{ marginLeft: "10px" }}>{`${freelance.name} ${freelance.lastname}`}</Typography>
                <Typography style={{ marginLeft: "3px" }}>
                  {`${
                    freelance.disponible
                      ? "est disponible depuis le " + dateFns.format(freelance.dateModifDispo, "D MMMM YYYY")
                      : ""
                  }`}
                </Typography>
              </div>
              <div>
                {freelance.techno.split(",").map(tech => (
                  <Chip style={{ marginLeft: "10px" }} label={tech} />
                ))}
              </div>
            </div>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              <p>nom: {freelance.lastname}</p>
              <p>societe : {freelance.societe}</p>
              <p>techno : {freelance.techno}</p>
              <p>email : {freelance.email}</p>
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
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

function PageFreelance() {
  const [freelances, setFreelances] = useState([]);
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
    <div>
      <div style={{ padding: "15px 50px" }}>
        <FormProfile value={value} onChange={handleChange} />
      </div>
      <FreelanceForm freelances={freelances} />
    </div>
  );
}

export const App = () => {
  return (
    <Router>
      <div>
        <header style={{ padding: "0 40px", display: "flex", alignItems: "center" }}>
          <img
            style={{ height: "100px" }}
            src="https://www.cluster-freelance.io/src/images/dist/logo-main.png"
            alt="logo"
          />
          <Button variant="contained" color="primary" component={NavLink} to="/" style={{ margin: "20px" }}>
            Frelances
          </Button>
          <Button variant="contained" color="secondary" component={NavLink} to="/posts">
            Posts
          </Button>
        </header>

        <main className="App-header">
          <Switch>
            <Route exact path="/" component={PageFreelance} />
            <Route exact path="/posts" component={Posts} />
          </Switch>
        </main>
      </div>
    </Router>
  );
};

export default App;
