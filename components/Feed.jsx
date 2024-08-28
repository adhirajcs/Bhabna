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

  // Search related states
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState([]);

  const fetchPosts = async () => {
    const response = await axios.get("/api/post");
    const data = response.data;

    setAllPosts(data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    setSearchTimeout(
      setTimeout(() => {
        const searchResult = allPosts.filter(
          (post) =>
            post.post_body.toLowerCase().includes(searchText.toLowerCase()) ||
            post.tag.toLowerCase().includes(searchText.toLowerCase()) ||
            post.creator.username
              .toLowerCase()
              .includes(searchText.toLowerCase())
        );
        setSearchedResults(searchResult);
      }, 500)
    );
  };

  const handleTagClick = (tagName) => {
    setSearchText(tagName);

    const filteredPosts = allPosts.filter(
      (post) => post.tag.toLowerCase() === tagName.toLowerCase()
    );

    setSearchedResults(filteredPosts);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <section className="feed">
        <form
          className="relative w-full flex-center"
          onSubmit={handleFormSubmit}
        >
          <input
            type="text"
            placeholder="Search for a post/tag/username..."
            value={searchText}
            onChange={handleSearchChange}
            required
            className="search_input peer"
          />
        </form>

        <PostCardList
          data={searchText ? searchedResults : allPosts}
          handleTagClick={handleTagClick}
        />
      </section>
    </>
  );
};

export default Feed;
