import React, { useState, useEffect } from "react";
import { db } from "./configFirebase";
import { extractData } from "./extractData";

function Post({ post }) {
  return (
    <p>
      {post.msg} - {post.dateMsg} - {post.techno}
    </p>
  );
}

export function Posts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    db.collection("posts")
      .get()
      .then(extractData)
      .then(data => setPosts(data));
  }, []);

  return (
    <div>
      <h1>Posts</h1>
      {posts.map(post => (
        <Post post={post} />
      ))}
    </div>
  );
}
