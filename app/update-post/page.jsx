"use client";

import { Suspense, useEffect, useState } from "react";

import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import Form from "@components/Form";

const EditPost = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const postId = searchParams.get("id");

  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    post_body: "",
    tag: "",
  });

  useEffect(() => {
    const getPostDetails = async () => {
      const res = await axios.get(`/api/post/${postId}`);
      const data = res.data;

      setPost({
        post_body: data.post_body,
        tag: data.tag,
      });
    };

    if (postId) {
      getPostDetails();
    }
  }, [postId]);

  const UpdatePost = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    if (!postId) {
      return Alert("Post ID not found");
    }
    try {
      const response = await axios.patch(`/api/post/${postId}`, {
        post_body: post.post_body,
        tag: post.tag,
      });

      if (response.status === 200) {
        router.push("/");
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
        type="Edit"
        post={post}
        setPost={setPost}
        submitting={submitting}
        handleSubmit={UpdatePost}
      />
    </>
  );
};

export default function WrappedEditPost() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EditPost />
    </Suspense>
  );
}
