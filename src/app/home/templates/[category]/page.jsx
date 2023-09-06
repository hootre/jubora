import { TemplatesList } from 'components/home/Templates/TemplatesList';

const page = ({ params: { category } }) => {
  return <TemplatesList category={category} />;
};
export default page;
