import Mock from 'mockjs';

let sysOptionsData = Mock.mock({
    "optionMaxTime": Mock.mock('@natural(1, 10)'),
    "stayMaxTime": Mock.mock('@natural(1, 10)')
})

export default sysOptionsData;