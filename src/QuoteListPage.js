import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './App.css'

function QuoteListPage() {
  const [quotes, setQuotes] = useState([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchQuotes();
  }, [page]);

  const fetchQuotes = async () => {
    try {
      const response = await axios.get(
        `https://assignment.stage.crafto.app/getQuotes?limit=20&offset=${page * 20}`,
        {
          headers: { Authorization: token },
        }
      );

      if (response?.data?.data?.length === 0) {
        setHasMore(false);
      } else {
        setQuotes((prevQuotes) => [...prevQuotes, ...response?.data?.data]);
      }
    } catch (error) {
      alert('Failed to fetch quotes');
    }
  };

  return (
    <div className="quote-list-page">
      <h2 className='quotes-heading'>Quotes</h2>
      <div className="quotes-container">
        {quotes.map((quote, index) => (
          <div key={index} className="quote-card">
            <img className='quoteImage' src={quote.mediaUrl} alt="quote" />
            <div className="overlay-text">{quote.text}</div>
            <div className="quote-details">
              <span>userName: {quote.username}</span>
              <span>createdAt:{new Date(quote.createdAt).toLocaleString()}</span>
            </div>
          </div>
        ))}
      </div>
      <div className='load-more-container'>
      {hasMore && <button onClick={() => setPage(page + 1)}>Load More</button>}
      <button
        className="floating-button"
        onClick={() => navigate('/create-quote')}
      >
        Create Quote
      </button>
      </div>
    </div>
  );
}

export default QuoteListPage;
