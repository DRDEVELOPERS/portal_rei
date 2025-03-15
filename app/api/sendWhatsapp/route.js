// app/api/sendWhatsapp/route.js
import { NextResponse } from "next/server";
import Twilio from "twilio";

export async function POST(req) {
  const { to, contentSid, contentVariables } = await req.json();

  try {
    const client = Twilio(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_AUTH_TOKEN
    );

    const response = await client.messages.create({
      from: process.env.TWILIO_PHONE_NUMBER,
      to: `whatsapp:${to}`,
      contentSid,
      contentVariables,
    });

    return NextResponse.json({
      success: true,
      sid: response.sid,
      status: response.status,
      preview: `https://portalferragem.shop/api/whatsapp-preview?sid=${response.sid}`,
    });
  } catch (error) {
    console.error("Twilio error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
