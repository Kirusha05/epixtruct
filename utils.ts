import { Currency, IExchange, IProject, IProjectInfo, ISalariu, ProjectWithWorkers } from './types';

export const fetchExchangeRates = async (): Promise<IExchange> => {
  const response = await fetch(
    'https://v6.exchangerate-api.com/v6/f01eb338de6de4cb45262cbe/latest/MDL'
  );
  const data: any = await response.json();
  const eurRate: number = data.conversion_rates.EUR;
  const usdRate: number = data.conversion_rates.USD;
  return {
    eur: roundAmount(1 / eurRate),
    usd: roundAmount(1 / usdRate)
  };
};

export const formatDate = (date: string, noDay?: boolean) =>
  new Date(date).toLocaleDateString('ro-RO', {
    year: 'numeric',
    month: 'short',
    day: noDay ? undefined : 'numeric'
  });

export const formatAmount = (num: number, hasMinimum: boolean = false) =>
  num.toLocaleString('en-US', {
    minimumFractionDigits: hasMinimum ? 2 : undefined,
    maximumFractionDigits: 2
  });

// Round number to 2 decimal places
export const roundAmount = (amount: number) => Math.round(amount * 100) / 100;

export const updateProject = async (
  projectID: string,
  projectData: IProject,
  projectInfo?: IProjectInfo
) => {
  await fetch('/api/project', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ projectID, projectData, projectInfo })
  });
};

export const getProjectsWorkers = async (DATABASE_URL: string) => {
  try {
    const res = await fetch(`${DATABASE_URL}/projectsList.json`);
    const data = await res.json();

    const projects: [string, IProject][] = Object.entries(data);
    const projectsWithWorkers: ProjectWithWorkers[] = [];

    for (let projectData of projects) {
      const { name, workers } = projectData[1];

      projectsWithWorkers.push({
        id: projectData[0],
        name,
        workers: workers || [],
      })
    }

    return projectsWithWorkers;
  } catch (_) {
    throw new Error('Failed to fetch projects...');
  }
}

export const getProject = async (
  projectID: string,
  DATABASE_URL: string
): Promise<IProject> => {
  try {
    const res = await fetch(`${DATABASE_URL}/projectsList/${projectID}.json`);
    const data = await res.json();
    return data;
  } catch (_) {
    throw new Error('Failed to fetch project...');
  }
};

export const getProjectsInfo = async (
  DATABASE_URL: string
): Promise<Record<string, IProjectInfo>> => {
  try {
    const res = await fetch(`${DATABASE_URL}/projectsInfo.json`);
    const data = await res.json();
    return data;
  } catch (_) {
    throw new Error('Failed to fetch projects info...');
  }
};

export const deleteProject = async (projectID: string) => {
  await fetch('/api/project', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ projectID })
  });
};

const CREDIT_DEFAULT = {
  eur: 0,
  usd: 0,
  mdl: 0
};

export const currencySymbols = {
  eur: '€',
  mdl: 'lei',
  usd: '$'
};

export const formatPriceWithCurrency = (currency: Currency, price: number) => {
  const formattedPrice = formatAmount(price);
  return currency === 'mdl'
    ? `${formattedPrice} lei`
    : `${currencySymbols[currency]}${formattedPrice}`;
};

export const totalSalaryByCurrency = (salarii: ISalariu[], currency: Currency) => {
  return salarii.reduce((acc, curSalary) => {
    // Don't add anything if it is the wrong currency
    if (curSalary.currency !== currency) return acc;

    return acc + curSalary.amount;
  }, 0);
};

export const EMPTY_PROJECT: Readonly<IProject> = {
  name: '',
  details: {
    totalCredit: CREDIT_DEFAULT,
    usedCredit: CREDIT_DEFAULT,
    remainingCredit: CREDIT_DEFAULT
  },
  avansuri: [],
  achizitii: [],
  workers: [],
  suplimentare: [],
  clientAccess: {
    details: true,
    avansuri: true,
    workers: true,
    achizitii: true,
    suplimentare: true
  }
};

/**
 * slices: {
 *   project: EMPTY_PROJECT
 *   projects: [
 *     { name: "Ciocana", id: "gx37a2k9", lastModified: "27 mai 2022" },
 *     { name: "Bubuieci", id: "jnS82hf3", lastModified: "30 mai 2022" },
 *   ]
 * }
 *
 * PROJECTS PAGE:
 *   onLoad:
 *     1. Load empty Projects array, start with isLoading=true
 *     2. Fetch (GET) Projects array from /projectsInfo.json
 *     3. Dispatch setProjects with the fetched Projects array
 *     4. Display the Projects list, isLoading=false
 *   onNew:
 *     1. Set the name of an empty project with the enteredName
 *     2. Fetch (PUT) the new Project to /projectsList/projectID.json, isLoading=true
 *     3. Fetch (PUT) the new Project to /projectsInfo/projectID.json
 *     4. isLoading=false, navigate to /projectID
 *
 * PROJECT PAGE:
 *   1. Load empty Project, start with isLoading=true
 *   2. Get projectID from the URL and fetch (GET) Project from /projectsList/projectID.json
 *   3. If the response is null, display an error: "Project not Found", isLoading=false
 *   4. If the response has data, dispatch setProject with the fetched data
 *   5. Display the Project, isLoading=false
 */
