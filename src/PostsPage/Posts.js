import React from "react";
import dateFns from "date-fns";
import { withStyles, Chip, Card, CardContent, Typography } from "@material-ui/core";
import { Flex } from "rebass";

const styles = {
  card: { width: 345, maxWidth: 345, margin: 20 }
};

const Post = withStyles(styles)(({ classes, post }) => {
  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography gutterBottom variant="subtitle1" inline>
          Le {dateFns.format(post.dateMsg, "D MMMM YYYY")}
        </Typography>
        <Typography component="p">{post.msg}</Typography>
        <Chip style={{ marginTop: "10px" }} label={post.techno} />
        <Typography color="secondary">{post.name}</Typography>
      </CardContent>
    </Card>
  );
});

export function Posts({ posts }) {
  return (
    <Flex flexDirection="column" alignItems="center">
      {posts.map(post => (
        <Post key={post.id} post={post} />
      ))}
    </Flex>
  );
}
