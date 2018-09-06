import Mock from 'mockjs';

let status = ["在押人员", "提回重审", "保外就医", "出监就诊", "监外执行", "监内住院", "离监探亲", "监外住院"];
let pstatus = [];
status.forEach(function (item) {
  pstatus.push({
    status: item,
    pNum: Mock.mock('@natural(60, 300)'),
  });
});

export default pstatus;
