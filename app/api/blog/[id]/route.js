import connectDB from "@/lib/mongodb";
import Blog from "@/models/Blog";
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(request, { params }) {
  await connectDB();
  const { id } = await params;
  
  try {
    const post = await Blog.findById(id);
    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }
    return NextResponse.json(post);
  } catch (error) {
    console.error("Error fetching post:", error);
    return NextResponse.json({ error: "Invalid post ID" }, { status: 400 });
  }
}

export async function PUT(request, { params }) {
  await connectDB();
  const { id } = await params;
  const body = await request.json();
  
  try {
    // Get old post to delete old image if needed
    const oldPost = await Blog.findById(id);
    
    const post = await Blog.findByIdAndUpdate(id, body, { new: true });
    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }
    
    // Delete old image if it was replaced
    if (oldPost.image && oldPost.image !== body.image && oldPost.image !== "") {
      const oldImagePath = path.join(process.cwd(), "public", oldPost.image);
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }
    }
    
    return NextResponse.json(post);
  } catch (error) {
    console.error("Error updating post:", error);
    return NextResponse.json({ error: "Invalid post ID" }, { status: 400 });
  }
}

export async function DELETE(request, { params }) {
  await connectDB();
  const { id } = await params;
  
  try {
    const post = await Blog.findById(id);
    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }
    
    // Delete image file if exists
    if (post.image && post.image !== "") {
      const imagePath = path.join(process.cwd(), "public", post.image);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }
    
    await post.deleteOne();
    return NextResponse.json({ message: "Post deleted" });
  } catch (error) {
    console.error("Error deleting post:", error);
    return NextResponse.json({ error: "Invalid post ID" }, { status: 400 });
  }
}