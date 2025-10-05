export default {
  // Use babel-jest to transform files
  transform: {
    '^.+\\.(js|ts)$': 'babel-jest'
  },
  
  // Transform node_modules that use ES modules
  transformIgnorePatterns: [
    'node_modules/(?!(uuid|jsdom)/)'
  ],
  
  // Set the test environment - use node as default
  testEnvironment: 'node',
  
  // Module file extensions
  moduleFileExtensions: ['js', 'ts', 'json'],
  
  // Test file patterns
  testMatch: ['**/*.test.(js|ts)']
};