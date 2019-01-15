import React from "react";
import Paper from "@material-ui/core/Paper";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { BigAvatar } from "./BigAvatar";
import TextField from "@material-ui/core/TextField";
import { Flex } from "rebass";

export function Input({ ...props }) {
  return <TextField InputLabelProps={{ shrink: true }} {...props} />;
}

export function FormProfile({ value, onChange }) {
  return (
    <Flex p={["10px", "20px 50px"]}>
      <Paper style={{ width: "100%" }}>
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
          <Flex width="100%" flexDirection={["column", "row"]} alignItems={["center"]}>
            <BigAvatar src={value.photoURL} alt="profil" />
            <Flex flexDirection={["column", "column"]} justifyContent="space-around" width="100%">
              <Flex flexDirection={["column", "row"]} justifyContent="space-around" width="100%">
                  <FormControlLabel
                    control={
                      <Switch
                        value={value.disponible}
                        checked={Boolean(value.disponible)} // why ?
                        color={"primary"}
                        onChange={e =>
                          onChange({ disponible: e.target.checked, dateModifDispo: new Date().getTime() })(e)
                        }
                      />
                    }
                    label="Disponible"
                  />
                <Input label="Prenom" value={value.name} onChange={onChange("name")} />
                <Input label="Nom" value={value.lastname} onChange={onChange("lastname")} />
              </Flex>

              <Flex flexDirection={["column", "row"]} justifyContent="space-around" width="100%" mt="15px">
                <Input label="Société" value={value.societe} onChange={onChange("societe")} />
                <Input label="Techno" value={value.techno} onChange={onChange("techno")} />
                <Input label="Email" value={value.email} onChange={onChange("email")} />
              </Flex>
            </Flex>
          </Flex>
        </form>
      </Paper>
    </Flex>
  );
}
