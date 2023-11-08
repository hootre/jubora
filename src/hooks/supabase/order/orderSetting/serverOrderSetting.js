import supabaseServer from 'lib/supabaseServer';

// 모든 제품목록
const serverGetOrderSetting = async () => {
  const { data, error } = await supabaseServer.from('orderSetting').select('*');
  return new Promise((resolve, reject) => {
    if (error) {
      reject(new Error(`Order Setting 모두 불러오기 오류 :  ${error.message}`));
    } else {
      resolve(data);
    }
  });
};

// 특정 항목 제품 상세
const serverGetTypeOrderSetting = async (categoryName) => {
  const { data, error } = await supabaseServer
    .from('orderSetting')
    .select('*')
    .eq('categoryName', categoryName)
    .single();

  return new Promise((resolve, reject) => {
    if (error) {
      reject(new Error(`Order Setting 특정항목 불러오기 오류 :  ${error.message}`));
    } else {
      resolve(data);
    }
  });
};
// 원하는 항목 불러오기
const serverGetWantListOrderSetting = async (wantList) => {
  const { data, error } = await supabaseServer.from('orderSetting').select(wantList.join());
  return new Promise((resolve, reject) => {
    if (error) {
      reject(new Error(`Order Setting 원하는 것 불러오기 오류 :  ${error.message}`));
    } else {
      resolve(data);
    }
  });
};
const serverOrderSetting = () => ({
  serverGetOrderSetting,
  serverGetTypeOrderSetting,
  serverGetWantListOrderSetting,
});
export default serverOrderSetting;
