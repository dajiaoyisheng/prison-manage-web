import store from '../vuex/store';
store.commit("env");
let storeEnv = store.state.env;

let urlconfig = {
  // 人员定位
  //   监区
  ppGetAreaData: `${storeEnv}/criminalPosition.action?method=getPrisonAreas`,
  //   监舍
  ppGetHouseData: `${storeEnv}/criminalPosition.action?method=getPrisonHouses`,
  //   监管类型
  ppGetVisiontypeData: `${storeEnv}/criminalPosition.action?method=getSuperviseTypes`,
  ppSearch: `${storeEnv}/criminalPosition.action?method=getPrisonerList`
}
export default urlconfig
