import type { NumberRange } from 'types/board';
import type { Nullable } from 'types/utility-types';

export type Matrix = NumberRange[][];

export type PrefilledMatrix = Nullable<NumberRange>[][];

export type ShuffleDirection = 'vertical' | 'horizontal';

export type Status = 'finished' | 'paused' | 'playing';
