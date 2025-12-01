import { GameStage, RoomData } from './types';

export const ROOMS: Record<GameStage, RoomData | null> = {
  [GameStage.INTRO]: null,
  [GameStage.ROOM_1_LIBRARY]: {
    id: GameStage.ROOM_1_LIBRARY,
    title: "The Enchanted Library",
    description: "You awaken in a room smelling of old parchment and ozone. Blue arcane particles float in the air. The door ahead is sealed with a glowing rune.",
    puzzlePrompt: "The ancient spines align to form a truth. Identify the hidden word.",
    visualClue: "Books on the shelf read: 'Elements', 'Time', 'History', 'Eternity', 'Realm', 'Echoes', 'Arcane', 'Light'. The first letter of each seems to pulse.",
    answer: ["ETHEREAL"],
    themeClass: "bg-slate-900 text-blue-100",
    fontClass: "font-serif",
    accentColor: "text-blue-400",
    bgImage: "https://picsum.photos/seed/library_magic/1024/768"
  },
  [GameStage.ROOM_2_TEMPLE]: {
    id: GameStage.ROOM_2_TEMPLE,
    title: "The Ancient Temple",
    description: "The air turns dry and dusty. Golden shafts of light pierce through cracks in the stone ceiling. A massive stone dial blocks your path.",
    puzzlePrompt: "The sun, the moon, and the longest day. Speak the event that marks the peak of light.",
    visualClue: "Carvings on the wall depict the sun at its highest point. The letters S-O-L-S-T-I-C-E are scattered among the reliefs.",
    answer: ["SOLSTICE"],
    themeClass: "bg-stone-900 text-amber-100",
    fontClass: "font-['Cinzel',serif]",
    accentColor: "text-amber-500",
    bgImage: "https://picsum.photos/seed/temple_ruins/1024/768"
  },
  [GameStage.ROOM_3_CYBER]: {
    id: GameStage.ROOM_3_CYBER,
    title: "The Cyber Vault",
    description: "The stone dissolves into digital noise. You are now in a sleek, neon-lit corridor. The exit is a holographic firewall.",
    puzzlePrompt: "Bypass the firewall. The glitch reveals the code.",
    visualClue: "The neon sign flickers erratically. It flashes: '...System 7...', '...Error 3...', '...Sector 9...', '...Reboot 2...'",
    answer: ["7392"],
    themeClass: "bg-black text-green-400",
    fontClass: "font-['Orbitron',monospace]",
    accentColor: "text-green-500",
    bgImage: "https://picsum.photos/seed/cyberpunk_city/1024/768"
  },
  [GameStage.VICTORY]: null
};

export const STAGE_ORDER = [
  GameStage.INTRO,
  GameStage.ROOM_1_LIBRARY,
  GameStage.ROOM_2_TEMPLE,
  GameStage.ROOM_3_CYBER,
  GameStage.VICTORY
];