import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const data = await request.json();

    // Log the contact form submission
    console.log("New contact form submission:", data);

    // Forward to n8n webhook for automation
    const n8nWebhook = process.env.N8N_WEBHOOK_URL || "http://n8n:5678/webhook/new-lead";

    try {
      await fetch(n8nWebhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: "website_contact_form",
          timestamp: new Date().toISOString(),
          ...data,
        }),
      });
    } catch (webhookError) {
      // Don't fail if n8n is unavailable
      console.log("n8n webhook not available:", webhookError);
    }

    // Forward to Mautic for CRM
    const mauticUrl = process.env.MAUTIC_URL;
    if (mauticUrl) {
      try {
        await fetch(`${mauticUrl}/form/submit?formId=1`, {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams({
            "mauticform[first_name]": data.firstName,
            "mauticform[last_name]": data.lastName,
            "mauticform[email]": data.email,
            "mauticform[phone]": data.phone || "",
            "mauticform[message]": data.message || "",
          }),
        });
      } catch (mauticError) {
        console.log("Mautic not available:", mauticError);
      }
    }

    return NextResponse.json({
      success: true,
      message: "Thank you for your inquiry. We will be in touch shortly.",
    });
  } catch (error) {
    console.error("Error processing contact form:", error);
    return NextResponse.json(
      { success: false, error: "Failed to process form submission" },
      { status: 500 }
    );
  }
}
