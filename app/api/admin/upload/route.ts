import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

// POST /api/admin/upload — save an image to public/uploads/
// Body: multipart/form-data with a single "file" field
export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const file = formData.get("file") as File | null;

        if (!file) {
            return NextResponse.json({ error: "No file provided." }, { status: 400 });
        }

        // Only allow image types
        if (!file.type.startsWith("image/")) {
            return NextResponse.json(
                { error: "Only image files are allowed." },
                { status: 400 }
            );
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Build a unique filename: timestamp + original name (sanitised)
        const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
        const filename = `${Date.now()}_${safeName}`;

        const uploadsDir = path.join(process.cwd(), "public", "uploads");
        await mkdir(uploadsDir, { recursive: true });
        await writeFile(path.join(uploadsDir, filename), buffer);

        return NextResponse.json({ url: `/uploads/${filename}` }, { status: 201 });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "Upload failed." }, { status: 500 });
    }
}
