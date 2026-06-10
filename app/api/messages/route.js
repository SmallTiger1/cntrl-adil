import connectDB from '@/lib/mongodb';
import Message from '@/models/Message';
import { NextResponse } from 'next/server';

export async function GET() {
  await connectDB();
  const messages = await Message.find().sort({ createdAt: -1 });
  return NextResponse.json(messages);
}

export async function POST(request) {
  await connectDB();
  const body = await request.json();
  const message = await Message.create(body);
  return NextResponse.json(message, { status: 201 });
}