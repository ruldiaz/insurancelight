import { GoogleGenerativeAI } from '@google/generative-ai';

interface ExtractedPolicy {
    id: string;
    company: string;
    client: string;
    price: string;
    startDate: string;
    endDate: string;
    status: string;
}

const AVAILABLE_MODELS = [
    "gemini-2.0-flash",
    "gemini-flash-latest",
    "gemini-2.0-flash-lite",
    "gemini-pro-latest",
    "gemini-1.5-flash"
];

let workingModel: string | null = null;

export const verifyApiKey = async (apiKey: string): Promise<boolean> => {
    const genAI = new GoogleGenerativeAI(apiKey);
    console.log('--- Starting API/Model Verification ---');

    for (const modelId of AVAILABLE_MODELS) {
        try {
            console.log(`Checking model: ${modelId}`);
            const model = genAI.getGenerativeModel({ model: modelId });
            // Very short prompt to minimize tokens/cost
            const result = await model.generateContent("hi");
            const response = await result.response;
            if (response.text()) {
                workingModel = modelId;
                console.log(`✅ Success! Using model: ${modelId}`);
                return true;
            }
        } catch (error: any) {
            console.warn(`❌ Model ${modelId} failed:`, error.message);
        }
    }
    console.error('--- No compatible models found in the list ---');
    return false;
};

export const analyzePolicyText = async (text: string): Promise<ExtractedPolicy> => {
    const apiKey = localStorage.getItem('gemini_api_key');
    if (!apiKey) {
        throw new Error('Gemini API Key not found in Settings.');
    }

    const genAI = new GoogleGenerativeAI(apiKey);

    // If we don't know the working model yet, find it
    if (!workingModel) {
        const isValid = await verifyApiKey(apiKey);
        if (!isValid || !workingModel) {
            throw new Error('No compatible Gemini models found for this API key. Please check your AI Studio project permissions.');
        }
    }

    const model = genAI.getGenerativeModel({ model: workingModel });

    const prompt = `
        You are an expert insurance document analyzer. 
        Analyze the following text extracted from an insurance policy PDF.
        Extract these fields and return ONLY a valid JSON object:
        - id: The policy number or ID.
        - company: The insurance company name (e.g., AIG, Chubb, MetLife).
        - client: The name of the policyholder.
        - price: The premium amount (including currency symbol).
        - startDate: The effective date (YYYY-MM-DD).
        - endDate: The expiration date (YYYY-MM-DD).
        - status: Determine if it's "Active", "Expiring" (within 30 days), or "Expired" based on current date which is ${new Date().toISOString().split('T')[0]}.

        Text to analyze:
        ${text}

        Return format:
        {
            "id": "...",
            "company": "...",
            "client": "...",
            "price": "...",
            "startDate": "...",
            "endDate": "...",
            "status": "..."
        }
    `;

    try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        // Clean markdown code blocks if necessary
        let jsonText = response.text();
        if (jsonText.includes('```')) {
            jsonText = jsonText.replace(/```json|```/g, '').trim();
        }
        return JSON.parse(jsonText);
    } catch (error: any) {
        console.error('Detailed Gemini Error:', error);
        const message = error.message || 'Unknown error occurred during analysis.';
        throw new Error(`Gemini Error: ${message}`);
    }
};
