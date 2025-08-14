import { openai } from "@ai-sdk/openai"
import { generateText, streamText } from "ai"

export interface ChatMessage {
  role: "system" | "user" | "assistant"
  content: string
}

export interface AutomationContext {
  platform: "instagram" | "whatsapp" | "email"
  triggerType: "comment" | "dm" | "mention" | "email"
  userPersonality?: string
  brandVoice?: string
  responseTemplate?: string
}

export async function generateAutomationResponse(
  triggerContent: string,
  context: AutomationContext,
  userProfile?: { full_name?: string; brand_voice?: string },
) {
  const systemPrompt = createSystemPrompt(context, userProfile)

  try {
    const { text } = await generateText({
      model: openai("gpt-4o"),
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: triggerContent },
      ],
      temperature: 0.7,
      maxTokens: 500,
    })

    return { success: true, response: text }
  } catch (error) {
    console.error("OpenAI API error:", error)
    return { success: false, error: "Failed to generate response" }
  }
}

export async function generateStreamingResponse(
  messages: ChatMessage[],
  context: AutomationContext,
  userProfile?: { full_name?: string; brand_voice?: string },
) {
  const systemPrompt = createSystemPrompt(context, userProfile)

  try {
    const result = await streamText({
      model: openai("gpt-4o"),
      messages: [{ role: "system", content: systemPrompt }, ...messages],
      temperature: 0.7,
      maxTokens: 500,
    })

    return result.toAIStreamResponse()
  } catch (error) {
    console.error("OpenAI streaming error:", error)
    throw new Error("Failed to generate streaming response")
  }
}

function createSystemPrompt(context: AutomationContext, userProfile?: { full_name?: string; brand_voice?: string }) {
  const platformContext = {
    instagram: "Instagram comment or DM",
    whatsapp: "WhatsApp message",
    email: "Email communication",
  }

  const basePrompt = `You are an AI assistant helping to automate ${platformContext[context.platform]} responses. 

Your goal is to:
1. Respond naturally and conversationally
2. Sound like a real person, not a bot
3. Be helpful and engaging
4. Drive the conversation toward the user's business goals
5. Match the tone and style of the platform

Platform: ${context.platform}
Trigger Type: ${context.triggerType}
${userProfile?.full_name ? `User Name: ${userProfile.full_name}` : ""}
${userProfile?.brand_voice ? `Brand Voice: ${userProfile.brand_voice}` : ""}
${context.responseTemplate ? `Response Template: ${context.responseTemplate}` : ""}

Guidelines:
- Keep responses concise and natural
- Use emojis sparingly and appropriately for the platform
- If it's a sales inquiry, be helpful but not pushy
- If it's a general comment, engage meaningfully
- Always aim to continue the conversation or provide value
- Don't mention that you're an AI unless directly asked

Respond as if you are the business owner personally replying.`

  return basePrompt
}

export async function generateEmailSequence(
  leadInfo: { name?: string; email: string; source: string },
  businessContext: { name: string; industry: string; value_proposition: string },
) {
  const systemPrompt = `You are creating a personalized email follow-up sequence for a lead who showed interest through ${leadInfo.source}.

Business Context:
- Business: ${businessContext.name}
- Industry: ${businessContext.industry}
- Value Proposition: ${businessContext.value_proposition}

Lead Info:
- Name: ${leadInfo.name || "there"}
- Source: ${leadInfo.source}

Create a warm, personalized email that:
1. References where they found you
2. Provides immediate value
3. Builds trust and credibility
4. Has a clear but soft call-to-action
5. Feels personal, not automated

Keep it conversational and under 200 words.`

  try {
    const { text } = await generateText({
      model: openai("gpt-4o"),
      messages: [{ role: "system", content: systemPrompt }],
      temperature: 0.8,
      maxTokens: 400,
    })

    return { success: true, email: text }
  } catch (error) {
    console.error("Email generation error:", error)
    return { success: false, error: "Failed to generate email" }
  }
}
