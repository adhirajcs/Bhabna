"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";

import axios from "axios";
import { useRouter } from "next/navigation";
import Form from "@components/Form";

const CreatePost = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    post_body: "",
    tag: "",
  });

  const createPost = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await axios.post("/api/post/new", {
        post_body: post.post_body,
        userId: session?.user.id,
        tag: post.tag,
      });

      if (response.status === 201) {
        router.push("/");
        router.refresh();
      } else {
        console.error("Failed to create post:", response.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Form
        type="Create"
        post={post}
        setPost={setPost}
        submitting={submitting}
        handleSubmit={createPost}
      />
    </>
  );
};

export default CreatePost;
