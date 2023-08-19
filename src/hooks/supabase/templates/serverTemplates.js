import supabase_server from 'lib/supabase-server';

// 모든 제품목록
const serverGetTemplates = async () => {
  const { data } = await supabase_server.from('templates').select('*');
  if (error) {
    console.error(`제품 불러오기 오류 : ${error.message}`);
  } else {
    return data;
  }
};

// 특정 id 제품 상세
const serverGetOnlyTemplates = async (id) => {
  const { data, error } = await supabase_server.from('templates').select('*').eq('id', id).single();
  if (error) {
    console.error(`특정 제품 불러오기 오류: ${error.message}`);
  } else {
    return data;
  }
};
// 특정 id 제품 상세
const serverGetSixTemplates = async () => {
  const { data, error } = await supabase_server.from('templates').select('*').range(0, 6);
  if (error) {
    console.error(`제품 6개 불러오기 오류: ${error.message}`);
  } else {
    return data;
  }
};
// 특정 category 목록
const serverGetCategoryTemplates = async (category) => {
  const { data, error } = await supabase_server
    .from('templates')
    .select('*')
    .eq('category', category);
  if (error) {
    console.error(`특정 카테고리 상품 불러오기 오류: ${error.message}`);
  } else {
    return data;
  }
};
export const serverTemplates = () => {
  return {
    serverGetTemplates,
    serverGetOnlyTemplates,
    serverGetSixTemplates,
    serverGetCategoryTemplates,
  };
};
