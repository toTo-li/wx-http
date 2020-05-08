module.exports = {
    '/worker/task/list': [{
        "id": 1,
        "name": "我的工作组"
    }, {
        "id": 2,
        "name": "测试任务组"
    }, {
        "id": 3,
        "name": "常用任务组"
    }, {
        "id": 8,
        "name": "测试任务组2"
    }],
    'a':{
        '1':{
            text:'计月'
        },
        '2':{
            text:'计日'
        },
        '3':{
            text:'计时'
        },
        '4':{
            text:'计件'
        }
    },
    '/worker/task/info': {
        "id": 3,
        "name": "常用任务组",
        "remark": "",
        "dutyType": 4,
        "fillField": "1,2", // 1.时间 2.位置 3.件数 4.图片 5.备注
        "workPositionLon": "", // 116.307520
        "workPositionLat": "", // 39.984060
        "workPositionOffset": 0,
        "maxValue": null,
        "workStartHour": 9,
        "workStartMinute": 22,
        "workEndHour": 19,
        "workEndMinute": 0
    },

    '/worker/duty/location': 0, // 0/1

    '/worker/duty/data': {
        "dutyDataMaps": {
            "2020-05-01": {
                validity: 1,
                chargeBack:0
            },
            "2020-05-23": null,
            "2020-05-22": null,
            "2020-05-03": {
                validity: 1,
                chargeBack: 0
            },
            "2020-05-25": null,
            "2020-05-02": {
                validity: 1,
                chargeBack: 0,
                id:102
            },
            "2020-05-24": null,
            "2020-05-05": {
                validity: 0,
                chargeBack: -100,
                id:100
            },
            "2020-05-27": null,
            "2020-04-05": null,
            "2020-05-26": {
                validity: 0,
                chargeBack: -100,
                id:101
            },
            "2020-05-07": {
                validity: 1,
                chargeBack: 0
            },
            "2020-05-29": {
                validity: 0,
                chargeBack:-100
            },
            "2020-05-06": {
                validity: 1,
                chargeBack: 0
            },
            "2020-05-28": {
                validity: 1,
                chargeBack: 0
            },
            "2020-05-21": {
                validity: 0,
                chargeBack: -100
            },
            "2020-05-20": {
                validity: 1,
                chargeBack: 0
            },
            "2020-05-19": null,
            "2020-05-12": {
                validity: 0,
                chargeBack: -100
            },
            "2020-05-11": {
                validity: 0,
                chargeBack: -100
            },
            "2020-05-14": {
                validity: 0,
                chargeBack: -100
            },
            "2020-05-13": {
                validity: 1,
                chargeBack: 0
            },
            "2020-05-16": {
                validity: 1,
                chargeBack:0
            },
            "2020-05-15": {
                validity: 1,
                chargeBack:0
            },
            "2020-05-18": {
                validity: 0,
                chargeBack: -100
            },
            "2020-05-17": null,
            "2020-05-30": null,
            "2020-05-10": {
                validity: 1,
                chargeBack:0
            },
            "2020-05-09": {
                validity: 1,
                chargeBack:0
            },
            "2020-05-08": {
                validity: 1,
                chargeBack:0
            }
        }
    },
    '/worker/duty/detail':{
        "amDutyItem": {
			"address": "",
			"createTime": "",
			"pics": [],
			"positionLat": "",
			"positionLon": "",
			"remark": ""
		},
		"dutyItem": {
			"address": "",
			"createTime": "",
			"pics": [],
			"positionLat": "",
			"positionLon": "",
			"remark": "",
			"workData": 0
		},
		"pmDutyItem": {
			"address": "",
			"createTime": "",
			"pics": [],
			"positionLat": "",
			"positionLon": "",
			"remark": ""
		}
    }
}