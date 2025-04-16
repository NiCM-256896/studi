'use server';

/**
 * @fileOverview Explains a code snippet step-by-step.
 *
 * - explainCodeSnippet - A function that handles the code explanation process.
 * - ExplainCodeSnippetInput - The input type for the explainCodeSnippet function.
 * - ExplainCodeSnippetOutput - The return type for the explainCodeSnippet function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const ExplainCodeSnippetInputSchema = z.object({
  codeSnippet: z.string().describe('The code snippet to explain.'),
  language: z.string().optional().describe('The programming language of the code snippet.'),
});
export type ExplainCodeSnippetInput = z.infer<typeof ExplainCodeSnippetInputSchema>;

const ExplainCodeSnippetOutputSchema = z.object({
  explanation: z.string().describe('The step-by-step explanation of the code snippet.'),
});
export type ExplainCodeSnippetOutput = z.infer<typeof ExplainCodeSnippetOutputSchema>;

export async function explainCodeSnippet(input: ExplainCodeSnippetInput): Promise<ExplainCodeSnippetOutput> {
  return explainCodeSnippetFlow(input);
}

const prompt = ai.definePrompt({
  name: 'explainCodeSnippetPrompt',
  input: {
    schema: z.object({
      codeSnippet: z.string().describe('The code snippet to explain.'),
      language: z.string().optional().describe('The programming language of the code snippet.'),
    }),
  },
  output: {
    schema: z.object({
      explanation: z.string().describe('The step-by-step explanation of the code snippet.'),
    }),
  },
  prompt: `You are an expert software developer. Your task is to explain the given code snippet step by step. Assume the perspective of a teacher explaining it to another developer.

Code Snippet:
```{{{language}}}
{{{codeSnippet}}}
```

Explanation:`,// Added language to the prompt
});

const explainCodeSnippetFlow = ai.defineFlow<
  typeof ExplainCodeSnippetInputSchema,
  typeof ExplainCodeSnippetOutputSchema
>({
  name: 'explainCodeSnippetFlow',
  inputSchema: ExplainCodeSnippetInputSchema,
  outputSchema: ExplainCodeSnippetOutputSchema,
},
async input => {
  const {output} = await prompt(input);
  return output!;
});