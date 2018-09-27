import Mock from 'mockjs';

let cameraData = {
    "totalRows": Mock.mock('@natural(1, 100)'),
    items: []
}

for (let i = 0; i < 10; i++) {
    cameraData.items.push({
        startTime: "2017-07-07 12:22:12",
        endTime: "2017-07-07 12:22:12",
        timeLen: "21min",
        prisonerName: "俞飞",
        prisonerNum: "00500",
        prisonerType: "普通级",
        warningType: "无法定位",
        warningArea: "监舍2—321",
        warningRule: "服刑人员进入禁区",
        warningTv: "a.mp4"
    });
}

export default cameraData;