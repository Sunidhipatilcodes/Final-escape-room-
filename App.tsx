import React, { useState } from 'react';
import { GameStage, RoomData } from './types';
import { ROOMS, STAGE_ORDER } from './constants';
import { Room } from './components/Room';
import { Compass, Skull, Trophy, RotateCcw } from 'lucide-react';

const App: React.FC = () => {
  const [currentStageIndex, setCurrentStageIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const currentStageKey = STAGE_ORDER[currentStageIndex];
  const roomData = ROOMS[currentStageKey];

  const handleNextStage = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentStageIndex((prev) => prev + 1);
      setIsTransitioning(false);
    }, 1000);
  };

  const resetGame = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentStageIndex(0);
      setIsTransitioning(false);
    }, 500);
  };

  // Rendering logic based on stage
  if (isTransitioning) {
    return (
      <div className="h-screen w-screen bg-black flex items-center justify-center text-white">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <Compass className="w-16 h-16 animate-spin" />
          <p className="text-xl font-serif tracking-widest">TRAVERSING REALMS...</p>
        </div>
      </div>
    );
  }

  // Intro Screen
  if (currentStageKey === GameStage.INTRO) {
    return (
      <div className="h-screen w-screen bg-stone-950 text-stone-300 flex flex-col items-center justify-center relative overflow-hidden font-serif">
        <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/escape_intro/1920/1080')] opacity-20 bg-cover bg-center"></div>
        <div className="z-10 text-center space-y-8 p-8 max-w-3xl">
          <div className="mb-6 flex justify-center">
             <Skull className="w-24 h-24 text-stone-500 animate-float" />
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-stone-200 to-stone-500 drop-shadow-xl tracking-widest">
            LEGENDS OF HIDDEN ESCAPE
          </h1>
          <p className="text-xl md:text-2xl leading-relaxed text-stone-400">
            Three realms. Three secrets. One way out. <br />
            Are you clever enough to unlock the path?
          </p>
          <button 
            onClick={handleNextStage}
            className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-stone-950 transition-all duration-200 bg-stone-200 font-serif rounded-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-stone-400 hover:bg-white hover:scale-105 shadow-[0_0_20px_rgba(255,255,255,0.3)]"
          >
            ENTER THE FIRST ROOM
          </button>
        </div>
      </div>
    );
  }

  // Victory Screen
  if (currentStageKey === GameStage.VICTORY) {
    return (
      <div className="h-screen w-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-black text-white flex flex-col items-center justify-center font-['Orbitron',sans-serif] relative overflow-hidden">
        {/* Confetti/Stars Effect would go here, simplified with dots */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-500/20 via-transparent to-transparent"></div>
        
        <div className="z-10 text-center space-y-10 p-8">
          <div className="flex justify-center">
            <Trophy className="w-32 h-32 text-yellow-400 animate-bounce drop-shadow-[0_0_15px_rgba(250,204,21,0.5)]" />
          </div>
          <h1 className="text-5xl md:text-8xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-yellow-200 to-yellow-600">
            ESCAPED!
          </h1>
          <p className="text-xl md:text-2xl text-purple-200 max-w-2xl mx-auto">
            You have traversed the Library, deciphered the Temple, and hacked the Vault. The legends are true, and you are free.
          </p>
          <button 
            onClick={resetGame}
            className="flex items-center space-x-2 mx-auto px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/30 rounded-full transition-all text-sm tracking-widest uppercase"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Play Again</span>
          </button>
        </div>
      </div>
    );
  }

  // Main Game Room View
  if (roomData) {
    return <Room data={roomData} onSolve={handleNextStage} />;
  }

  return null;
};

export default App;