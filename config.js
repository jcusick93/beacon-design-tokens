import { register } from '@tokens-studio/sd-transforms';
import StyleDictionary from 'style-dictionary';

// will register them on StyleDictionary object
// that is installed as a dependency of this package.
// locate if file
register(StyleDictionary);





const sd = new StyleDictionary({
  // make sure to have source match your token files!
  // be careful about accidentally matching your package.json or similar files that are not tokens
  source: ['./tokens/**/*.json'],
  preprocessors: ['tokens-studio'], // <-- since 0.16.0 this must be explicit
  platforms: {
    css: {
      transformGroup: 'tokens-studio', // <-- apply the tokens-studio transformGroup to apply all transforms
      transforms: ['name/kebab'], // <-- add a token name transform for generating token names, default is camel
      buildPath: 'build/css/',
      files: [
        {
          destination: 'base.css',
          format: 'css/variables',
          filter: (token) => token.filePath.indexOf(`Base`) > -1,
        },

        {
          destination: 'global.css',
          format: 'css/variables',
          filter: (token) => token.filePath.indexOf(`Global`) > -1,
        },
        {
          destination: 'alias.css',
          format: 'css/variables',
          filter: (token) => token.filePath.indexOf(`Alias`) > -1,
        },

    
        
      ],
    },
  },
});

await sd.cleanAllPlatforms();
await sd.buildAllPlatforms();