import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from '@google/generative-ai'

/**
 * Centralized client for Google AI interactions.
 * Uses gemini-2.0-flash for high-speed tasks (Planning, SEO)
 * Uses gemini-2.5-pro for high-quality tasks (Drafting)
 */
export class GoogleAIClient {
    private client: GoogleGenerativeAI
    private apiKey: string

    constructor() {
        this.apiKey = process.env.GOOGLE_API_KEY || ''
        if (!this.apiKey) {
            console.error('GOOGLE_API_KEY is missing from environment variables.')
        }
        this.client = new GoogleGenerativeAI(this.apiKey)
    }

    private getModel(modelName: 'gemini-2.0-flash' | 'gemini-2.5-pro') {
        return this.client.getGenerativeModel({
            model: modelName,
            safetySettings: [
                {
                    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
                    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
                },
            ],
        })
    }

    /**
     * Generates a structural content plan (outline) based on a brief.
     * Uses Gemini Flash for speed.
     */
    async generateContentPlan(brief: { topic: string; audience: string; tone: string; keywords: string[] }) {
        const model = this.getModel('gemini-2.0-flash')

        const prompt = `
            You are an elite Content Strategist for Firehawk Analytics.
            Create a comprehensive B2B blog post outline.

            TOPIC: ${brief.topic}
            TARGET AUDIENCE: ${brief.audience}
            TONE OF VOICE: ${brief.tone}
            SEO KEYWORDS: ${brief.keywords.join(', ')}

            Structured Output Requirements:
            1. Suggest a catchy, SEO-optimized Title.
            2. specific H2 and H3 headers.
            3. Bullet points for key arguments under each header.
            4. Suggest a "Key Takeaway" for the conclusion.
            
            Return the result as clean Markdown.
        `

        const result = await model.generateContent(prompt)
        return result.response.text()
    }

    /**
     * Expands a section of an outline into full drafted prose.
     * Uses Gemini Pro for quality and context window.
     * Supports Grounding via Google Search.
     */
    async generateSectionDraft(sectionContext: string, fullPlan: string) {
        // We use 1.5 Pro for the actual writing to ensure high quality and adherence to instructions
        const model = this.client.getGenerativeModel({
            model: 'gemini-2.5-pro',
            tools: [
                {
                    // Enable Google Search Grounding for factual accuracy
                    // Note: This requires the specific simpler tool definition for the JS SDK if available,
                    // or standard generation. For now we stick to standard generation 
                    // and will enable tools if the SDK version supports the explicit googleSearchRetrieval syntax.
                    // Standard generation
                    googleSearchRetrieval: {}
                }
            ]
        })

        const prompt = `
            You are a professional B2B Copywriter.
            Write the content for the following section of a blog post.

            CONTEXT (THE FULL PLAN):
            ${fullPlan}

            CURRENT SECTION TO WRITE:
            ${sectionContext}

            Guidelines:
            - Use a ${'Professional, Authoritative but Accessible'} tone.
            - Provide concrete examples.
            - Cite real-world data where possible (Grounding is enabled).
            - Do not include the H2/H3 title in the output, just the body text.
            - Use Markdown for formatting (bold, lists).
        `

        const result = await model.generateContent(prompt)
        const response = result.response

        return {
            text: response.text(),
            groundingMetadata: response.candidates?.[0]?.groundingMetadata
        }
    }

    /**
     * Generates a full draft in one pass using Gemini Pro 1.5.
     * Useful for MVP or shorter articles.
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async generateFullDraft(contentPlan: any) {
        const model = this.client.getGenerativeModel({
            model: 'gemini-2.5-pro',
            tools: [{ googleSearchRetrieval: {} }]
        })

        // Serialize the Lexical plan to text if it's an object
        // Simple recursive text extraction
        const planText = typeof contentPlan === 'string'
            ? contentPlan
            : JSON.stringify(contentPlan)

        const prompt = `
            You are a professional B2B Copywriter.
            Write a complete, high-quality blog post based on the following Content Plan.

            CONTENT PLAN:
            ${planText}

            Instructions:
            1. Write the full article from start to finish.
            2. Adhere strictly to the structure in the plan.
            3. Use a professional, engaging tone.
            4. Format using Markdown (H2, H3, bullet points).
            5. Do NOT include the "Content Plan" text in your output, just the article.
            6. Ground your writing with real-world facts (Search is enabled).
            
            Return ONLY the blog post content.
        `

        const result = await model.generateContent(prompt)
        const response = result.response

        return {
            text: response.text(),
            groundingMetadata: response.candidates?.[0]?.groundingMetadata
        }
    }

    /**
     * Analyzing SEO of a given text.
     */
    async analyzeSEO(content: string, keywords: string[]) {
        const model = this.getModel('gemini-2.0-flash')

        const prompt = `
            Analyze this blog post content for SEO optimization.
            Keywords to target: ${keywords.join(', ')}
            
            Content:
            ${content ? content.substring(0, 10000) : 'No content provided'}... (truncated)

            Return a stricter JSON object:
            {
                "score": number (0-100),
                "keywordDensity": string,
                "readability": string,
                "suggestions": string[]
            }
        `

        const result = await model.generateContent({
            contents: [{ role: 'user', parts: [{ text: prompt }] }],
            generationConfig: { responseMimeType: 'application/json' }
        })

        return JSON.parse(result.response.text())
    }
}

export const googleAI = new GoogleAIClient()
