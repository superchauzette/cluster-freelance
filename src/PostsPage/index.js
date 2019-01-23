import React, { useState, useEffect, useContext } from "react";
import { Heading } from "rebass";
import { db, extractData } from "../configFirebase";
import { Posts } from "./Posts";
import { FormPost } from "./FormPost";
import { UserContext } from "../App";

export function PostsPage() {
  const [posts, setPosts] = useState([]);
  const me = useContext(UserContext);

  // Get Posts
  useEffect(() => {
    const unsubscribe = db
      .collection("posts")
      .limit(50)
      .orderBy("dateMsg", "desc")
      .onSnapshot(doc => setPosts(extractData(doc)));

    return () => unsubscribe();
  }, []);

  const savePost = draftPost =>
    db.collection("posts").add({
      ...draftPost,
      freelance: me,
      dateMsg: new Date().getTime()
    });

  return (
    <div style={{ padding: "20px" }}>
      <Heading color="white" mb="30px" fontSize="36px">
        Posts
      </Heading>
      <FormPost onSubmit={savePost} />
      <Posts posts={posts} />
    </div>
  );
}
