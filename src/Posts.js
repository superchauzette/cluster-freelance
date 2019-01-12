import React, { useState, useEffect } from "react";
import { db } from "./configFirebase";
import { extractData } from "./extractData";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { withStyles, Button, TextField, Chip, Paper } from "@material-ui/core";
import dateFns from "date-fns";

const styles = {
  card: {
    maxWidth: 345,
    margin: 20
  }
};

const Post = withStyles(styles)(({ classes, post }) => {
  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          Le {dateFns.format(post.dateMsg, "D MMMM YYYY")}
        </Typography>
        <Typography component="p">{post.msg}</Typography>
        <Chip style={{ marginTop: "10px" }} label={post.techno} />
      </CardContent>
    </Card>
  );
});

function FormPost() {
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

export function Posts() {
  const [posts, setPosts] = useState([]);

  // Get Posts
  useEffect(() => {
    const unsubscribe = db
      .collection("posts")
      .limit(50)
      .onSnapshot(doc => setPosts(extractData(doc)));

    return () => unsubscribe();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Posts</h1>
      <FormPost />

      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
        {posts.map(post => (
          <Post key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
