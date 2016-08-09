/**
 * YumChart: Chart Drawing Module. Version 1.0.0.
 * Module written by Joe. If you need any help, contact jieyouxu123@live.com.
 *
 * This plugin works in the following way:
 *  1. It receives YumChartData files (of valid JSON format).
 *  2. It converts the YumChartData format to Baidu ECharts data format.
 *  3. It calls ECharts functions and supplies them with converted data.
 *  4. Chart is rendered to given DIV elements on the web page.
 *  5. This plugin provides extra Util functions to update existing chart.
 *
 * @file Uses Baidu ECharts to draw charts on a HTML web page.
 * @author <a href="mailto:jieyouxu123@live.com">Joe</a>
 * @copyright 易石软件 http://www.yumstone.com/
 * @version 1.0.0
 */

/**
 * [MODULE DESIGN PATTERN]
 * YumChart's Module Design Pattern:
 *      Sub-Module (Top Level) // YumStone.YumChart
 *          |-> Loose Augmentation (Adds methods and fields to
 *                                  YumStone.YumChart)
 * Note:
 *  This is an anonymous closure:
 *      (function() {})();
 *  This module uses loose augmentation to add onto YumStone.YumChart
 */

/**
 * Defines a global-scope-level namespace, YumStone.
 * This helps to prevent namespace conflicts. This can also be used as the
 * collective YumStone JavaScript plugin namespace to organize multiple
 * Javascript plugins together.
 *
 * The code:
 *      |1| var YumStone = YumStone || {};
 * will use existing namespace YumStone (if present) or create a
 * new namespace of the name YumStone.
 *
 * @namespace YumStone
 */
var YumStone = YumStone || {};

/**
 * Handles the case where console IS NOT defined in some old browsers and
 * certain mobile browsers.
 * Creates a dummy variable console dummy method console.log if console
 * does not exist.
 *
 * @type {object}
 */
if (typeof console === "undefined") {
    console = {
        log: function () {
        }
    }
}

/**
 * Check if ECharts is loaded before this module is loaded
 * If ECharts is not defined before this script loads, assign it to null,
 * and throw error. The module will not function without ECharts.
 */
var echarts = echarts || null;
if (echarts === null) { //TODO: Uncomment after debugging is complete
    // throw "[YumChart] ERROR: ECharts is undefined!";
}

/**
 * Defines YumChart's constants and their respective GET methods.
 * This includes version information, author information, dependency
 * information.
 *
 * @name YumStone.YumChart
 * @namespace YumStone.YumChart Contains YumChart's methods and fields
 */
YumStone.YumChart = (function (module) {
    /**
     * Use Strict flag is not enabled. This is due to unresolved issues with
     * mobile platforms not correctly interpreting this plugin.
     */
    //TODO: Find out cause of strict mode causing YumChart to not function
    /*"use strict";*/

    // CONSTANT DECLARATION: START //

    /**
     * YumChart's version number.
     *
     * @private
     * @memberOf YumStone.YumChart
     * @constant
     * @type {object}
     * @property {number} MAJOR version number
     * @property {number} MINOR version number
     * @property {number} PATCH version number
     */
    var VERSION = {
        MAJOR: 1,
        MINOR: 0,
        PATCH: 0
    };

    /**
     * YumChart's copyright information
     *
     * @private
     * @memberOf YumStone.YumChart
     * @constant
     * @type {object}
     * @property {String} company YumStone
     * @property {String} website YumStone's website
     */
    var COPYRIGHT = {
        company: "YumStone",
        website: "http://www.yumstone.com/"
    };

    /**
     * YumChart's dependencies
     *
     * @private
     * @memberOf YumStone.YumChart
     * @constant
     * @type {object}
     * @property {String} echarts Baidu ECharts
     */
    var DEPENDENCIES = {
        echarts: "Baidu ECharts - http://echarts.baidu.com/"
    };

    // CONSTANT DECLARATION: END //

    // METHOD DECLARATION: START //

    /**
     * Returns Version Number.
     *
     * @public
     * @memberOf YumStone.YumChart
     * @function
     * @returns {string} Version Number String (1.0.0)
     */
    module.getVersion = function () {
        return VERSION.MAJOR + "." + VERSION.MINOR + "." + VERSION.PATCH;
    };

    /**
     * Returns Company Info.
     *
     * @public
     * @memberOf YumStone.YumChart
     * @function
     * @returns {string} Company name and website
     */
    module.getCopyright = function () {
        return COPYRIGHT.company + " " + COPYRIGHT.website;
    };

    /**
     * Returns dependencies.
     *
     * @public
     * @memberOf YumStone.YumChart
     * @function
     * @returns {Array}
     */
    module.getDependencies = function () {
        var _d = [];
        for (var dependency in DEPENDENCIES) {
            _d.push(DEPENDENCIES[dependency]);
        }
        return _d;
    };

    // METHOD DECLARATION: END //

    /**
     * Returns module, which contains a few of YumChart's methods and fields.
     * This explicitly exposes functions and fields to the public so that
     * they can be called or uses.
     */
    return module;
})(YumStone.YumChart || {});

/**
 * Defines YumChart's utility methods
 *
 * @name YumStone.YumChart
 * @namespace YumStone.YumChart Contains YumChart's methods and fields
 */
YumStone.YumChart = (function (module) {
    /**
     * More reliable type-getter compared to "typeof" operator
     *
     *  Object.prototype.toString.call([]);               // [object Array]
     *  Object.prototype.toString.call({});               // [object Object]
     *  Object.prototype.toString.call('');               // [object String]
     *  Object.prototype.toString.call(new Date());       // [object Date]
     *  Object.prototype.toString.call(1);                // [object Number]
     *  Object.prototype.toString.call(function () {});   // [object Function]
     *  Object.prototype.toString.call(/test/i);          // [object RegExp]
     *  Object.prototype.toString.call(true);             // [object Boolean]
     *  Object.prototype.toString.call(null);             // [object Null]
     *  Object.prototype.toString.call();                 // [object Undefined]
     *
     * @private
     * @memberOf YumStone.YumChart
     * @returns {String}
     */
    module.__getType__ = function (_x_) {
        return Object.prototype.toString.call(_x_).slice(8, -1);
    };

    /**
     * Contains Type-checking methods
     * @public
     * @memberOf YumStone.YumChart
     * @type {object}
     */
    module.checkType = {};

    /**
     * Check if supplied parameter is an Array
     * @public
     * @memberOf YumStone.YumChart.checkType
     * @param _x_
     * @returns {boolean}
     */
    module.checkType.isArray = function (_x_) {
        return module.__getType__(_x_) === "Array";
    };
    /**
     * Check if supplied parameter is an Object
     * @public
     * @memberOf YumStone.YumChart.checkType
     * @param _x_
     * @returns {boolean}
     */
    module.checkType.isObject = function (_x_) {
        return module.__getType__(_x_) === "Object";
    };
    /**
     * Check if supplied parameter is a String
     * @public
     * @memberOf YumStone.YumChart.checkType
     * @param _x_
     * @returns {boolean}
     */
    module.checkType.isString = function (_x_) {
        return module.__getType__(_x_) === "String";
    };
    /**
     * Check if supplied parameter is a Date
     * @public
     * @memberOf YumStone.YumChart.checkType
     * @param _x_
     * @returns {boolean}
     */
    module.checkType.isDate = function (_x_) {
        return module.__getType__(_x_) === "Date";
    };
    /**
     * Check if supplied parameter is a Number
     * @public
     * @memberOf YumStone.YumChart.checkType
     * @param _x_
     * @returns {boolean}
     */
    module.checkType.isNumber = function (_x_) {
        return module.__getType__(_x_) === "Number";
    };
    /**
     * Check if supplied parameter is a Function
     * @public
     * @memberOf YumStone.YumChart.checkType
     * @param _x_
     * @returns {boolean}
     */
    module.checkType.isFunction = function (_x_) {
        return module.__getType__(_x_) === "Function";
    };
    /**
     * Check if supplied parameter is a Regular Expression
     * @public
     * @memberOf YumStone.YumChart.checkType
     * @param _x_
     * @returns {boolean}
     */
    module.checkType.isRegex = function (_x_) {
        return module.__getType__(_x_) === "RegExp";
    };
    /**
     * Check if supplied parameter is a Boolean
     * @public
     * @memberOf YumStone.YumChart.checkType
     * @param _x_
     * @returns {boolean}
     */
    module.checkType.isBool = function (_x_) {
        return module.__getType__(_x_) === "Boolean";
    };
    /**
     * Check if supplied parameter is null
     * @public
     * @memberOf YumStone.YumChart.checkType
     * @param _x_
     * @returns {boolean}
     */
    module.checkType.isNull = function (_x_) {
        return module.__getType__(_x_) === "Null";
    };
    /**
     * Check if supplied parameter is undefined
     * @public
     * @memberOf YumStone.YumChart.checkType
     * @param _x_
     * @returns {boolean}
     */
    module.checkType.isUndefined = function (_x_) {
        return module.__getType__(_x_) === "Undefined";
    };

    /**
     * Returns module, which contains a few of YumChart's methods and fields.
     * This explicitly exposes functions and fields to the public so that
     * they can be called or uses.
     */
    return module;
})(YumStone.YumChart || {});

/**
 * Defines YumChart's instance variables and their respective GET and SET
 * methods.
 * This includes yumChartData, baiduChartData, yumChartInstance, tempYumChartInfo
 *
 * @name YumStone.YumChart
 * @namespace YumStone.YumChart Contains YumChart's constants
 */
YumStone.YumChart = (function (module) {

    // VARIABLE DECLARATION: START //

    /**
     * Declare yumChartData.
     *
     * @private
     * @memberOf YumStone.YumChart
     * @type {object}
     */
    var yumChartData = null;

    /**
     * Declare echartsChartData.
     *
     * @private
     * @memberOf YumStone.YumChart
     * @type {object}
     */
    var echartsChartData = {
        "toolbox": {
            "show": true,
            "feature": {
                "magicType": {"show": true, "type": ['stack', 'tiled']},
                "saveAsImage": {"show": true}
            }
        },
        "title": {
            "show": true,
            "text": "",
            "left": "center",
            "textStyle": {
                "color": "#0055B6",
                "fontWeight": "normal",
                "fontSize": 24
            }
        },
        "legend": {
            "data": [{
                "name": ""
            }],
            "top": "5%",
            "right": "7%"
        },
        "xAxis": {
            "name": "",
            "axisLine": {
                "show": true
            },
            "nameLocation": "middle",
            "nameTextStyle": {
                "fontSize": 16
            },
            "nameGap": 30,
            "type": "value",
            "data": []
        },
        "yAxis": {
            "name": "",
            "axisLine": {
                "show": true
            },
            "nameLocation": "middle",
            "nameRotate": 90,
            "nameTextStyle": {
                "fontSize": 16
            },
            "nameGap": 50,
            "type": "value",
            "data": []
        },

        "series": [{
            "type": "line",
            "name": "",
            "data": [],
            "label": {
                "normal": {
                    "show": true,
                    "position": "top",
                    "formatter": null
                }
            },
            "labelLine": {
                "normal": {
                    "show": true
                }
            }
        }]
    };

    /**
     * Default echartsChartData
     *
     * @private
     * @memberOf YumStone.YumChart
     * @type {object}
     */
    var defaultEchartsChartData = {
        "toolbox": {
            "show": true,
            "feature": {
                "magicType": {"show": true, "type": ['stack', 'tiled']},
                "saveAsImage": {"show": true}
            }
        },
        "title": {
            "show": true,
            "text": "",
            "left": "center",
            "textStyle": {
                "color": "#0055B6",
                "fontWeight": "normal",
                "fontSize": 24
            }
        },
        "legend": {
            "data": [{
                "name": ""
            }],
            "top": "5%",
            "right": "7%"
        },
        "xAxis": {
            "name": "",
            "axisLine": {
                "show": true
            },
            "nameLocation": "middle",
            "nameTextStyle": {
                "fontSize": 16
            },
            "nameGap": 30,
            "type": "value",
            "data": []
        },
        "yAxis": {
            "name": "",
            "axisLine": {
                "show": true
            },
            "nameLocation": "middle",
            "nameRotate": 90,
            "nameTextStyle": {
                "fontSize": 16
            },
            "nameGap": 50,
            "type": "value",
            "data": []
        },

        "series": [{
            "type": "line",
            "name": "",
            "data": [],
            "label": {
                "normal": {
                    "show": true,
                    "position": "top",
                    "formatter": null
                }
            },
            "labelLine": {
                "normal": {
                    "show": true
                }
            }
        }]
    };

    /**
     * Declares temporary reference to YumChartInstance
     *
     * @private
     * @memberOf YumStone.YumChart
     * @type {object}
     */
    var yumChartInstance = null;

    /**
     * Declares temporary Chart Information (width, height, data)
     *
     * @private
     * @memberOf YumStone.YumChart
     * @type {object}
     * @property {number} [width=400]
     * @property {number} [height=300]
     * @property {object} data
     */
    var tempYumChartInfo = {
        width: 400,
        height: 300,
        data: null
    };

    // VARIABLE DECLARATION: END //

    // PRIVATE METHOD DECLARATION: START //
    /**
     * Converts YumChartData to EChartsChartData format
     *
     * @private
     * @memberOf YumStone.YumChart
     * @function
     */
    function __convertData__() {
        try {
            /**
             * 目前支持的图标种类
             *
             * [名称] 字符串              [描述]
             *
             *  ========================================================================
             * polyline                   折线图
             * pie                        饼图
             * bar_vertical_sidebyside    柱状图，竖直显示，相同x坐标不同序列的数据并列显示
             * bar_horizon_sidebyside     柱状图，水平显示，相同x坐标不同序列的数据并列显示
             * bar_vertical_stack         柱状图，竖直显示，相同x坐标不同序列的数据堆叠显示
             * bar_horizon_stack          柱状图，水平显示，相同x坐标不同序列的数据堆叠显示
             */

            var _l = yumChartData.chart.series.length;

            module.resetEchartsChartData();

            switch (yumChartData.chart.type) {
                /*
                 * [图标种类] 折线图 | Polyline
                 */
                case "polyline":
                    /* <--- START OF CHART SETTING CONVERSION ASSIGNMENTS---> */
                    echartsChartData.title.text = 
                        (module.checkType.isUndefined(yumChartData.chart.title)) ?
                        yumChartData.chart.title : "";
                    echartsChartData.xAxis.name = 
                        (module.checkType.isUndefined(yumChartData.chart.xtitle)) ?
                        yumChartData.chart.xtitle : "";
                    echartsChartData.yAxis.name = 
                        (module.checkType.isUndefined(yumChartData.chart.ytitle)) ?
                        yumChartData.chart.ytitle : "";
                    echartsChartData.tooltip = {show: true, trigger: "axis"};

                    for (var i = 0; i < _l; i++) {
                        var n = yumChartData.chart.series[i].data.length;

                        echartsChartData.series[i] = {
                            name: "",
                            type: "",
                            data: []
                        };
                        echartsChartData.series[i].type = "line";
                        echartsChartData.series[i].name =
                            (module.checkType.isUndefined(
                            yumChartData.chart.series[i].seriesName)) ?
                            yumChartData.chart.series[i].seriesName : "series" + i;
                        echartsChartData.legend.data[i] = {name: ""};
                        echartsChartData.legend.data[i].name =
                            (module.checkType.isUndefined(
                            yumChartData.chart.series[i].seriesName)) ?
                            yumChartData.chart.series[i].seriesName : "series" + i;
                        echartsChartData.series[i].label = {
                            normal: {
                                show: true,
                                position: "top",
                                textStyle: {
                                    fontWeight: "normal",
                                    fontSize: 12
                                },
                                formatter: "{c}".split(",")[1]
                            }
                        };

                        echartsChartData.series[i].label.normal.show =
                            (module.checkType.isUndefined(
                            yumChartData.chart.showLabel)) ?
                            yumChartData.chart.showLabel : false;

                        for (var j = 0; j < n; j++) {
                            echartsChartData.series[i].data[j] = {
                                name: "",
                                value: 0
                            };
                            echartsChartData.series[i].data[j].name =
                                yumChartData.chart.series[i].data[j].labelx || "";
                            echartsChartData.series[i].data[j].value = [];
                            echartsChartData.series[i].data[j].value[0] =
                                (module.checkType.isUndefined(
                                    yumChartData.chart.series[i].data[j].x)) ?
                                    yumChartData.chart.series[i].data[j].x : "-";
                            echartsChartData.series[i].data[j].value[1] =
                                (module.checkType.isUndefined(
                                    yumChartData.chart.series[i].data[j].y)) ?
                                    yumChartData.chart.series[i].data[j].y : "-";
                        }
                    }
                    /* <--- END OF CHART SETTING CONVERSION ASSIGNMENTS ---> */
                    break;

                /*
                 * [图标种类] 柱状图 | 竖向 | 平铺
                 */
                case "bar_vertical_sidebyside":
                    /* <--- START OF CHART SETTING CONVERSION ASSIGNMENTS---> */
                    echartsChartData.title.text =
                        (module.checkType.isUndefined(yumChartData.chart.title)) ?
                        yumChartData.chart.title : "";
                    echartsChartData.xAxis.name =
                        (module.checkType.isUndefined(yumChartData.chart.xtitle)) ?
                        yumChartData.chart.xtitle : "";
                    echartsChartData.yAxis.name =
                        (module.checkType.isUndefined(yumChartData.chart.ytitle)) ?
                        yumChartData.chart.ytitle : "";
                    echartsChartData.tooltip = {
                        show: true,
                        trigger: "axis",
                        axisPointer: {type: "shadow"}
                    };
                    echartsChartData.xAxis.type = "category";
                    echartsChartData.xAxis.axisLabel = {};
                    echartsChartData.xAxis.axisLabel.show = true;

                    for (var i = 0; i < _l; i++) {
                        var n = yumChartData.chart.series[i].data.length;

                        echartsChartData.series[i] = {
                            name: "",
                            type: "",
                            data: []
                        };
                        echartsChartData.series[i].type = "bar";
                        echartsChartData.series[i].name =
                            (module.checkType.isUndefined(
                            yumChartData.chart.series[i].seriesName)) ?
                            yumChartData.chart.series[i].seriesName : "series" + i;
                        echartsChartData.legend.data[i] = {name: ""};
                        echartsChartData.legend.data[i].name =
                            (module.checkType.isUndefined(
                            yumChartData.chart.series[i].seriesName)) ?
                            yumChartData.chart.series[i].seriesName : "series" + i;

                        echartsChartData.series[i].label = {
                            normal: {
                                show: true,
                                position: "top",
                                textStyle: {
                                    fontWeight: "normal",
                                    fontSize: 12
                                },
                                formatter: "{c}"
                            }
                        };

                        echartsChartData.series[i].label.normal.show =
                            (module.checkType.isUndefined(
                            yumChartData.chart.showLabel)) ?
                            yumChartData.chart.showLabel : false;

                        for (var j = 0; j < n; j++) {
                            echartsChartData.series[i].data[j] = {
                                name: "",
                                value: 0
                            };
                            echartsChartData.series[i].data[j].name =
                                yumChartData.chart.series[i].data[j].labelx || "";
                            echartsChartData.series[i].data[j].value = [];
                            echartsChartData.series[i].data[j].value =
                                (module.checkType.isUndefined(
                                    yumChartData.chart.series[i].data[j].y)) ?
                                    yumChartData.chart.series[i].data[j].y : "-";
                            echartsChartData.xAxis.data[j] =
                                (module.checkType.isUndefined(
                                    yumChartData.chart.series[i].data[j].labelx)) ?
                                    yumChartData.chart.series[i].data[j].labelx : "";
                        }
                    }
                    /* <--- END OF CHART SETTING CONVERSION ASSIGNMENTS ---> */
                    break;

                /*
                 * [图标种类] 柱状图 | 横向 | 平铺
                 */
                case "bar_horizon_sidebyside":
                    /* <--- START OF CHART SETTING CONVERSION ASSIGNMENTS---> */
                    echartsChartData.title.text =
                        (module.checkType.isUndefined(yumChartData.chart.title)) ?
                        yumChartData.chart.title : "";
                    echartsChartData.xAxis.name =
                        (module.checkType.isUndefined(yumChartData.chart.xtitle)) ?
                        yumChartData.chart.xtitle : "";
                    echartsChartData.yAxis.name =
                        (module.checkType.isUndefined(yumChartData.chart.ytitle)) ?
                        yumChartData.chart.ytitle : "";
                    echartsChartData.tooltip = {
                        show: true,
                        trigger: "axis",
                        axisPointer: {type: "shadow"}
                    };
                    echartsChartData.yAxis.type = "category";
                    echartsChartData.yAxis.data = [];
                    echartsChartData.yAxis.axisLabel = {};
                    echartsChartData.yAxis.axisLabel.show = true;

                    for (var i = 0; i < _l; i++) {
                        var n = yumChartData.chart.series[i].data.length;

                        echartsChartData.series[i] = {
                            name: "",
                            type: "",
                            data: []
                        };
                        echartsChartData.series[i].type = "bar";
                        echartsChartData.series[i].name =
                            (module.checkType.isUndefined(
                                yumChartData.chart.series[i].seriesName)) ?
                            yumChartData.chart.series[i].seriesName : "series" + i;

                        echartsChartData.legend.data[i] = {name: ""};
                        echartsChartData.legend.data[i].name =
                            (module.checkType.isUndefined(
                                yumChartData.chart.series[i].seriesName)) ?
                            yumChartData.chart.series[i].seriesName : "series" + i;

                        echartsChartData.series[i].label = {
                            normal: {
                                show: true,
                                position: "right",
                                textStyle: {
                                    fontWeight: "normal",
                                    fontSize: 12
                                },
                                formatter: "{c}"
                            }
                        };

                        echartsChartData.series[i].label.normal.show =
                            (module.checkType.isUndefined(
                            yumChartData.chart.showLabel)) ?
                            yumChartData.chart.showLabel : false;

                        for (var j = 0; j < n; j++) {
                            echartsChartData.series[i].data[j] = {
                                name: "",
                                value: 0
                            };
                            echartsChartData.series[i].data[j].name =
                                (module.checkType.isUndefined(
                                yumChartData.chart.series[i].data[j].labely)) ?
                                yumChartData.chart.series[i].data[j].labely : "";
                            echartsChartData.series[i].data[j].value = [];
                            echartsChartData.series[i].data[j].value =
                                (module.checkType.isUndefined(
                                yumChartData.chart.series[i].data[j].x)) ?
                                yumChartData.chart.series[i].data[j].x : "-";
                            echartsChartData.yAxis.data[j] =
                                (module.checkType.isUndefined(
                                yumChartData.chart.series[i].data[j].labely)) ?
                                yumChartData.chart.series[i].data[j].labely : "";
                        }
                    }
                    /* <--- END OF CHART SETTING CONVERSION ASSIGNMENTS ---> */
                    break;

                /*
                 * [图标种类] 柱状图 | 竖向 | 堆叠
                 */
                case "bar_vertical_stack":
                    /* <--- START OF CHART SETTING CONVERSION ASSIGNMENTS ---> */
                    echartsChartData.title.text = (module.checkType.isUndefined(
                        yumChartData.chart.title)) ? yumChartData.chart.title : "";
                    echartsChartData.xAxis.name = (module.checkType.isUndefined(
                        yumChartData.chart.xtitle)) ? yumChartData.chart.xtitle : "";
                    echartsChartData.yAxis.name = (module.checkType.isUndefined(
                        yumChartData.chart.ytitle)) ? yumChartData.chart.ytitle : "";
                    echartsChartData.tooltip = {
                        show: true,
                        trigger: "axis",
                        axisPointer: {type: "shadow"}
                    };
                    echartsChartData.xAxis.type = "category";
                    echartsChartData.xAxis.axisLabel = {};
                    echartsChartData.xAxis.axisLabel.show = true;

                    for (var i = 0; i < _l; i++) {
                        var n = yumChartData.chart.series[i].data.length;

                        echartsChartData.series[i] = {
                            name: "",
                            type: "",
                            data: []
                        };
                        echartsChartData.series[i].type = "bar";
                        echartsChartData.series[i].name =
                            (module.checkType.isUndefined(
                            yumChartData.chart.series[i].seriesName)) ?
                            yumChartData.chart.series[i].seriesName : "series" + i;
                        echartsChartData.series[i].stack = "stack";

                        echartsChartData.legend.data[i] = {name: ""};
                        echartsChartData.legend.data[i].name =
                            (module.checkType.isUndefined(
                            yumChartData.chart.series[i].seriesName)) ?
                            yumChartData.chart.series[i].seriesName : "series" + i;

                        echartsChartData.series[i].label = {
                            normal: {
                                show: true,
                                position: "inside",
                                textStyle: {
                                    fontWeight: "normal",
                                    fontSize: 12
                                },
                                formatter: "{c}"
                            }
                        };

                        echartsChartData.series[i].label.normal.show =
                            (module.checkType.isUndefined(
                            yumChartData.chart.showLabel)) ?
                            yumChartData.chart.showLabel : false;

                        for (var j = 0; j < n; j++) {
                            echartsChartData.series[i].data[j] = {
                                name: "",
                                value: 0
                            };
                            echartsChartData.series[i].data[j].name =
                                yumChartData.chart.series[i].data[j].labelx || "";
                            echartsChartData.series[i].data[j].value = [];
                            echartsChartData.series[i].data[j].value =
                                (module.checkType.isUndefined(
                                yumChartData.chart.series[i].data[j].y)) ?
                                yumChartData.chart.series[i].data[j].y : "-";
                            echartsChartData.xAxis.data[j] =
                                (module.checkType.isUndefined(
                                yumChartData.chart.series[i].data[j].labelx)) ?
                                yumChartData.chart.series[i].data[j].labelx : "";
                        }
                    }
                    /* <--- END OF CHART SETTING CONVERSION ASSIGNMENTS ---> */
                    break;

                /*
                 * [图标种类] 柱状图 | 横向 | 堆叠
                 */
                case "bar_horizon_stack":
                    /* <--- START OF CHART SETTING CONVERSION ASSIGNMENTS ---> */
                    echartsChartData.title.text =
                        (module.checkType.isUndefined(yumChartData.chart.title)) ?
                        yumChartData.chart.title : "";
                    echartsChartData.xAxis.name =
                        (module.checkType.isUndefined(yumChartData.chart.xtitle)) ?
                        yumChartData.chart.xtitle : "";
                    echartsChartData.yAxis.name =
                        (module.checkType.isUndefined(yumChartData.chart.ytitle)) ?
                        yumChartData.chart.ytitle : "";
                    echartsChartData.tooltip = {
                        show: true,
                        trigger: "axis",
                        axisPointer: {type: "shadow"}
                    };
                    echartsChartData.xAxis.type = "value";
                    echartsChartData.yAxis.type = "category";
                    echartsChartData.yAxis.axisLabel = {};
                    echartsChartData.yAxis.axisLabel.show = true;

                    for (var i = 0; i < _l; i++) {
                        var n = yumChartData.chart.series[i].data.length;

                        echartsChartData.series[i] = {
                            name: "",
                            type: "",
                            data: []
                        };
                        echartsChartData.series[i].type = "bar";
                        echartsChartData.series[i].name =
                            (module.checkType.isUndefined(
                            yumChartData.chart.series[i].seriesName)) ?
                            yumChartData.chart.series[i].seriesName : "series" + i;

                        echartsChartData.series[i].stack = "stack";
                        echartsChartData.legend.data[i] = {name: ""};
                        echartsChartData.legend.data[i].name =
                            (module.checkType.isUndefined(
                            yumChartData.chart.series[i].seriesName)) ?
                            yumChartData.chart.series[i].seriesName : "series" + i;

                        echartsChartData.series[i].label = {
                            normal: {
                                show: true,
                                position: "inside",
                                textStyle: {
                                    fontWeight: "normal",
                                    fontSize: 12
                                },
                                formatter: "{c}"
                            }
                        };

                        echartsChartData.series[i].label.normal.show =
                            (module.checkType.isUndefined(
                            yumChartData.chart.showLabel)) ?
                            yumChartData.chart.showLabel : false;

                        for (var j = 0; j < n; j++) {
                            echartsChartData.series[i].data[j] = {
                                name: "",
                                value: 0
                            };
                            echartsChartData.series[i].data[j].name =
                                yumChartData.chart.series[i].data[j].labely || "";
                            echartsChartData.series[i].data[j].value = [];
                            echartsChartData.series[i].data[j].value =
                                (module.checkType.isUndefined(
                                yumChartData.chart.series[i].data[j].x)) ?
                                yumChartData.chart.series[i].data[j].x : "-";
                            echartsChartData.yAxis.data[j] =
                                (module.checkType.isUndefined(
                                yumChartData.chart.series[i].data[j].labely)) ?
                                yumChartData.chart.series[i].data[j].labely : "";
                        }
                    }
                    /* <--- END OF CHART SETTING CONVERSION ASSIGNMENTS ---> */
                    break;

                /*
                 * [图标种类] 饼状图
                 */
                case "pie":
                    yumChartData.chart.pieAlignment =
                        (yumChartData.chart.pieAlignment !== undefined || "") ?
                        yumChartData.chart.pieAlignment : "tiled";

                    /**
                     * calcPos方法计算各系列的百分比位置
                     *
                     * @private
                     * @type {object}
                     * @returns {object}
                     */
                    var calcPos = {
                        /**
                         * 返回百分比array
                         * 两种排列方式：1）列表排列。2）将多饼图排列成圆圈状。
                         *
                         * @memberOf calcPos
                         * @function
                         * @returns {object}
                         */
                        getPercentPosPie: function () {
                            /* POLYGON ALIGNMENT % CALCULATIONS */
                            if (yumChartData.chart.pieAlignment == "polygon") {
                                if (_l === 1) {
                                    return [{x: "50%", y: "50%"}];

                                } else if (_l === 2) {
                                    return [{x: "33%", y: "50%"}, {
                                        x: "67%",
                                        y: "50%"
                                    }];

                                } else {
                                    var calcOffset = function (namVertices, radius) {
                                        var _n = (module.checkType.isUndefined(
                                            namVertices)) ? Math.round(namVertices) : 3;
                                        var _r = (module.checkType.isUndefined(
                                            radius)) ? radius : 300;
                                        var A, SA;
                                        var CA = (2 * Math.PI) / _n;
                                        var v = [];

                                        if (n % 2 === 1) {
                                            SA = (Math.PI / 2);
                                        } else {
                                            SA = ((Math.PI / 2) - (CA / 2));
                                        }

                                        for (var i = 0; i < _n; i++) {
                                            A = SA + (i * CA);
                                            var vertX = Math.round(_r * Math.cos(A));
                                            var vertY = Math.round(_r * Math.sin(A));
                                            v.push({x: vertX, y: vertY});
                                        }

                                        return v;
                                    };

                                    var calcMainRadius = function () {
                                        if (tempYumChartInfo.height < tempYumChartInfo.width)
                                        {
                                            return tempYumChartInfo.height * 0.50;
                                        } else {
                                            return tempYumChartInfo.width * 0.50;
                                        }
                                    };

                                    var offsetArray = calcOffset(_l, calcMainRadius());

                                    var posArray = [];
                                    var percentPosArray = [];

                                    for (var p = 0; p < _l; p++) {
                                        posArray[p] = {
                                            x: (tempYumChartInfo.width +
                                                offsetArray[p].x) / 2,
                                            y: (tempYumChartInfo.height +
                                                offsetArray[p].y + 50) / 2
                                        };

                                        percentPosArray[p] = {
                                            x: (posArray[p].x / tempYumChartInfo.width *
                                                100).toFixed(2) + "%",
                                            y: (posArray[p].y / tempYumChartInfo.height *
                                                100).toFixed(2) + "%"
                                        };
                                    }

                                    return percentPosArray;
                                }

                                /* TILED ALIGNMENT % CALCULATIONS */
                            } else if (yumChartData.chart.pieAlignment == "tiled") {
                                if (_l == 1) {
                                    return [[{x: "50%", y: "50%"}]];

                                } else if (_l == 2) {
                                    return [[{x: "33%", y: "50%"}, {
                                        x: "67%",
                                        y: "50%"
                                    }]];

                                } else {
                                    var _posArray = [];
                                    var _nPlus1 = Math.ceil(Math.sqrt(_l));
                                    var _extraNum = _l - (Math.pow(Math.floor(
                                            Math.sqrt(_l)), 2));

                                    var calcBasePxs = function () {
                                        var _c = 0;
                                        for (var y = 0; y < _nPlus1; y++) {
                                            _posArray[y] = [];
                                            for (var x = 0; x < _nPlus1; x++) {
                                                if (_extraNum === 0) {
                                                    _posArray[y][x] = {
                                                        y: ((tempYumChartInfo.height + 50) /
                                                            (_nPlus1 + 1)) * (y + 1),
                                                        x: ((tempYumChartInfo.width) /
                                                            (_nPlus1 + 1)) * (x + 1)
                                                    };

                                                } else if (x == _nPlus1 - 1 || y ==
                                                    _nPlus1 - 1) {
                                                    if (_c < _extraNum ||
                                                        _extraNum === 0) {
                                                        if (_extraNum <=
                                                            (_nPlus1 - 1)) {
                                                            _posArray[y][x] = {
                                                                y: ((tempYumChartInfo.height + 50) /
                                                                    (_nPlus1)) * (y + 1),
                                                                x: (tempYumChartInfo.width /
                                                                    (_nPlus1 + 1)) * (x + 1)
                                                            };
                                                        } else {
                                                            _posArray[y][x] = {
                                                                y: ((tempYumChartInfo.height + 50) /
                                                                    (_nPlus1 + 0.9)) * (y + 1),
                                                                x: (tempYumChartInfo.width /
                                                                    (_nPlus1 + 1)) * (x + 1)
                                                            };
                                                        }
                                                        if (_extraNum !== 0) {
                                                            _c++;
                                                        }
                                                    } else {
                                                        _posArray[y][x] = null;
                                                    }

                                                } else {
                                                    if (_extraNum <= (_nPlus1 - 1))
                                                    {
                                                        _posArray[y][x] = {
                                                            y: ((tempYumChartInfo.height + 50) /
                                                                (_nPlus1)) * (y + 1),
                                                            x: (tempYumChartInfo.width /
                                                                (_nPlus1 + 1)) * (x + 1)
                                                        };
                                                    } else {
                                                        _posArray[y][x] = {
                                                            y: ((tempYumChartInfo.height + 50) /
                                                                (_nPlus1 + 0.9)) * (y + 1),
                                                            x: (tempYumChartInfo.width /
                                                                (_nPlus1 + 1)) * (x + 1)
                                                        };
                                                    }
                                                }
                                            }
                                        }
                                        return _posArray;
                                    };

                                    var percentPA = function (PA) {
                                        var p = PA;
                                        var r = [];

                                        for (var i = 0; i < p.length; i++) {
                                            r[i] = [];
                                            for (var j = 0; j < p[i].length; j++) {
                                                if (p[i][j] !== null) {
                                                    r[i][j] = {};
                                                    r[i][j].x = (p[i][j].x /
                                                        tempYumChartInfo.width *
                                                        100).toFixed(2) + "%";
                                                    r[i][j].y = (p[i][j].y /
                                                        tempYumChartInfo.height *
                                                        100).toFixed(2) + "%";
                                                } else {

                                                }
                                            }
                                        }
                                        return r;
                                    };

                                    var ret = calcBasePxs();
                                    return percentPA(ret);
                                }

                                /* INVALID TYPE, LOG ERROR */
                            } else {
                                console.log("[YumStone.YumChart.__convertData__]" +
                                    " Invalid pie alignment!");
                            }
                        },

                        /**
                         * 计算各个饼图的大小（根据宽、高）
                         *
                         * @memberOf calcPos
                         * @function
                         * @returns {object}
                         */
                        calcEachPieRadius: function () {
                            if (yumChartData.chart.pieAlignment == "polygon") {
                                if (_l === 1) {
                                    return "75%";
                                } else if (_l === 2) {
                                    return "40%";
                                } else {
                                    if (tempYumChartInfo.height < tempYumChartInfo.width) {
                                        return (tempYumChartInfo.height * (1 / _l) /
                                            tempYumChartInfo.height) * 100 + "%";

                                    } else {
                                        return (tempYumChartInfo.width * (1 / _l) /
                                            tempYumChartInfo.width) * 100 + "%";
                                    }
                                }
                            } else if (yumChartData.chart.pieAlignment == "tiled") {
                                if (_l === 1) {
                                    return "75%";
                                } else if (_l === 2) {
                                    return "40%";
                                } else {
                                    var _nPlus1 = Math.ceil(Math.sqrt(_l));
                                    if (tempYumChartInfo.height < tempYumChartInfo.width) {
                                        return ((tempYumChartInfo.height / (_nPlus1 + 1)) /
                                            (tempYumChartInfo.height) * 100 + "%");
                                    } else {
                                        return ((tempYumChartInfo.width / (_nPlus1 + 1)) /
                                            (tempYumChartInfo.width) * 100 + "%");
                                    }
                                }
                            } else {
                                console.log("[YumStone.YumChart.__convertData__]" +
                                    " Invalid pieAlignment!");
                            }
                        }
                    };

                    var percentPos = calcPos.getPercentPosPie();

                    var tempPPA;
                    var TPPAI;

                    // 转化多维度array至一维;
                    if (yumChartData.chart.pieAlignment == "polygon") {
                        tempPPA = percentPos;

                    } else {
                        tempPPA = [];
                        TPPAI = 0;

                        for (var a = 0; a < percentPos.length; a++) {
                            for (var b = 0; b < percentPos[a].length; b++) {
                                tempPPA[TPPAI] = percentPos[a][b];
                                TPPAI++;
                            }
                        }
                    }

                    /* <--- START OF CHART SETTING CONVERSION ASSIGNMENTS ---> */
                    echartsChartData.title.text =
                        (module.checkType.isUndefined(yumChartData.chart.title)) ?
                        yumChartData.chart.title : "";
                    echartsChartData.tooltip = {show: true, trigger: "item"};

                    delete echartsChartData.xAxis;
                    delete echartsChartData.yAxis;

                    for (var i = 0; i < _l; i++) {
                        echartsChartData.series[i] = {
                            name: "",
                            type: "",
                            data: []
                        };
                        echartsChartData.series[i].type = "pie";
                        echartsChartData.series[i].name =
                            yumChartData.chart.series[i].seriesName || "series" + i;
                        echartsChartData.series[i].radius = "50%";

                        echartsChartData.legend.data[i] = {name: ""};
                        echartsChartData.legend.data[i].name =
                            yumChartData.chart.series[i].seriesName || "series" + i;

                        echartsChartData.series[i].radius =
                            calcPos.calcEachPieRadius();

                        echartsChartData.series[i].avoidLabelOverlap = true;
                        echartsChartData.series[i].label = {
                            normal: {
                                show: true,
                                position: "outside",
                                textStyle: {
                                    fontWeight: "normal",
                                    fontSize: 12
                                },
                                formatter: "{b}: {c} ({d}%)"
                            }
                        };

                        echartsChartData.series[i].labelLine = {
                            normal: {
                                show: true
                            }
                        };

                        echartsChartData.series[i].label.normal.show =
                            (module.checkType.isUndefined(yumChartData.chart.showLabel)) ?
                            yumChartData.chart.showLabel : false;
                        echartsChartData.series[i].labelLine.normal.show =
                            (module.checkType.isUndefined(yumChartData.chart.showLabel)) ?
                            yumChartData.chart.showLabel : false;

                        echartsChartData.series[i].center = [];
                        echartsChartData.series[i].center[0] = tempPPA[i].x;
                        echartsChartData.series[i].center[1] = tempPPA[i].y;

                        var n = yumChartData.chart.series[i].data.length;
                        for (var j = 0; j < n; j++) {
                            echartsChartData.series[i].data[j] = {
                                name: "",
                                value: ""
                            };
                            echartsChartData.series[i].data[j].name =
                                yumChartData.chart.series[i].data[j].labelx || "";
                            echartsChartData.series[i].data[j].value =
                                (module.checkType.isUndefined(
                                    yumChartData.chart.series[i].data[j].x)) ?
                                    yumChartData.chart.series[i].data[j].x : "-";
                        }
                    }

                    echartsChartData.toolbox.feature.magicType.show = false;
                    /* <--- END OF CHART SETTING CONVERSION ASSIGNMENTS ---> */
                    break;

                /*
                 * 如果图标种类不存在，提示错误
                 */
                default:
                    console.log("[YumStone.YumChart.__convertData__] Invalid" +
                        " chart type!");
                    break;
            }
        } catch (e) {
            console.log("[YumStone.YumChart.__convertData__] WARNING: " +
                e.message);
        }
    }

    // PRIVATE METHOD DECLARATION: END //

    // GET AND SET METHOD DECLARATION: START //

    /**
     *
     * @public
     * @memberOf YumStone.YumChart
     * @param {!object|!string} data YumChartData of JSON format
     */
    module.setYumChartData = function (data) {
        // Sets data parameter to null if data is not supplied.
        data = data || null;
        // Log missing data
        if (data === null) {
            console.log("[YumStone.YumChart.setYumChartData] WARNING: Missing" +
                " data parameter");
        } else {
            // Check type of data.
            // Note: Improved type checking method is used instead of typeof
            // operator.
            if (module.checkType.isString(data)) {
                try {
                    // Validate data string as JSON and convert it to an Object
                    data = JSON.parse(data);

                    //noinspection JSUnresolvedVariable
                    if (data.doctype === "YumChartData") {
                        // Sets yumChartData to data
                        yumChartData = data;
                        console.log("[YumStone.YumChart.setYumChartData]" +
                            " yumChartData set");
                    } else {
                        console.log("[YumStone.YumChart.setYumChartData]" +
                            " Invalid data doctype. Must be \'YumChartData\'!");
                    }
                } catch (err) {
                    if (err.name === "SyntaxError") {
                        console.log("[YumStone.YumChart.setYumChartData]" +
                            " WARNING: inputted data FAILED to validate as JSON" +
                            " format!");
                        console.log(err);
                    } else {
                        console.log("[YumStone.YumChart.setYumChartData]" +
                            " WARNING: Error occurred: " + err.message);
                    }
                }
            } else if (module.checkType.isObject(data)) {
                try {
                    // Validate data object as JSON
                    JSON.stringify(data);

                    //noinspection JSUnresolvedVariable
                    if (data.doctype === "YumChartData") {
                        // Sets yumChartData to data
                        yumChartData = data;
                        console.log("[YumStone.YumChart.setYumChartData]" +
                            " yumChartData set");
                    } else {
                        console.log("[YumStone.YumChart.setYumChartData]" +
                            " Invalid data doctype. Must be \'YumChartData\'!");
                    }
                } catch (err) {
                    if (err.name === "SyntaxError") {
                        console.log("[YumStone.YumChart.setYumChartData]" +
                            " WARNING: inputted data FAILED to validate as JSON" +
                            " format!");
                        console.log(err);
                    } else {
                        console.log("[YumStone.YumChart.setYumChartData]" +
                            " WARNING: Error occurred: " + err.message);
                    }
                }
            } else {
                console.log("[YumStone.YumChart.setYumChartData] WARNING:" +
                    " Invalid data type. Must be either String or Object")
            }
        }

    };

    /**
     * @public
     * @memberOf YumStone.YumChart
     * @returns {Object}
     */
    module.getYumChartData = function () {
        return yumChartData;
    };

    /**
     * @public
     * @memberOf YumStone.YumChart
     */
    module.resetYumChartData = function () {
        yumChartData = {};
    };

    /**
     * Sets echartsChartData using private function __convertData__.
     *
     * Note: This method does not take arguments
     *
     * @public
     * @memberOf YumStone.YumChart
     * @param {object} [data=null]
     */
    module.setEchartsChartData = function (data) {
        // Assigns null to parameter data if data is not supplied.
        data = data || null;

        // Checks if data is null (if data is not supplied)
        if (!module.checkType.isNull(data)) {
            // NOTE: No checks are performed on this assignment as multiple
            // object fields can be omitted.
            echartsChartData = data;
        } else {
            if (module.checkType.isNull(yumChartData)) {
                console.log("[YumStone.YumChart.setEchartsChartData]" +
                    " WARNING: Use setYumChartData FIRST, then call this" +
                    " function!");
            } else {
                // Calls private function __convertData__();
                __convertData__();
            }
        }

    };

    /**
     * @public
     * @memberOf YumStone.YumChart
     */
    module.getEchartsChartData = function () {
        return echartsChartData;
    };

    /**
     * @public
     * @memberOf YumStone.YumChart
     */
    module.resetEchartsChartData = function () {
        // Sets echartsChartData to default value
        echartsChartData = defaultEchartsChartData;
    };

    // GET AND SET METHOD DECLARATION: END //

    /**
     * Returns module, which contains a few of YumChart's methods and fields.
     * This explicitly exposes functions and fields to the public so that
     * they can be called or uses.
     */
    return module;
})(YumStone.YumChart || {});

/**
 * Defines YumChart's Chart Instance fields and methods.
 * This includes:
 *      FIELDS
 *          (get current or define new) tempYumChartInfo
 *          yumChartInstance
 *          yumChartInstanceData
 *      METHODS
 *          __generateYumChart__
 *          __getYumChartInstanceData__
 *          __setYumChartInstanceData__
 *          getYumChartInstance
 *          setYumChartInstance
 *
 * @name YumStone.YumChart
 * @namespace YumStone.YumChart
 */
YumStone.YumChart = (function (module) {
    // TODO: Incomplete

    /*
        GITHUB TEST
     */

    /**
     * Returns module, which contains a few of YumChart's methods and fields.
     * This explicitly exposes functions and fields to the public so that
     * they can be called or uses.
     */
    return module;
})(YumStone.YumChart || {});

////////////////////////////////////////////
//
//  /* LOOSE AUGMENTATION MODULE TEMPLATE */
//
// YumStone.YumChart = (function (module) {
//
//     return module;
// })(YumStone.YumChart || {});

/* TESTING */
// YumStone.YumChart.setYumChartData("{\"doctype\": \"YumChartData\"}");
// YumStone.YumChart.setEchartsChartData();
// console.log(YumStone.YumChart.getEchartsChartData());
