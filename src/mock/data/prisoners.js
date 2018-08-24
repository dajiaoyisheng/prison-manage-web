import Mock from 'mockjs';

let p = ["监区一", "监区二", "监区三", "监区四", "监区五", "监区六", "监区七", "监区八", "监区九", "监区十"];
let PrisonersData = [];
p.forEach(function (num) {
  PrisonersData.push({
    area: num,
    pNumItem: Mock.mock('@natural(60, 300)'),
  });
});

export default PrisonersData;
