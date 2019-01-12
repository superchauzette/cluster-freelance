import React, { useState, useEffect } from "react";
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
import Avatar from "@material-ui/core/Avatar";
import { Dot } from "./Dot";
import { extractData } from "./extractData";
import { db, authenticate } from "./configFirebase";
import { withStyles } from "@material-ui/core";

const getFreelances = () =>
  db
    .collection("freelances")
    .limit(50)
    .get()
    .then(extractData);

export function PageFreelance() {
  const [freelances, setFreelances] = useState([]);
  const [value, handleChange, setValue] = useFormChange();

  useEffect(
    async () => {
      const freelancesData = await getFreelances();
      setFreelances(freelancesData);
    },
    [value]
  );

  useEffect(
    async () => {
      const { user } = await authenticate();
      const freelancesData = await getFreelances();
      setFreelances(freelancesData);

      if (!freelancesData.map(f => f.uid).includes(user.uid)) {
        const [name, lastname] = user.displayName && user.displayName.split(" ");
        const userData = {
          uid: user.uid,
          name,
          lastname,
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL
        };
        setValue(userData);

        db.collection("freelances")
          .doc(userData.uid)
          .set(userData);
      } else {
        setValue(freelancesData.find(f => f.uid === user.uid));
      }
    },
    []
  );

  return (
    <div>
      <div style={{ padding: "15px 50px" }}>
        <FormProfile value={value} onChange={handleChange} />
      </div>
      <FreelanceForm freelances={freelances} />
    </div>
  );
}

function useFormChange(freelance) {
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

function Input({ ...props }) {
  return <TextField InputLabelProps={{ shrink: true }} {...props} />;
}

const styles = {
  bigAvatar: {
    margin: 10,
    width: 120,
    height: 120
  }
};

const BigAvatar = withStyles(styles)(({ classes, ...props }) => <Avatar className={classes.bigAvatar} {...props} />);

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
          <BigAvatar src={value.photoURL} alt="profil" />
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

function FreelanceForm({ freelances }) {
  return (
    <div style={{ padding: "20px 50px" }}>
      {freelances.map(freelance => (
        <ExpansionPanel key={freelance.uid}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <div style={{ display: "flex", alignItems: "center", width: "100%", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <Dot color={freelance.disponible ? "green" : "red"} />
                <Typography style={{ marginLeft: "10px" }}>{`${freelance.name} ${freelance.lastname}`}</Typography>
                <Typography style={{ marginLeft: "3px" }}>
                  {`${
                    freelance.disponible
                      ? "est disponible depuis le " + dateFns.format(freelance.dateModifDispo, "D MMMM YYYY")
                      : "travail chez " + freelance.societe
                  }`}
                </Typography>
              </div>
              <div>
                {freelance.techno &&
                  freelance.techno.split(",").map(tech => <Chip style={{ marginLeft: "10px" }} label={tech} />)}
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
