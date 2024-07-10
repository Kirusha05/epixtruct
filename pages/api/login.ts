import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return;

  const password: string = req.body.password;

  if (password !== process.env.ADMIN_PASSWORD) {
    res.status(403).json({ message: 'Parolă incorectă!' });
    return;
  }

  res.status(202).json({ token: process.env.ADMIN_TOKEN });
  return;
}
