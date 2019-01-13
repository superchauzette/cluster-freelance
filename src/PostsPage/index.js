import React, { useState, useEffect, useContext } from "react";
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

  const savePost = (draftPost, freelance) => db.collection("posts").add({ ...draftPost, freelance });

  return (
    <div style={{ padding: "20px" }}>
      <h1>Posts</h1>
      {me && <FormPost onSubmit={savePost} me={me} />}
      <Posts posts={posts} />
    </div>
  );
}
