import { useEffect } from 'react';
import {
  Avansuri,
  Details,
  Expenses,
  Muncitori,
  PageHeader,
  ClientAccess,
  PageTransition
} from '../components';
import { Empty } from '../components/UI';
import { useAppSelector } from '../hooks';
import { IProject } from '../types';
import {
  getProject,
  updateProject,
  EMPTY_PROJECT,
  roundAmount
} from '../utils';
import Head from 'next/head';
import { wrapper } from '../store';
import { setProject } from '../store/projectSlice';

interface IProps {
  projectID: string;
  notFound: boolean;
  isAdmin: boolean;
  serverProject: IProject;
}

type IndexPageRef = React.ForwardedRef<HTMLDivElement>;
let firstLoad = true;

const Project = ({ projectID, notFound, isAdmin, serverProject }: IProps, ref: IndexPageRef) => {
  const project = useAppSelector((state) => state.project);
  const editMode = useAppSelector((state) => state.admin.editMode);

  // Update the project on every change
  useEffect(() => {
    if (firstLoad) {
      firstLoad = false;
      return;
    }

    const sameAsServer =
      JSON.stringify(serverProject) === JSON.stringify(project);
    console.log(`Same as server: ${sameAsServer}`);

    if (notFound || !isAdmin) return;
    updateProject(projectID, project, { id: projectID, name: project.name });
    console.log('Updating project data');
  }, [project, projectID, isAdmin, notFound, serverProject]);

  if (notFound) {
    return (
      <>
        <Head>
          <title>Eroare | EpiXtruct</title>
        </Head>
        <Empty mt>Eroare! Proiectul nu a fost găsit.</Empty>
      </>
    );
  }

  // Restrict the view access for the client
  const canView = project.clientAccess;

  return (
    // <PageTransition ref={ref}>
    <>
      <Head>
        <title>{project.name} | EpiXtruct</title>
      </Head>
      <PageHeader
        role='edit'
        isAdmin={isAdmin}
        hasHomeBtn>
        {project.name}
      </PageHeader>
      {(canView.details || editMode) && <Details />}
      {(canView.avansuri || editMode) && <Avansuri />}
      {(canView.workers || editMode) && <Muncitori />}
      {(canView.achizitii || editMode) && (
        <Expenses title='Achiziții' expenseType='achizitii' />
      )}
      {(canView.suplimentare || editMode) && (
        <Expenses title='Suplimentare' expenseType='suplimentare' />
      )}
    </>
    // </PageTransition>
  );
};

export default Project;

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ query, req }) => {
      let isAdmin = false;
      const userToken = req.cookies.token;
      if (userToken === process.env.ADMIN_TOKEN) isAdmin = true;

      const { projectID } = query;
      let data: any = null;
      let notFound = false;

      try {
        data = (await getProject(
          projectID as string,
          process.env.DATABASE_URL!
        )) as IProject;
      } catch (error) {
        notFound = true;
        console.log(error);
      }

      let loadedProject: IProject = { ...EMPTY_PROJECT };
      
      if (data) {
        loadedProject = { ...loadedProject, ...data };
      } else {
        notFound = true;
      }

      store.dispatch(setProject(loadedProject));

      return {
        props: {
          projectID,
          notFound,
          isAdmin,
          serverProject: loadedProject
        }
      };
    }
);
