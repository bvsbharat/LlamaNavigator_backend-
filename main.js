const axios = require('axios');

const url = 'http://127.0.0.1:47334/api/projects/mindsdb/knowledge_bases';
const headers = {
    'Content-Type': 'application/json'
};

const data = {
    knowledge_base: {
        name: "demo",
        model: "langchain_embedding"
    }
};

async function createKnowledgeBase() {
    try {
        const response = await axios.post(url, data, { headers });
        
        if (response.status === 201) {
            console.log("Knowledge base created successfully!");
        }
    } catch (error) {
        console.log("Failed to create knowledge base:", error.response?.status, error.response?.data);
    }
}

createKnowledgeBase();