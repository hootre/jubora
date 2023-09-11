import HomeLayout from 'components/home/HomeLayoutComponent/HomeLayout';

export default async function layout({ children }) {
  return <HomeLayout>{children}</HomeLayout>;
}
