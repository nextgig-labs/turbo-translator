#!/usr/bin/env node

const { execSync } = require('child_process');
const path = require('path');

const apiPort = process.env.API_PORT || 3000;
const apiHost = process.env.API_HOST || 'http://localhost';
const apiUrl = `${apiHost}:${apiPort}/api-json`;

try {
  console.log('Generating TypeScript types from OpenAPI schema...');
  console.log(`Fetching from: ${apiUrl}`);

  const outputPath = path.join(__dirname, 'client.d.ts');

  execSync(`npx openapi-typescript ${apiUrl} --output ${outputPath}`, {
    stdio: 'inherit',
    env: { ...process.env, PATH: process.env.PATH }
  });

  console.log('✅ API types generated successfully!');
} catch (error) {
  console.error('❌ Error generating API types:', error.message);
  process.exit(1);
}