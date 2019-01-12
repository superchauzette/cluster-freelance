import React, { useState } from "react";
import { Button, TextField, Paper } from "@material-ui/core";
import { db } from "../configFirebase";
export function FormPost() {
  const [draftPost, setDraftPost] = useState({});
  const handleChange = e => setDraftPost({ msg: e.target.value, dateMsg: new Date().getTime() });
  const savePost = e => {
    e.preventDefault();
    setDraftPost({});
    db.collection("posts").add(draftPost);
  };
  return (
    <Paper style={{ padding: "20px" }}>
      <form onSubmit={savePost}>
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
          onChange={handleChange}
        />
        <Button variant="contained" color="primary" type="sumbit">
          Envoyer
        </Button>
      </form>
    </Paper>
  );
}
