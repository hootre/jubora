import supabase_server from 'lib/supabase-server';

// 모든 제품목록
const serverGetTemplates = async () => {
  const { data } = await supabase_server.from('templates').select('*');
  return new Promise((resolve, reject) => {
    if (error) {
      reject(`제품 불러오기 오류 :  ${error.message}`);
    } else {
      resolve(data.sort((a, b) => b.id - a.id));
    }
  });
};
// 특정 id 조회수 증가
const serverUpdateView = async (views, id) => {
  const { data, error } = await supabase_server
    .from('templates')
    .update({ views: ++views })
    .eq('id', id);
  return new Promise((resolve, reject) => {
    if (error) {
      reject(`조회수증가 오류 :  ${error.message}`);
    } else {
      resolve(data);
    }
  });
};
// 특정 id 제품 상세
const serverGetOnlyTemplates = async (id) => {
  const { data, error } = await supabase_server.from('templates').select('*').eq('id', id).single();
  return new Promise((resolve, reject) => {
    if (error) {
      reject(`특정 제품 불러오기 오류 :  ${error.message}`);
    } else {
      resolve(data);
    }
  });
};
// 특정 id 제품 상세
const serverGetSixTemplates = async () => {
  const { data, error } = await supabase_server.from('templates').select('*').range(0, 6);
  return new Promise((resolve, reject) => {
    if (error) {
      reject(`제품 6개 불러오기 오류 :  ${error.message}`);
    } else {
      resolve(data);
    }
  });
};
// 특정 category 목록
const serverGetCategoryTemplates = async (category) => {
  const { data, error } = await supabase_server
    .from('templates')
    .select('*')
    .eq('category', category);
  return new Promise((resolve, reject) => {
    if (error) {
      reject(`특정 상품 불러오기 오류 :  ${error.message}`);
    } else {
      resolve(data.sort((a, b) => b.id - a.id));
    }
  });
};
export const serverTemplates = () => {
  return {
    serverGetTemplates,
    serverUpdateView,
    serverGetOnlyTemplates,
    serverGetSixTemplates,
    serverGetCategoryTemplates,
  };
};
