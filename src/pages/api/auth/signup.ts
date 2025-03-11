import { User } from '@/features/auth';
import {
  readUsersFromFile,
  writeUsersToFile,
} from '@/features/auth/utils/user';
import { hash } from 'bcryptjs';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { email, name, password } = req.body;

    if (!email || !password || !name) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Check if the user already exists
    const users = await readUsersFromFile();
    const userExists = users.find((user) => user.email === email);

    if (userExists) {
      return res
        .status(400)
        .json({ error: 'An account with that Email already exists' });
    }

    const hashedPassword = await hash(password, 10);
    const newUser: User = {
      email,
      id: crypto.randomUUID(),
      image: null,
      name,
      password: hashedPassword,
      provider: 'credentials',
      providerId: email,
      reviews: [],
    };

    users.push(newUser);

    // Save the updated users array back to the file
    await writeUsersToFile(users);

    return res.status(201).json({ message: 'User registered successfully' });
  }

  res.status(405).json({ error: 'Method Not Allowed' });
}
