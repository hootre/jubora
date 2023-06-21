import supabase_server from 'lib/supabase-server';

// 모든 제품목록
const serverGetAllTemplates = async () => {
  const { data } = await supabase_server.from('templates_category_list').select('category_table');
  if (data) {
    const text = `${data.map((item) => {
      return `${item.category_table}(*)`;
    })}`;

    const { data: templatesList, error } = await supabase_server
      .from('templates_category_list')
      .select(text);
    if (error) {
      throw console.log(`Templates REDE ERROR : ${error.message}`);
    }
    const tableAllList = [];
    templatesList.map((table) => {
      Object.values(table).map((item) => {
        if (item.length != 0) {
          tableAllList.push(...item);
        }
      });
    });
    return tableAllList.sort((a, b) => b.id - a.id);
  }
  if (!data) {
    return [];
  }
};

// 특정 제품목록
const serverGetTemplates = async (category) => {
  const { data, error } = await supabase_server.from(category).select('*');

  if (error) {
    throw console.log(`server get category template ${error}`);
  }
  if (data) {
    return data;
  }
};
// 카테고리 목록
const serverGetCategory = async () => {
  let { data, error } = await supabase_server.from('templates_category_list').select('*');
  if (error) {
    throw console.log(`category get error : ${error.message}`);
  }
  return data;
};
export const serverTemplates = () => {
  return { serverGetAllTemplates, serverGetTemplates, serverGetCategory };
};
