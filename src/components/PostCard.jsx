import React, { useEffect, useState } from "react";
import appWriteService from "../appwrite/config";
import { Link } from "react-router-dom";

const PostCard = ({ $id, title, featuredImage }) => {
  const [url, setUrl] = useState("");

  useEffect(() => {
    if (featuredImage) {
      appWriteService
        .getFileView(featuredImage)
        .then(res => setUrl(res))
        .catch(error => console.error("Error loading image:", error));
    }
  }, [featuredImage]);

  return (
    <Link to={`/post/${$id}`} className="post-card-link">
      <div className="post-card">
        <div className="post-card-image-container">
          {url ? (
            <img src={url} alt={title} className="post-card-image" />
          ) : featuredImage ? (
            <div className="post-card-image-loading">
              <div className="loading-text">Loading image...</div>
            </div>
          ) : (
            <div className="post-card-image-placeholder">
              <div className="placeholder-text">No image available</div>
            </div>
          )}
        </div>
        <div className="post-card-content">
          <h2 className="post-card-title">{title}</h2>
          <p className="post-card-readmore">Read more →</p>
        </div>
      </div>
    </Link>
  );
};

export default PostCard;
