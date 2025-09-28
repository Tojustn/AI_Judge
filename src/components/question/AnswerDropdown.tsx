import React, { useState } from 'react';
import type { Answer } from '../../types/types';

interface AnswerDropdownProps {
  answers: Answer[];
  loading: boolean;
  error: string | null;
}

const AnswerDropdown: React.FC<AnswerDropdownProps> = ({ answers, loading, error }) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const toggleExpanded = (): void => {
    setIsExpanded(!isExpanded);
  };

  if (loading) {
    return (
      <div className="mb-4">
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Loading answers...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mb-4">
        <div className="text-sm text-red-500 dark:text-red-400">
          Error loading answers: {error}
        </div>
      </div>
    );
  }

  if (answers.length === 0) {
    return (
      <div className="mb-4">
        <div className="text-sm text-gray-500 dark:text-gray-400">
          No answers found for this question
        </div>
      </div>
    );
  }

  return (
    <div className="mb-4">
      <button
        onClick={toggleExpanded}
        className="flex items-center justify-between w-full text-left text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
      >
        <span className="flex items-center gap-2">
          <span className={`transform transition-transform duration-200 ${isExpanded ? 'rotate-90' : 'rotate-0'}`}>
            ▶
          </span>
          Answers ({answers.length})
        </span>
      </button>

      {isExpanded && (
        <div className="mt-3 space-y-2 max-h-48 overflow-y-auto border-l-2 border-blue-200 dark:border-blue-700 pl-3">
          {answers.map((answer, index) => (
            <div
              key={answer.id || index}
              className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg border border-gray-200 dark:border-gray-600"
            >
              <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                Submission: {answer.submissionId}
              </div>
              <div className="text-sm text-gray-800 dark:text-gray-200">
                {answer.choice && (
                  <div className="mb-1">
                    <span className="font-medium">Choice:</span> {answer.choice}
                  </div>
                )}
                {answer.reasoning && (
                  <div>
                    <span className="font-medium">Reasoning:</span> {answer.reasoning}
                  </div>
                )}
                {!answer.choice && !answer.reasoning && (
                  <div className="text-gray-500 italic">No answer content</div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AnswerDropdown;