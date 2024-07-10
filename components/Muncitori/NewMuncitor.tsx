import { useEffect, useRef, useState } from 'react';
import {
  Button,
  Form,
  FormActions,
  FormField,
  Input,
  Label,
  Modal
} from '../UI';

interface IProps {
  onSubmit: (name: string) => void;
  onCancel: () => void;
}

const NewMuncitor = ({ onSubmit, onCancel }: IProps) => {
  const [newName, setNewName] = useState('');

  const nameInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    nameInputRef.current!.focus();
  }, []);

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!newName) return;
    onSubmit(newName);
  };

  return (
    <Modal
      modalTitle='Adaugă un muncitor'
      onClose={onCancel}
      elementToFocus={nameInputRef}
      autofocus>
      <Form onSubmit={submitHandler}>
        <FormField>
          <Label>Numele</Label>
          <Input
            ref={nameInputRef}
            type='text'
            placeholder='Numele muncitorului...'
            value={newName || ''}
            onChange={(e) => setNewName(e.target.value)}
          />
        </FormField>

        <FormActions>
          <Button type='submit'>Adaugă</Button>
          <Button type='button' onClick={onCancel}>
            ❌
          </Button>
        </FormActions>
      </Form>
    </Modal>
  );
};

export default NewMuncitor;
