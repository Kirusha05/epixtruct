import type { NextApiRequest, NextApiResponse } from 'next';

const DATABASE_URL = process.env.DATABASE_URL;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  const { token: userToken } = req.cookies;

  if (!userToken || userToken !== process.env.ADMIN_TOKEN) {
    res.status(403).json({ message: 'Token incorect!' });
    return;
  }

  if (method === 'PUT') {
    const { projectID, projectData, projectInfo } = req.body;

    await fetch(`${DATABASE_URL}/projectsList/${projectID}.json`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(projectData)
    });

    if (projectInfo)
      await fetch(`${DATABASE_URL}/projectsInfo/${projectInfo.id}.json`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(projectInfo)
      });

    res.status(201).json({ message: 'Project updated...' });
    return;
  } else if (method === 'DELETE') {
    const { projectID } = req.body;

    await fetch(`${DATABASE_URL}/projectsList/${projectID}.json`, {
      method: 'DELETE'
    });
    await fetch(`${DATABASE_URL}/projectsInfo/${projectID}.json`, {
      method: 'DELETE'
    });

    res.status(200).json({ message: 'Project deleted...' });
    return;
  }
}
