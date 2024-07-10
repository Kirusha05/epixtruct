import React, { useRef } from 'react';
import { Form, FormField, Input, Label, Modal } from '../UI';
import ClientAccess from '../ClientAccess/ClientAccess';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setProjectName } from '../../store/projectSlice';

interface IProps {
  onClose: () => void;
}

const SettingsModal = ({ onClose }: IProps) => {
  const projectName = useAppSelector((state) => state.project.name);
  const dispatch = useAppDispatch();

  const inputRef = useRef<HTMLInputElement>(null);

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value.trim();
    dispatch(setProjectName(newName));
  };

  return (
    <Modal modalTitle='Setări' onClose={onClose}>
      <Form hasBottomBorder onSubmit={(e) => e.preventDefault()}>
        <FormField>
          <Label>Numele proiectului:</Label>
          <Input
            ref={inputRef}
            type='text'
            defaultValue={projectName}
            onChange={onChangeHandler}
            placeholder='Numele proiectului...'
          />
        </FormField>
      </Form>
      <ClientAccess projectName={projectName} />
    </Modal>
  );
};

export default SettingsModal;
