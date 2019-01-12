import React from "react";
import dateFns from "date-fns";
import { withStyles, Chip, Card, CardContent, Typography } from "@material-ui/core";

const styles = {
  card: { maxWidth: 345, margin: 20 }
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

export function Posts({ posts }) {
  return posts.map(post => <Post key={post.id} post={post} />);
}
