const axios = require('axios');

const url = 'http://127.0.0.1:47334/api/projects/mindsdb/knowledge_bases/demo/completions';

const headers = {
    'Content-Type': 'application/json'
};

const data_context = {
    "model_provider": "openai",
    "llm_model": "gpt-4o",
    "type": "chat",
    "query": "How do I create a model in mindsDB?"
};

async function queryMindsDB() {
    try {
        const response = await axios.post(url, data_context, { headers });
        
        if (response.status === 200) {
            const main_content = response.data.message?.content || "No content available";
            const context = response.data.message?.context || "No content available";
            
            console.log("Response Content:", main_content);
        }
    } catch (error) {
        console.error('Error:', error.message);
    }
}

queryMindsDB(); 