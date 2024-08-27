"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import axios from "axios";

import Profile from "@components/Profile";

const MyProfile = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const [allPosts, setAllPosts] = useState([]);

  const fetchPosts = async () => {
    const response = await axios.get(`/api/users/${session?.user.id}/posts`);
    const data = response.data;

    setAllPosts(data);
  };

  useEffect(() => {
    if (session?.user.id) fetchPosts();
  }, []);

  const handleEdit = (post) => {
    router.push(`/update-post?id=${post._id}`);
  };

  const handleDelete = async (post) => {
    const hasConfirmed = confirm("Are you sure you want to delete this post?");

    if (hasConfirmed) {
      try {
        await axios.delete(`/api/post/${post._id.toString()}`);
       
        const filteredPosts = allPosts.filter((p) => p._id !== post._id)

        setAllPosts(filteredPosts);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <Profile
      name="My"
      desc="Welcome to your My Profile page"
      data={allPosts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default MyProfile;
