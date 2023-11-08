import supabaseServer from 'lib/supabaseServer';

// 모든 제품목록
const serverGetTemplates = async () => {
  const { data, error } = await supabaseServer.from('templates').select('*');
  return new Promise((resolve, reject) => {
    if (error) {
      reject(new Error(`제품 불러오기 오류 :  ${error.message}`));
    } else {
      resolve(data.sort((a, b) => b.id - a.id));
    }
  });
};
// 특정 id 조회수 증가
const serverUpdateView = async (views, id) => {
  let countviews = views;
  const { data, error } = await supabaseServer
    .from('templates')
    .update({ views: (countviews += 1) })
    .eq('id', id);
  return new Promise((resolve, reject) => {
    if (error) {
      reject(new Error(`조회수증가 오류 :  ${error.message}`));
    } else {
      resolve(data);
    }
  });
};
// 특정 id 제품 상세
const serverGetOnlyTemplates = async (id) => {
  const { data, error } = await supabaseServer.from('templates').select('*').eq('id', id).single();
  return new Promise((resolve, reject) => {
    if (error) {
      reject(new Error(`특정 제품 불러오기 오류 :  ${error.message}`));
    } else {
      resolve(data);
    }
  });
};
// 특정 id 제품 상세
const serverGetSixTemplates = async () => {
  const { data, error } = await supabaseServer.from('templates').select('*').range(0, 6);
  return new Promise((resolve, reject) => {
    if (error) {
      reject(new Error(`제품 6개 불러오기 오류 :  ${error.message}`));
    } else {
      resolve(data);
    }
  });
};
// 특정 category 목록
const serverGetCategoryTemplates = async (category) => {
  const { data, error } = await supabaseServer
    .from('templates')
    .select('*')
    .eq('category', category);
  return new Promise((resolve, reject) => {
    if (error) {
      reject(new Error(`특정 상품 불러오기 오류 :  ${error.message}`));
    } else {
      resolve(data.sort((a, b) => b.id - a.id));
    }
  });
};
const serverTemplates = () => ({
  serverGetTemplates,
  serverUpdateView,
  serverGetOnlyTemplates,
  serverGetSixTemplates,
  serverGetCategoryTemplates,
});
export default serverTemplates;
