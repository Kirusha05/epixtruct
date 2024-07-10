import { GetServerSideProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { getProjectsWorkers, totalSalaryByCurrency } from "../utils";
import { ProjectWithWorkers } from "../types";
import {
  Header,
  Title,
  TitleIcon,
} from "../components/PageHeader/PageHeader.style";
import { Card } from "../components/UI";
import { Name, StatName, FlexData } from "../styles/workers.style";
import { IoArrowBack } from "react-icons/io5";

interface IProps {
  projects: ProjectWithWorkers[];
}

const generateWorkersList = (projects: ProjectWithWorkers[]) => {
  const workersList = [];

  for (let project of projects) {
    for (let worker of project.workers) {
      const salarii = worker.salarii || [];

      const workerData = {
        name: worker.name,
        projectName: project.name,
        projectId: project.id,
        salarii: salarii,
        salaryTotals: {
          mdl: totalSalaryByCurrency(salarii, "mdl"),
          eur: totalSalaryByCurrency(salarii, "eur"),
          usd: totalSalaryByCurrency(salarii, "usd"),
        },
        id: worker.id,
      };

      workersList.push(workerData);
    }
  }

  return workersList;
};

const Workers = ({ projects }: IProps) => {
  const router = useRouter();

  const workersList = generateWorkersList(projects);
  const sortedWorkers = workersList.sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  return (
    <>
      <Head>
        <title>Muncitori | EpiXtruct</title>
      </Head>

      <Header>
        <TitleIcon onClick={() => router.push("/")}>
          <IoArrowBack />
        </TitleIcon>
        <Title>Muncitori</Title>
      </Header>
      {sortedWorkers.map((worker) => (
        <Card key={worker.id}>
          <Name>{worker.name}</Name>
          <FlexData>
            <p>În proiectul:</p>
            <StatName>{worker.projectName}</StatName>
          </FlexData>
          <FlexData>
            <p>Salariul total: </p>
            {worker.salaryTotals.mdl > 0 && <StatName isRed>{worker.salaryTotals.mdl} MDL</StatName>}
            {worker.salaryTotals.eur > 0 && <StatName isRed>€{worker.salaryTotals.eur}</StatName>}
            {worker.salaryTotals.usd > 0 && <StatName isRed>${worker.salaryTotals.usd}</StatName>}
            {worker.salarii.length === 0 && <span>N/A</span>}
          </FlexData>
        </Card>
      ))}
    </>
  );
};

export default Workers;

export const getServerSideProps: GetServerSideProps = async (context) => {
  // Check if user is authenticated
  const userToken = context.req.cookies.token;

  // Redirect if the token doesn't exist or the token was implicitly set by the client
  if (!userToken || userToken !== process.env.ADMIN_TOKEN)
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };

  let data = null;

  try {
    data = (await getProjectsWorkers(
      process.env.DATABASE_URL!
    )) as ProjectWithWorkers[];
  } catch (error) {
    console.log(error);
  }

  return {
    props: {
      projects: data,
    },
  };
};
