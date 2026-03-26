import { NextResponse } from "next/server";
import Retell from "retell-sdk";

const retell = new Retell({
  apiKey: process.env.RETELL_API_KEY || "",
});

export async function POST(req: Request) {
  try {
    const { agent_id } = await req.json();

    if (!agent_id) {
      return NextResponse.json(
        { error: "agent_id is required" },
        { status: 400 }
      );
    }

    const webCallResponse = await retell.call.createWebCall({
      agent_id: agent_id,
      agent_override: {
        agent: {
          max_call_duration_ms: 300000, // 5 minutes max
          end_call_after_silence_ms: 30000, // 30 seconds of silence hangs up
        },
      },
    });

    return NextResponse.json(webCallResponse);
  } catch (error: any) {
    console.error("Error creating web call:", error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
