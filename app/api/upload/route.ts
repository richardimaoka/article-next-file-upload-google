import { writeFile, mkdir } from 'fs/promises';
import { NextRequest, NextResponse } from 'next/server';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded.' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const filename = file.name.replaceAll(' ', '_');

    // Define the upload directory relative to the project root
    const uploadDir = path.join(process.cwd(), 'uploads');
    const filePath = path.join(uploadDir, filename);

    // Ensure the upload directory exists
    await mkdir(uploadDir, { recursive: true });

    await writeFile(filePath, buffer);

    return NextResponse.json({ message: 'File uploaded successfully!', filename }, { status: 200 });
  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json({ error: 'Failed to upload file.' }, { status: 500 });
  }
}
