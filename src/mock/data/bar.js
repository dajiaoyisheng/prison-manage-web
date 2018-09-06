import Mock from 'mockjs';
let preWarningClass = {};
let barData = Mock.mock({
  "columns": ['action', 'number', 'pNumber'],
  "rows|3": [function () {
    return {
      "action": Mock.mock('@cword(3, 5)'),
      "number": Mock.mock('@natural(1, 20)'),
      'pNumber': Mock.mock('@natural(1, 200)'),
      'detils': Mock.mock({
        "detils|3": [function () {
          return {
            "detil": Mock.mock('@cword(3, 7)'),
            "number": Mock.mock('@natural(1, 5)'),
            'pNumber': Mock.mock('@natural(5, 20)'),
          }
        }]
      }).detils
    }
  }]
});

preWarningClass = {
  barData: barData
}

export default preWarningClass;
