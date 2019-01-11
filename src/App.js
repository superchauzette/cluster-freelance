import React, { useState, useEffect } from "react";
import "./App.css";
import * as firebase from "firebase/app";
import "firebase/firestore";

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

// Disable deprecated features
db.settings({
  timestampsInSnapshots: true
});

function useInitFreelance(countSubmit) {
  const [freelances, setFreelances] = useState([]);
  useEffect(
    () => {
      db.collection("freelances")
        .limit(50)
        .get()
        .then(querySnapshot => {
          let d = [];
          querySnapshot.forEach(doc => {
            d.push({ ...doc.data(), id: doc.id });
          });
          return d;
        })
        .then(data => setFreelances(data));
    },
    [countSubmit]
  );

  return [freelances, setFreelances];
}

function useFormChange() {
  const [value, setValue] = useState({});
  const handleChange = key => ({ target }) => {
    const value = target.type === "checkbox" ? target.checked : target.value;
    setValue({ ...value, [key]: value });
  };

  return [value, setValue, handleChange];
}

export const App = () => {
  const [countSubmit, setCountSubmit] = useState(0);
  const [freelances] = useInitFreelance(countSubmit);
  const [value, setValue, handleChange] = useFormChange();

  console.log({ freelances });

  return (
    <div className="App">
      <header>
        <h1>Cluster Freelance</h1>
      </header>
      <form
        onSubmit={async e => {
          e.preventDefault();
          const colFrelance = db.collection("freelances");
          const doc = value.id
            ? colFrelance.doc(value.id).set(value)
            : colFrelance.add(value);
          await doc;
          setCountSubmit(countSubmit + 1);
          setValue({});
        }}
        style={{
          display: "flex",
          justifyContent: "space-around",
          padding: "20px"
        }}
      >
        disponible:{" "}
        <input
          type="checkbox"
          checked={value.disponible}
          onChange={handleChange("disponible")}
        />
        name: <input value={value.name} onChange={handleChange("name")} />
        lastname :{" "}
        <input value={value.lastname} onChange={handleChange("lastname")} />
        societe :{" "}
        <input value={value.societe} onChange={handleChange("societe")} />
        techno :{" "}
        <input value={value.techno} onChange={handleChange("techno")} />
        email : <input value={value.email} onChange={handleChange("email")} />
        <button type="submit"> Envoyer</button>
        <button type="reset" onClick={() => setValue({})}>
          Reset
        </button>
      </form>

      <main className="App-header">
        {freelances.map(freelance => (
          <div
            key={freelance.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "0 50px",
              backgroundColor: freelance.id === value.id ? "#73737326" : "white"
            }}
            onClick={() => setValue(freelance)}
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
      </main>
    </div>
  );
};

export default App;
