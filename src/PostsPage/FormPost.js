import React, { useState, useEffect } from "react";
import { Button, TextField, Paper } from "@material-ui/core";
import { db, auth } from "../configFirebase";

export function FormPost({ onSubmit }) {
  const [draftPost, setDraftPost] = useState({});
  const user = auth().currentUser;

  useEffect(
    () => {
      if (user) {
        db.collection("freelances")
          .doc(user.uid)
          .get()
          .then(doc => {
            const freelance = doc.data();
            setDraftPost({ name: freelance.displayName });
          });
      }
    },
    [user]
  );

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(draftPost);
    setDraftPost({});
  };

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
            onChange={e => setDraftPost({ ...draftPost, msg: e.target.value, dateMsg: new Date().getTime() })}
          />
          <div style={{ dispaly: "flex" }}>
            <TextField
              id="techno"
              label="Techno"
              style={{ width: "40%" }}
              placeholder="Ajouter les technos utilisé"
              InputLabelProps={{ shrink: true }}
              value={draftPost.techno}
              onChange={e => setDraftPost({ ...draftPost, techno: e.target.value })}
            />
            <TextField
              style={{ margin: "0 20px", width: "40%" }}
              id="tjm"
              label="TJM"
              fullWidth
              placeholder="Ajouter les technos utilisé"
              InputLabelProps={{ shrink: true }}
              value={draftPost.tjm}
              onChange={e => setDraftPost({ ...draftPost, tjm: e.target.value })}
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
