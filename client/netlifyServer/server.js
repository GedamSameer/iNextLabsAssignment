// Netlify Serverless Function (CommonJS for max compatibility)
exports.handler = async (event) => {
  try {
    const body = JSON.parse(event.body || "{}");
    const prompt = body.prompt || "";
    const delay = 400 + Math.floor(Math.random() * 1000);
    await new Promise((r) => setTimeout(r, delay));

    const reply = prompt
      ? `Thanks for your message: “${prompt}”.\n\nHere’s a mock response: AssistAI helps users converse with your knowledge securely, with guardrails and analytics.`
      : "How can I help you explore the iNextLabs AI suite?";

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ reply, delay }),
    };
  } catch (e) {
    return { statusCode: 500, body: JSON.stringify({ error: "Server error" }) };
  }
};
