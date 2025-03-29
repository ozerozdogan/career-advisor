export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200">
      <div className="container mx-auto px-6 py-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-8">
          <div>
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <svg
                className="w-8 h-8 text-blue-600"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 21v-6m0 6l4-4m-4 4l-4-4" />
                <path d="M12 3v6m0-6l4 4m-4-4l-4 4" />
                <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
                <path d="M19 12a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <span className="text-lg font-bold text-slate-800">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Career</span> Advisor
              </span>
            </div>
            <p className="text-slate-600 text-sm md:max-w-md">
              Create the roadmap you need to reach your professional goals with our AI-powered career planning tool.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-slate-800 mb-4 md:text-right">Connect</h3>
            <div className="flex space-x-4 justify-start md:justify-end">
              <a href="https://github.com/ozerozdogan" target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:text-slate-900 transition-colors hover:scale-110 duration-200">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-1.5 6-8a5.4 5.4 0 0 0-1.5-3.7c.1-.5.1-1 0-1.4 0 0-1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.5 3.1 5.5 3.1c-.1.4-.1.9 0 1.4a5.4 5.4 0 0 0-1.5 3.7c0 6.5 3 8 6 8a4.8 4.8 0 0 0-1 3.5v4" />
                  <path d="M9 18c-4.51 2-5-2-7-3" />
                </svg>
              </a>
              <a href="https://www.linkedin.com/in/ozerozdogan/" target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:text-slate-900 transition-colors hover:scale-110 duration-200">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667h-3.554V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
        
        <div className="pt-8 border-t border-slate-200">
          <p className="text-gray-600 text-sm text-center mb-2">
            Disclaimer: Career roadmaps are generated using AI and should be used as general guidance only. Please verify information with industry professionals.
          </p>
          <p className="text-xs text-center mb-0">
            Credits: <a href="https://www.vecteezy.com/free-png/success" className="text-gray-500 hover:text-blue-600 transition-colors">Success PNGs by Vecteezy</a> | &copy; {new Date().getFullYear()} Career Advisor
          </p>
        </div>
      </div>
    </footer>
  );
} 