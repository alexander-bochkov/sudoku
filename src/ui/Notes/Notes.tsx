import clsx from 'clsx';

import type { Note } from 'types/sudoku';
import type { Nullable } from 'types/utility-types';

import styles from './Notes.module.scss';

const NOTES_LIST = [0, 1, 2];

type NotesProps = {
  notes: Note[];
  selectedNoteIdx: Nullable<number>;
  onSelect: (selectedNoteIdx: Nullable<number>) => void;
};

export const Notes = ({ notes, selectedNoteIdx, onSelect }: NotesProps) => (
  <div className={styles.notesLayout}>
    {NOTES_LIST.map((noteIdx) => {
      const isSelected = noteIdx === selectedNoteIdx;

      return (
        <button
          className={clsx(styles.note, {
            [styles.note_selected]: isSelected,
          })}
          key={noteIdx}
          onClick={() => {
            onSelect(isSelected ? null : noteIdx);
          }}
        >
          {notes[noteIdx]}
        </button>
      );
    })}
  </div>
);
