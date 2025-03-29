'use client';

import { useState, useEffect, useRef } from 'react';
import { z } from 'zod';
import SearchInput from '@/components/SearchInput';
import RoadmapVisualizer from '@/components/RoadmapVisualizer';
import LoadingAnimation from '@/components/LoadingAnimation';
import Footer from '@/components/Footer';
import Features from '@/components/Features';
import { fetchRoadmap } from '@/utils/api';
import Header from '@/components/Header';

interface RoadmapNode {
  id: string;
  name: string;
  description: string;
}

interface RoadmapLink {
  source: string;
  target: string;
  type: string;
}

interface RoadmapData {
  nodes: RoadmapNode[];
  links: RoadmapLink[];
}

const JobTitleSchema = z.string()
  .min(1, { message: "Job title cannot be empty" })
  .regex(/^[a-zA-Z\s\/-]+$/, { message: "Job title can only contain letters, spaces, hyphens, and forward slashes" });

export default function Home() {
  const [roadmapData, setRoadmapData] = useState<RoadmapData | null>(null);
  const [searchedJob, setSearchedJob] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [loadingStage, setLoadingStage] = useState<number>(0);
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [isClosing, setIsClosing] = useState<boolean>(false);
  
  const [showLoadingPopup, setShowLoadingPopup] = useState<boolean>(false);
  const loadingPopupRef = useRef<HTMLDivElement>(null);

  const handleClosePopup = () => {
    setIsClosing(true);
    setTimeout(() => {
      setShowPopup(false);
      setIsClosing(false);
    }, 300);
  };

  useEffect(() => {
    if (showLoadingPopup || showPopup) {
      // Scrollbar genişliğini hesapla ve padding ekle
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    } else {
      document.body.style.overflow = 'unset';
      document.body.style.paddingRight = '0px';
    }

    return () => {
      document.body.style.overflow = 'unset';
      document.body.style.paddingRight = '0px';
    };
  }, [showLoadingPopup, showPopup]);

  const handleSearch = async (jobTitle: string) => {
    const validationResult = JobTitleSchema.safeParse(jobTitle);

    if (!validationResult.success) {
      const errorMessage = validationResult.error.format()._errors.join(', ');
      setError(errorMessage);
      return;
    }

    setError(null);
    setRoadmapData(null);
    setShowPopup(false);
    setSearchedJob(validationResult.data);
    
    setShowLoadingPopup(true);
    setIsLoading(true);
    
    try {
      setLoadingStage(1);
      setTimeout(() => setLoadingStage(2), 2000);
      setTimeout(() => setLoadingStage(3), 4000);
      
      const data = await fetchRoadmap(validationResult.data);
      setRoadmapData(data);
      
      setShowLoadingPopup(false);
      
      setShowPopup(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
      setRoadmapData(null);
      
      setShowLoadingPopup(false);
    } finally {
      setIsLoading(false);
      setLoadingStage(0);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      <div className="bg-white">
        <div className="container mx-auto px-4 md:px-6 py-16 md:py-24">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              Professional Career Planning
              <span className="block text-blue-600 mt-2">with Career Advisor</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-600 mb-12">
              Plan your professional future with AI-driven insights and guidance.
            </p>
            
            <div className="max-w-2xl mx-auto">
              <div className="bg-white rounded-lg shadow-md border border-slate-200 p-6">
                <SearchInput onSearch={handleSearch} isLoading={isLoading} />
                
                {error && (
                  <div className="mt-4">
                    <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
                      <p className="text-red-700">{error}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full bg-[#f5f5f5]">
        {roadmapData && !isLoading && (
          <>
            <div className="w-full max-w-2xl mx-auto py-6">
              <div className="bg-white rounded-lg shadow-lg border border-slate-200 p-6 text-center">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Your career roadmap for <span className="text-emerald-600">{searchedJob}</span> is ready!
                </h3>
                <p className="text-gray-600 mb-4">
                  View the detailed career plan with recommended skills and milestones
                </p>
                <button
                  onClick={() => setShowPopup(true)}
                  className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-6 py-3.5 rounded-xl 
                    hover:from-emerald-600 hover:to-teal-700 cursor-pointer transform hover:scale-110
                    transition-all duration-300 font-medium flex items-center justify-center mx-auto 
                    space-x-3 shadow-lg hover:shadow-emerald-300/50 group"
                >
                  <span className="text-base">View Career Plan</span>
                  <svg 
                    className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {showLoadingPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm popup-overlay">
          <div 
            ref={loadingPopupRef}
            className="w-full max-w-3xl mx-4 animate-scaleIn"
            onClick={(e) => e.stopPropagation()}
          >
            <LoadingAnimation stage={loadingStage} />
          </div>
        </div>
      )}

      {showPopup && (
        <div 
          className={`fixed inset-0 z-50 ${isClosing ? 'popup-overlay-exit' : 'popup-overlay'}`}
        >
          <div 
            className="absolute inset-0 bg-black/50"
            onClick={handleClosePopup}
          />
          <div 
            className="fixed inset-0 flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div 
              className={`relative w-full h-full bg-white rounded-lg shadow-xl overflow-hidden ${
                isClosing ? 'popup-content-exit' : 'popup-content'
              }`}
            >
              <button
                onClick={handleClosePopup}
                className="absolute top-4 right-4 z-10 bg-white/80 backdrop-blur-sm rounded-full p-2 
                          hover:bg-gray-100 transition-all duration-200 shadow-lg 
                          hover:shadow-xl hover:scale-110 active:scale-95"
              >
                <svg
                  className="w-6 h-6 text-gray-600 hover:text-gray-900 transition-colors duration-200"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              {roadmapData && <RoadmapVisualizer data={roadmapData} />}
            </div>
          </div>
        </div>
      )}

      <Features />
      <Footer />
    </div>
  );
}
