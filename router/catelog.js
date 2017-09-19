const express = require('express')

const router = express.Router()

router.route('/test').get(function (req, res) {
    res.json([
        {
            name: '必胜客（万达城店）',
            star: 5,
            sellCount: 523,
            fare: 0,
            eta: 31
        }, {
            name: '台资味',
            star: 5,
            sellCount: 1858,
            fare: 0,
            eta: 20
        }, {
            name: '鲜芋仙',
            star: 5,
            sellCount: 407,
            fare: 3,
            eta: 28
        }
    ])
})

router.route('/catelog/all').get(function (req, res) {
    res.json([
        {
            name: 'Kiss Milk鲜奶吧',
            star: 4.5,
            sellCount: 198,
            fare: 0,
            eta: 45
        }, {
            name: '必胜客（万达城店）',
            star: 5,
            sellCount: 523,
            fare: 3,
            eta: 31
        }, {
            name: '台资味',
            star: 5,
            sellCount: 1858,
            fare: 3,
            eta: 20
        }, {
            name: '鲜芋仙',
            star: 5,
            sellCount: 407,
            fare: 3,
            eta: 28
        }, {
            name: '辛式火炉',
            star: 5,
            sellCount: 444,
            fare: 3,
            eta: 25
        }, {
            name: '麻辣韵味',
            star: 5,
            sellCount: 262,
            fare: 3.5,
            eta: 33
        }
    ])
})


router.route('/foods').get(function (req, res) {
    res.json(
        {
            name: '必胜客（万达城店）',
            foods:'店长推荐：食材 黑椒牛柳 鸡排 培根 虾仁 叉烧 烤肠 玉米 青菜',
            money:40.8,
            star: 5,
            sellCount: 523,
            fare: 0,
            eta: 31
        }
    )
})


router.route('/foodsList').get(function (req, res) {
    res.json([
        {
            name: '港式4号',
            food: '食材：黑椒牛排 烤肠 鸡柳 玉米 胡萝卜 甘蓝',
            sellMonth: 185,
            money: 40.8,
            eta: 45
        }, 
        {
            name: '港式4号',
            food: '食材：黑椒牛排 烤肠 鸡柳 玉米 胡萝卜 甘蓝',
            sellMonth: 185,
            money: 40.8,
            eta: 45
        }, 
        {
            name: '港式4号',
            food: '食材：黑椒牛排 烤肠 鸡柳 玉米 胡萝卜 甘蓝',
            sellMonth: 185,
            money: 40.8,
            eta: 45
        }, 
        {
            name: '港式4号',
            food: '食材：黑椒牛排 烤肠 鸡柳 玉米 胡萝卜 甘蓝',
            sellMonth: 185,
            money: 40.8,
            eta: 45
        }, 
        {
            name: '港式4号',
            food: '食材：黑椒牛排 烤肠 鸡柳 玉米 胡萝卜 甘蓝',
            sellMonth: 185,
            money: 40.8,
            eta: 45
        },
    ])
})

module.exports = router