import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const publicDir = path.join(process.cwd(), 'public');
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }

    // Save as headshot.png, profile.png, and profile.jpg for maximum compatibility
    const headshotPath = path.join(publicDir, 'headshot.png');
    const profilePngPath = path.join(publicDir, 'profile.png');
    const profileJpgPath = path.join(publicDir, 'profile.jpg');

    await fs.promises.writeFile(headshotPath, buffer);
    await fs.promises.writeFile(profilePngPath, buffer);
    await fs.promises.writeFile(profileJpgPath, buffer);

    return NextResponse.json({
      success: true,
      message: 'Headshot uploaded and saved successfully',
      url: '/headshot.png',
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Upload failed';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
