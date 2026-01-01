export default {
  // Use babel-jest to transform files
  transform: {
    '^.+\\.(js|ts)$': 'babel-jest'
  },
  
  // Transform node_modules that use ES modules
  // Allow transformation of uuid, jsdom, and all jsdom dependencies
  transformIgnorePatterns: [
    'node_modules/(?!(uuid|jsdom|parse5|entities|whatwg-url|webidl-conversions|w3c-xmlserializer|xml-name-validator|saxes|cssstyle|data-urls|form-data|tough-cookie|ws|@asamuzakjp|@exodus)/)'
  ],
  
  // Set the test environment - use node as default
  testEnvironment: 'node',
  
  // Module file extensions
  moduleFileExtensions: ['js', 'ts', 'json'],
  
  // Test file patterns
  testMatch: ['**/*.test.(js|ts)']
};