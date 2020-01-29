/* eslint-disable no-console */
console.log('zeit-deploy.js - start (storybook deployment)');

const shell = require('child_process').execSync;

console.log('collecting params');

const token = process.env.ZEIT_TOKEN;

const domain = 'wix-style-react-theme';
console.log(`params: token=${token} pr=${4929} domain=${domain}`);

const deploymentCmd = `npx now alias --token=${token} $(npx now ./storybook-static --no-clipboard --token=${token} --public) ${domain}`;
console.log(`running now deployment: ${deploymentCmd}`);
const codeResult = shell(deploymentCmd).toString();
console.log('Done with result:', codeResult);

console.log('zeit-deploy.js - finished (storybook deployment)');
