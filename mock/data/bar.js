import Mock from 'mockjs';

let barData = Mock.mock({
    "columns": ['日期', '访问用户'],
    "rows|3-10": [function() {
        return {
            "日期": Mock.mock('@datetime'),
            '访问用户': Mock.mock('@natural(60, 20000)')
        }
    }]
})

export default barData;