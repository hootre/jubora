import supabase_server from 'lib/supabase-server';

// 모든 제품목록
const serverGetOrderSetting = async () => {
  const { data } = await supabase_server.from('orderSetting').select('*');
  if (error) {
    console.error(`order_setting 불러오기 오류 : ${error.message}`);
  } else {
    return data;
  }
};

// 특정 항목 제품 상세
const serverGetTypeOrderSetting = async (category_name) => {
  const { data, error } = await supabase_server
    .from('orderSetting')
    .select('*')
    .eq('category_name', category_name)
    .single();
  if (error) {
    console.error(`orderSetting type 불러오기 오류: ${error.message}`);
  } else {
    return data;
  }
};
// 원하는 항목 불러오기
const serverGetWantListOrderSetting = async (wantList) => {
  const { data, error } = await supabase_server.from('orderSetting').select(wantList.join());
  if (error) {
    console.error(`orderSetting 원하는 항목 불러오기 오류: ${error.message}`);
  } else {
    return data;
  }
};
export const serverOrderSetting = () => {
  return { serverGetOrderSetting, serverGetTypeOrderSetting, serverGetWantListOrderSetting };
};
