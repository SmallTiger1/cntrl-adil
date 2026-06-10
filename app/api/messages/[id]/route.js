import connectDB from "@/lib/mongodb";
import Message from "@/models/Message";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  await connectDB();
  const { id } = await params;
  
  try {
    const message = await Message.findById(id);
    if (!message) {
      return NextResponse.json({ error: "Message not found" }, { status: 404 });
    }
    return NextResponse.json(message);
  } catch (error) {
    console.error("Error fetching message:", error);
    return NextResponse.json({ error: "Invalid message ID" }, { status: 400 });
  }
}

export async function DELETE(request, { params }) {
  await connectDB();
  const { id } = await params;
  
  try {
    const message = await Message.findByIdAndDelete(id);
    if (!message) {
      return NextResponse.json({ error: "Message not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Message deleted successfully" });
  } catch (error) {
    console.error("Error deleting message:", error);
    return NextResponse.json({ error: "Invalid message ID" }, { status: 400 });
  }
}


