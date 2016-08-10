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
    throw "[YumStone.YumChart] ERROR: ECharts is undefined!";
}

/**
 * Defines YumChart's constants and their respective GET methods.
 * This includes version information, author information, dependency
 * information.
 *
 * @name YumStone.YumChart
 * @namespace YumChart Info
 */
YumStone.YumChart = (function (module) {
    /**
     * Use Strict flag is not enabled. This is due to unresolved issues with
     * mobile platforms not correctly interpreting this plugin.
     */

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
        echarts: "Baidu ECharts 3 - http://echarts.baidu.com/"
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
 * @namespace YumChart Utils
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
 * This includes yumChartData, baiduChartData, module.__tempYumChartInfo__
 *
 * @name YumStone.YumChart
 * @namespace YumChart Instance Fields and Methods
 */
YumStone.YumChart = (function (module) {

    // VARIABLE DECLARATION: START //

    /**
     * Declare yumChartData.
     *
     * @public
     * @memberOf YumStone.YumChart
     * @type {object}
     */
    module._yumChartData = null;

    /**
     * Declare echartsChartData.
     *
     * @public
     * @memberOf YumStone.YumChart
     * @type {object}
     */
    module._echartsChartData = {
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
     * @public
     * @memberOf YumStone.YumChart
     * @type {object}
     */
    module._defaultEchartsChartData = {
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
     * Declares temporary Chart Information (width, height, data)
     *
     * @public
     * @memberOf YumStone.YumChart
     * @type {object}
     * @property {number} [width=400]
     * @property {number} [height=300]
     * @property {object} data
     */
    module.__tempYumChartInfo__ = {
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
             * [名称] 字符串                     [描述]
             * =========================================================================
             * polyline                         折线图
             * pie                              饼图
             * bar_vertical_sidebyside          柱状图，竖直显示，相同x坐标不同序列的数据并列显示
             * bar_horizon_sidebyside           柱状图，水平显示，相同x坐标不同序列的数据并列显示
             * bar_vertical_stack               柱状图，竖直显示，相同x坐标不同序列的数据堆叠显示
             * bar_horizon_stack                柱状图，水平显示，相同x坐标不同序列的数据堆叠显示
             */

            switch (module._yumChartData.chart.type) {
                /*
                 * [图标种类] 折线图 | Polyline
                 */
                case "polyline":

                    // 设l为series数量
                    var l = module._yumChartData.chart.series.length;

                    /* <--- START OF GRAPH SETTING CONVERSION ASSIGNMENTS ---> */
                    module._echartsChartData.title.text = (module._yumChartData.chart.title !== undefined) ? module._yumChartData.chart.title : "";
                    module._echartsChartData.xAxis.name = (module._yumChartData.chart.xtitle !== undefined) ? module._yumChartData.chart.xtitle : "";
                    module._echartsChartData.yAxis.name = (module._yumChartData.chart.ytitle !== undefined) ? module._yumChartData.chart.ytitle : "";
                    module._echartsChartData.tooltip = {show: true, trigger: "axis"};

                    for (var i = 0; i < l; i++) {
                        var n = module._yumChartData.chart.series[i].data.length;

                        module._echartsChartData.series[i] = {
                            name: "",
                            type: "",
                            data: []
                        };
                        module._echartsChartData.series[i].type = "line";
                        module._echartsChartData.series[i].name = (module._yumChartData.chart.series[i].seriesName !== undefined) ?
                            module._yumChartData.chart.series[i].seriesName : "series" + i;
                        module._echartsChartData.legend.data[i] = {name: ""};
                        module._echartsChartData.legend.data[i].name = (module._yumChartData.chart.series[i].seriesName !== undefined) ?
                            module._yumChartData.chart.series[i].seriesName : "series" + i;
                        module._echartsChartData.series[i].label = {
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

                        module._echartsChartData.series[i].label.normal.show = (module._yumChartData.chart.showLabel !== undefined || "") ?
                            module._yumChartData.chart.showLabel : false;

                        for (var j = 0; j < n; j++) {
                            module._echartsChartData.series[i].data[j] = {
                                name: "",
                                value: 0
                            };
                            module._echartsChartData.series[i].data[j].name = module._yumChartData.chart.series[i].data[j].labelx || "";
                            module._echartsChartData.series[i].data[j].value = [];
                            module._echartsChartData.series[i].data[j].value[0] = (module._yumChartData.chart.series[i].data[j].x !== undefined) ? module._yumChartData.chart.series[i].data[j].x : "-";
                            module._echartsChartData.series[i].data[j].value[1] = (module._yumChartData.chart.series[i].data[j].y !== undefined) ? module._yumChartData.chart.series[i].data[j].y : "-";
                        }
                    }
                    /* <--- END OF GRAPH SETTING CONVERSION ASSIGNMENTS ---> */
                    break;

                /*
                 * [图标种类] 柱状图 | 竖向 | 平铺
                 */
                case "bar_vertical_sidebyside":

                    // 设l为series数量
                    var l = module._yumChartData.chart.series.length;

                    /* <--- START OF GRAPH SETTING CONVERSION ASSIGNMENTS ---> */
                    module._echartsChartData.title.text = (module._yumChartData.chart.title !== undefined) ? module._yumChartData.chart.title : "";
                    module._echartsChartData.xAxis.name = (module._yumChartData.chart.xtitle !== undefined) ? module._yumChartData.chart.xtitle : "";
                    module._echartsChartData.yAxis.name = (module._yumChartData.chart.ytitle !== undefined) ? module._yumChartData.chart.ytitle : "";
                    module._echartsChartData.tooltip = {
                        show: true,
                        trigger: "axis",
                        axisPointer: {type: "shadow"}
                    };
                    module._echartsChartData.xAxis.type = "category";
                    module._echartsChartData.xAxis.axisLabel = {};
                    module._echartsChartData.xAxis.axisLabel.show = true;

                    for (var i = 0; i < l; i++) {
                        var n = module._yumChartData.chart.series[i].data.length;

                        module._echartsChartData.series[i] = {
                            name: "",
                            type: "",
                            data: []
                        };
                        module._echartsChartData.series[i].type = "bar";
                        module._echartsChartData.series[i].name = (module._yumChartData.chart.series[i].seriesName !== undefined) ?
                            module._yumChartData.chart.series[i].seriesName : "series" + i;
                        module._echartsChartData.legend.data[i] = {name: ""};
                        module._echartsChartData.legend.data[i].name = (module._yumChartData.chart.series[i].seriesName !== undefined) ?
                            module._yumChartData.chart.series[i].seriesName : "series" + i;

                        module._echartsChartData.series[i].label = {
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

                        module._echartsChartData.series[i].label.normal.show = (module._yumChartData.chart.showLabel !== undefined || "") ?
                            module._yumChartData.chart.showLabel : false;

                        for (var j = 0; j < n; j++) {
                            module._echartsChartData.series[i].data[j] = {
                                name: "",
                                value: 0
                            };
                            module._echartsChartData.series[i].data[j].name = module._yumChartData.chart.series[i].data[j].labelx || "";
                            module._echartsChartData.series[i].data[j].value = [];
                            module._echartsChartData.series[i].data[j].value = (module._yumChartData.chart.series[i].data[j].y !== undefined) ? module._yumChartData.chart.series[i].data[j].y : "-";
                            module._echartsChartData.xAxis.data[j] = (module._yumChartData.chart.series[i].data[j].labelx !== undefined) ? module._yumChartData.chart.series[i].data[j].labelx : "";
                        }
                    }
                    /* <--- END OF GRAPH SETTING CONVERSION ASSIGNMENTS ---> */
                    break;

                /*
                 * [图标种类] 柱状图 | 横向 | 平铺
                 */
                case "bar_horizon_sidebyside":

                    // 设l为series数量
                    var l = module._yumChartData.chart.series.length;

                    /* <--- START OF GRAPH SETTING CONVERSION ASSIGNMENTS ---> */
                    module._echartsChartData.title.text = (module._yumChartData.chart.title !== undefined) ? module._yumChartData.chart.title : "";
                    module._echartsChartData.xAxis.name = (module._yumChartData.chart.xtitle !== undefined) ? module._yumChartData.chart.xtitle : "";
                    module._echartsChartData.yAxis.name = (module._yumChartData.chart.ytitle !== undefined) ? module._yumChartData.chart.ytitle : "";
                    module._echartsChartData.tooltip = {
                        show: true,
                        trigger: "axis",
                        axisPointer: {type: "shadow"}
                    };
                    module._echartsChartData.yAxis.type = "category";
                    module._echartsChartData.yAxis.data = [];
                    module._echartsChartData.yAxis.axisLabel = {};
                    module._echartsChartData.yAxis.axisLabel.show = true;

                    for (var i = 0; i < l; i++) {
                        var n = module._yumChartData.chart.series[i].data.length;

                        module._echartsChartData.series[i] = {
                            name: "",
                            type: "",
                            data: []
                        };
                        module._echartsChartData.series[i].type = "bar";
                        module._echartsChartData.series[i].name = (module._yumChartData.chart.series[i].seriesName !== undefined) ?
                            module._yumChartData.chart.series[i].seriesName : "series" + i;

                        module._echartsChartData.legend.data[i] = {name: ""};
                        module._echartsChartData.legend.data[i].name = (module._yumChartData.chart.series[i].seriesName !== undefined) ?
                            module._yumChartData.chart.series[i].seriesName : "series" + i;

                        module._echartsChartData.series[i].label = {
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

                        module._echartsChartData.series[i].label.normal.show = (module._yumChartData.chart.showLabel !== undefined || "") ?
                            module._yumChartData.chart.showLabel : false;

                        for (var j = 0; j < n; j++) {
                            module._echartsChartData.series[i].data[j] = {
                                name: "",
                                value: 0
                            };
                            module._echartsChartData.series[i].data[j].name = (module._yumChartData.chart.series[i].data[j].labely !== undefined) ?
                                module._yumChartData.chart.series[i].data[j].labely : "";
                            module._echartsChartData.series[i].data[j].value = [];
                            module._echartsChartData.series[i].data[j].value = (module._yumChartData.chart.series[i].data[j].x !== undefined) ?
                                module._yumChartData.chart.series[i].data[j].x : "-";
                            module._echartsChartData.yAxis.data[j] = (module._yumChartData.chart.series[i].data[j].labely !== undefined) ?
                                module._yumChartData.chart.series[i].data[j].labely : "";
                        }
                    }
                    /* <--- END OF GRAPH SETTING CONVERSION ASSIGNMENTS ---> */
                    break;

                /*
                 * [图标种类] 柱状图 | 竖向 | 堆叠
                 */
                case "bar_vertical_stack":

                    // 设l为series数量
                    var l = module._yumChartData.chart.series.length;

                    /* <--- START OF GRAPH SETTING CONVERSION ASSIGNMENTS ---> */
                    module._echartsChartData.title.text = (module._yumChartData.chart.title !== undefined) ? module._yumChartData.chart.title : "";
                    module._echartsChartData.xAxis.name = (module._yumChartData.chart.xtitle !== undefined) ? module._yumChartData.chart.xtitle : "";
                    module._echartsChartData.yAxis.name = (module._yumChartData.chart.ytitle !== undefined) ? module._yumChartData.chart.ytitle : "";
                    module._echartsChartData.tooltip = {
                        show: true,
                        trigger: "axis",
                        axisPointer: {type: "shadow"}
                    };
                    module._echartsChartData.xAxis.type = "category";
                    module._echartsChartData.xAxis.axisLabel = {};
                    module._echartsChartData.xAxis.axisLabel.show = true;

                    for (var i = 0; i < l; i++) {
                        var n = module._yumChartData.chart.series[i].data.length;

                        module._echartsChartData.series[i] = {
                            name: "",
                            type: "",
                            data: []
                        };
                        module._echartsChartData.series[i].type = "bar";
                        module._echartsChartData.series[i].name = (module._yumChartData.chart.series[i].seriesName !== undefined) ?
                            module._yumChartData.chart.series[i].seriesName : "series" + i;
                        module._echartsChartData.series[i].stack = "stack";

                        module._echartsChartData.legend.data[i] = {name: ""};
                        module._echartsChartData.legend.data[i].name = (module._yumChartData.chart.series[i].seriesName !== undefined) ?
                            module._yumChartData.chart.series[i].seriesName : "series" + i;

                        module._echartsChartData.series[i].label = {
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

                        module._echartsChartData.series[i].label.normal.show = (module._yumChartData.chart.showLabel !== undefined || "") ?
                            module._yumChartData.chart.showLabel : false;

                        for (var j = 0; j < n; j++) {
                            module._echartsChartData.series[i].data[j] = {
                                name: "",
                                value: 0
                            };
                            module._echartsChartData.series[i].data[j].name = module._yumChartData.chart.series[i].data[j].labelx || "";
                            module._echartsChartData.series[i].data[j].value = [];
                            module._echartsChartData.series[i].data[j].value = (module._yumChartData.chart.series[i].data[j].y !== undefined) ? module._yumChartData.chart.series[i].data[j].y : "-";
                            module._echartsChartData.xAxis.data[j] = (module._yumChartData.chart.series[i].data[j].labelx !== undefined) ? module._yumChartData.chart.series[i].data[j].labelx : "";
                        }
                    }
                    /* <--- END OF GRAPH SETTING CONVERSION ASSIGNMENTS ---> */
                    break;

                /*
                 * [图标种类] 柱状图 | 横向 | 堆叠

                 */
                case "bar_horizon_stack":

                    // 设l为series数量
                    var l = module._yumChartData.chart.series.length;

                    /* <--- START OF GRAPH SETTING CONVERSION ASSIGNMENTS ---> */
                    module._echartsChartData.title.text = (module._yumChartData.chart.title !== undefined) ? module._yumChartData.chart.title : "";
                    module._echartsChartData.xAxis.name = (module._yumChartData.chart.xtitle !== undefined) ? module._yumChartData.chart.xtitle : "";
                    module._echartsChartData.yAxis.name = (module._yumChartData.chart.ytitle !== undefined) ? module._yumChartData.chart.ytitle : "";
                    module._echartsChartData.tooltip = {
                        show: true,
                        trigger: "axis",
                        axisPointer: {type: "shadow"}
                    };
                    module._echartsChartData.xAxis.type = "value";
                    module._echartsChartData.yAxis.type = "category";
                    module._echartsChartData.yAxis.axisLabel = {};
                    module._echartsChartData.yAxis.axisLabel.show = true;

                    for (var i = 0; i < l; i++) {
                        var n = module._yumChartData.chart.series[i].data.length;

                        module._echartsChartData.series[i] = {
                            name: "",
                            type: "",
                            data: []
                        };
                        module._echartsChartData.series[i].type = "bar";
                        module._echartsChartData.series[i].name = (module._yumChartData.chart.series[i].seriesName !== undefined) ?
                            module._yumChartData.chart.series[i].seriesName : "series" + i;

                        module._echartsChartData.series[i].stack = "stack";
                        module._echartsChartData.legend.data[i] = {name: ""};
                        module._echartsChartData.legend.data[i].name = (module._yumChartData.chart.series[i].seriesName !== undefined) ?
                            module._yumChartData.chart.series[i].seriesName : "series" + i;

                        module._echartsChartData.series[i].label = {
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

                        module._echartsChartData.series[i].label.normal.show = (module._yumChartData.chart.showLabel !== undefined || "") ?
                            module._yumChartData.chart.showLabel : false;

                        for (var j = 0; j < n; j++) {
                            module._echartsChartData.series[i].data[j] = {
                                name: "",
                                value: 0
                            };
                            module._echartsChartData.series[i].data[j].name = module._yumChartData.chart.series[i].data[j].labely || "";
                            module._echartsChartData.series[i].data[j].value = [];
                            module._echartsChartData.series[i].data[j].value = (module._yumChartData.chart.series[i].data[j].x !== undefined) ? module._yumChartData.chart.series[i].data[j].x : "-";
                            module._echartsChartData.yAxis.data[j] = (module._yumChartData.chart.series[i].data[j].labely !== undefined) ? module._yumChartData.chart.series[i].data[j].labely : "";
                        }
                    }
                    /* <--- END OF GRAPH SETTING CONVERSION ASSIGNMENTS ---> */
                    break;

                /*
                 * [图标种类] 饼状图

                 */
                case "pie":

                    // 设l为series数量
                    var l = module._yumChartData.chart.series.length;

                    module._yumChartData.chart.pieAlignment = (module._yumChartData.chart.pieAlignment !== undefined || "") ? module._yumChartData.chart.pieAlignment : "tiled";

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
                         * @private
                         * @returns {object}
                         */
                        getPercentPosPie: function () {
                            /* POLYGON ALIGNMENT % CALCULATIONS */
                            if (module._yumChartData.chart.pieAlignment == "polygon") {
                                if (l === 1) {
                                    return [{x: "50%", y: "50%"}];

                                } else if (l === 2) {
                                    return [{x: "33%", y: "50%"}, {
                                        x: "67%",
                                        y: "50%"
                                    }];

                                } else {
                                    var calcOffset = function (namVertices, radius) {
                                        var _n = (namVertices !== undefined) ? Math.round(namVertices) : 3;
                                        var _r = (radius !== undefined) ? radius : 300;
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
                                        if (module.__tempYumChartInfo__.height < module.__tempYumChartInfo__.width) {
                                            return module.__tempYumChartInfo__.height * 0.50;
                                        } else {
                                            return module.__tempYumChartInfo__.width * 0.50;
                                        }
                                    };

                                    var offsetArray = calcOffset(l, calcMainRadius());

                                    var posArray = [];
                                    var percentPosArray = [];

                                    for (var p = 0; p < l; p++) {
                                        posArray[p] = {
                                            x: (module.__tempYumChartInfo__.width + offsetArray[p].x) / 2,
                                            y: (module.__tempYumChartInfo__.height + offsetArray[p].y + 50) / 2
                                        };

                                        percentPosArray[p] = {
                                            x: (posArray[p].x / module.__tempYumChartInfo__.width * 100).toFixed(2) + "%",
                                            y: (posArray[p].y / module.__tempYumChartInfo__.height * 100).toFixed(2) + "%"
                                        };
                                    }

                                    return percentPosArray;
                                }

                                /* TILED ALIGNMENT % CALCULATIONS */
                            } else if (module._yumChartData.chart.pieAlignment == "tiled") {
                                if (l == 1) {
                                    return [[{x: "50%", y: "50%"}]];

                                } else if (l == 2) {
                                    return [[{x: "33%", y: "50%"}, {
                                        x: "67%",
                                        y: "50%"
                                    }]];

                                } else {
                                    var _posArray = [];
                                    var _nPlus1 = Math.ceil(Math.sqrt(l));
                                    var _extraNum = l - (Math.pow(Math.floor(Math.sqrt(l)), 2));

                                    var calcBasePxs = function () {
                                        var _c = 0;
                                        for (var y = 0; y < _nPlus1; y++) {
                                            _posArray[y] = [];
                                            for (var x = 0; x < _nPlus1; x++) {
                                                if (_extraNum === 0) {
                                                    _posArray[y][x] = {
                                                        y: ((module.__tempYumChartInfo__.height + 50) / (_nPlus1 + 1)) * (y + 1),
                                                        x: ((module.__tempYumChartInfo__.width) / (_nPlus1 + 1)) * (x + 1)
                                                    };

                                                } else if (x == _nPlus1 - 1 || y == _nPlus1 - 1) {
                                                    if (_c < _extraNum || _extraNum === 0) {
                                                        if (_extraNum <= (_nPlus1 - 1)) {
                                                            _posArray[y][x] = {
                                                                y: ((module.__tempYumChartInfo__.height + 50) / (_nPlus1)) * (y + 1),
                                                                x: (module.__tempYumChartInfo__.width / (_nPlus1 + 1)) * (x + 1)
                                                            };
                                                        } else {
                                                            _posArray[y][x] = {
                                                                y: ((module.__tempYumChartInfo__.height + 50) / (_nPlus1 + 0.9)) * (y + 1),
                                                                x: (module.__tempYumChartInfo__.width / (_nPlus1 + 1)) * (x + 1)
                                                            };
                                                        }
                                                        if (_extraNum !== 0) {
                                                            _c++;
                                                        }
                                                    } else {
                                                        _posArray[y][x] = null;
                                                    }

                                                } else {
                                                    if (_extraNum <= (_nPlus1 - 1)) {
                                                        _posArray[y][x] = {
                                                            y: ((module.__tempYumChartInfo__.height + 50) / (_nPlus1)) * (y + 1),
                                                            x: (module.__tempYumChartInfo__.width / (_nPlus1 + 1)) * (x + 1)
                                                        };
                                                    } else {
                                                        _posArray[y][x] = {
                                                            y: ((module.__tempYumChartInfo__.height + 50) / (_nPlus1 + 0.9)) * (y + 1),
                                                            x: (module.__tempYumChartInfo__.width / (_nPlus1 + 1)) * (x + 1)
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
                                                    r[i][j].x = (p[i][j].x / module.__tempYumChartInfo__.width * 100).toFixed(2) + "%";
                                                    r[i][j].y = (p[i][j].y / module.__tempYumChartInfo__.height * 100).toFixed(2) + "%";
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
                                    "WARNING: Invalid pie alignment!");
                            }
                        },

                        /**
                         * 计算各个饼图的大小（根据宽、高）
                         *
                         * @memberOf calcPos
                         * @function
                         * @private
                         * @returns {object}
                         */
                        calcEachPieRadius: function () {
                            if (module._yumChartData.chart.pieAlignment == "polygon") {
                                if (l === 1) {
                                    return "75%";
                                } else if (l === 2) {
                                    return "40%";
                                } else {
                                    if (module.__tempYumChartInfo__.height < module.__tempYumChartInfo__.width) {
                                        return (module.__tempYumChartInfo__.height * (1 / l) / module.__tempYumChartInfo__.height) * 100 + "%";

                                    } else {
                                        return (module.__tempYumChartInfo__.width * (1 / l) / module.__tempYumChartInfo__.width) * 100 + "%";
                                    }
                                }
                            } else if (module._yumChartData.chart.pieAlignment == "tiled") {
                                if (l === 1) {
                                    return "75%";
                                } else if (l === 2) {
                                    return "40%";
                                } else {
                                    var _nPlus1 = Math.ceil(Math.sqrt(l));
                                    if (module.__tempYumChartInfo__.height < module.__tempYumChartInfo__.width) {
                                        return ((module.__tempYumChartInfo__.height / (_nPlus1 + 1)) / (module.__tempYumChartInfo__.height) * 100 + "%");
                                    } else {
                                        return ((module.__tempYumChartInfo__.width / (_nPlus1 + 1)) / (module.__tempYumChartInfo__.width) * 100 + "%");
                                    }
                                }
                            } else {

                            }
                        }
                    };

                    var percentPos = calcPos.getPercentPosPie();

                    // 转化多维度array至一维;
                    if (module._yumChartData.chart.pieAlignment == "polygon") {
                        var tempPPA = percentPos;

                    } else {
                        var tempPPA = [];
                        var TPPAI = 0;

                        for (var a = 0; a < percentPos.length; a++) {
                            for (var b = 0; b < percentPos[a].length; b++) {
                                tempPPA[TPPAI] = percentPos[a][b];
                                TPPAI++;
                            }
                        }
                    }

                    /* <--- START OF GRAPH SETTING CONVERSION ASSIGNMENTS ---> */
                    module._echartsChartData.title.text = (module._yumChartData.chart.title !== undefined) ? module._yumChartData.chart.title : "";
                    module._echartsChartData.tooltip = {show: true, trigger: "item"};

                    delete module._echartsChartData.xAxis;
                    delete module._echartsChartData.yAxis;

                    for (var i = 0; i < l; i++) {
                        module._echartsChartData.series[i] = {
                            name: "",
                            type: "",
                            data: []
                        };
                        module._echartsChartData.series[i].type = "pie";
                        module._echartsChartData.series[i].name = module._yumChartData.chart.series[i].seriesName || "series" + i;
                        module._echartsChartData.series[i].radius = "50%";

                        module._echartsChartData.legend.data[i] = {name: ""};
                        module._echartsChartData.legend.data[i].name = module._yumChartData.chart.series[i].seriesName || "series" + i;

                        module._echartsChartData.series[i].radius = calcPos.calcEachPieRadius();

                        module._echartsChartData.series[i].avoidLabelOverlap = true;
                        module._echartsChartData.series[i].label = {
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

                        module._echartsChartData.series[i].labelLine = {
                            normal: {
                                show: true
                            }
                        };

                        module._echartsChartData.series[i].label.normal.show = (module._yumChartData.chart.showLabel !== undefined || "") ?
                            module._yumChartData.chart.showLabel : false;
                        module._echartsChartData.series[i].labelLine.normal.show = (module._yumChartData.chart.showLabel !== undefined || "") ?
                            module._yumChartData.chart.showLabel : false;

                        module._echartsChartData.series[i].center = [];
                        module._echartsChartData.series[i].center[0] = tempPPA[i].x;
                        module._echartsChartData.series[i].center[1] = tempPPA[i].y;

                        var n = module._yumChartData.chart.series[i].data.length;
                        for (var j = 0; j < n; j++) {
                            module._echartsChartData.series[i].data[j] = {
                                name: "",
                                value: ""
                            };
                            module._echartsChartData.series[i].data[j].name = module._yumChartData.chart.series[i].data[j].labelx || "";
                            module._echartsChartData.series[i].data[j].value = (module._yumChartData.chart.series[i].data[j].x !== undefined) ? module._yumChartData.chart.series[i].data[j].x : "-";
                        }
                    }

                    module._echartsChartData.toolbox.feature.magicType.show = false;
                    /* <--- END OF GRAPH SETTING CONVERSION ASSIGNMENTS ---> */
                    break;

                /*
                 * 如果图标种类不存在，提示错误
                 */
                default:
                    console.log("[YumStone.YumChart.__convertData__]" +
                        " WARNING: Invalid graph type!");
                    break;
            }
        } catch (err) {
            console.log("[YumStone.YumChart.__convertData__] ERROR: " + err.message);
        }
    }

    // PRIVATE METHOD DECLARATION: END //

    // GET AND SET METHOD DECLARATION: START //

    /**
     * Sets YumChartData to supplied data.
     * Must be in correct JSON format, of DocType YumChartData
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
                        module._yumChartData = data;
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
                        module._yumChartData = data;
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
     * Returns YumChartData
     *
     * @public
     * @memberOf YumStone.YumChart
     * @returns {Object}
     */
    module.getYumChartData = function () {
        return module._yumChartData;
    };

    /**
     * Resets yumChartData to null
     *
     * @public
     * @memberOf YumStone.YumChart
     */
    module.resetYumChartData = function () {
        module._yumChartData = null;
    };

    /**
     * Sets echartsChartData using private function __convertData__.
     *
     * Note: This method DOES NOT NEED data to be supplied.
     * Call YumStone.YumChart.setYumChartData first.
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
            module._echartsChartData = data;
        } else {
            if (module.checkType.isNull(module._yumChartData)) {
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
     * Returns EchartsChartData
     *
     * @public
     * @memberOf YumStone.YumChart
     */
    module.getEchartsChartData = function () {
        return module._echartsChartData;
    };

    /**
     * Resets EchartsChartData to the default value
     *
     * @public
     * @memberOf YumStone.YumChart
     */
    module.resetEchartsChartData = function () {
        // Sets echartsChartData to default value
        module._echartsChartData = module._defaultEchartsChartData;
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
 *          (get current or define new) module.__tempYumChartInfo__
 *          _yumChartInstance
 *          _yumChartInstanceData
 *      METHODS
 *          __generateYumChart__
 *          getYumChartInstance
 *          getYumChartInstanceData
 *          drawChart
 *          deleteChart
 *
 * @name YumStone.YumChart
 * @namespace YumStone.YumChart
 */
YumStone.YumChart = (function (module) {

    // YUMCHART INSTANCE FIELD DECLARATIONS: START //

    /**
     * Sets __tempYumChartInfo__ to existing or defines new.
     *
     * @memberOf YumStone.YumChart
     * @deprecated Not intended to be modified by user
     * @type {object}
     */
    module.__tempYumChartInfo__ = module.__tempYumChartInfo__ || {
            width: 400,
            height: 300,
            data: null
        };

    /**
     * Defines yumChartInstance field. This (temporarily) stores a YumChart
     * instance.
     *
     * @public
     * @memberOf YumStone.YumChart
     * @deprecated Use the GET and SET methods instead.
     * @type {object}
     */
    module._yumChartInstance = null;

    /**
     * Defines yumChartInstanceData field. This (temporarily) stores a
     * YumChart Instance's Chart Data.
     *
     * @public
     * @memberOf YumStone.YumChart
     * @deprecated Use the GET and SET methods instead.
     * @type {object}
     */
    module._yumChartInstanceData = null;

    // YUMCHART INSTANCE FIELD DECLARATIONS: END //


    // YUMCHART INSTANCE PRIVATE METHOD DECLARATIONS: START //

    /**
     * Calls Baidu ECharts init function to draw chart inside given container
     *
     * @private
     * @memberOf YumStone.YumChart
     * @param {!String} containerElementId ID of container DIV element
     */
    function __generateYumChart__(containerElementId) {
        containerElementId = containerElementId || null;

        if (!module.checkType.isNull(containerElementId) && module.checkType.isString(containerElementId)) {
            try {
                module._yumChartInstance = echarts.init(document.getElementById(containerElementId));
            } catch (err) {
                console.log("[YumStone.YumChart.__generateYumChart__]" +
                    " ERROR: " + err.message);
            }
        } else {
            console.log("[YumStone.YumChart.__generateYumChart__] WARNING:" +
                " Invalid containerElementId. Must be a string.");
        }
    }

    // YUMCHART INSTANCE PRIVATE METHOD DECLARATIONS: END //


    // YUMCHART INSTANCE PUBLIC METHOD DECLARATIONS: START //

    /**
     * Returns YumChartInstance contained in specified DIV element and stores
     * it to
     * _yumChartInstance
     *
     * @public
     * @memberOf YumStone.YumChart
     * @param {!String} containerElementId
     * @returns {Object}
     */
    module.getYumChartInstance = function (containerElementId) {
        containerElementId = containerElementId || null;

        if (!module.checkType.isNull(containerElementId) && module.checkType.isString(containerElementId)) {
            try {
                module._yumChartInstance = echarts.getInstanceByDom(document.getElementById(containerElementId));
                return module._yumChartInstance;
            } catch (err) {
                console.log("[YumStone.YumChart.getYumChartInstance] ERROR: " +
                    err.message);
            }
        } else {
            console.log("[YumStone.YumChart.getYumChartInstance] WARNING:" +
                " containerElementId must be a valid string!");
        }

    };

    /**
     * Returns YumChartInstance's data contained in specified DIV element
     * (eCharts format)
     *
     * @public
     * @memberOf YumStone.YumChart
     * @param {!String} containerElementId
     * @returns {Object}
     */
    module.getYumChartInstanceData = function (containerElementId) {
        containerElementId = containerElementId || null;

        if (!module.checkType.isNull(containerElementId) && module.checkType.isString(containerElementId)) {
            try {
                return module.getYumChartInstance(containerElementId).getOption();
            } catch (err) {
                console.log("[YumStone.YumChart.getYumChartInstanceData] ERROR: " +
                    err.message);
            }

        } else {
            console.log("[YumStone.YumChart.getYumChartInstanceData] WARNING:" +
                " containerElementId must be a valid string!");
        }

    };

    /**
     * Sets the data of _yumChartInstance
     *
     * @public
     * @memberOf YumStone.YumChart
     * @param {!String|!Object} yumChartData
     */
    module.setYumChartInstanceData = function (yumChartData) {
        yumChartData = yumChartData || null;

        if (!module.checkType.isNull(yumChartData) &&
            module.checkType.isString(yumChartData) ||
            module.checkType.isObject(yumChartData)) {
            try {
                module.setYumChartData(yumChartData);
                module.setEchartsChartData();
                module._yumChartInstance.showLoading();

                module._yumChartInstance.setOption(module.getEchartsChartData());
                window.onresize = module._yumChartInstance.resize;
                module._yumChartInstance.hideLoading();
            } catch (err) {
                console.log("[YumStone.YumChart.getYumChartInstanceData] ERROR: " +
                    err.message);
            }

        } else {
            console.log("[YumStone.YumChart.getYumChartInstanceData] WARNING:" +
                " containerElementId must be a valid string!");
        }

    };

    /**
     * YumChart's Main Method. This method calls several other methods and
     * draws graph into given DIV element using eCharts.
     *
     * @public
     * @memberOf YumStone.YumChart
     * @param {!String} containerElementId
     * @param {!String|!Object} yumChartData
     */
    module.drawChart = function (containerElementId, yumChartData) {
        containerElementId = containerElementId || null;
        yumChartData = yumChartData || null;

        module.resetYumChartData();
        module.resetEchartsChartData();

        if (!module.checkType.isNull(containerElementId) && !module.checkType.isNull(yumChartData) &&
            module.checkType.isString(containerElementId) &&
            (module.checkType.isObject(yumChartData) ||
            module.checkType.isString(yumChartData))) {

            try {
                __generateYumChart__(containerElementId);
                module.setYumChartInstanceData(yumChartData);

            } catch (err) {
                console.log("[YumStone.YumChart.drawChart] ERROR: " +
                    err.message);
            }
        } else {
            console.log("[YumStone.YumChart.drawChart] WARNING: Invalid" +
                " parameter(s). containerElementId must be string and" +
                " yumChartData must be either String or Object");
        }
    };

    /**
     * Disposes a YumChartInstance contained in a given DIV element.
     *
     * @public
     * @memberOf YumStone.YumChart
     * @param {!String} containerElementId
     */
    module.deleteChart = function (containerElementId) {
        containerElementId = containerElementId || null;

        if (!module.checkType.isNull(containerElementId) &&
            module.checkType.isString(containerElementId)) {

            try {
                module.getYumChartInstance(containerElementId);
                module._yumChartInstance.dispose();
            } catch (err) {
                console.log("[YumStone.YumChart.deleteChart] ERROR: " +
                    err.message);
            }

        } else {
            console.log("[YumStone.YumChart.deleteChart] WARNING: Invalid" +
                " containerElementId!");
        }

    };

    // YUMCHART INSTANCE PUBLIC METHOD DECLARATIONS: END //

    /**
     * Returns module, which contains a few of YumChart's methods and fields.
     * This explicitly exposes functions and fields to the public so that
     * they can be called or uses.
     */
    return module;
})(YumStone.YumChart || {});

/**
 * Defines YumChart's Chart Instance Misc Fields and Methods
 *
 * @name YumStone.YumChart
 * @namespace YumChart Misc Methods
 */
YumStone.YumChart = (function (module) {

    /**
     * Defines misc object to contain Misc Methods
     *
     * @public
     * @memberOf YumStone.YumChart
     * @type {object}
     */
    module.misc = {};

    // YUMCHART INSTANCE MISC METHODS: START //

    /**
     * Toggles whether the toolbox should be shown.
     *
     * @public
     * @function
     * @memberOf YumStone.YumChart.misc
     * @param {!String} containerElementId
     * @param {Boolean} bool
     */
    module.misc.toggleToolbox = function (containerElementId, bool) {
        containerElementId = (module.checkType.isString(containerElementId)) ?
            containerElementId: null;
        bool = (module.checkType.isBool(bool))? bool : false;

        if (!module.checkType.isNull(containerElementId)) {
            try {
                module.getYumChartInstance(containerElementId);
                module.setEchartsChartData(module.getYumChartInstanceData(
                    containerElementId));
                module._echartsChartData.toolbox.show = bool;
                module._yumChartInstance.setOption(module._echartsChartData);
            } catch (err) {
                console.log("[YumStone.YumChart.misc.toggleToolbox] ERROR: " +
                    err.message);
            }
        } else {
            console.log("[YumStone.YumChart.misc.toggleToolbox] WARNING:" +
                " containerElementId must be a valid string!");
        }
    };

    /**
     * Toggles whether the title should be shown.
     *
     * @public
     * @function
     * @memberOf YumStone.YumChart.misc
     * @param {!String} containerElementId
     * @param {Boolean} bool
     */
    module.misc.toggleTitle = function (containerElementId, bool) {
        containerElementId = (module.checkType.isString(containerElementId)) ?
            containerElementId: null;
        bool = (module.checkType.isBool(bool))? bool : false;

        if (!module.checkType.isNull(containerElementId)) {
            try {
                module.getYumChartInstance(containerElementId);
                module.setEchartsChartData(module.getYumChartInstanceData(
                    containerElementId));
                module._echartsChartData.title[0].show = bool;
                module._yumChartInstance.setOption(module._echartsChartData);
            } catch (err) {
                console.log("[YumStone.YumChart.misc.toggleTitle] ERROR: " +
                    err.message);
            }
        } else {
            console.log("[YumStone.YumChart.misc.toggleTitle] WARNING:" +
                " containerElementId must be a valid string!");
        }
    };

    /**
     * Changes the size of the title to given size.
     *
     * @public
     * @function
     * @memberOf YumStone.YumChart.misc
     * @param {!String} containerElementId
     * @param {!Number} newSize
     */
    module.misc.changeTitleFontSize = function (containerElementId, newSize) {
        containerElementId = (module.checkType.isString(containerElementId)) ?
            containerElementId: null;
        newSize = (module.checkType.isNumber(newSize))? newSize : null;

        if (!module.checkType.isNull(containerElementId) &&
            !module.checkType.isNull(newSize)) {
            try {
                module.getYumChartInstance(containerElementId);
                module.setEchartsChartData(module.getYumChartInstanceData(
                    containerElementId));
                module._echartsChartData.title[0].textStyle.fontSize = newSize;
                module._yumChartInstance.setOption(module._echartsChartData);
            } catch (err) {
                console.log("[YumStone.YumChart.misc.changeTitleFontSize] ERROR: " +
                    err.message);
            }
        } else {
            console.log("[YumStone.YumChart.misc.changeTitleFontSize] WARNING:" +
                " containerElementId must be a valid string!");
        }
    };

    /**
     * Toggles whether the xAxisLine should be shown.
     *
     * @public
     * @function
     * @memberOf YumStone.YumChart.misc
     * @param {!String} containerElementId
     * @param {Boolean} bool
     */
    module.misc.toggleXAxisLine = function (containerElementId, bool) {
        containerElementId = (module.checkType.isString(containerElementId)) ?
            containerElementId: null;
        bool = (module.checkType.isBool(bool))? bool : false;

        if (!module.checkType.isNull(containerElementId)) {
            try {
                module.getYumChartInstance(containerElementId);
                module.setEchartsChartData(module.getYumChartInstanceData(
                    containerElementId));
                module._echartsChartData.xAxis.axisLine.show = bool;
                module._yumChartInstance.setOption(module._echartsChartData);
            } catch (err) {
                console.log("[YumStone.YumChart.misc.toggleXAxisLine] ERROR: " +
                    err.message);
            }
        } else {
            console.log("[YumStone.YumChart.misc.toggleXAxisLine] WARNING:" +
                " containerElementId must be a valid string!");
        }
    };

    /**
     * Toggles whether the yAxisLine should be shown.
     *
     * @public
     * @function
     * @memberOf YumStone.YumChart.misc
     * @param {!String} containerElementId
     * @param {Boolean} bool
     */
    module.misc.toggleYAxisLine = function (containerElementId, bool) {
        containerElementId = (module.checkType.isString(containerElementId)) ?
            containerElementId: null;
        bool = (module.checkType.isBool(bool))? bool : false;

        if (!module.checkType.isNull(containerElementId)) {
            try {
                module.getYumChartInstance(containerElementId);
                module.setEchartsChartData(module.getYumChartInstanceData(
                    containerElementId));
                module._echartsChartData.yAxis.axisLine.show = bool;
                module._yumChartInstance.setOption(module._echartsChartData);
            } catch (err) {
                console.log("[YumStone.YumChart.misc.toggleYAxisLine] ERROR: " +
                    err.message);
            }
        } else {
            console.log("[YumStone.YumChart.misc.toggleYAxisLine] WARNING:" +
                " containerElementId must be a valid string!");
        }
    };

    /**
     * Changes the Font Size of the x-Axis's title
     *
     * @public
     * @function
     * @memberOf YumStone.YumChart.misc
     * @param {!String} containerElementId
     * @param {!Number} newSize
     */
    module.misc.changeXAxisTitleFontSize = function (containerElementId, newSize) {
        containerElementId = (module.checkType.isString(containerElementId)) ?
            containerElementId: null;
        newSize = (module.checkType.isNumber(newSize))? newSize : null;

        if (!module.checkType.isNull(containerElementId) &&
            !module.checkType.isNull(newSize)) {
            try {
                module.getYumChartInstance(containerElementId);
                module.setEchartsChartData(module.getYumChartInstanceData(
                    containerElementId));
                module._echartsChartData.xAxis[0].nameTextStyle.fontSize = newSize;
                module._yumChartInstance.setOption(module._echartsChartData);
            } catch (err) {
                console.log("[YumStone.YumChart.misc.changeXAxisTitleFontSize] ERROR: " +
                    err.message);
            }
        } else {
            console.log("[YumStone.YumChart.misc.changeXAxisTitleFontSize] WARNING:" +
                " containerElementId must be a valid string!");
        }
    };

    /**
     * Changes the Font Size of the y-Axis's title
     *
     * @public
     * @function
     * @memberOf YumStone.YumChart.misc
     * @param {!String} containerElementId
     * @param {!Number} newSize
     */
    module.misc.changeYAxisTitleFontSize = function (containerElementId, newSize) {
        containerElementId = (module.checkType.isString(containerElementId)) ?
            containerElementId: null;
        newSize = (module.checkType.isNumber(newSize))? newSize : null;

        if (!module.checkType.isNull(containerElementId) &&
            !module.checkType.isNull(newSize)) {
            try {
                module.getYumChartInstance(containerElementId);
                module.setEchartsChartData(module.getYumChartInstanceData(
                    containerElementId));
                module._echartsChartData.yAxis[0].nameTextStyle.fontSize = newSize;
                module._yumChartInstance.setOption(module._echartsChartData);
            } catch (err) {
                console.log("[YumStone.YumChart.misc.changeYAxisTitleFontSize] ERROR: " +
                    err.message);
            }
        } else {
            console.log("[YumStone.YumChart.misc.changeYAxisTitleFontSize] WARNING:" +
                " containerElementId must be a valid string!");
        }
    };

    /**
     * Toggles whether to show the Labels or not.
     *
     * @public
     * @function
     * @memberOf YumStone.YumChart.misc
     * @param {!String} containerElementId
     * @param {Boolean} bool
     */
    module.misc.toggleLabel = function (containerElementId, bool) {
        containerElementId = (module.checkType.isString(containerElementId)) ?
            containerElementId: null;
        bool = (module.checkType.isBool(bool))? bool : false;

        if (!module.checkType.isNull(containerElementId)) {
            try {
                module.getYumChartInstance(containerElementId);
                module.setEchartsChartData(module.getYumChartInstanceData(
                    containerElementId));

                for (var i = 0; i < module._echartsChartData.series.length; i++) {
                    module._echartsChartData.series[i].label.normal.show = bool;
                }

                module._yumChartInstance.setOption(module._echartsChartData);
            } catch (err) {
                console.log("[YumStone.YumChart.misc.toggleLabel] ERROR: " +
                    err.message);
            }
        } else {
            console.log("[YumStone.YumChart.misc.toggleLabel] WARNING:" +
                " containerElementId must be a valid string!");
        }
    };

    /**
     * Toggles whether to show the Label Lines or not.
     * !NOTE: This ONLY works for Pie Charts!
     *
     * @public
     * @function
     * @memberOf YumStone.YumChart.misc
     * @param {!String} containerElementId
     * @param {Boolean} bool
     */
    module.misc.toggleLabelLine = function (containerElementId, bool) {
        containerElementId = (module.checkType.isString(containerElementId)) ?
            containerElementId: null;
        bool = (module.checkType.isBool(bool))? bool : false;

        if (!module.checkType.isNull(containerElementId)) {
            try {
                module.getYumChartInstance(containerElementId);
                module.setEchartsChartData(module.getYumChartInstanceData(
                    containerElementId));

                for (var i = 0; i < module._echartsChartData.series.length; i++) {
                    module._echartsChartData.series[i].labelLine.normal.show = bool;
                }

                module._yumChartInstance.setOption(module._echartsChartData);
            } catch (err) {
                console.log("[YumStone.YumChart.misc.toggleLabelLine] ERROR: " +
                    err.message);
            }
        } else {
            console.log("[YumStone.YumChart.misc.toggleLabelLine] WARNING:" +
                " containerElementId must be a valid string!");
        }
    };

    /**
     * Changes color scheme of the chart.
     *
     * @public
     * @function
     * @memberOf YumStone.YumChart.misc
     * @param {!String} containerElementId
     * @param {!Array} colorArray
     */
    module.misc.changeChartColors = function (containerElementId, colorArray) {
        containerElementId = (module.checkType.isString(containerElementId)) ?
            containerElementId: null;
        colorArray = (module.checkType.isArray(colorArray)) ? colorArray: null;

        if (!module.checkType.isNull(containerElementId) &&
            !module.checkType.isNull(colorArray)) {
            try {
                module.getYumChartInstance(containerElementId);
                module.setEchartsChartData(module.getYumChartInstanceData(
                    containerElementId));
                module._echartsChartData.color = colorArray;
                module._yumChartInstance.setOption(module._echartsChartData);
            } catch (err) {
                console.log("[YumStone.YumChart.misc.changeChartColors] ERROR: " +
                    err.message);
            }
        } else {
            console.log("[YumStone.YumChart.misc.changeChartColors] WARNING:" +
                " containerElementId must be a valid string!");
        }
    };

    /**
     * Changes the font size of each Label text (label on data)
     *
     * @param {!String} containerElementId
     * @param {!Number} newSize
     */
    module.misc.changeLabelFontSize = function (containerElementId, newSize) {
        containerElementId = (module.checkType.isString(containerElementId)) ?
            containerElementId: null;
        newSize = (module.checkType.isNumber(newSize))? newSize : null;

        if (!module.checkType.isNull(containerElementId) &&
            !module.checkType.isNull(newSize)) {
            try {
                module.getYumChartInstance(containerElementId);
                module.setEchartsChartData(module.getYumChartInstanceData(
                    containerElementId));

                for (var i = 0; i < module._echartsChartData.series.length; i++) {
                    module._echartsChartData.series[i].label.normal.textStyle = { };
                    module._echartsChartData.series[i].label.normal.textStyle.fontSize = newSize;
                }

                module._yumChartInstance.setOption(module._echartsChartData);
            } catch (err) {
                console.log("[YumStone.YumChart.misc.changeLabelFontSize] ERROR: " +
                    err.message);
            }
        } else {
            console.log("[YumStone.YumChart.misc.changeLabelFontSize] WARNING:" +
                " containerElementId must be a valid string!");
        }
    };

    // YUMCHART INSTANCE MISC METHODS: END //

    /**
     * Returns module, which contains a few of YumChart's methods and fields.
     * This explicitly exposes functions and fields to the public so that
     * they can be called or uses.
     */
    return module;
})(YumStone.YumChart || {});
