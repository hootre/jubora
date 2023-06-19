import Create from 'components/admin/Create';
import { GetTemplateAll } from 'components/admin/Rede/GetTemplateAll';

export default function admin() {
  return (
    <>
      <Create />
      <GetTemplateAll />
    </>
  );
}
