import fs from 'fs';
import path from 'path';

import { IUser } from './types';

const usersFilePath = path.join(process.cwd(), 'public/data/users.json');

const readUsersFromFile = async (): Promise<IUser[]> => {
  try {
    const fileData = fs.readFileSync(usersFilePath, 'utf-8');

    return JSON.parse(fileData);
  } catch {
    // If the file doesn't exist or can't be read, return an empty array
    return [];
  }
};

const writeUsersToFile = async (users: IUser[]): Promise<void> => {
  try {
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
  } catch {
    throw new Error('Error writing to file:');
  }
};

export { readUsersFromFile, writeUsersToFile };
