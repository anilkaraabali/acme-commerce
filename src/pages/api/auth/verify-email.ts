import { readUsersFromFile } from '@/features/auth/utils/user';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    try {
      // Read users from the file
      const users = await readUsersFromFile();
      const userExists = users.some((user) => user.email === email);

      // Return response based on user existence
      if (userExists) {
        return res.status(200).json({
          exists: true,
          message: 'Email is already linked to an account.',
        });
      } else {
        return res.status(404).json({
          exists: false,
          message: 'Email is not linked to any account.',
        });
      }
    } catch (error) {
      // Handle potential errors during file reading
      // eslint-disable-next-line no-console
      console.error('Error reading users from file:', error);

      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  res.setHeader('Allow', ['POST']);

  return res.status(405).json({ error: 'Method Not Allowed' });
}
