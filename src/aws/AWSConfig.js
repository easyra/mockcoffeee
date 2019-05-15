import AWS from 'aws-sdk';
import { key, id } from './accesskeys.js';

AWS.config.update({
  region: 'us-west-2',
  endpoint: 'https://dynamodb.us-west-2.amazonaws.com',
  accessKeyId: id,
  secretAccessKey: key
});

export default AWS;
