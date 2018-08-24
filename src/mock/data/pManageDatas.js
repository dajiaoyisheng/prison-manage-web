import Mock from 'mockjs';

let pManageDatas = Mock.mock({
  "totalRows": Mock.mock('@natural(1, 100)'),
  items: []
});
for (let i = 0; i < 10; i++) {
  pManageDatas.items.push({
    prisonerName: Mock.mock('@cname'),
    age: Mock.mock({
      "age|14-80": 100
    }).age,
    pCoding: "A2378",
    pType: Mock.mock({
      "item|1": [{
          value: "0",
          label: "全部"
        },
        {
          value: "1",
          label: "特严级"
        },
        {
          value: "2",
          label: "严管级"
        },
        {
          value: "3",
          label: "普通级"
        },
        {
          value: "4",
          label: "宽管级"
        },
        {
          value: "5",
          label: "特管级"
        }
      ]
    }).item,
    crime: Mock.mock({
      "item|1": [{
          value: "0",
          label: "故意杀人"
        },
        {
          value: "1",
          label: "抢劫"
        },
        {
          value: "2",
          label: "妨碍执法"
        }
      ]
    }).item,
    comeTime: Mock.mock('@date'),
    during: Mock.mock({
      "time|1-30": 100
    }).time,
  });
}

export default pManageDatas;
