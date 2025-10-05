import React, { useEffect, useState } from "react";
import appwriteService from "../appwrite/config";
import { PostCard, Container } from "../components";
import { useSelector } from "react-redux";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const status = useSelector(state => state.auth.status);

  useEffect(() => {
    appwriteService
      .getPosts()
      .then(posts => {
        if (posts && posts.documents) {
          setPosts(posts.documents);
        } else if (Array.isArray(posts)) {
          setPosts(posts);
        } else {
          setPosts([]);
        }
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching posts:", error);
        setPosts([]);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <Container>
        <div className="home-loading">
          <div className="loading-spinner"></div>
        </div>
      </Container>
    );
  }

  if (!posts || posts.length === 0 || !status) {
    return (
      <Container>
        <div className="home-empty">
          <h1 className="home-empty-title">No Posts Available</h1>
          <p className="home-empty-text">Login to create and read posts</p>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <div className="home-container">
        <h1 className="home-title">Latest Posts</h1>
        <div className="posts-grid">
          {posts.map(post => (
            <PostCard key={post.$id} {...post} />
          ))}
        </div>
      </div>
    </Container>
  );
};

export default Home;
