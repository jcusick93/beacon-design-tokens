import { register } from '@tokens-studio/sd-transforms';
import StyleDictionary from 'style-dictionary';

// will register them on StyleDictionary object
// that is installed as a dependency of this package.
// locate if file
register(StyleDictionary);

StyleDictionary.registerFilter({
  name: 'isGlobal',
  filter: function(token) {
    const fileName = token.filePath.split('/').pop();  // Get the actual file name
    return fileName === 'global.json';
  }
});

StyleDictionary.registerFilter({
  name: 'isLightTheme',
  filter: function(token) {
    const fileName = token.filePath.split('/').pop();  // Get the actual file name
    console.log(fileName)
    return fileName === 'light-theme.json';
  }
});

StyleDictionary.registerFilter({
  name: 'isDarkTheme',
  filter: function(token) {
    console.log('Token filePath:', token.filePath); // Log the entire file path
    const fileName = token.filePath.split('/').pop();  
    console.log('Extracted file name:', fileName); // Log the extracted file name
    return fileName === 'dark-theme.json';
  }
});




const sd = new StyleDictionary({
  // make sure to have source match your token files!
  // be careful about accidentally matching your package.json or similar files that are not tokens
  source: ['tokens/**/*.json'],
  preprocessors: ['tokens-studio'], // <-- since 0.16.0 this must be explicit
  platforms: {
    css: {
      transformGroup: 'tokens-studio', // <-- apply the tokens-studio transformGroup to apply all transforms
      transforms: ['name/kebab'], // <-- add a token name transform for generating token names, default is camel
      buildPath: 'build/css/',
      files: [
        {
          destination: 'global.css',
          format: 'css/variables',
          filter: "isGlobal"
     
        },
        {
          destination: 'light-theme.css',
          format: 'css/variables',
          filter: "isLightTheme"
        },
        {
          destination: 'dark-theme.css',
          format: 'css/variables',
          filter: "isDarkTheme"
        },
    
    
        
      ],
    },
  },
});

await sd.cleanAllPlatforms();
await sd.buildAllPlatforms();