"use client";

import { useState, useEffect } from "react";
import PostCard from "./PostCard";
import axios from "axios";

const PostCardList = ({ data, handleTagClick }) => {
  return (
    <>
      <div className="mt-16 post_layout">
        {data.map((post) => (
          <PostCard
            key={post._id}
            post={post}
            handleTagClick={handleTagClick}
          />
        ))}
      </div>
    </>
  );
};

const Feed = () => {
  const [allPosts, setAllPosts] = useState([]);
  
  const [searchText, setSearchText] = useState("");

  
  const fetchPosts = async () => {
    const response = await axios.get("/api/post");
    const data = response.data;
    
    setAllPosts(data);
  };
  
  useEffect(() => {
    fetchPosts();
  }, []);
  
  const handleSearchChange = () => {};

  const handleTagClick = () => {};

  return (
    <>
      <section className="feed">
        <form className="relative w-full flex-center">
          <input
            type="text"
            placeholder="Search for a post/tag/username..."
            value={searchText}
            onChange={handleSearchChange}
            required
            className="search_input peer"
          />
        </form>
        <PostCardList data={allPosts} handleTagClick={handleTagClick} />
      </section>
    </>
  );
};

export default Feed;
