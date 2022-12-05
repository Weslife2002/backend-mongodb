import crypto from 'crypto';

export default function hash(input) {
  return crypto.createHash('sha256').update(input).digest('hex');
}
