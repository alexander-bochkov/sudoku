import { useBoardContext } from 'contexts';
import { Button } from '../Button';
import styles from './ButtonsGroup.module.scss';

export const ButtonsGroup = () => {
  const { onErase, onNumberSelect } = useBoardContext();
  return (
    <div className={styles.buttonsGroup}>
      <Button
        number={1}
        onClick={() => {
          onNumberSelect(1);
        }}
      />
      <Button
        number={2}
        onClick={() => {
          onNumberSelect(2);
        }}
      />
      <Button
        number={3}
        onClick={() => {
          onNumberSelect(3);
        }}
      />
      <Button
        number={4}
        onClick={() => {
          onNumberSelect(4);
        }}
      />
      <Button
        number={5}
        onClick={() => {
          onNumberSelect(5);
        }}
      />
      <Button
        number={6}
        onClick={() => {
          onNumberSelect(6);
        }}
      />
      <Button
        number={7}
        onClick={() => {
          onNumberSelect(7);
        }}
      />
      <Button
        number={8}
        onClick={() => {
          onNumberSelect(8);
        }}
      />
      <Button
        number={9}
        onClick={() => {
          onNumberSelect(9);
        }}
      />
      <Button withEraser onClick={onErase} />
    </div>
  );
};
