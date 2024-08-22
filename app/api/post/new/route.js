import { connectToDB } from "@utils/database";
import Post from "@models/post";

export const POST = async (req) => {
  const { userId, post_body, tag } = await req.json();

  try {
    await connectToDB();
    const newPost = new Post({
      creator: userId,
      post_body,
      tag,
    });

    await newPost.save();

    return new Response(JSON.stringify(newPost), { status: 201 });
  } catch (error) {
    console.error("Error creating post:", error);
    return new Response("Failed to create a post", { status: 500 });
  }
};
