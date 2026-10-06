import lbHandler from './lb-status.js';

export default async function handler(req, res) {
  return lbHandler(req, res);
}
