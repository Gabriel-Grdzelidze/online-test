"use client";
import { useQuery, useMutation } from "@apollo/client/react";
import { useState } from "react";
import { GET_STUDENTS, GET_QUESTIONS } from "../../../graphql/query";
import {
  DELETE_QUESTION,
  CREATE_QUESTION,
  CHANGE_QUESTION,
} from "../../../graphql/mutations";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { signOut } from "next-auth/react";

const AdminPage = () => {
  const [view, setView] = useState("students");
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState<null | any>(null);
  const [questionForm, setQuestionForm] = useState({
    question: "",
    options: ["", "", "", ""],
    correct: "",
  });

  const {
    data: studentsData,
    loading: studentsLoading,
    error: studentsError,
  } = useQuery(GET_STUDENTS, { skip: view !== "students" });
  const {
    data: questionsData,
    loading: questionsLoading,
    error: questionsError,
  } = useQuery(GET_QUESTIONS, { skip: view !== "questions" });

  const [deleteQuestion] = useMutation(DELETE_QUESTION);
  const [createQuestion] = useMutation(CREATE_QUESTION, {
    refetchQueries: [{ query: GET_QUESTIONS }],
  });
  const [changeQuestion] = useMutation(CHANGE_QUESTION, {
    refetchQueries: [{ query: GET_QUESTIONS }],
  });

  if (studentsLoading || questionsLoading) return <div>Loading...</div>;
  if (studentsError || questionsError) return <div>Error loading data</div>;

  const filteredStudents = studentsData?.students?.filter(
    (s) => !s.email.toLowerCase().startsWith("grdzelidzegabriel")
  );

  const handleDeleteQuestion = async (id: string) => {
    try {
      await deleteQuestion({ variables: { id } });
    } catch (err) {
      console.error(err);
    }
  };

  const handleOptionChange = (index: number, value: string) => {
    setQuestionForm((prev) => {
      const updatedOptions = [...prev.options];
      updatedOptions[index] = value;
      return { ...prev, options: updatedOptions };
    });
  };

  const handleAddQuestion = async (e: React.FormEvent) => {
    e.preventDefault();
    await createQuestion({ variables: questionForm });
    setQuestionForm({ question: "", options: ["", "", "", ""], correct: "" });
    setShowAddForm(false);
  };

  const handleEditQuestion = (q: any) => {
    setEditingQuestion(q.id);
    setQuestionForm({
      question: q.question,
      options: [...q.options],
      correct: q.correct,
    });
  };

  const handleUpdateQuestion = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingQuestion) return;
    await changeQuestion({
      variables: { id: editingQuestion, ...questionForm },
    });
    setEditingQuestion(null);
    setQuestionForm({ question: "", options: ["", "", "", ""], correct: "" });
  };

  return (
    <div className="p-8 max-w-3xl mx-auto mt-50 bg-[#f1f1f1] shadow-lg rounded-lg">
     
      <button
        onClick={() => {
          signOut();
          window.location.href = "/";
        }}
        className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 transition-colors"
      >
        Back to main page
      </button>
      <h1 className="text-2xl font-semibold mb-4 text-center">Admin Page</h1>
      <div className="flex justify-center gap-2 mb-6">
        <button
          onClick={() => setView("students")}
          className={`px-4 py-2 rounded ${
            view === "students" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          Students
        </button>
        <button
          onClick={() => setView("questions")}
          className={`px-4 py-2 rounded ${
            view === "questions" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          Questions
        </button>
      </div>
      {view === "students" && (
        <div className="bg-white border rounded p-4 shadow-sm text-sm max-h-[500px] overflow-y-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left pb-2">Email</th>
                <th className="text-left pb-2">Score</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents?.map((s) => (
                <tr key={s.id} className="border-b">
                  <td className="py-2">
                    {s.email.replace(/@gmail\.com$/i, "")}
                  </td>
                  <td className="py-2">{s.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {view === "questions" && (
        <div className="bg-white border rounded p-4 shadow-sm text-sm max-h-[500px] overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <p className="text-2xl font-medium">Questions</p>
            <button
              onClick={() => {
                setShowAddForm((prev) => !prev);
                setEditingQuestion(null);
              }}
              className="px-3 py-1 rounded bg-green-500 text-white"
            >
              Add Question
            </button>
          </div>

          {(showAddForm || editingQuestion) && (
            <form
              onSubmit={
                editingQuestion ? handleUpdateQuestion : handleAddQuestion
              }
              className="mb-4 p-4 border rounded-lg bg-gray-50 shadow-sm space-y-4"
            >
              <div>
                <label className="block mb-1 font-medium text-gray-700">
                  Question:
                </label>
                <input
                  type="text"
                  value={questionForm.question}
                  onChange={(e) =>
                    setQuestionForm((prev) => ({
                      ...prev,
                      question: e.target.value,
                    }))
                  }
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                  placeholder="Type your question here"
                  required
                />
              </div>
              {questionForm.options.map((opt, i) => (
                <div key={i}>
                  <label className="block mb-1 font-medium text-gray-700">
                    Option {i + 1}:
                  </label>
                  <input
                    type="text"
                    value={opt}
                    onChange={(e) => handleOptionChange(i, e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                    placeholder={`Option ${i + 1}`}
                    required
                  />
                </div>
              ))}
              <div>
                <label className="block mb-1 font-medium text-gray-700">
                  Correct Answer:
                </label>
                <input
                  type="text"
                  value={questionForm.correct}
                  onChange={(e) =>
                    setQuestionForm((prev) => ({
                      ...prev,
                      correct: e.target.value,
                    }))
                  }
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                  placeholder="Correct answer"
                  required
                />
              </div>
              <button
                type="submit"
                className="px-3 py-2 rounded bg-blue-500 text-white"
              >
                {editingQuestion ? "Update Question" : "Save Question"}
              </button>
            </form>
          )}

          {questionsData?.question.map((q) => (
            <div
              key={q.id}
              className="mb-3 p-4 border rounded-lg group hover:bg-gray-50 transition-colors"
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium mb-2">{q.question}</p>
                  <ul className="ml-4 list-disc text-gray-600 text-sm mb-2">
                    {q.options.map((opt, i) => (
                      <li key={i}>{opt}</li>
                    ))}
                  </ul>
                  <p className="text-sm font-medium text-green-600">
                    Correct: {q.correct}
                  </p>
                </div>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => handleEditQuestion(q)}
                    className="cursor-pointer"
                  >
                    <PencilSquareIcon width={20} height={20} />
                  </button>
                  <button
                    onClick={() => handleDeleteQuestion(q.id)}
                    className="cursor-pointer"
                  >
                    <TrashIcon width={20} height={20} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminPage;
