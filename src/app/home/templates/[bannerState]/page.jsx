import { TemplatesList } from 'components/home/Templates/TemplatesList';

const page = ({ params: { bannerState } }) => {
  return <TemplatesList bannerState={bannerState} />;
};
export default page;
