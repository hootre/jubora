import HomeLayout from 'components/home/HomeLayout';

export default async function layout({ children }) {
  return <HomeLayout>{children}</HomeLayout>;
}
