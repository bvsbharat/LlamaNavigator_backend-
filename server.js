const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(cors());

// Create knowledge base endpoint
app.post('/create-knowledge-base', async (req, res) => {
    const url = 'http://127.0.0.1:47334/api/projects/mindsdb/knowledge_bases';
    
    const headers = {
        'Content-Type': 'application/json'
    };

    const data = {
        knowledge_base: {
            name: req.body.name || "demo",
            model: req.body.model || "ada2_embeddings"
        }
    };

    try {
        const response = await axios.post(url, data, { headers });

        console.log(response.data);
        
        if (response.status === 201) {
            res.json({ 
                success: true, 
                message: "Knowledge base created successfully!"
            });
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ 
            success: false, 
            error: error.message 
        });
    }
});

// Upload URLs to knowledge base endpoint
app.post('/upload-urls', async (req, res) => {
    const url = 'http://127.0.0.1:47334/api/projects/mindsdb/knowledge_bases/demo';
    
    const headers = {
        'Content-Type': 'application/json'
    };

    const data = {
        knowledge_base: {
            urls: ["https://docs.mindsdb.com"],
            limit: 100,
            crawl_depth: 1
        }
    };

    try {
        const response = await axios.put(url, data, { headers });
        
        if (response.status === 200) {
            res.json({ 
                success: true, 
                message: "Data from URLs inserted successfully!"
            });
        }
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ 
            success: false, 
            error: error.message,
            status: error.response?.status,
            details: error.response?.data
        });
    }
});


// MindsDB query endpoint
app.post('/query-mindsdb', async (req, res) => {
    // still this knowledge base is not working 
    const url = 'http://127.0.0.1:47334/api/projects/mindsdb/knowledge_bases/demo2/completions';
    
    const headers = {
        'Content-Type': 'application/json'
    };

    const data_context = {
        "model_provider": "openai",
        "llm_model": "gpt-4o",
        "type": "chat",
        "query": req.body.query || "what is IRS?"
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
        console.error('Error:', error);
        res.status(500).json({ 
            success: false, 
            error: error 
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