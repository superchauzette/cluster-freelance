import React, { useState, useEffect, useContext } from "react";
import { db, extractData } from "../configFirebase";
import { FormProfile } from "./FormProfile";
import { Freelances } from "./Freelances";
import { UserContext } from "../App";

function useFormChange() {
  const [value, setValue] = useState({});

  const handleChange = key => ({ target }) => {
    const valueInput =
      target.type === "checkbox" ? target.checked : target.value;
    const newValue =
      typeof key === "object"
        ? { ...value, ...key }
        : { ...value, [key]: valueInput };

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
  const user = useContext(UserContext);

  // Init Freelances
  useEffect(() => {
    db.collection("freelances")
      .limit(50)
      .onSnapshot(snap => {
        const freelances = extractData(snap);
        setFreelances(freelances);
        // Init Profil
        const userProfil = freelances.find(f => f.uid === user.uid);
        setValueProfil(userProfil);
      });
  }, []);

  return (
    <div>
      <FormProfile value={value} onChange={handleChange} />
      <Freelances freelances={freelances} />
    </div>
  );
}
