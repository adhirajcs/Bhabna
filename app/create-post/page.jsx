"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

import Form from "@components/Form";

const CreatePost = () => {
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    post_body: "",
    tag: "",
  });

  const createPost = async (e) => {};

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
