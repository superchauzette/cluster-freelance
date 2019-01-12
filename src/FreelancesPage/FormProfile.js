import React from "react";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { BigAvatar } from "./BigAvatar";
import TextField from "@material-ui/core/TextField";

export function Input({ ...props }) {
  return <TextField InputLabelProps={{ shrink: true }} {...props} />;
}

export function FormProfile({ value, onChange }) {
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
