import React from 'react';
import './App.css';
import RequestForm from './component/RequestForm/RequestForm';
import { RootState } from './redux/store';
import { addResponse } from './redux/slice/responsesSlice';
import { useDispatch, useSelector } from 'react-redux';

function App() {

    const dispatch = useDispatch();
  const responses = useSelector((state: RootState) => state.responses.indexes);
    
      const handleNewResponse = (responseIndex: number) => {
    dispatch(addResponse(responseIndex));
  };

  return (
    <div className="App">
      <RequestForm  onResponsesUpdate={handleNewResponse} />
      <ul>
        {responses.map((index) => (
          <li key={index}>Response: {index}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
