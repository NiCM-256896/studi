
"use client";

import React, { useState, useEffect } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { cn } from "@/lib/utils";

interface CodeEditorProps {
  code: string;
  language: string;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ code, language }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="rounded-md border bg-secondary p-4">
      <SyntaxHighlighter language={language} style={dracula} customStyle={{ background: 'none', border: 'none', padding: 0, margin: 0, overflow: 'auto' }}>
        {code}
      </SyntaxHighlighter>
    </div>
  );
};

export default CodeEditor;
