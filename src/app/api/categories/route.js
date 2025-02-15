import { isAdmin } from "@/app/options";
import { Category } from "@/app/models/Category";
import mongoose from "mongoose";

export async function POST(req) {
    mongoose.connect(process.env.MONGO_URL);
    const { name } = await req.json();

    if (await isAdmin()) {
        const CategoryDoc = await Category.create({ name });
        return Response.json(CategoryDoc);
    } else {
        return Response.json({});
    }

}

export async function PUT(req) {
    mongoose.connect(process.env.MONGO_URL);
    const { _id, name } = await req.json();

    if (await isAdmin()) {
        await Category.updateOne({ _id }, { name });
    }

    return Response.json(true);
}

export async function GET() {
    mongoose.connect(process.env.MONGO_URL);
    return Response.json(
        await Category.find()
    );
}

export async function DELETE(req) {
    mongoose.connect(process.env.MONGO_URL);
    const url = new URL(req.url);
    const _id = url.searchParams.get('_id');

    if (await isAdmin()) {
        await Category.deleteOne({ _id });
    }

    return Response.json(true);
}