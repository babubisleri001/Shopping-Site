import React, { useState } from 'react';
import { Client } from '@gradio/client';
import './Chatbot.scss';

const Chatbot = () => {
    const [query, setQuery] = useState('');
    const [conversations, setConversations] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const handleQueryChange = (e) => {
        setQuery(e.target.value);
    };

    const handleQuerySubmit = async () => {
        if (!query) return;

        setLoading(true);
        try {
            const client = await Client.connect("fragger246/rookus2");
            const result = await client.predict("/predict", { user_query: query });
            
            console.log('API response:', result.data);

            if (result && result.data) {
                setConversations([...conversations, { query, response: result.data }]);
            } else {
                setConversations([...conversations, { query, response: 'Sorry, something went wrong with the response format.' }]);
            }

            setQuery('');
        } catch (error) {
            console.error('Error fetching response:', error);
            setConversations([...conversations, { query, response: 'Sorry, something went wrong.' }]);
        } finally {
            setLoading(false);
        }
    };

    const toggleChatbot = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="chatbot-container">
            <div className={`chatbot-icon ${isOpen ? 'open' : ''}`} onClick={toggleChatbot}>
                <span role="img" aria-label="chat">💬</span>
            </div>
            {isOpen && (
                <div className="chatbot-interface">
                    <div className="chatbot-header">
                        <h1>Chatbot</h1>
                        <button className="close-button" onClick={toggleChatbot}>✖</button>
                    </div>
                    <div className="chatbot-input-container">
                        <input
                            type="text"
                            value={query}
                            onChange={handleQueryChange}
                            placeholder="Type your query here"
                            className="chatbot-input"
                            disabled={loading}
                        />
                        <button onClick={handleQuerySubmit} disabled={loading} className="chatbot-button">
                            {loading ? 'Loading...' : 'Submit'}
                        </button>
                    </div>
                    <div className="chatbot-conversation">
                        {conversations.map((conv, index) => (
                            <div key={index} className="chatbot-message">
                                <p><strong>You:</strong> {conv.query}</p>
                                <p><strong>Bot:</strong> {conv.response}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Chatbot;
