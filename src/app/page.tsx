"use client";

import { useState, useEffect } from "react";
import LexicalEditor from "./components/LexicalEditor";
import "./style/styles.css";

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
          <div className="loading">
            Please wait while Loading.....
          </div>
        ) : (
          <>
            <h1 className="heading"
            >
              Markdown Previewer
            </h1>
            <LexicalEditor />
          </>
        )}
      </main>
    </div>
  );
}
