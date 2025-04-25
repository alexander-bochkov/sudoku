import clsx from 'clsx';

import type { Suggestions as ISuggestions } from 'types/board';
import type { Nullable } from 'types/utility-types';

import styles from './Suggestions.module.scss';

const SUGGESTIONS = [0, 1, 2];

type SuggestionsProps = {
  items?: ISuggestions;
  selectedSuggestion?: Nullable<number>;
  onSelect: (suggestionIdx: Nullable<number>) => void;
};

export const Suggestions = ({ items, selectedSuggestion, onSelect }: SuggestionsProps) => (
  <div className={styles.suggestionsLayout}>
    {SUGGESTIONS.map((suggestionIdx) => (
      <button
        className={clsx(styles.suggestion, {
          [styles.suggestion_selected]: suggestionIdx === selectedSuggestion,
        })}
        key={suggestionIdx}
        onClick={() => {
          onSelect(suggestionIdx !== selectedSuggestion ? suggestionIdx : null);
        }}
      >
        {items?.[suggestionIdx]}
      </button>
    ))}
  </div>
);
