'use client';

import { useState, useEffect } from 'react';

interface SearchInputProps {
  onSearch: (jobTitle: string) => void;
  isLoading?: boolean;
}

const examples = [
  "Full Stack Developer",
  "DevOps Engineer",
  "Marketing Manager",
  "Playable Ads Developer",
  "AI/ML Engineer",
  "Blockchain Developer",
  "Cloud Solutions Architect",
  "Data Scientist",
  "Cybersecurity Specialist",
  "UI/UX Designer",
];

export default function SearchInput({ onSearch, isLoading }: SearchInputProps) {
  const [inputValue, setInputValue] = useState<string>('');
  const [placeholder, setPlaceholder] = useState<string>('');
  const [exampleIndex, setExampleIndex] = useState<number>(0);
  const [charIndex, setCharIndex] = useState<number>(0);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  useEffect(() => {
    const typingInterval = setInterval(() => {
      if (isPaused) return;

      const currentExample = examples[exampleIndex];
      
      if (isDeleting) {
        setPlaceholder(currentExample.substring(0, charIndex - 1));
        setCharIndex(charIndex - 1);
        
        if (charIndex <= 1) {
          setIsDeleting(false);
          setExampleIndex((exampleIndex + 1) % examples.length);
        }
      } else {
        setPlaceholder(currentExample.substring(0, charIndex + 1));
        setCharIndex(charIndex + 1);
        
        if (charIndex >= currentExample.length) {
          setIsPaused(true);
          setTimeout(() => {
            setIsDeleting(true);
            setIsPaused(false);
          }, 1000);
        }
      }
    }, 30);
    
    return () => clearInterval(typingInterval);
  }, [charIndex, exampleIndex, isDeleting, isPaused]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onSearch(inputValue.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <div className="flex flex-col sm:flex-row gap-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={placeholder}
          className={`w-full sm:flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            isLoading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          disabled={isLoading}
        />
        <button
          type="submit"
          className={`w-full sm:w-auto px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-lg hover:from-blue-700 hover:to-indigo-800 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer ${
            isLoading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          disabled={isLoading}
        >
          {isLoading ? 'Creating Roadmap...' : 'Plan My Career'}
        </button>
      </div>
    </form>
  );
} 