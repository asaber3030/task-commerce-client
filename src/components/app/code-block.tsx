"use client";

import { useState, useEffect } from "react";

interface CodeBlockProps {
  className?: string;
}

export function CodeBlock({ className = "" }: CodeBlockProps) {
  const [currentLine, setCurrentLine] = useState(0);
  const codeLines = [
    "try {",
    "  if (page.exists()) {",
    "    return page.render();",
    "  } else {",
    '    throw new Error("404: Page not found");',
    "  }",
    "} catch (error) {",
    "  console.error(error);",
    "  return error.message;",
    "}"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentLine((prevLine) => (prevLine + 1) % codeLines.length);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <pre
      className={`bg-gray-800 text-green-400 p-4 rounded-lg shadow-lg overflow-hidden text-left${className}`}
    >
      <code className=''>
        {codeLines.map((line, index) => (
          <div
            key={index}
            className={`transition-opacity duration-300 ${
              index === currentLine ? "opacity-100" : "opacity-50"
            }`}
          >
            {line}
          </div>
        ))}
      </code>
    </pre>
  );
}
