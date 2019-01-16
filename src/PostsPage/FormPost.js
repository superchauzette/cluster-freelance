import React, { useState } from "react";
import { Button, TextField, Paper } from "@material-ui/core";

export function FormPost({ onSubmit, me }) {
  const [draftPost, setDraftPost] = useState({});

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(draftPost);
  };

  const handleChange = key => e => setDraftPost({ ...draftPost, [key]: e.target.value });

  return (
    <Paper style={{ padding: "20px" }}>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "20px" }}>
          <TextField
            id="standard-multiline-flexible"
            label="Message à la communaité"
            multiline
            fullWidth
            margin="normal"
            rows="4"
            placeholder="Poster un annonce"
            InputLabelProps={{ shrink: true }}
            value={draftPost.msg}
            onChange={handleChange("msg")}
          />
          <div style={{ dispaly: "flex" }}>
            <TextField
              id="techno"
              label="Techno"
              style={{ width: "40%" }}
              placeholder="Ajouter les technos utilisé"
              InputLabelProps={{ shrink: true }}
              value={draftPost.techno}
              onChange={handleChange("techno")}
            />
            <TextField
              style={{ margin: "0 20px", width: "40%" }}
              id="tjm"
              label="TJM"
              fullWidth
              placeholder="Ajouter les technos utilisé"
              InputLabelProps={{ shrink: true }}
              value={draftPost.tjm}
              onChange={handleChange("tjm")}
            />
          </div>
        </div>
        <Button variant="contained" color="primary" type="sumbit">
          Envoyer
        </Button>
      </form>
    </Paper>
  );
}
