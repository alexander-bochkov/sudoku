import type { NumberRange } from 'types/board';
import type { Nullable } from 'types/utility-types';

export type BoardMatrix = Nullable<NumberRange>[][];

export type Status = 'finished' | 'idle' | 'loading' | 'paused' | 'playing';
