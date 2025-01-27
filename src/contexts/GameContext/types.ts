import { NumberRange } from 'types/board';

export type BoardMatrix = NumberRange[][];

export type Status = 'finished' | 'idle' | 'loading' | 'paused' | 'playing';
