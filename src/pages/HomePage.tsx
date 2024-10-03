import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Alert } from '@mui/material';
import { SentimentSatisfied, SentimentDissatisfied, QuestionMark } from '@mui/icons-material';
import { useStore } from '../store';
import { useSaveToHistory } from '../hooks/useSaveToHistory';

const HomePage = () => {
  const [word, setWord] = useState('');
  const [result, setResult] = useState('');
  const { getEdibleStatus } = useStore();
  const { writeToHistory } = useSaveToHistory();

  const handleButtonClick = () => {
    setResult(getEdibleStatus(word));
  };
  const handleInputChange = (e: { target: { value: React.SetStateAction<string> } }) => {
    if (result) setResult('');
    setWord(e.target.value);
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleButtonClick();
    }
  };

  const resultAlert = (result: string) => {
    switch(result) {
      case 'edible':
        return (
          <Alert icon={<SentimentSatisfied fontSize="inherit" />} severity="success">
            It's edible!
          </Alert>
        );
      case 'inedible':
        return (
          <Alert icon={<SentimentDissatisfied fontSize="inherit" />} severity="error">
            It's inedible!
          </Alert>
        );
      case 'unknown':
        return (
          <Alert icon={<QuestionMark fontSize="inherit" />} severity="warning">
            Edibility unknown
          </Alert>
        );
      default:
        return null;
    }
  };

  useEffect(() => {
    if (!result) return;
    writeToHistory(word, result);
  }, [result])

  return (
    <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '16px' }}>
      <TextField
        required
        label="Is it edible?"
        defaultValue=""
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
      <Button
        variant="outlined"
        size="large"
        onClick={handleButtonClick}
      >Check
      </Button>
      {resultAlert(result)}
    </Box>
  );
};

export default HomePage;
