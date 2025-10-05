import React, { useState, useEffect } from "react";
import appwriteService from "../appwrite/config";
import { PostCard, Container } from "../components";

const AllPost = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    appwriteService.getPosts([]).then(posts => {
      if (posts) {
        setPosts(posts.documents);
      }
    });
  }, []);

  return (
    <div className="all-posts-page">
      <Container>
        <div className="all-posts-header">
          <h1 className="all-posts-title">All Posts</h1>
          <p className="all-posts-subtitle">
            Browse through all published posts
          </p>
        </div>
        <div className="posts-grid">
          {posts.map(post => (
            <PostCard key={post.$id} {...post} />
          ))}
        </div>
      </Container>
    </div>
  );
};

export default AllPost;
