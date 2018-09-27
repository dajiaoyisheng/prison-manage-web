import Mock from 'mockjs';

let posunsualData = Mock.mock({
    "warningTypes|1-1": [
        {value: "", label: "全部"},
        {value: "1", label: "无法定位"},
        {value: "2", label: "某一定位方法失效"},
        {value: "3", label: "定位结果不一致"}
    ],
    "prisonerTypes|1-1": [
        {value: "", label: "全部"},
        {value: "1", label: "特严级"},
        {value: "2", label: "严管级"},
        {value: "3", label: "普通级"},
        {value: "4", label: "宽管级"},
        {value: "5", label: "特管级"}
    ],
    ppuTableDatas :  {
        "totalRows": Mock.mock('@natural(1, 100)'),
        items: []
    },
    prisonerInfo : {
        prisonerName: "俞飞",
        prisonerNum: "00500",
        room: "3232",
        prisonerType: "普通级",
        crime: "盗窃罪",
        sex: "男",
        age: "35",
        group: "121",
        crimeTime: "2014/02/15",
        count: "3"
    }
})

for (let i = 0; i < 14; i++) {
    posunsualData.ppuTableDatas.items.push({
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

export default posunsualData;