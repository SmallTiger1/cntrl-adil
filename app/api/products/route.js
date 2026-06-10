import connectDB from '@/lib/mongodb';
import Product from '@/models/Product';
import { NextResponse } from 'next/server';

export async function GET() {
  await connectDB();
  const products = await Product.find().sort({ createdAt: -1 });
  return NextResponse.json(products);
}

export async function POST(request) {
  await connectDB();
  const body = await request.json();
  const product = await Product.create(body);
  return NextResponse.json(product, { status: 201 });
}