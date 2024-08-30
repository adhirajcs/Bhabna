"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import axios from "axios";

import { UserProfile } from "@components/Profile";

const UserProfilePage = () => {
  const router = useRouter();
  const { id } = useParams(); // Retrieve the user ID from the URL

  const [userPosts, setUserPosts] = useState([]);
  const [userName, setUserName] = useState("");

  const fetchUserPosts = async () => {
    try {
      const response = await axios.get(`/api/users/${id}/posts`);
      const data = response.data;

      setUserPosts(data);
      setUserName(data[0]?.creator?.username || "User"); // Set the username from the post data
    } catch (error) {
      console.error("Failed to fetch user posts", error);
    }
  };

  useEffect(() => {
    if (id) fetchUserPosts();
  }, [id]);

  return (
    <UserProfile
      name={userName}
      desc={`Welcome to ${userName}'s profile page`}
      data={userPosts}
    />
  );
};

export default UserProfilePage;
