import React, { useState } from 'react';
import axios from 'axios';
import './App.css'

function QuoteCreationPage() {
  const [text, setText] = useState('');
  const [file, setFile] = useState(null);
  const token = localStorage.getItem('token');

  const handleImageUpload = async () => {
    const formData = new FormData();
    formData.append('file', file);
    try {
      const response = await axios.post(
        'https://crafto.app/crafto/v1.0/media/assignment/upload',
        formData
      );
      return response.data.mediaUrl;
    } catch (error) {
      alert('Image upload failed');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const mediaUrl = await handleImageUpload();
    try {
      await axios.post(
        'https://assignment.stage.crafto.app/postQuote',
        { text, mediaUrl },
        {
          headers: { Authorization: token, 'Content-Type': 'application/json' },
        }
      );
      alert('Quote created successfully');
    } catch (error) {
      alert('Failed to create quote');
    }
  };

  return (
    <div className="quote-creation-page">
      <h2 className='quote-create-header'>Create a Quote</h2>
      <form className='create-quote-form' onSubmit={handleSubmit}>
        <textarea
          placeholder="Enter quote text"
          value={text}
          className='quote-placeholder'
          onChange={(e) => setText(e.target.value)}
        />
        <input className='' type="file" onChange={(e) => setFile(e.target.files[0])} />
        <button type="submit">Submit Quote</button>
      </form>
    </div>
  );
}

export default QuoteCreationPage;
