/* eslint-disable no-console */
import fs from 'fs/promises';
import path from 'path';

import { IUser } from './types';

const rootDir = process.cwd();
const publicDir = path.join(rootDir, 'public');
const usersDir = path.join(publicDir, 'api/v1/users');
const usersFilePath = path.join(usersDir, 'index.json');

const ensureFileExists = async (): Promise<void> => {
  try {
    await fs.mkdir(usersDir, { recursive: true });
    await fs.access(usersFilePath).catch(async () => {
      await fs.writeFile(usersFilePath, '[]', 'utf-8');
    });
  } catch (error) {
    console.error('Error ensuring file exists:', error);
  }
};

const readUsersFromFile = async (): Promise<IUser[]> => {
  await ensureFileExists();
  try {
    const fileData = await fs.readFile(usersFilePath, 'utf-8');

    return JSON.parse(fileData);
  } catch (error) {
    console.error('Error reading users file:', error);

    return [];
  }
};

const writeUsersToFile = async (users: IUser[]): Promise<void> => {
  await ensureFileExists();
  try {
    await fs.writeFile(usersFilePath, JSON.stringify(users, null, 2), 'utf-8');
  } catch (error) {
    console.error('Error writing to users file:', error);
    throw new Error('Failed to save users');
  }
};

export { readUsersFromFile, writeUsersToFile };
