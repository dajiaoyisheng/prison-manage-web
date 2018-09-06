import Mock from 'mockjs';

let pieData = Mock.mock({
    "columns": ['level', 'pNumber'],
    "rows|3-10": [function() {
        return {
            "level": Mock.mock('@cword(3, 5)'),
            'pNumber': Mock.mock('@natural(60, 2000)'),
        }
    }]
})

export default pieData;