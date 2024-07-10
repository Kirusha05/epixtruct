import { useAppSelector, useAppDispatch } from '../../hooks';
import { invertClientAccess } from '../../store/projectSlice';
import { ProjectProps } from '../../types';
import { Button, Switch } from '../UI';
import { AccessField, AccessControl, AccessShare } from './ClientAccess.style';
import { TipText } from '../Avansuri/Avansuri.style';

interface IProps {
  projectName: string;
}

const ClientAccess = ({ projectName }: IProps) => {
  const clientAccess = useAppSelector((state) => state.project.clientAccess);
  const dispatch = useAppDispatch();

  const shareLink = async () => {
    const projectLink = window.location.href;
    const shareData = {
      title: 'EpiXtruct',
      text: `Analizați proiectul "${projectName}"`,
      url: projectLink
    };

    try {
      await navigator.clipboard.writeText(projectLink);
      if (window.innerWidth <= 600) {
        await navigator.share(shareData);
      } else {
        alert('Linkul proiectului a fost copiat!');
      }
    } catch (error) {
      console.log(`A avut loc o eroare: ${error}`);
    }
  };

  const invertActive = (name: ProjectProps) => {
    dispatch(invertClientAccess(name));
  };

  return (
    <>
      <AccessControl>
        <AccessField onClick={() => invertActive('workers')}>
          <span>Muncitori</span>
          <Switch enabled={clientAccess.workers} />
        </AccessField>
        <AccessField onClick={() => invertActive('achizitii')}>
          <span>Achiziții</span>
          <Switch enabled={clientAccess.achizitii} />
        </AccessField>
        <AccessField onClick={() => invertActive('suplimentare')}>
          <span>Suplimentare</span>
          <Switch enabled={clientAccess.suplimentare} />
        </AccessField>
      </AccessControl>
      <AccessShare>
        <TipText>Aici puteți alege ce detalii vor fi văzute de client.</TipText>
        <Button onClick={shareLink}>Trimiteți</Button>
      </AccessShare>
    </>
  );
};

export default ClientAccess;
