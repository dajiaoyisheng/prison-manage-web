import Mock from 'mockjs';

let pieData = Mock.mock({
    "columns": ['date', 'PV', 'Order', 'OrderRate'],
    "rows|3-10": [function() {
        return {
            "date": Mock.mock('@natural(60, 2000)'),
            'PV': Mock.mock('@natural(60, 2000)'),
            'Order': Mock.mock('@natural(60, 2000)'),
            'OrderRate': Mock.mock('@float(0, 0.9, 2,2)')
        }
    }]
})

export default pieData;