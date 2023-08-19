import supabase_server from 'lib/supabase-server';

// 모든 제품목록
const serverGetOrderSetting = async () => {
  const { data } = await supabase_server.from('order_setting').select('*');
  if (error) {
    console.error(`order_setting 불러오기 오류 : ${error.message}`);
  } else {
    return data;
  }
};

// 특정 type 제품 상세
const serverGetTypeOrderSetting = async (type) => {
  const { data, error } = await supabase_server
    .from('order_setting')
    .select('*')
    .eq('type', type)
    .single();
  if (error) {
    console.error(`order_setting type 불러오기 오류: ${error.message}`);
  } else {
    return data;
  }
};
// 원하는 항목 불러오기
const serverGetWantListOrderSetting = async (wantList) => {
  const { data, error } = await supabase_server.from('order_setting').select(wantList.join());
  if (error) {
    console.error(`order_setting 원하는 항목 불러오기 오류: ${error.message}`);
  } else {
    return data;
  }
};
export const serverOrderSetting = () => {
  return { serverGetOrderSetting, serverGetTypeOrderSetting, serverGetWantListOrderSetting };
};
