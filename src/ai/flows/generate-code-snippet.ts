// 'use server'
'use server';
/**
 * @fileOverview Generates code snippets based on a description and programming language.
 *
 * - generateCodeSnippet - A function that handles the code generation process.
 * - GenerateCodeSnippetInput - The input type for the generateCodeSnippet function.
 * - GenerateCodeSnippetOutput - The return type for the generateCodeSnippet function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const GenerateCodeSnippetInputSchema = z.object({
  description: z.string().describe('The description of the desired code snippet.'),
  language: z.string().describe('The programming language for the code snippet.'),
});
export type GenerateCodeSnippetInput = z.infer<typeof GenerateCodeSnippetInputSchema>;

const GenerateCodeSnippetOutputSchema = z.object({
  code: z.string().describe('The generated code snippet.'),
});
export type GenerateCodeSnippetOutput = z.infer<typeof GenerateCodeSnippetOutputSchema>;

export async function generateCodeSnippet(input: GenerateCodeSnippetInput): Promise<GenerateCodeSnippetOutput> {
  return generateCodeSnippetFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateCodeSnippetPrompt',
  input: {
    schema: z.object({
      description: z.string().describe('The description of the desired code snippet.'),
      language: z.string().describe('The programming language for the code snippet.'),
    }),
  },
  output: {
    schema: z.object({
      code: z.string().describe('The generated code snippet.'),
    }),
  },
  prompt: `You are an expert software engineer specializing in generating code snippets in various programming languages.

You will generate a code snippet based on the user's description and the specified programming language.

Language: {{{language}}}
Description: {{{description}}}

Here is the code snippet:
`,
});

const generateCodeSnippetFlow = ai.defineFlow<
  typeof GenerateCodeSnippetInputSchema,
  typeof GenerateCodeSnippetOutputSchema
>(
  {
    name: 'generateCodeSnippetFlow',
    inputSchema: GenerateCodeSnippetInputSchema,
    outputSchema: GenerateCodeSnippetOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
