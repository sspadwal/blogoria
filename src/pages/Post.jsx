import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
  const [post, setPost] = useState(null);
  const [featuredImageUrl, setFeaturedImageUrl] = useState("");
  const { slug } = useParams();
  const navigate = useNavigate();
  const userData = useSelector(state => state.auth.userData);

  const isAuthor = post && userData ? post.userId === userData.$id : false;

  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then(post => {
        if (post) {
          setPost(post);
          if (post.featuredImage) {
            appwriteService
              .getFileView(post.featuredImage)
              .then(url => setFeaturedImageUrl(url))
              .catch(error => console.error("Error getting image URL:", error));
          }
        } else navigate("/");
      });
    } else navigate("/");
  }, [slug, navigate]);

  const deletePost = () => {
    appwriteService.deletePost(post.$id).then(status => {
      if (status) {
        appwriteService.deleteFile(post.featuredImage);
        navigate("/");
      }
    });
  };

  return post ? (
    <div className="post-page">
      <Container>
        <article className="post-article">
          <div className="post-image-container">
            {featuredImageUrl ? (
              <img
                src={featuredImageUrl}
                alt={post.title}
                className="post-featured-image"
              />
            ) : (
              <div className="post-image-placeholder">
                <div className="post-image-loading-text">Loading image...</div>
              </div>
            )}

            {isAuthor && (
              <div className="post-actions">
                <Link to={`/edit-post/${post.$id}`}>
                  <Button className="post-edit-btn">Edit</Button>
                </Link>
                <Button className="post-delete-btn" onClick={deletePost}>
                  Delete
                </Button>
              </div>
            )}
          </div>

          <div className="post-content">
            <h1 className="post-title">{post.title}</h1>
            <div className="post-body">{parse(post.content)}</div>
          </div>
        </article>
      </Container>
    </div>
  ) : null;
}
