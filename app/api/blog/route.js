import connectDB from '@/lib/mongodb';
import Blog from '@/models/Blog';
import { NextResponse } from 'next/server';

export async function GET() {
  await connectDB();
  const posts = await Blog.find().sort({ createdAt: -1 });
  return NextResponse.json(posts);
}

export async function POST(request) {
  await connectDB();
  const body = await request.json();
  const post = await Blog.create(body);
  return NextResponse.json(post, { status: 201 });
}