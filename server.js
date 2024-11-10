const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(cors());

// MindsDB query endpoint
app.post('/query-mindsdb', async (req, res) => {
    // still this knowledge base is not working 
    const url = 'http://127.0.0.1:47334/api/projects/mindsdb/knowledge_bases/demo/completions';
    
    const headers = {
        'Content-Type': 'application/json'
    };

    const data_context = {
        "model_provider": "openai",
        "llm_model": "gpt-4o",
        "type": "chat",
        "query": req.body.query || "How do I create a model in mindsDB?"
    };

    try {
        const response = await axios.post(url, data_context, { headers });
        
        if (response.status === 200) {
            const main_content = response.data.message?.content || "No content available";
            res.json({ 
                success: true, 
                content: main_content 
            });
        }
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ 
            success: false, 
            error: error.message 
        });
    }
});

// Basic health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'OK' });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
}); 