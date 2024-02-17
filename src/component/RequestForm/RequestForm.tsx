import React, { useState } from 'react';
import { manageRequests } from '../../unity/functions/requestSender';



interface RequestFormProps {
    onStart?: (limit: number) => void;
    onResponsesUpdate: (index: number) => void;
}

const RequestForm: React.FC<RequestFormProps> = ({ onStart, onResponsesUpdate }) => {
    const [inputValue, setInputValue] = useState<string>('10');
  const [isDisabled, setIsDisabled] = useState<boolean>(false);


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleStart = (limit: number) => {
    setIsDisabled(true); 
    manageRequests(limit, 1000, onResponsesUpdate).then(() => {
      setIsDisabled(false);
    });
  };
    
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const limit = parseInt(inputValue, 10);
    if (limit > 0 && limit <= 100) {
      handleStart(limit);
    } else {
      alert('Please enter a number between 0 and 100.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="number"
        value={inputValue}
        onChange={handleInputChange}
        min="0"
        max="100"
        required
      />
      <button type="submit" disabled={isDisabled}>Start</button>
    </form>
  );
};

export default RequestForm;
