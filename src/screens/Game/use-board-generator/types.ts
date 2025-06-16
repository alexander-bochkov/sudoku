import type { BoardGeneratorOutputMessage } from 'workers/board-generator-worker';

export type BoardGenerationHandler = (event: MessageEvent<BoardGeneratorOutputMessage>) => void;
