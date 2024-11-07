import React, { useState } from 'react';
import { Box, TextField, Button, Typography, List, ListItem } from '@mui/material';
import { format } from 'date-fns'; 
import Header from '../Layout/Header';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim() !== '') {
      const newMessage = {
        text: input,
        timestamp: new Date(),
      };
      setMessages([...messages, newMessage]);
      setInput('');
    }
  };

  const formatDate = (date) => format(date, 'PPpp'); 

  return (
    <>
    <Header/>
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '90vh',
        maxWidth: '50vw',
        margin: 'auto',
        border: '1px solid',
        borderColor: 'primary.main',
        borderRadius: '8px',
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          flex: 1,
          overflowY: 'auto',
          padding: '16px',
          backgroundColor: '#f5f5f5',
        }}
      >
        <List>
          {messages.map((message, index) => (
            <ListItem key={index} sx={{ display: 'block', marginBottom: '8px' }}>
               <Box
      sx={{
        backgroundColor: 'primary.main',
        color: 'white',
        padding: '8px',
        borderRadius: '8px',
        wordWrap: 'break-word',
        maxWidth: '80%', 
      }}
    >
              <Typography
                sx={{
                  wordWrap: 'break-word',
                  color: 'white',
                  fontWeight: 'normal',
                }}
              >
                {message.text}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {formatDate(message.timestamp)}
              </Typography>
              </Box>
            </ListItem>
          ))}
        </List>
      </Box>

    
      <Box
        sx={{
          display: 'flex',
          padding: '8px',
          borderTop: '1px solid',
          borderColor: 'primary.main',
        }}
      >
        <TextField
          variant="outlined"
          fullWidth
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSend();
          }}}
          placeholder="Type a message..."
          sx={{
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: 'primary.main',
              },
              '&:hover fieldset': {
                borderColor: 'primary.main',
              },
              '&.Mui-focused fieldset': {
                borderColor: 'primary.main',
              },
            },
          }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSend}
          sx={{ marginLeft: '8px' }}
        >
          Send
        </Button>
      </Box>
    </Box>
    </>
  );
};

export default Chat;
