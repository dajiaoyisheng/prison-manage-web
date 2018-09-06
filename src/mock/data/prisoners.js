import Mock from 'mockjs';

let p = ["监区一", "监区二", "监区三", "监区四", "监区五", "监区六", "监区七", "监区八", "监区九", "监区十"];
let PrisonersData = {};
let prisonsers = [];
let temArray = [];
let personnum = null;
p.forEach(function (num) {
  prisonsers.push({
    area: num,
    pNumItem: Mock.mock('@natural(60, 300)'),
  });
});
prisonsers.map(function (val) {
  temArray.push(val.pNumItem)
})
personnum = eval(temArray.join('+'))
PrisonersData = {
  prisonsers: prisonsers,
  personnum: personnum
}

export default PrisonersData;
