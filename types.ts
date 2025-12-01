export enum GameStage {
  INTRO = 'INTRO',
  ROOM_1_LIBRARY = 'ROOM_1_LIBRARY',
  ROOM_2_TEMPLE = 'ROOM_2_TEMPLE',
  ROOM_3_CYBER = 'ROOM_3_CYBER',
  VICTORY = 'VICTORY'
}

export interface RoomData {
  id: GameStage;
  title: string;
  description: string;
  puzzlePrompt: string;
  visualClue: string;
  answer: string[]; // Possible answers
  themeClass: string;
  fontClass: string;
  accentColor: string;
  bgImage: string;
}

export interface GameState {
  currentStage: GameStage;
  inventory: string[];
  hintsUsed: number;
  isTransitioning: boolean;
}