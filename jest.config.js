export default {
  // Use babel-jest to transform files
  transform: {
    '^.+\\.js$': 'babel-jest'
  },
  
  // Transform node_modules that use ES modules
  transformIgnorePatterns: [
    'node_modules/(?!(uuid|jsdom)/)'
  ],
  
  // Set the test environment - use node as default
  testEnvironment: 'node'
};