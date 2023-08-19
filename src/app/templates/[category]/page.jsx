import { TemplatesList } from 'components/Templates/TemplatesList';

const page = ({ params: { category } }) => {
  return <TemplatesList category={category} />;
};
export default page;
