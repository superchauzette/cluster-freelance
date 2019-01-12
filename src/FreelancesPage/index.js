import React, { useState, useEffect } from "react";
import { extractData } from "../extractData";
import { db, auth } from "../configFirebase";
import { FormProfile } from "./FormProfile";
import { FreelanceForm } from "./FreelanceForm";

const getFreelances = () =>
  db
    .collection("freelances")
    .limit(50)
    .get()
    .then(extractData);

const isAlreadySave = (freelancesData, user) => freelancesData.map(f => f.uid).includes(user.uid);

function useFormChange() {
  const [value, setValue] = useState({});

  const handleChange = key => ({ target }) => {
    const valueInput = target.type === "checkbox" ? target.checked : target.value;
    const newValue = typeof key === "object" ? { ...value, ...key } : { ...value, [key]: valueInput };

    setValue(newValue);
    if (value.uid) {
      db.collection("freelances")
        .doc(value.uid)
        .set(newValue);
    }
  };

  return [value, handleChange, setValue];
}

export function FreelancesPage() {
  const [freelances, setFreelances] = useState([]);
  const [value, handleChange, setValueProfil] = useFormChange();

  // Init Freelances
  useEffect(() => {
    db.collection("freelances")
      .limit(50)
      .onSnapshot(snap => setFreelances(extractData(snap)));
  }, []);

  // Init Profil
  useEffect(() => {
    (async () => {
      const freelancesData = await getFreelances();
      setFreelances(freelancesData);
      const user = auth().currentUser;
      if (!isAlreadySave(freelancesData, user)) {
        const [name, lastname] = user.displayName && user.displayName.split(" ");
        const userData = {
          uid: user.uid,
          name,
          lastname,
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL
        };
        setValueProfil(userData);

        db.collection("freelances")
          .doc(userData.uid)
          .set(userData);
      } else {
        const userProfil = freelancesData.find(f => f.uid === user.uid);
        setValueProfil(userProfil);
      }
    })();
  }, []);

  return (
    <div>
      <div style={{ padding: "15px 50px" }}>
        <FormProfile value={value} onChange={handleChange} />
      </div>
      <FreelanceForm freelances={freelances} />
    </div>
  );
}
