/* <----- START OF YUMCHART PLUGIN -----> */

/**
 * YumChart.js 开发代码 (带注释)
 *
 * @fileOverview YumChart 是一个以百度eCharts和jQuery插件将YumChartData格式JSON文件在网页上渲染出图标的插件。
 * @author 易石软件
 * @copyright 易石软件 2016
 * @version 1.0.0
 */

/**
 * YumChart需要jQuery以及eCharts，其中各插件需要在版本3.0以上。如需参考jQuery以及echarts的资料，请访问以下网站:
 * @requires jQuery 3
 * @requires eCharts 3
 * @see http://echarts.baidu.com/
 * @see http://www.jquery.com/
 */

/**
 * YumChart 插件使用yumChart来避免命名空间中命名冲突。
 *
 * @namespace
 * @type {object}
 */

/*
 * 插件采用闭包方法
 */
var yumChart = (function () {
    //"use strict"; /* 在PC端上可以以严格模式运行 */


    /**
     * 版本号
     *
     * @private
     * @memberOf yumChart
     * @type {object}
     * @property {number} Major version number
     * @property {number} Minor version number
     * @property {number} Patch version number
     */
    var VERSION = {
        /**
         * Major Version Number - 更新此版本号如果采用其他图标渲染插件
         *
         * @constant
         */
        MAJOR: 1,
        /**
         * Minor Version Number - 更新此版本号如果有重要更新
         *
         * @constant
         */
        MINOR: 0,
        /**
         * Patch Version Number - 更新此版本号如果有补丁或少许改动
         *
         * @constant
         */
        PATCH: 0
    };

    /**
     * 默认值
     *
     * @private
     * @memberOf yumChart
     * @type {object}
     */
    var chartData;

    /**
     * 默认 baiduGraphSettings 设置
     *
     * @private
     * @memberOf yumChart
     * @type {object}
     */
    var baiduGraphSettings = {
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
        }],

        /**
         * 重置baiduGraphSettings至初始值
         *
         * @function
         * @property {object}
         */
        reset: function () {
            /**
             * Toolbox
             *
             * @type {object}
             */
            this.toolbox = {
                "show": true,
                "feature": {
                    "magicType": {"show": true, "type": ['stack', 'tiled']},
                    "saveAsImage": {"show": true}
                }
            };

            /**
             * Title
             *
             * @type {object}
             */
            this.title = {
                "show": true,
                "text": "",
                "left": "center",
                "textStyle": {
                    "color": "#0055B6",
                    //"fontFamily": "Roboto",
                    "fontWeight": "normal",
                    "fontSize": 24
                }
            };

            /**
             * Legend
             *
             * @type {object}
             */
            this.legend = {
                "data": [{
                    "name": ""
                }],
                "top": "5%",
                "right": "7%"
            };

            /**
             * xAxis
             *
             * @type {object}
             */
            this.xAxis = {
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
            };

            /**
             * yAxis
             *
             * @type {object}
             */
            this.yAxis = {
                "name": "",
                "axisLine": {
                    "show": true
                },
                "nameLocation": "middle",
                "nameTextStyle": {
                    "fontSize": 16
                },
                "nameRotate": 90,
                "nameGap": 50,
                "type": "value",
                "data": []
            };

            /**
             * Series (Contains data)
             *
             * @type {object}
             */
            this.series = [{
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
            }];
        }
    };

    /*
     * 将指定方法以及属性向外部暴露
     */
    return {

        /**
         * YumChart 实例存储（暂时性）
         *
         * @public
         * @default undefined
         * @memberOf yumChart
         * @type {object}
         */
        graphInstance: undefined,

        /**
         * YumChart 实例宽度（暂时性）
         *
         * @public
         * @memberOf yumChart
         * @type {number}
         */
        width: 0,

        /**
         *  YumChart 实例高度（暂时性）
         *
         * @public
         * @memberOf yumChart
         * @type {number}
         */
        height: 0,

        /**
         * <bb>GET 方法: 返回YumChart版本号
         *
         * @public
         * @function
         * @memberOf yumChart
         * @returns {string}
         */
        getVersion: function () {
            return VERSION.MAJOR + "." + VERSION.MINOR + "." + VERSION.PATCH;
        },

        /**
         * SET 方法: 调用eCharts方法设置（或更新）当前实例数据及样式 DEPRECATED
         *
         * @public
         * @function
         * @memberOf yumChart
         * @deprecated 请使用 yumChart.drawGraph()
         */
        _setGraphSettings: function () {
            try {
                // 显示加载中
                yumChart.graphInstance.showLoading();

                // 调整标题字体大小
                baiduGraphSettings.title.textStyle.fontSize = Math.ceil((22/1024) * window.innerHeight);

                // 调用eCharts设置数据方法
                yumChart.graphInstance.setOption(baiduGraphSettings);

                // 将eCharts.resize方法与窗口resize事件绑定
                window.onresize = yumChart.graphInstance.resize;

                // 显示加载结束
                yumChart.graphInstance.hideLoading();
            } catch (e) {
                console.log("[yumChart] " + e.message);
            }
            return yumChart;
        },

        /**
         * 调整当前实例标题大小
         *
         * @public
         * @function
         * @memberOf yumChart
         * @example
         * $(function() {
         *     $(window).resize(function() {
         *         setTimeout(function() {
         *              yumChart.resizeTitle();
         *         }, 200)
         *     });
         * })
         */
        resizeTitle: function (containerDivID) {
            var c = (containerDivID !== undefined && containerDivID.substr(0, 1) === "#") ? containerDivID: console.log("[yumChart] resizeTitle: Invalid containerDivID!");

            try {
                baiduGraphSettings = yumChart.getYumChartInstanceOptions(c);

                var _n = c.substr(1, c.length);
                _n = _n.replace(/\W/g, "_");

                if ($(window).width() > $(window).height()) {
                    baiduGraphSettings.title[0].textStyle.fontSize = Math.ceil((32/1080) * yumChart["height_" + _n]); // h
                } else {
                    baiduGraphSettings.title[0].textStyle.fontSize = Math.ceil((24/1080) * yumChart["width_" + _n]); // w
                }
                yumChart.graphInstance.setOption(baiduGraphSettings);
            } catch (e) {
                console.log(e);
            }
        },

        /**
         * GET 方法: 返回当前baiduGraphSettings.
         *
         * @public
         * @function
         * @memberOf yumChart
         * @returns {object}
         */
        getBaiduGraphSettings: function () {
            return baiduGraphSettings;
        },

        /**
         * 转换YumChartData格式JSON数据到baidu eCharts格式. DEPRECATED
         *
         * @public
         * @function
         * @memberOf yumChart
         * @deprecated 请使用 yumChart.drawGraph()
         */
        _convertData: function () {
            try {
                /**
                 * 目前支持的图标种类
                 *
                 * [名称] 字符串                      [描述]
                 * =========================================================================
                 * polyline                         折线图
                 * pie		                        饼图
                 * bar_vertical_sidebyside		    柱状图，竖直显示，相同x坐标不同序列的数据并列显示
                 * bar_horizon_sidebyside           柱状图，水平显示，相同x坐标不同序列的数据并列显示
                 * bar_vertical_stack               柱状图，竖直显示，相同x坐标不同序列的数据堆叠显示
                 * bar_horizon_stack                柱状图，水平显示，相同x坐标不同序列的数据堆叠显示
                 */

                switch (chartData.chart.type) {
                    /*
                     * [图标种类] 折线图 | Polyline
                     */
                    case "polyline":
                        // 重置baiduGraphSettings以防止意外数据重合
                        baiduGraphSettings.reset();

                        // 设l为series数量
                        var l = chartData.chart.series.length;

                        /* <--- START OF GRAPH SETTING CONVERSION ASSIGNMENTS ---> */
                        baiduGraphSettings.title.text = (chartData.chart.title !== undefined) ? chartData.chart.title : "";
                        baiduGraphSettings.xAxis.name = (chartData.chart.xtitle !== undefined) ? chartData.chart.xtitle : "";
                        baiduGraphSettings.yAxis.name = (chartData.chart.ytitle !== undefined) ? chartData.chart.ytitle : "";
                        baiduGraphSettings.tooltip = {show: true, trigger: "axis"};

                        for (var i = 0; i < l; i++) {
                            var n = chartData.chart.series[i].data.length;

                            baiduGraphSettings.series[i] = {name: "", type: "", data: []};
                            baiduGraphSettings.series[i].type = "line";
                            baiduGraphSettings.series[i].name = (chartData.chart.series[i].seriesName !== undefined) ?
                                chartData.chart.series[i].seriesName : "series" + i;
                            baiduGraphSettings.legend.data[i] = {name: ""};
                            baiduGraphSettings.legend.data[i].name = (chartData.chart.series[i].seriesName !== undefined) ?
                                chartData.chart.series[i].seriesName : "series" + i;
                            baiduGraphSettings.series[i].label = {
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

                            baiduGraphSettings.series[i].label.normal.show = (chartData.chart.showLabel !== undefined || "") ?
                                chartData.chart.showLabel : false;

                            for (var j = 0; j < n; j++) {
                                baiduGraphSettings.series[i].data[j] = {name: "", value: 0};
                                baiduGraphSettings.series[i].data[j].name = chartData.chart.series[i].data[j].labelx || "";
                                baiduGraphSettings.series[i].data[j].value = [];
                                baiduGraphSettings.series[i].data[j].value[0] = (chartData.chart.series[i].data[j].x !== undefined) ? chartData.chart.series[i].data[j].x : "-";
                                baiduGraphSettings.series[i].data[j].value[1] = (chartData.chart.series[i].data[j].y !== undefined) ? chartData.chart.series[i].data[j].y : "-";
                            }
                        }
                        /* <--- END OF GRAPH SETTING CONVERSION ASSIGNMENTS ---> */
                        break;

                    /*
                     * [图标种类] 柱状图 | 竖向 | 平铺
                     */
                    case "bar_vertical_sidebyside":
                        // 重置baiduGraphSettings以防止意外数据重合
                        baiduGraphSettings.reset();

                        // 设l为series数量
                        var l = chartData.chart.series.length;

                        /* <--- START OF GRAPH SETTING CONVERSION ASSIGNMENTS ---> */
                        baiduGraphSettings.title.text = (chartData.chart.title !== undefined) ? chartData.chart.title : "";
                        baiduGraphSettings.xAxis.name = (chartData.chart.xtitle !== undefined) ? chartData.chart.xtitle : "";
                        baiduGraphSettings.yAxis.name = (chartData.chart.ytitle !== undefined) ? chartData.chart.ytitle : "";
                        baiduGraphSettings.tooltip = {show: true, trigger: "axis", axisPointer: {type: "shadow"}};
                        baiduGraphSettings.xAxis.type = "category";
                        baiduGraphSettings.xAxis.axisLabel = {};
                        baiduGraphSettings.xAxis.axisLabel.show = true;

                        for (var i = 0; i < l; i++) {
                            var n = chartData.chart.series[i].data.length;

                            baiduGraphSettings.series[i] = {name: "", type: "", data: []};
                            baiduGraphSettings.series[i].type = "bar";
                            baiduGraphSettings.series[i].name = (chartData.chart.series[i].seriesName !== undefined) ?
                                chartData.chart.series[i].seriesName : "series" + i;
                            baiduGraphSettings.legend.data[i] = {name: ""};
                            baiduGraphSettings.legend.data[i].name = (chartData.chart.series[i].seriesName !== undefined) ?
                                chartData.chart.series[i].seriesName : "series" + i;

                            baiduGraphSettings.series[i].label = {
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

                            baiduGraphSettings.series[i].label.normal.show = (chartData.chart.showLabel !== undefined || "") ?
                                chartData.chart.showLabel : false;

                            for (var j = 0; j < n; j++) {
                                baiduGraphSettings.series[i].data[j] = {name: "", value: 0};
                                baiduGraphSettings.series[i].data[j].name = chartData.chart.series[i].data[j].labelx || "";
                                baiduGraphSettings.series[i].data[j].value = [];
                                baiduGraphSettings.series[i].data[j].value = (chartData.chart.series[i].data[j].y !== undefined) ? chartData.chart.series[i].data[j].y : "-";
                                baiduGraphSettings.xAxis.data[j] = (chartData.chart.series[i].data[j].labelx !== undefined) ? chartData.chart.series[i].data[j].labelx : "";
                            }
                        }
                        /* <--- END OF GRAPH SETTING CONVERSION ASSIGNMENTS ---> */
                        break;

                    /*
                     * [图标种类] 柱状图 | 横向 | 平铺
                     */
                    case "bar_horizon_sidebyside":
                        // 重置baiduGraphSettings以防止意外数据重合
                        baiduGraphSettings.reset();

                        // 设l为series数量
                        var l = chartData.chart.series.length;

                        /* <--- START OF GRAPH SETTING CONVERSION ASSIGNMENTS ---> */
                        baiduGraphSettings.title.text = (chartData.chart.title !== undefined) ? chartData.chart.title : "";
                        baiduGraphSettings.xAxis.name = (chartData.chart.xtitle !== undefined) ? chartData.chart.xtitle : "";
                        baiduGraphSettings.yAxis.name = (chartData.chart.ytitle !== undefined) ? chartData.chart.ytitle : "";
                        baiduGraphSettings.tooltip = {show: true, trigger: "axis", axisPointer: {type: "shadow"}};
                        baiduGraphSettings.yAxis.type = "category";
                        baiduGraphSettings.yAxis.data = [];
                        baiduGraphSettings.yAxis.axisLabel = {};
                        baiduGraphSettings.yAxis.axisLabel.show = true;

                        for (var i = 0; i < l; i++) {
                            var n = chartData.chart.series[i].data.length;

                            baiduGraphSettings.series[i] = {name: "", type: "", data: []};
                            baiduGraphSettings.series[i].type = "bar";
                            baiduGraphSettings.series[i].name = (chartData.chart.series[i].seriesName !== undefined) ?
                                chartData.chart.series[i].seriesName : "series" + i;

                            baiduGraphSettings.legend.data[i] = {name: ""};
                            baiduGraphSettings.legend.data[i].name = (chartData.chart.series[i].seriesName !== undefined) ?
                                chartData.chart.series[i].seriesName : "series" + i;

                            baiduGraphSettings.series[i].label = {
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

                            baiduGraphSettings.series[i].label.normal.show = (chartData.chart.showLabel !== undefined || "") ?
                                chartData.chart.showLabel : false;

                            for (var j = 0; j < n; j++) {
                                baiduGraphSettings.series[i].data[j] = {name: "", value: 0};
                                baiduGraphSettings.series[i].data[j].name = (chartData.chart.series[i].data[j].labely !== undefined) ?
                                    chartData.chart.series[i].data[j].labely : "";
                                baiduGraphSettings.series[i].data[j].value = [];
                                baiduGraphSettings.series[i].data[j].value = (chartData.chart.series[i].data[j].x !== undefined) ?
                                    chartData.chart.series[i].data[j].x : "-";
                                baiduGraphSettings.yAxis.data[j] = (chartData.chart.series[i].data[j].labely !== undefined) ?
                                    chartData.chart.series[i].data[j].labely : "";
                            }
                        }
                        /* <--- END OF GRAPH SETTING CONVERSION ASSIGNMENTS ---> */
                        break;

                    /*
                     * [图标种类] 柱状图 | 竖向 | 堆叠
                     */
                    case "bar_vertical_stack":
                        // 重置baiduGraphSettings以防止意外数据重合
                        baiduGraphSettings.reset();

                        // 设l为series数量
                        var l = chartData.chart.series.length;

                        /* <--- START OF GRAPH SETTING CONVERSION ASSIGNMENTS ---> */
                        baiduGraphSettings.title.text = (chartData.chart.title !== undefined) ? chartData.chart.title : "";
                        baiduGraphSettings.xAxis.name = (chartData.chart.xtitle !== undefined) ? chartData.chart.xtitle : "";
                        baiduGraphSettings.yAxis.name = (chartData.chart.ytitle !== undefined) ? chartData.chart.ytitle : "";
                        baiduGraphSettings.tooltip = {show: true, trigger: "axis", axisPointer: {type: "shadow"}};
                        baiduGraphSettings.xAxis.type = "category";
                        baiduGraphSettings.xAxis.axisLabel = {};
                        baiduGraphSettings.xAxis.axisLabel.show = true;

                        for (var i = 0; i < l; i++) {
                            var n = chartData.chart.series[i].data.length;

                            baiduGraphSettings.series[i] = {name: "", type: "", data: []};
                            baiduGraphSettings.series[i].type = "bar";
                            baiduGraphSettings.series[i].name = (chartData.chart.series[i].seriesName !== undefined) ?
                                chartData.chart.series[i].seriesName : "series" + i;
                            baiduGraphSettings.series[i].stack = "stack";

                            baiduGraphSettings.legend.data[i] = {name: ""};
                            baiduGraphSettings.legend.data[i].name = (chartData.chart.series[i].seriesName !== undefined) ?
                                chartData.chart.series[i].seriesName : "series" + i;

                            baiduGraphSettings.series[i].label = {
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

                            baiduGraphSettings.series[i].label.normal.show = (chartData.chart.showLabel !== undefined || "") ?
                                chartData.chart.showLabel : false;

                            for (var j = 0; j < n; j++) {
                                baiduGraphSettings.series[i].data[j] = {name: "", value: 0};
                                baiduGraphSettings.series[i].data[j].name = chartData.chart.series[i].data[j].labelx || "";
                                baiduGraphSettings.series[i].data[j].value = [];
                                baiduGraphSettings.series[i].data[j].value = (chartData.chart.series[i].data[j].y !== undefined) ? chartData.chart.series[i].data[j].y : "-";
                                baiduGraphSettings.xAxis.data[j] = (chartData.chart.series[i].data[j].labelx !== undefined) ? chartData.chart.series[i].data[j].labelx : "";
                            }
                        }
                        /* <--- END OF GRAPH SETTING CONVERSION ASSIGNMENTS ---> */
                        break;

                    /*
                     * [图标种类] 柱状图 | 横向 | 堆叠

                     */
                    case "bar_horizon_stack":
                        // 重置baiduGraphSettings以防止意外数据重合
                        baiduGraphSettings.reset();

                        // 设l为series数量
                        var l = chartData.chart.series.length;

                        /* <--- START OF GRAPH SETTING CONVERSION ASSIGNMENTS ---> */
                        baiduGraphSettings.title.text = (chartData.chart.title !== undefined) ? chartData.chart.title : "";
                        baiduGraphSettings.xAxis.name = (chartData.chart.xtitle !== undefined) ? chartData.chart.xtitle : "";
                        baiduGraphSettings.yAxis.name = (chartData.chart.ytitle !== undefined) ? chartData.chart.ytitle : "";
                        baiduGraphSettings.tooltip = {show: true, trigger: "axis", axisPointer: {type: "shadow"}};
                        baiduGraphSettings.xAxis.type = "value";
                        baiduGraphSettings.yAxis.type = "category";
                        baiduGraphSettings.yAxis.axisLabel = {};
                        baiduGraphSettings.yAxis.axisLabel.show = true;

                        for (var i = 0; i < l; i++) {
                            var n = chartData.chart.series[i].data.length;

                            baiduGraphSettings.series[i] = {name: "", type: "", data: []};
                            baiduGraphSettings.series[i].type = "bar";
                            baiduGraphSettings.series[i].name = (chartData.chart.series[i].seriesName !== undefined) ?
                                chartData.chart.series[i].seriesName : "series" + i;

                            baiduGraphSettings.series[i].stack = "stack";
                            baiduGraphSettings.legend.data[i] = {name: ""};
                            baiduGraphSettings.legend.data[i].name = (chartData.chart.series[i].seriesName !== undefined) ?
                                chartData.chart.series[i].seriesName : "series" + i;

                            baiduGraphSettings.series[i].label = {
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

                            baiduGraphSettings.series[i].label.normal.show = (chartData.chart.showLabel !== undefined || "") ?
                                chartData.chart.showLabel : false;

                            for (var j = 0; j < n; j++) {
                                baiduGraphSettings.series[i].data[j] = {name: "", value: 0};
                                baiduGraphSettings.series[i].data[j].name = chartData.chart.series[i].data[j].labely || "";
                                baiduGraphSettings.series[i].data[j].value = [];
                                baiduGraphSettings.series[i].data[j].value = (chartData.chart.series[i].data[j].x !== undefined) ? chartData.chart.series[i].data[j].x : "-";
                                baiduGraphSettings.yAxis.data[j] = (chartData.chart.series[i].data[j].labely !== undefined) ? chartData.chart.series[i].data[j].labely : "";
                            }
                        }
                        /* <--- END OF GRAPH SETTING CONVERSION ASSIGNMENTS ---> */
                        break;

                    /*
                     * [图标种类] 饼状图

                     */
                    case "pie":
                        // 重置baiduGraphSettings以防止意外数据重合
                        baiduGraphSettings.reset();

                        // 设l为series数量
                        var l = chartData.chart.series.length;

                        chartData.chart.pieAlignment = (chartData.chart.pieAlignment !== undefined || "") ? chartData.chart.pieAlignment : "tiled";

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
                                if (chartData.chart.pieAlignment == "polygon") {
                                    if (l === 1) {
                                        return [{x: "50%", y: "50%"}];

                                    } else if (l === 2) {
                                        return [{x: "33%", y: "50%"}, {x: "67%", y: "50%"}];

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
                                            if (yumChart.height < yumChart.width) {
                                                return yumChart.height * 0.50;
                                            } else {
                                                return yumChart.width * 0.50;
                                            }
                                        };

                                        var offsetArray = calcOffset(l, calcMainRadius());

                                        var posArray = [];
                                        var percentPosArray = [];

                                        for (var p = 0; p < l; p++) {
                                            posArray[p] = {
                                                x: (yumChart.width + offsetArray[p].x) / 2,
                                                y: (yumChart.height + offsetArray[p].y + 50) / 2
                                            };

                                            percentPosArray[p] = {
                                                x: (posArray[p].x / yumChart.width * 100).toFixed(2) + "%",
                                                y: (posArray[p].y / yumChart.height * 100).toFixed(2) + "%"
                                            };
                                        }

                                        return percentPosArray;
                                    }

                                    /* TILED ALIGNMENT % CALCULATIONS */
                                } else if (chartData.chart.pieAlignment == "tiled") {
                                    if (l == 1) {
                                        return [[{x: "50%", y: "50%"}]];

                                    } else if (l == 2) {
                                        return [[{x: "33%", y: "50%"}, {x: "67%", y: "50%"}]];

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
                                                            y: ((yumChart.height + 50) / (_nPlus1 + 1)) * (y + 1),
                                                            x: ((yumChart.width) / (_nPlus1 + 1)) * (x + 1)
                                                        };

                                                    } else if (x == _nPlus1 - 1 || y == _nPlus1 - 1) {
                                                        if (_c < _extraNum || _extraNum === 0) {
                                                            if (_extraNum <= (_nPlus1 - 1)) {
                                                                _posArray[y][x] = {
                                                                    y: ((yumChart.height + 50) / (_nPlus1)) * (y + 1),
                                                                    x: (yumChart.width / (_nPlus1 + 1)) * (x + 1)
                                                                };
                                                            } else {
                                                                _posArray[y][x] = {
                                                                    y: ((yumChart.height + 50) / (_nPlus1 + 0.9)) * (y + 1),
                                                                    x: (yumChart.width / (_nPlus1 + 1)) * (x + 1)
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
                                                                y: ((yumChart.height + 50) / (_nPlus1)) * (y + 1),
                                                                x: (yumChart.width / (_nPlus1 + 1)) * (x + 1)
                                                            };
                                                        } else {
                                                            _posArray[y][x] = {
                                                                y: ((yumChart.height + 50) / (_nPlus1 + 0.9)) * (y + 1),
                                                                x: (yumChart.width / (_nPlus1 + 1)) * (x + 1)
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
                                                        r[i][j].x = (p[i][j].x / yumChart.width * 100).toFixed(2) + "%";
                                                        r[i][j].y = (p[i][j].y / yumChart.height * 100).toFixed(2) + "%";
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
                                    console.log("[yumChart] Invalid pie alignment!");
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
                                if (chartData.chart.pieAlignment == "polygon") {
                                    if (l === 1) {
                                        return "75%";
                                    } else if (l === 2) {
                                        return "40%";
                                    } else {
                                        if (yumChart.height < yumChart.width) {
                                            return (yumChart.height * (1 / l) / yumChart.height) * 100 + "%";

                                        } else {
                                            return (yumChart.width * (1 / l) / yumChart.width) * 100 + "%";
                                        }
                                    }
                                } else if (chartData.chart.pieAlignment == "tiled") {
                                    if (l === 1) {
                                        return "75%";
                                    } else if (l === 2) {
                                        return "40%";
                                    } else {
                                        var _nPlus1 = Math.ceil(Math.sqrt(l));
                                        if (yumChart.height < yumChart.width) {
                                            return ((yumChart.height / (_nPlus1 + 1)) / (yumChart.height) * 100 + "%");
                                        } else {
                                            return ((yumChart.width / (_nPlus1 + 1)) / (yumChart.width) * 100 + "%");
                                        }
                                    }
                                } else {

                                }
                            }
                        };

                        var percentPos = calcPos.getPercentPosPie();

                        // 转化多维度array至一维;
                        if (chartData.chart.pieAlignment == "polygon") {
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
                        baiduGraphSettings.title.text = (chartData.chart.title !== undefined) ? chartData.chart.title : "";
                        baiduGraphSettings.tooltip = {show: true, trigger: "item"};

                        delete baiduGraphSettings.xAxis;
                        delete baiduGraphSettings.yAxis;

                        for (var i = 0; i < l; i++) {
                            baiduGraphSettings.series[i] = {name: "", type: "", data: []};
                            baiduGraphSettings.series[i].type = "pie";
                            baiduGraphSettings.series[i].name = chartData.chart.series[i].seriesName || "series" + i;
                            baiduGraphSettings.series[i].radius = "50%";

                            baiduGraphSettings.legend.data[i] = {name: ""};
                            baiduGraphSettings.legend.data[i].name = chartData.chart.series[i].seriesName || "series" + i;

                            baiduGraphSettings.series[i].radius = calcPos.calcEachPieRadius();

                            baiduGraphSettings.series[i].avoidLabelOverlap = true;
                            baiduGraphSettings.series[i].label = {
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

                            baiduGraphSettings.series[i].labelLine = {
                                normal: {
                                    show: true
                                }
                            };

                            baiduGraphSettings.series[i].label.normal.show = (chartData.chart.showLabel !== undefined || "") ?
                                chartData.chart.showLabel : false;
                            baiduGraphSettings.series[i].labelLine.normal.show = (chartData.chart.showLabel !== undefined || "") ?
                                chartData.chart.showLabel : false;

                            baiduGraphSettings.series[i].center = [];
                            baiduGraphSettings.series[i].center[0] = tempPPA[i].x;
                            baiduGraphSettings.series[i].center[1] = tempPPA[i].y;

                            var n = chartData.chart.series[i].data.length;
                            for (var j = 0; j < n; j++) {
                                baiduGraphSettings.series[i].data[j] = {name: "", value: ""};
                                baiduGraphSettings.series[i].data[j].name = chartData.chart.series[i].data[j].labelx || "";
                                baiduGraphSettings.series[i].data[j].value = (chartData.chart.series[i].data[j].x !== undefined) ? chartData.chart.series[i].data[j].x : "-";
                            }
                        }

                        baiduGraphSettings.toolbox.feature.magicType.show = false;
                        /* <--- END OF GRAPH SETTING CONVERSION ASSIGNMENTS ---> */
                        break;

                    /*
                     * 如果图标种类不存在，提示错误
                     */
                    default:
                        console.log("[yumChart] Invalid graph type!");
                        break;
                }
            } catch (e) {
                console.log("[yumChart] _convertData: " + e.message);
            }
        },

        /**
         * 调用eCharts来渲染图标
         *
         * @public
         * @function
         * @memberOf yumChart
         * @deprecated 请使用 yumChart.drawGraph()
         * @param {!string} containerElementID - 要放图标实例的DIV元素，值不能为空
         */
        _generateGraph: function (containerElementID) {
            /* <--- START OF INPUT VALIDATION ---> */
            /**
             * DIV元素ID
             *
             * @private
             * @type {!string}
             */
            var c = (typeof containerElementID === "string" && containerElementID.substr(0, 1) === "#") ?
                containerElementID : console.log("[yumChart] _generateGraph: Invalid container ID!");
            /* <--- END OF INPUT VALIDATION ---> */

            try {
                /**
                 * 具体eCharts方法请见:
                 *
                 * @see http://echarts.baidu.com/
                 */
                // 存储图标实例至graphInstance
                yumChart.graphInstance = echarts.init(document.getElementById(c.substr(1, c.length)));

            } catch (e) {
                console.log("[yumChart] _generateGraph: " + e.message);
            }
            return yumChart;
        },

        /**
         * 删除图标实例
         *
         * @public
         * @function
         * @memberOf yumChart
         * @example
         * yumChart.getYumChartInstance("#graph-container"); // 先选择要删除的图表实例
         * yumChart.deleteGraph();
         */
        deleteGraph: function (containerDivID) {
            try {
                var c = (containerDivID !== undefined && containerDivID.substr(0, 1) === "#") ? containerDivID: console.log("[yumChart] deleteGraph: Invalid containerDivID");

                if (c !== undefined) {
                    yumChart.getYumChartInstance(containerDivID);
                }

                // 调用 eCharts dispose() 方法
                /**
                 * To view the API methods and other references, visit:
                 *
                 * @see http://echarts.baidu.com/
                 */
                yumChart.graphInstance.dispose();

            } catch (e) {
                console.log("[yumChart] _generateGraph: " + e.message);
            }
            return yumChart;
        },

        /**
         * 重置baiduGraphSettings
         *
         * @public
         * @function
         * @memberOf yumChart
         */
        resetGraphSettings: function () {
            /**
             * @see baiduGraphSettings
             */
            baiduGraphSettings.reset();
        },

        /**
         * 调用_convertData 和 _setGraphSettings：转化数据，并设置实例数据
         *
         * @public
         * @function
         * @memberOf yumChart
         * @deprecated Use yumChart.drawGraph() instead
         * @param {!object|!string} jsonData - Valid JSON YumChartData format
         */
        setChartData: function (jsonData) {
            if (typeof jsonData === "string") {
                try {
                    chartData = JSON.parse(jsonData);

                    if (chartData.doctype === "YumChartData") {
                        yumChart._convertData();
                        yumChart._setGraphSettings();

                    } else {
                        console.log("[yumChart] Invalid data format: must only be YumChartData file");
                    }
                } catch (e) {
                    console.log("[yumChart] Exception: " + e.message);
                    return;
                }

                /* If YumChartData is passed in as an Object */
            } else if (typeof jsonData === "object") {
                try {
                    var d = JSON.stringify(jsonData);

                    chartData = jsonData;

                    if (chartData.doctype === "YumChartData") {
                        yumChart._convertData();
                        yumChart._setGraphSettings();

                    } else {
                        console.log("[yumChart] Invalid data format: must only be YumChartData file");
                    }
                } catch (e) {
                    console.log("[yumChart] Exception: " + e.message);
                    return;
                }

                /* If data is neither in string nor object format */
            } else {
                console.log("[yumChart] setChartData: Invalid data - Must be either string or object format!");
            }
        },

        /**
         * GET 方法: 返回 chartData
         *
         * @public
         * @function
         * @memberOf yumChart
         * @returns {object}
         */
        getYumChartData: function () {
            /**
             * @see chartData
             */
            return chartData;
        },

        /**
         * 显示/隐藏图标数据标签
         *
         * @public
         * @function
         * @memberOf yumChart
         * @param {boolean} [showBool=false] 是否显示，true/false
         * @param {!string} containerDivID 存储实例的DIV ID
         */
        toggleLabel: function (containerDivID, showBool) {
            var c = (containerDivID !== undefined && containerDivID.substr(0, 1) === "#") ? containerDivID: console.log("[yumChart] toggleLabel: Invalid containerDivID");
            var s = (showBool !== undefined && (showBool === true || false)) ? showBool: false;

            baiduGraphSettings = yumChart.getYumChartInstanceOptions(c);

            for (var i = 0; i < baiduGraphSettings.series.length; i++) {
                baiduGraphSettings.series[i].label.normal.show = s;
                if (chartData.chart.type === "pie") {
                    baiduGraphSettings.series[i].labelLine.normal.show = s;
                }
            }

            yumChart.graphInstance.setOption(baiduGraphSettings);
        },

        /**
         * GET 方法: 获取DIV ID中的实例并存到yumChart.graphInstance
         *
         * @public
         * @function
         * @param {!string} containerDivID 存储实例的DIV ID
         * @returns {Object} - YumChart 实例
         * @memberOf yumChart
         */
        getYumChartInstance: function (containerDivID) {
            var c = (containerDivID !== undefined && containerDivID.substring(0, 1) === "#") ? containerDivID: console.log("[yumChart] getYumChartInstance: Invalid container ID");

            try {
                yumChart.graphInstance = echarts.getInstanceByDom(document.getElementById(c.substr(1, c.length)));
                return yumChart.graphInstance;

            } catch (e) {
                console.log("[yumChart] getYumChartInstance: [Exception] " + e.message);
            }
        },

        /**
         * GET 方法: 返回选择的实例的设置（eCharts格式）
         *
         * @public
         * @function
         * @param {!string} containerDivID 存储实例的DIV ID
         * @returns {Object} - YumChart 实例设置
         * @memberOf yumChart
         */
        getYumChartInstanceOptions: function (containerDivID) {
            var c = (containerDivID !== undefined && containerDivID.substring(0, 1) === "#") ? containerDivID: console.log("[yumChart] getYumChartInstance: Invalid container ID");

            try {
                var opt = yumChart.getYumChartInstance(containerDivID).getOption();
                return opt;
            } catch (e) {
                console.log("[yumChart] getYumChartInstanceOptions: [Exception] " + e.message);
            }
        },

        /**
         * 主方法，接收YumChartData并渲染至指定位置
         *
         * @public
         * @function
         * @memberOf yumChart
         * @param {!string} containerDivID - 存储实例的DIV元素的ID
         * @param {!object|!string} chartData - YumChartData 数据，可以是对象或字符串，需要是正确的JSON格式
         */
        drawGraph: function (containerDivID, chartData) {
            /* <--- START OF INPUT VALIDATION ---> */

            /**
             * 存储实例的DIV元素的ID
             *
             * @type {!string}
             */
            var d = (typeof containerDivID === "string" && containerDivID.substring(0, 1) === "#") ? containerDivID : console.log("[yumChart] drawGraph: Invalid ID! (starts with #)!");

            /**
             * YumChartData 数据
             *
             * @type {!object}
             */
            var c = (typeof chartData === "object" || typeof chartData === "string") ? chartData : undefined;
            /* <--- START OF INPUT VALIDATION ---> */

            if (d !== undefined && c !== undefined) {
                /**
                 * @see yumChart._generateGraph
                 * @see yumChart.setChartData
                 */

                // Calls necessary functions
                yumChart._generateGraph(d);

                // Sets YumChartData
                yumChart.setChartData(c);

                /* [Set yumChart Width and Height] */
                // [Note]: The reason for using script like this is to support multiple YumChart instances
                var _n = d.substr(1, d.length);
                _n = _n.replace(/\W/g, "_");
                var _a = "<scr" + "ipt id=\"yumChartGetWidthAndHeight_" + d.substring(1, d.length) + "\">$(function () {var $YC = $(\"" + d + "\");yumChart.height" + "_" + _n + " = $YC.height();yumChart.width" + "_" + _n + " = $YC.width();$(window).resize(function () {yumChart.height" + "_" + _n + " = $YC.height();yumChart.width" + "_" + _n + " = $YC.width();});});</scr" + "ipt>";

                if ($("#yumChartGetWidthAndHeight_" + d.substring(1, d.length)).length !== 0) {
                    // script exists, not creating new script.
                } else {
                    $("body").append(_a);
                }

                return yumChart;

            } else {
                console.log("[yumChart] containerDivID and chartData are non-null parameters. Values are REQUIRED!");
            }
        }
    };
})();

/* <----- END OF YUMCHART PLUGIN -----> */
