const axios = require('axios');
require('dotenv').config();

const figmaToken = process.env.FIGMA_PAT;
const fileKey = process.env.FIGMA_FILE_KEY;


axios.get(`https://api.figma.com/v1/files/${fileKey}/variables/local`, {
    headers: {
        'X-Figma-Token': figmaToken
    }
})
.then(response => {
    const data = response.data;
    
    // Extract variable collections
    const variableCollections = data.meta.variableCollections;
    console.log('Variable Collections:');
    for (const [id, collection] of Object.entries(variableCollections)) {
        console.log(`Collection ID: ${id}`);
        console.log(`Name: ${collection.name}`);
        console.log(`Description: ${collection.description}`);
    }

    // Extract variables
    const variables = data.meta.variables;
    console.log('\nVariables:');
    for (const [id, variable] of Object.entries(variables)) {
        console.log(`Variable ID: ${id}`);
        console.log(`Name: ${variable.name}`);
        console.log(`Type: ${variable.type}`);
        console.log(`Value: ${JSON.stringify(variable.value)}`);
    }
})
.catch(error => {
    console.error('Error fetching data:', error);
});
