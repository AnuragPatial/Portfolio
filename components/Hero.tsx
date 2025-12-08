import React from 'react';
import { ArrowRight, Download, Terminal } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section id="about" className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
         <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-accent/10 rounded-full blur-[100px]" />
         <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/10 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col md:flex-row items-center">
        <div className="w-full md:w-1/2 space-y-6 text-center md:text-left">
          <div className="inline-block px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-medium">
            Available for new opportunities
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white">
            Hi, I'm <span className="text-accent whitespace-nowrap">Anurag Patial</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-400">
            Associate Web Developer & Frontend Specialist
          </p>
          <p className="text-gray-400 max-w-lg mx-auto md:mx-0 leading-relaxed">
            Specializing in building exceptional digital experiences with React.js, Node.js, and Blockchain technologies. 
            Focused on clean code, performance, and automation.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 pt-4">
            <a 
              href="#projects" 
              className="px-6 py-3 rounded-lg bg-accent text-primary font-bold hover:bg-accent/90 transition-colors flex items-center gap-2"
            >
              View Projects <ArrowRight size={18} />
            </a>
            <a 
              href="#" // Mock resume download
              className="px-6 py-3 rounded-lg border border-gray-600 hover:border-white hover:text-white text-gray-300 transition-colors flex items-center gap-2"
            >
              Download Resume <Download size={18} />
            </a>
          </div>
        </div>

        <div className="w-full md:w-1/2 mt-12 md:mt-0 flex justify-center">
          <div className="relative w-full max-w-md aspect-square bg-secondary rounded-2xl border border-white/10 shadow-2xl p-6 flex flex-col">
             <div className="flex items-center gap-2 mb-4 border-b border-white/10 pb-4">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="ml-2 text-xs text-gray-500 font-mono">anurag.tsx</span>
             </div>
             <div className="flex-1 font-mono text-sm text-gray-300 space-y-2 overflow-hidden">
                <div className="flex">
                  <span className="text-purple-400 mr-2">const</span>
                  <span className="text-yellow-200">developer</span>
                  <span className="text-white mx-2">=</span>
                  <span className="text-white">{`{`}</span>
                </div>
                <div className="pl-4">
                  <span className="text-sky-300">name:</span> <span className="text-green-300">'Anurag Patial'</span>,
                </div>
                <div className="pl-4">
                  <span className="text-sky-300">role:</span> <span className="text-green-300">'Full Stack Dev'</span>,
                </div>
                <div className="pl-4">
                  <span className="text-sky-300">stack:</span> <span className="text-white">[</span>
                </div>
                <div className="pl-8 text-green-300">
                  'React', 'Node.js', 'Next.js',<br/> 'MongoDB', 'Solidity'
                </div>
                <div className="pl-4 text-white">],</div>
                <div className="pl-4">
                  <span className="text-sky-300">location:</span> <span className="text-green-300">'Mohali, India'</span>
                </div>
                <div className="text-white">{`}`}</div>
                
                <div className="pt-4 flex items-center text-gray-500">
                  <Terminal size={14} className="mr-2" /> 
                  <span className="animate-pulse">_</span>
                </div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;