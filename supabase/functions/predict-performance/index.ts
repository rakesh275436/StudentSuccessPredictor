import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface StudentData {
  attendance: number;
  studyHours: number;
  internalAssessment: number;
  classTest: number;
  assignmentMarks: number;
  extracurricular: boolean;
  aptitudeMarks: number;
  codingMarks: number;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const studentData: StudentData = await req.json();
    
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    // Create a detailed prompt for the AI to analyze student performance
    const systemPrompt = `You are an expert educational data analyst and academic counselor with deep expertise in predicting student performance. 

Your task is to analyze student performance data and predict whether they will PASS or FAIL, along with a confidence score and personalized recommendations.

Guidelines:
- Consider all factors holistically: attendance, study habits, test scores, assignments, aptitude, coding skills, and extracurricular involvement
- Generally, students need good attendance (>70%), consistent study (>3 hours), and solid performance across assessments to pass
- Provide confidence as a percentage (0-100)
- Generate 3-5 specific, actionable recommendations based on weak areas
- Be constructive and supportive in recommendations

Respond ONLY with valid JSON in this exact format:
{
  "prediction": "PASS" or "FAIL",
  "confidence": number between 0-100,
  "recommendations": ["recommendation 1", "recommendation 2", ...]
}`;

    const userPrompt = `Analyze this student's performance data:
- Attendance: ${studentData.attendance}%
- Daily Study Hours: ${studentData.studyHours}
- Internal Assessment: ${studentData.internalAssessment}/50
- Class Test: ${studentData.classTest}/40
- Assignment Marks: ${studentData.assignmentMarks}/50
- Aptitude Marks: ${studentData.aptitudeMarks}/100
- Coding Marks: ${studentData.codingMarks}/100
- Extracurricular Activities: ${studentData.extracurricular ? 'Yes' : 'No'}

Predict if this student will PASS or FAIL with confidence score and recommendations.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt }
        ],
        temperature: 0.3,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again later." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI credits exhausted. Please add credits to your workspace." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      throw new Error("AI gateway error");
    }

    const aiResponse = await response.json();
    const content = aiResponse.choices[0].message.content;
    
    // Parse the JSON response from AI
    let result;
    try {
      // Extract JSON from potential markdown code blocks
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        result = JSON.parse(jsonMatch[0]);
      } else {
        result = JSON.parse(content);
      }
    } catch (parseError) {
      console.error("Failed to parse AI response:", content);
      throw new Error("Invalid AI response format");
    }

    // Validate the response structure
    if (!result.prediction || !result.confidence || !result.recommendations) {
      throw new Error("Incomplete prediction data");
    }

    // Ensure prediction is uppercase
    result.prediction = result.prediction.toUpperCase();

    return new Response(
      JSON.stringify(result),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("Prediction error:", error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : "Unknown error occurred" 
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  }
});
