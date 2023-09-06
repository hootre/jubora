import { Main_Slides } from 'components/home/Main/Main_Slides';
import { Notice } from 'components/home/Main/Notice';
import { noticeList } from 'assets/data';
import { TemplatesContents } from 'components/home/Main/TemplatesContents';
import { CardList } from 'components/common/CardList';
import { serverTemplates } from 'hooks/supabase/templates/serverTemplates';
import HomeLayoutComponent from 'components/home/HomeLayoutComponent/HomeLayoutComponent';

const Home = async () => {
  const { serverGetSixTemplates } = serverTemplates();
  const six_data = await serverGetSixTemplates();
  return (
    <HomeLayoutComponent>
      <Main_Slides />
      <TemplatesContents six_data={six_data} />
      <img src="https://nuriad.co.kr/data/bbsData/16376642931.jpg" alt="" />
      <CardList />
      <img src="https://nuriad.co.kr/data/bbsData/16376639661.jpg" alt="" />
      <Notice noticeList={noticeList} />
    </HomeLayoutComponent>
  );
};

export default Home;
