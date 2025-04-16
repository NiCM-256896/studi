
"use client";

import React, { useState } from 'react';
import { generateCodeSnippet } from '@/ai/flows/generate-code-snippet';
import CodeEditor from '@/components/CodeEditor';
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"

const Home: React.FC = () => {
  const [description, setDescription] = useState<string>('');
  const [language, setLanguage] = useState<string>('javascript');
  const [generatedCode, setGeneratedCode] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleGenerateCode = async () => {
    setLoading(true);
    try {
      const result = await generateCodeSnippet({ description, language });
      setGeneratedCode(result.code);
    } catch (error) {
      console.error("Error generating code:", error);
      setGeneratedCode('// An error occurred while generating the code.');
    } finally {
      setLoading(false);
    }
  };

  const languageOptions = [
    { label: 'JavaScript', value: 'javascript' },
    { label: 'Python', value: 'python' },
    { label: 'Java', value: 'java' },
    { label: 'C++', value: 'cpp' },
    { label: 'C#', value: 'csharp' },
    { label: 'Go', value: 'go' },
    { label: 'TypeScript', value: 'typescript' },
    { label: 'PHP', value: 'php' },
    { label: 'Ruby', value: 'ruby' },
    { label: 'Swift', value: 'swift' },
    { label: 'Kotlin', value: 'kotlin' },
    { label: 'Rust', value: 'rust' },
    { label: 'SQL', value: 'sql' },
    { label: 'HTML', value: 'html' },
    { label: 'CSS', value: 'css' },
  ];

  return (
    <div className="flex h-screen bg-secondary">
      {/* Input Area */}
      <div className="w-1/2 p-6 flex flex-col">
        <div className="mb-4">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            placeholder="Enter the code description..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-2"
          />
        </div>

        {/* Language Selection */}
        <div className="mb-4">
          <Label htmlFor="language">Language</Label>
          <Select onValueChange={setLanguage} defaultValue={language}>
            <SelectTrigger className="mt-2 w-full">
              <SelectValue placeholder="Select a language" />
            </SelectTrigger>
            <SelectContent>
              {languageOptions.map((lang) => (
                <SelectItem key={lang.value} value={lang.value}>
                  {lang.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Generate Code Button */}
        <Button onClick={handleGenerateCode} disabled={loading}>
          {loading ? 'Generating...' : 'Generate Code'}
        </Button>
      </div>

      {/* Code Display Area */}
      <div className="w-1/2 p-6">
        <Label>Generated Code</Label>
        <CodeEditor code={generatedCode} language={language} />
      </div>
    </div>
  );
};

export default Home;
