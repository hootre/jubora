import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "file이 필요합니다." }, { status: 400 });
    }

    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: "파일 크기는 5MB 이하만 가능합니다." }, { status: 400 });
    }

    const allowed = ["image/jpeg", "image/png", "image/webp", "image/gif"];
    if (!allowed.includes(file.type)) {
      return NextResponse.json({ error: "JPG, PNG, WEBP, GIF만 업로드 가능합니다." }, { status: 400 });
    }

    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const preset = process.env.NEXT_PUBLIC_CLOUDINARY_PRESET ?? "jubora_unsigned";

    if (!cloudName) {
      // Cloudinary 미설정 시 base64 data URL 반환 (개발용)
      const buffer = await file.arrayBuffer();
      const base64 = Buffer.from(buffer).toString("base64");
      const dataUrl = `data:${file.type};base64,${base64}`;
      return NextResponse.json({ url: dataUrl });
    }

    const uploadForm = new FormData();
    uploadForm.append("file", file);
    uploadForm.append("upload_preset", preset);
    uploadForm.append("folder", "products");

    const cloudRes = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      { method: "POST", body: uploadForm }
    );

    if (!cloudRes.ok) {
      const errText = await cloudRes.text().catch(() => "");
      console.error("Cloudinary error:", cloudRes.status, errText);
      return NextResponse.json(
        { error: `Cloudinary 업로드 실패 (${cloudRes.status})` },
        { status: 500 }
      );
    }

    const cloudData = await cloudRes.json();
    return NextResponse.json({ url: cloudData.secure_url });
  } catch (e: any) {
    console.error("Product image upload error:", e);
    return NextResponse.json({ error: e?.message ?? "업로드 실패" }, { status: 500 });
  }
}
