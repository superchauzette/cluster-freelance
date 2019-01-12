import React, { useState, useEffect } from "react";
import { db, extractData } from "../configFirebase";
import { Posts } from "./Posts";
import { FormPost } from "./FormPost";

export function PostsPage() {
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
        <Posts posts={posts} />
      </div>
    </div>
  );
}
