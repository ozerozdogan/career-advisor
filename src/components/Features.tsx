import React from 'react';

const Features = () => {
  return (
    <div className="mb-20">
      <h2 className="text-3xl font-bold text-center text-slate-800 mb-12">
        Advanced Career Roadmapping
      </h2>
      <div className="grid md:grid-cols-3 gap-8">
        <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
          <div className="w-12 h-12 bg-blue-100 rounded-lg text-blue-600 flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-slate-800 mb-2 text-center">Interactive Learning Paths</h3>
          <p className="text-slate-600 text-center">Visualize your technical career journey with downloadable, interactive roadmaps</p>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
          <div className="w-12 h-12 bg-indigo-100 rounded-lg text-indigo-600 flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-slate-800 mb-2 text-center">AI-Powered Skills Mapping</h3>
          <p className="text-slate-600 text-center">Detailed technical skill recommendations prioritized by importance level</p>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
          <div className="w-12 h-12 bg-purple-100 rounded-lg text-purple-600 flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-slate-800 mb-2 text-center">Job-Specific Expertise</h3>
          <p className="text-slate-600 text-center">Tailored technological roadmaps for diverse IT and development roles</p>
        </div>
      </div>
    </div>
  );
};

export default Features; 