import React, { useState, useEffect } from 'react';
import { RoomData } from '../types';
import { getGeminiHint } from '../services/geminiService';
import { Key, Lock, Lightbulb, ArrowRight, CheckCircle2 } from 'lucide-react';

interface RoomProps {
  data: RoomData;
  onSolve: () => void;
}

export const Room: React.FC<RoomProps> = ({ data, onSolve }) => {
  const [input, setInput] = useState('');
  const [error, setError] = useState(false);
  const [hint, setHint] = useState<string | null>(null);
  const [loadingHint, setLoadingHint] = useState(false);
  const [solved, setSolved] = useState(false);

  // Reset state when room changes
  useEffect(() => {
    setInput('');
    setError(false);
    setHint(null);
    setSolved(false);
    setLoadingHint(false);
  }, [data.id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (data.answer.includes(input.trim().toUpperCase())) {
      setSolved(true);
      setError(false);
      setTimeout(onSolve, 1500); // Delay for animation
    } else {
      setError(true);
      setTimeout(() => setError(false), 500);
    }
  };

  const handleGetHint = async () => {
    if (hint) return;
    setLoadingHint(true);
    const newHint = await getGeminiHint(data);
    setHint(newHint);
    setLoadingHint(false);
  };

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden transition-colors duration-1000 ${data.themeClass} ${data.fontClass}`}>
      
      {/* Background Ambience */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <img src={data.bgImage} alt="background" className="w-full h-full object-cover grayscale" />
        <div className={`absolute inset-0 bg-gradient-to-t from-black via-transparent to-black`}></div>
      </div>

      <div className="relative z-10 max-w-2xl w-full text-center space-y-8">
        
        {/* Header */}
        <div className="space-y-4 animate-float">
          <h1 className={`text-4xl md:text-6xl font-bold tracking-widest uppercase ${data.accentColor} drop-shadow-lg`}>
            {data.title}
          </h1>
          <p className="text-lg md:text-xl leading-relaxed opacity-90 border-l-4 border-current pl-4 text-left bg-black/30 p-4 rounded backdrop-blur-sm">
            {data.description}
          </p>
        </div>

        {/* Puzzle Section */}
        <div className="bg-black/40 backdrop-blur-md p-8 rounded-xl border border-white/10 shadow-2xl space-y-6">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Lock className={`w-8 h-8 ${solved ? 'text-green-500' : data.accentColor}`} />
            <h2 className="text-2xl font-bold">Security Lock</h2>
          </div>
          
          <div className="text-lg font-medium space-y-2">
            <p>{data.puzzlePrompt}</p>
            <p className={`text-sm opacity-75 italic ${data.accentColor}`}>{data.visualClue}</p>
          </div>

          <form onSubmit={handleSubmit} className="relative max-w-md mx-auto">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter solution..."
              disabled={solved}
              className={`w-full bg-black/50 border-2 ${error ? 'border-red-500 animate-shake' : 'border-white/20'} ${solved ? 'border-green-500 text-green-500' : ''} rounded-lg py-3 px-4 text-center text-xl tracking-widest outline-none focus:border-opacity-100 transition-all uppercase`}
            />
            {solved && (
              <div className="absolute right-3 top-3 text-green-500 animate-bounce">
                <CheckCircle2 />
              </div>
            )}
            
            <button
              type="submit"
              disabled={solved || !input}
              className={`mt-4 w-full py-3 rounded-lg font-bold tracking-wider transition-all
                ${solved 
                  ? 'bg-green-600 text-white cursor-default' 
                  : `bg-white/10 hover:bg-white/20 ${data.accentColor} border border-current`
                }`}
            >
              {solved ? 'UNLOCKED' : 'SUBMIT ANSWER'}
            </button>
          </form>

          {/* Hint System */}
          <div className="pt-4 border-t border-white/10">
            {!hint ? (
              <button
                onClick={handleGetHint}
                disabled={loadingHint}
                className="flex items-center justify-center space-x-2 text-sm opacity-60 hover:opacity-100 transition-opacity mx-auto"
              >
                <Lightbulb className="w-4 h-4" />
                <span>{loadingHint ? 'Summoning Hint...' : 'Ask the Spirits for a Hint'}</span>
              </button>
            ) : (
              <div className="text-sm bg-yellow-500/10 border border-yellow-500/30 p-3 rounded text-yellow-200 animate-pulse">
                <span className="font-bold">HINT:</span> {hint}
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};