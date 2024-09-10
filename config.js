import { register } from '@tokens-studio/sd-transforms';
import StyleDictionary from 'style-dictionary';

// Register custom transforms and filters
register(StyleDictionary);

// Helper function to extract file name from path
function getFileName(filePath) {
  return filePath.split('/').pop().replace('.json', '');  // Extract file name without extension
}

const fileNames = ['global.json', 'light-theme.json', 'dark-theme.json'];  // List of your token files

// Create file configurations dynamically
const fileConfigs = fileNames.map(fileName => ({
  destination: `${getFileName(fileName)}.css`,  // Generate destination file name
  format: 'css/variables',
  filter: token => token.filePath.includes(fileName)  // Filter tokens based on file name
}));

const sd = StyleDictionary.extend({
  source: ['tokens/**/*.json'],
  preprocessors: ['tokens-studio'], // Ensure this is set explicitly
  platforms: {
    css: {
      transformGroup: 'tokens-studio', // Apply the tokens-studio transformGroup
      transforms: ['name/kebab'], // Apply name transform for generating CSS variable names
      buildPath: 'build/css/',
      files: fileConfigs  // Use dynamically created file configurations
    }
  }
});

// Build the tokens
(async () => {
  await sd.cleanAllPlatforms();
  await sd.buildAllPlatforms();
})();
