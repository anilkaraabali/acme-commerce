import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const url = `${req.headers['x-forwarded-proto']}://${req.headers.host}/api/auth/session`;

  const sessionRes = await fetch(url);
  const session = await sessionRes.json();

  if (session) {
    return res.json({ data: 'Protected data' });
  }

  return res.status(401).json({ message: 'Not authenticated' });
}
