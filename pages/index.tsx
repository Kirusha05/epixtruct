import { useEffect, useState } from 'react';
import { PageHeader, PageTransition } from '../components';
import Link from 'next/link';
import { Card, Empty } from '../components/UI';
import { useAppSelector } from '../hooks';
import { IProjectInfo } from '../types';
import { deleteProject, getProjectsInfo } from '../utils';
import {
  ProjectDelete,
  ProjectIcon,
  ProjectInfo
} from '../styles/projects.style';
import Head from 'next/head';
import { GetServerSideProps } from 'next';

interface IProps {
  projectsInfo: IProjectInfo[];
}

type IndexPageRef = React.ForwardedRef<HTMLDivElement>

const Projects = ({ projectsInfo }: IProps, ref: IndexPageRef) => {
  const [projectsList, setProjectsList] =
    useState<IProjectInfo[]>(projectsInfo);
  const editMode = useAppSelector((state) => state.admin.editMode);

  const deleteHandler = async (id: string, name: string) => {
    if (!confirm(`Sigur doriți să ștergeți proiectul "${name}"?`)) return;

    setProjectsList((prev) => prev.filter((project) => project.id !== id));
    await deleteProject(id);
  };

  const sortedList = projectsList
    .slice()
    .sort((a, b) => a.name.localeCompare(b.name));

  return (
    // <PageTransition ref={ref}>
    <>
      <Head>
        <title>Proiecte | EpiXtruct</title>
      </Head>
      <PageHeader role='add' isAdmin={true} hasWorkersBtn={true}>
        Proiectele dvs.
      </PageHeader>
      {sortedList.length ? (
        sortedList.map((project) => (
          <Card key={project.id}>
            <ProjectInfo>
              <Link href={'/' + project.id} scroll={false}>
                {project.name}
              </Link>
              {editMode && (
                <ProjectIcon
                  onClick={() => deleteHandler(project.id, project.name)}>
                  <ProjectDelete />
                </ProjectIcon>
              )}
            </ProjectInfo>
          </Card>
        ))
      ) : (
        <Empty wFull mt>Niciun proiect. Adăugați unul...</Empty>
      )}
    </>
    // </PageTransition>
  );
};

export default Projects;

export const getServerSideProps: GetServerSideProps = async (context) => {
  // Check if user is authenticated
  const userToken = context.req.cookies.token;

  // Redirect if the token doesn't exist or the token was implicitly set by the client
  if (!userToken || userToken !== process.env.ADMIN_TOKEN)
    return {
      redirect: {
        destination: '/login',
        permanent: false
      }
    };

  // Get the ProjectInfo if the user is authenticated;
  let projectsInfo: IProjectInfo[] = [];
  let data: any = null;

  try {
    data = await getProjectsInfo(process.env.DATABASE_URL!);
  } catch (error) {
    console.log(error);
  }

  if (data) projectsInfo = Object.keys(data).map((id) => data[id]);

  return {
    props: {
      projectsInfo
    }
  };
};
