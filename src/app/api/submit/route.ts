import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const scriptUrl = process.env.GOOGLE_SCRIPT_URL;

    if (!scriptUrl) {
      return NextResponse.json(
        {
          success: false,
          message:
            "GOOGLE_SCRIPT_URL belum dikonfigurasi.",
        },
        {
          status: 500,
        }
      );
    }

    const response = await fetch(scriptUrl, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
      body: JSON.stringify(data),
      cache: "no-store",
    });

    const result = await response.json();

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          message:
            result.message ||
            "Gagal menyimpan data ke Google Sheets.",
        },
        {
          status: 500,
        }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Data berhasil disimpan ke Google Sheets.",
    });
  } catch (error) {
    console.error("Submit error:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Terjadi kesalahan saat menyimpan data.",
      },
      {
        status: 500,
      }
    );
  }
}