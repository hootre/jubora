import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const orderId = formData.get("orderId") as string | null;

    if (!file || !orderId) {
      return NextResponse.json({ error: "file과 orderId가 필요합니다." }, { status: 400 });
    }

    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json({ error: "파일 크기는 10MB 이하만 가능합니다." }, { status: 400 });
    }

    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const preset = process.env.NEXT_PUBLIC_CLOUDINARY_PRESET ?? "jubora_unsigned";

    if (!cloudName) {
      return NextResponse.json({ error: "Cloudinary 설정이 없습니다." }, { status: 500 });
    }

    // 서버에서 Cloudinary에 업로드 (CORS 문제 없음)
    const uploadForm = new FormData();
    uploadForm.append("file", file);
    uploadForm.append("upload_preset", preset);
    uploadForm.append("folder", `proofs/${orderId}`);

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
    console.error("Proof upload error:", e);
    return NextResponse.json({ error: e?.message ?? "업로드 실패" }, { status: 500 });
  }
}
