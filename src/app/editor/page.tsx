"use client";

import { useState, useEffect } from "react";

import "../style/styles.css";
import { LexicalEditor } from "lexical";
import Editor from "../components/LexicalEditor";

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const delay = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(delay);
  }, []);
  return (
    <div>
      <main>
        {loading ? (
          <div className="loading">Please wait while Loading.....</div>
        ) : (
          <>
            <h1 className="heading">MARKDOWN PREVIEWR WITH LEXICAL</h1>
            <Editor />

          </>
        )}
      </main>
    </div>
  );
}