"use client";
import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client/react";
import Latex from "react-latex";
import "katex/dist/katex.min.css";
import { GET_QUESTIONS } from "../../../graphql/query";

export default function TestPage() {
  const { data, loading, error } = useQuery(GET_QUESTIONS);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(20 * 60);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const questions = data?.question || [];

  // Countdown timer
  useEffect(() => {
    if (isSubmitted) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmit(); 
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isSubmitted]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const handleSelect = (id: string, answer: string) => {
    if (!isSubmitted) {
      setAnswers((prev) => ({ ...prev, [id]: answer }));
    }
  };

  const handleSubmit = () => {
    let points = 0;
    questions.forEach((q: any) => {
      if (answers[q.id] === q.correct) points++;
    });
    setScore(points);
    setIsSubmitted(true);
  };

  if (loading) return <p className="text-center mt-10">Loading questions...</p>;
  if (error) return <p className="text-center mt-10 text-red-600">Error loading questions.</p>;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <div className="flex justify-between items-center w-full max-w-2xl mb-4">
        <h1 className="text-3xl font-bold">Math Test</h1>
        <div
          className={`text-lg font-semibold px-4 py-2 rounded-lg ${
            timeLeft <= 60
              ? "bg-red-500 text-white"
              : "bg-blue-100 text-blue-700"
          }`}
        >
          {formatTime(timeLeft)}
        </div>
      </div>

      <div className="w-full max-w-2xl bg-white p-6 rounded-2xl shadow-[0_5px_15px_rgba(0,0,0,0.35)]">
        {questions.map((q: any) => (
          <div key={q.id} className="mb-6">
            <h2 className="text-lg font-semibold mb-2">
              <Latex>{q.question}</Latex>
            </h2>
            <div className="grid grid-cols-2 gap-2">
              {q.options.map((option: string) => (
                <button
                  key={option}
                  onClick={() => handleSelect(q.id, option)}
                  disabled={isSubmitted}
                  className={`p-3 rounded-lg border text-left transition-all
                    ${
                      answers[q.id] === option
                        ? "bg-blue-500 text-white border-blue-500"
                        : "bg-gray-100 hover:bg-blue-100 border-gray-300"
                    } 
                    ${isSubmitted ? "opacity-70 cursor-not-allowed" : ""}`}
                >
               <Latex>{option}</Latex>
                </button>
              ))}
            </div>
          </div>
        ))}

        {!isSubmitted ? (
          <button
            onClick={handleSubmit}
            className="w-full mt-4 bg-green-600 text-white font-semibold py-3 rounded-lg hover:bg-green-700 transition-all"
          >
            Submit Test
          </button>
        ) : (
          <div className="mt-6 text-center">
            <p className="text-xl font-semibold">
              You scored {score} out of {questions.length}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
