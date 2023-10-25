import { TemplatesList } from 'components/home/Templates/TemplatesList';

const page = ({ params: { bannerState }, searchParams }) => {
  console.log(searchParams);
  return <TemplatesList bannerState={bannerState} />;
};
export default page;
