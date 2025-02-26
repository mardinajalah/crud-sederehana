import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import type { Product } from "@prisma/client";

const prisma = new PrismaClient();

export const PATCH = async (request: Request, {params} : {params: Promise<{id: string}>}) => {
  const body: Product = await request.json();
  const product = await prisma.product.update({
    where: {
      id: Number((await params).id)
    },
    data: {
      title: body.title,
      price: body.price,
      brandId: body.brandId
    }
  });

  return NextResponse.json(product, { status: 200 });
}

export const DELETE = async (request: Request, {params} : {params: Promise<{id: string}>}) => {
  const product = await prisma.product.delete({
    where: {
      id: Number((await params).id)
    }
  });

  return NextResponse.json(product, { status: 200 });
}