import { Main_Slides } from 'components/home/Main/Main_Slides';
import { Main_Notice } from 'components/home/Main/Main_Notice';
import { noticeList } from 'assets/data';
import { TemplatesContents } from 'components/home/Main/TemplatesContents';
import { CardList } from 'components/common/CardList';
import { serverTemplates } from 'hooks/supabase/templates/serverTemplates';
import HomeLayout from 'components/home/HomeLayout';

const Home = async () => {
  const { serverGetSixTemplates } = serverTemplates();
  const six_data = await serverGetSixTemplates();
  return (
    <HomeLayout>
      <Main_Slides />
      <TemplatesContents six_data={six_data} />
      <img src="https://nuriad.co.kr/data/bbsData/16376642931.jpg" alt="" />
      <CardList />
      <img src="https://nuriad.co.kr/data/bbsData/16376639661.jpg" alt="" />
      <Main_Notice noticeList={noticeList} />
    </HomeLayout>
  );
};

export default Home;
