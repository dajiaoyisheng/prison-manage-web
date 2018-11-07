import store from '../vuex/store';
store.commit("env");
let storeEnv = store.state.env;

let urlconfig = {
  // 人员定位beging
  // 监区
  ppGetAreaData: `${storeEnv}/criminalPosition.action?method=getPrisonAreas`,
  // 监舍
  ppGetHouseData: `${storeEnv}/criminalPosition.action?method=getPrisonHouses`,
  // 监管类型
  ppGetVisiontypeData: `${storeEnv}/criminalPosition.action?method=getSuperviseTypes`,
  // 搜索
  ppSearch: `${storeEnv}/criminalPosition.action?method=getPrisonerList`,
  // 人员定位end
  
  // 摄像头管理begin
  // 获取所属区域
  cmGetPrisonSubRegions: `${storeEnv}/prisonRegion.action?method=getPrisonRegionTree`,
  // 获取摄像头类型
  cmGetCameraTypes: `${storeEnv}/systemCode.action?method=getCameraType`,
  // 获取摄像头列表
  cmGetCameraList: `${storeEnv}/cameraInfo.action?method=getCameraList`,
  // 保存摄像头信息
  cmSaveCameraInfo: `${storeEnv}/cameraInfo.action?method=saveCameraInfo`,
  // 摄像头管理end
}
export default urlconfig
