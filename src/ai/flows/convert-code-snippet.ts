'use server';
/**
 * @fileOverview Converts a code snippet from one language to another.
 *
 * - convertCodeSnippet - A function that converts code snippets.
 * - ConvertCodeSnippetInput - The input type for the convertCodeSnippet function.
 * - ConvertCodeSnippetOutput - The return type for the convertCodeSnippet function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const ConvertCodeSnippetInputSchema = z.object({
  codeSnippet: z.string().describe('The code snippet to convert.'),
  sourceLanguage: z.string().describe('The source language of the code snippet.'),
  targetLanguage: z.string().describe('The target language to convert the code snippet to.'),
});
export type ConvertCodeSnippetInput = z.infer<typeof ConvertCodeSnippetInputSchema>;

const ConvertCodeSnippetOutputSchema = z.object({
  convertedCode: z.string().describe('The converted code snippet.'),
});
export type ConvertCodeSnippetOutput = z.infer<typeof ConvertCodeSnippetOutputSchema>;

export async function convertCodeSnippet(input: ConvertCodeSnippetInput): Promise<ConvertCodeSnippetOutput> {
  return convertCodeSnippetFlow(input);
}

const prompt = ai.definePrompt({
  name: 'convertCodeSnippetPrompt',
  input: {
    schema: z.object({
      codeSnippet: z.string().describe('The code snippet to convert.'),
      sourceLanguage: z.string().describe('The source language of the code snippet.'),
      targetLanguage: z.string().describe('The target language to convert the code snippet to.'),
    }),
  },
  output: {
    schema: z.object({
      convertedCode: z.string().describe('The converted code snippet.'),
    }),
  },
  prompt: `You are a code conversion expert.  Convert the following code snippet from {{{sourceLanguage}}} to {{{targetLanguage}}}.\n\nCode snippet:\n\n{{{codeSnippet}}}\n\nEnsure that the converted code is functional and follows best practices for the target language.`,
});

const convertCodeSnippetFlow = ai.defineFlow<
  typeof ConvertCodeSnippetInputSchema,
  typeof ConvertCodeSnippetOutputSchema
>(
  {
    name: 'convertCodeSnippetFlow',
    inputSchema: ConvertCodeSnippetInputSchema,
    outputSchema: ConvertCodeSnippetOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
