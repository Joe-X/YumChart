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

    var _l = yumChartData.chart.series.length;

    module.resetEchartsChartData();
    
    switch (yumChartData.chart.type) {
        /*
         * [图标种类] 折线图 | Polyline
         */
        case "polyline":
            /* <--- START OF GRAPH SETTING CONVERSION ASSIGNMENTS ---> */
            echartsChartData.title.text = (yumChartData.chart.title !== undefined) ? yumChartData.chart.title : "";
            echartsChartData.xAxis.name = (yumChartData.chart.xtitle !== undefined) ? yumChartData.chart.xtitle : "";
            echartsChartData.yAxis.name = (yumChartData.chart.ytitle !== undefined) ? yumChartData.chart.ytitle : "";
            echartsChartData.tooltip = {show: true, trigger: "axis"};

            for (var i = 0; i < _l; i++) {
                var n = yumChartData.chart.series[i].data.length;

                echartsChartData.series[i] = {name: "", type: "", data: []};
                echartsChartData.series[i].type = "line";
                echartsChartData.series[i].name = (yumChartData.chart.series[i].seriesName !== undefined) ?
                    yumChartData.chart.series[i].seriesName : "series" + i;
                echartsChartData.legend.data[i] = {name: ""};
                echartsChartData.legend.data[i].name = (yumChartData.chart.series[i].seriesName !== undefined) ?
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

                echartsChartData.series[i].label.normal.show = (yumChartData.chart.showLabel !== undefined || "") ?
                    yumChartData.chart.showLabel : false;

                for (var j = 0; j < n; j++) {
                    echartsChartData.series[i].data[j] = {name: "", value: 0};
                    echartsChartData.series[i].data[j].name = yumChartData.chart.series[i].data[j].labelx || "";
                    echartsChartData.series[i].data[j].value = [];
                    echartsChartData.series[i].data[j].value[0] = (yumChartData.chart.series[i].data[j].x !== undefined) ? yumChartData.chart.series[i].data[j].x : "-";
                    echartsChartData.series[i].data[j].value[1] = (yumChartData.chart.series[i].data[j].y !== undefined) ? yumChartData.chart.series[i].data[j].y : "-";
                }
            }
            /* <--- END OF GRAPH SETTING CONVERSION ASSIGNMENTS ---> */
            break;

        /*
         * [图标种类] 柱状图 | 竖向 | 平铺
         */
        case "bar_vertical_sidebyside":
            /* <--- START OF GRAPH SETTING CONVERSION ASSIGNMENTS ---> */
            echartsChartData.title.text = (yumChartData.chart.title !== undefined) ? yumChartData.chart.title : "";
            echartsChartData.xAxis.name = (yumChartData.chart.xtitle !== undefined) ? yumChartData.chart.xtitle : "";
            echartsChartData.yAxis.name = (yumChartData.chart.ytitle !== undefined) ? yumChartData.chart.ytitle : "";
            echartsChartData.tooltip = {show: true, trigger: "axis", axisPointer: {type: "shadow"}};
            echartsChartData.xAxis.type = "category";
            echartsChartData.xAxis.axisLabel = {};
            echartsChartData.xAxis.axisLabel.show = true;

            for (var i = 0; i < _l; i++) {
                var n = yumChartData.chart.series[i].data.length;

                echartsChartData.series[i] = {name: "", type: "", data: []};
                echartsChartData.series[i].type = "bar";
                echartsChartData.series[i].name = (yumChartData.chart.series[i].seriesName !== undefined) ?
                    yumChartData.chart.series[i].seriesName : "series" + i;
                echartsChartData.legend.data[i] = {name: ""};
                echartsChartData.legend.data[i].name = (yumChartData.chart.series[i].seriesName !== undefined) ?
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

                echartsChartData.series[i].label.normal.show = (yumChartData.chart.showLabel !== undefined || "") ?
                    yumChartData.chart.showLabel : false;

                for (var j = 0; j < n; j++) {
                    echartsChartData.series[i].data[j] = {name: "", value: 0};
                    echartsChartData.series[i].data[j].name = yumChartData.chart.series[i].data[j].labelx || "";
                    echartsChartData.series[i].data[j].value = [];
                    echartsChartData.series[i].data[j].value = (yumChartData.chart.series[i].data[j].y !== undefined) ? yumChartData.chart.series[i].data[j].y : "-";
                    echartsChartData.xAxis.data[j] = (yumChartData.chart.series[i].data[j].labelx !== undefined) ? yumChartData.chart.series[i].data[j].labelx : "";
                }
            }
            /* <--- END OF GRAPH SETTING CONVERSION ASSIGNMENTS ---> */
            break;

        /*
         * [图标种类] 柱状图 | 横向 | 平铺
         */
        case "bar_horizon_sidebyside":
            /* <--- START OF GRAPH SETTING CONVERSION ASSIGNMENTS ---> */
            echartsChartData.title.text = (yumChartData.chart.title !== undefined) ? yumChartData.chart.title : "";
            echartsChartData.xAxis.name = (yumChartData.chart.xtitle !== undefined) ? yumChartData.chart.xtitle : "";
            echartsChartData.yAxis.name = (yumChartData.chart.ytitle !== undefined) ? yumChartData.chart.ytitle : "";
            echartsChartData.tooltip = {show: true, trigger: "axis", axisPointer: {type: "shadow"}};
            echartsChartData.yAxis.type = "category";
            echartsChartData.yAxis.data = [];
            echartsChartData.yAxis.axisLabel = {};
            echartsChartData.yAxis.axisLabel.show = true;

            for (var i = 0; i < _l; i++) {
                var n = yumChartData.chart.series[i].data.length;

                echartsChartData.series[i] = {name: "", type: "", data: []};
                echartsChartData.series[i].type = "bar";
                echartsChartData.series[i].name = (yumChartData.chart.series[i].seriesName !== undefined) ?
                    yumChartData.chart.series[i].seriesName : "series" + i;

                echartsChartData.legend.data[i] = {name: ""};
                echartsChartData.legend.data[i].name = (yumChartData.chart.series[i].seriesName !== undefined) ?
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

                echartsChartData.series[i].label.normal.show = (yumChartData.chart.showLabel !== undefined || "") ?
                    yumChartData.chart.showLabel : false;

                for (var j = 0; j < n; j++) {
                    echartsChartData.series[i].data[j] = {name: "", value: 0};
                    echartsChartData.series[i].data[j].name = (yumChartData.chart.series[i].data[j].labely !== undefined) ?
                        yumChartData.chart.series[i].data[j].labely : "";
                    echartsChartData.series[i].data[j].value = [];
                    echartsChartData.series[i].data[j].value = (yumChartData.chart.series[i].data[j].x !== undefined) ?
                        yumChartData.chart.series[i].data[j].x : "-";
                    echartsChartData.yAxis.data[j] = (yumChartData.chart.series[i].data[j].labely !== undefined) ?
                        yumChartData.chart.series[i].data[j].labely : "";
                }
            }
            /* <--- END OF GRAPH SETTING CONVERSION ASSIGNMENTS ---> */
            break;

        /*
         * [图标种类] 柱状图 | 竖向 | 堆叠
         */
        case "bar_vertical_stack":
            /* <--- START OF GRAPH SETTING CONVERSION ASSIGNMENTS ---> */
            echartsChartData.title.text = (yumChartData.chart.title !== undefined) ? yumChartData.chart.title : "";
            echartsChartData.xAxis.name = (yumChartData.chart.xtitle !== undefined) ? yumChartData.chart.xtitle : "";
            echartsChartData.yAxis.name = (yumChartData.chart.ytitle !== undefined) ? yumChartData.chart.ytitle : "";
            echartsChartData.tooltip = {show: true, trigger: "axis", axisPointer: {type: "shadow"}};
            echartsChartData.xAxis.type = "category";
            echartsChartData.xAxis.axisLabel = {};
            echartsChartData.xAxis.axisLabel.show = true;

            for (var i = 0; i < _l; i++) {
                var n = yumChartData.chart.series[i].data.length;

                echartsChartData.series[i] = {name: "", type: "", data: []};
                echartsChartData.series[i].type = "bar";
                echartsChartData.series[i].name = (yumChartData.chart.series[i].seriesName !== undefined) ?
                    yumChartData.chart.series[i].seriesName : "series" + i;
                echartsChartData.series[i].stack = "stack";

                echartsChartData.legend.data[i] = {name: ""};
                echartsChartData.legend.data[i].name = (yumChartData.chart.series[i].seriesName !== undefined) ?
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

                echartsChartData.series[i].label.normal.show = (yumChartData.chart.showLabel !== undefined || "") ?
                    yumChartData.chart.showLabel : false;

                for (var j = 0; j < n; j++) {
                    echartsChartData.series[i].data[j] = {name: "", value: 0};
                    echartsChartData.series[i].data[j].name = yumChartData.chart.series[i].data[j].labelx || "";
                    echartsChartData.series[i].data[j].value = [];
                    echartsChartData.series[i].data[j].value = (yumChartData.chart.series[i].data[j].y !== undefined) ? yumChartData.chart.series[i].data[j].y : "-";
                    echartsChartData.xAxis.data[j] = (yumChartData.chart.series[i].data[j].labelx !== undefined) ? yumChartData.chart.series[i].data[j].labelx : "";
                }
            }
            /* <--- END OF GRAPH SETTING CONVERSION ASSIGNMENTS ---> */
            break;

        /*
         * [图标种类] 柱状图 | 横向 | 堆叠
         */
        case "bar_horizon_stack":
            /* <--- START OF GRAPH SETTING CONVERSION ASSIGNMENTS ---> */
            echartsChartData.title.text = (yumChartData.chart.title !== undefined) ? yumChartData.chart.title : "";
            echartsChartData.xAxis.name = (yumChartData.chart.xtitle !== undefined) ? yumChartData.chart.xtitle : "";
            echartsChartData.yAxis.name = (yumChartData.chart.ytitle !== undefined) ? yumChartData.chart.ytitle : "";
            echartsChartData.tooltip = {show: true, trigger: "axis", axisPointer: {type: "shadow"}};
            echartsChartData.xAxis.type = "value";
            echartsChartData.yAxis.type = "category";
            echartsChartData.yAxis.axisLabel = {};
            echartsChartData.yAxis.axisLabel.show = true;

            for (var i = 0; i < _l; i++) {
                var n = yumChartData.chart.series[i].data.length;

                echartsChartData.series[i] = {name: "", type: "", data: []};
                echartsChartData.series[i].type = "bar";
                echartsChartData.series[i].name = (yumChartData.chart.series[i].seriesName !== undefined) ?
                    yumChartData.chart.series[i].seriesName : "series" + i;

                echartsChartData.series[i].stack = "stack";
                echartsChartData.legend.data[i] = {name: ""};
                echartsChartData.legend.data[i].name = (yumChartData.chart.series[i].seriesName !== undefined) ?
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

                echartsChartData.series[i].label.normal.show = (yumChartData.chart.showLabel !== undefined || "") ?
                    yumChartData.chart.showLabel : false;

                for (var j = 0; j < n; j++) {
                    echartsChartData.series[i].data[j] = {name: "", value: 0};
                    echartsChartData.series[i].data[j].name = yumChartData.chart.series[i].data[j].labely || "";
                    echartsChartData.series[i].data[j].value = [];
                    echartsChartData.series[i].data[j].value = (yumChartData.chart.series[i].data[j].x !== undefined) ? yumChartData.chart.series[i].data[j].x : "-";
                    echartsChartData.yAxis.data[j] = (yumChartData.chart.series[i].data[j].labely !== undefined) ? yumChartData.chart.series[i].data[j].labely : "";
                }
            }
            /* <--- END OF GRAPH SETTING CONVERSION ASSIGNMENTS ---> */
            break;

        /*
         * [图标种类] 饼状图
         */
        case "pie":
            yumChartData.chart.pieAlignment = (yumChartData.chart.pieAlignment !== undefined || "") ? yumChartData.chart.pieAlignment : "tiled";

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
                    if (yumChartData.chart.pieAlignment == "polygon") {
                        if (_l === 1) {
                            return [{x: "50%", y: "50%"}];

                        } else if (_l === 2) {
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
                                if (tempChartInfo.height < tempChartInfo.width) {
                                    return tempChartInfo.height * 0.50;
                                } else {
                                    return tempChartInfo.width * 0.50;
                                }
                            };

                            var offsetArray = calcOffset(_l, calcMainRadius());

                            var posArray = [];
                            var percentPosArray = [];

                            for (var p = 0; p < _l; p++) {
                                posArray[p] = {
                                    x: (tempChartInfo.width + offsetArray[p].x) / 2,
                                    y: (tempChartInfo.height + offsetArray[p].y + 50) / 2
                                };

                                percentPosArray[p] = {
                                    x: (posArray[p].x / tempChartInfo.width * 100).toFixed(2) + "%",
                                    y: (posArray[p].y / tempChartInfo.height * 100).toFixed(2) + "%"
                                };
                            }

                            return percentPosArray;
                        }

                        /* TILED ALIGNMENT % CALCULATIONS */
                    } else if (yumChartData.chart.pieAlignment == "tiled") {
                        if (_l == 1) {
                            return [[{x: "50%", y: "50%"}]];

                        } else if (_l == 2) {
                            return [[{x: "33%", y: "50%"}, {x: "67%", y: "50%"}]];

                        } else {
                            var _posArray = [];
                            var _nPlus1 = Math.ceil(Math.sqrt(_l));
                            var _extraNum = _l - (Math.pow(Math.floor(Math.sqrt(_l)), 2));

                            var calcBasePxs = function () {
                                var _c = 0;
                                for (var y = 0; y < _nPlus1; y++) {
                                    _posArray[y] = [];
                                    for (var x = 0; x < _nPlus1; x++) {
                                        if (_extraNum === 0) {
                                            _posArray[y][x] = {
                                                y: ((tempChartInfo.height + 50) / (_nPlus1 + 1)) * (y + 1),
                                                x: ((tempChartInfo.width) / (_nPlus1 + 1)) * (x + 1)
                                            };

                                        } else if (x == _nPlus1 - 1 || y == _nPlus1 - 1) {
                                            if (_c < _extraNum || _extraNum === 0) {
                                                if (_extraNum <= (_nPlus1 - 1)) {
                                                    _posArray[y][x] = {
                                                        y: ((tempChartInfo.height + 50) / (_nPlus1)) * (y + 1),
                                                        x: (tempChartInfo.width / (_nPlus1 + 1)) * (x + 1)
                                                    };
                                                } else {
                                                    _posArray[y][x] = {
                                                        y: ((tempChartInfo.height + 50) / (_nPlus1 + 0.9)) * (y + 1),
                                                        x: (tempChartInfo.width / (_nPlus1 + 1)) * (x + 1)
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
                                                    y: ((tempChartInfo.height + 50) / (_nPlus1)) * (y + 1),
                                                    x: (tempChartInfo.width / (_nPlus1 + 1)) * (x + 1)
                                                };
                                            } else {
                                                _posArray[y][x] = {
                                                    y: ((tempChartInfo.height + 50) / (_nPlus1 + 0.9)) * (y + 1),
                                                    x: (tempChartInfo.width / (_nPlus1 + 1)) * (x + 1)
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
                                            r[i][j].x = (p[i][j].x / tempChartInfo.width * 100).toFixed(2) + "%";
                                            r[i][j].y = (p[i][j].y / tempChartInfo.height * 100).toFixed(2) + "%";
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
                 * @private
                 * @returns {object}
                 */
                calcEachPieRadius: function () {
                    if (yumChartData.chart.pieAlignment == "polygon") {
                        if (_l === 1) {
                            return "75%";
                        } else if (_l === 2) {
                            return "40%";
                        } else {
                            if (tempChartInfo.height < tempChartInfo.width) {
                                return (tempChartInfo.height * (1 / _l) / tempChartInfo.height) * 100 + "%";

                            } else {
                                return (tempChartInfo.width * (1 / _l) / tempChartInfo.width) * 100 + "%";
                            }
                        }
                    } else if (yumChartData.chart.pieAlignment == "tiled") {
                        if (_l === 1) {
                            return "75%";
                        } else if (_l === 2) {
                            return "40%";
                        } else {
                            var _nPlus1 = Math.ceil(Math.sqrt(_l));
                            if (tempChartInfo.height < tempChartInfo.width) {
                                return ((tempChartInfo.height / (_nPlus1 + 1)) / (tempChartInfo.height) * 100 + "%");
                            } else {
                                return ((tempChartInfo.width / (_nPlus1 + 1)) / (tempChartInfo.width) * 100 + "%");
                            }
                        }
                    } else {

                    }
                }
            };

            var percentPos = calcPos.getPercentPosPie();

            // 转化多维度array至一维;
            if (yumChartData.chart.pieAlignment == "polygon") {
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
            echartsChartData.title.text = (yumChartData.chart.title !== undefined) ? yumChartData.chart.title : "";
            echartsChartData.tooltip = {show: true, trigger: "item"};

            delete echartsChartData.xAxis;
            delete echartsChartData.yAxis;

            for (var i = 0; i < _l; i++) {
                echartsChartData.series[i] = {name: "", type: "", data: []};
                echartsChartData.series[i].type = "pie";
                echartsChartData.series[i].name = yumChartData.chart.series[i].seriesName || "series" + i;
                echartsChartData.series[i].radius = "50%";

                echartsChartData.legend.data[i] = {name: ""};
                echartsChartData.legend.data[i].name = yumChartData.chart.series[i].seriesName || "series" + i;

                echartsChartData.series[i].radius = calcPos.calcEachPieRadius();

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

                echartsChartData.series[i].label.normal.show = (yumChartData.chart.showLabel !== undefined || "") ?
                    yumChartData.chart.showLabel : false;
                echartsChartData.series[i].labelLine.normal.show = (yumChartData.chart.showLabel !== undefined || "") ?
                    yumChartData.chart.showLabel : false;

                echartsChartData.series[i].center = [];
                echartsChartData.series[i].center[0] = tempPPA[i].x;
                echartsChartData.series[i].center[1] = tempPPA[i].y;

                var n = yumChartData.chart.series[i].data.length;
                for (var j = 0; j < n; j++) {
                    echartsChartData.series[i].data[j] = {name: "", value: ""};
                    echartsChartData.series[i].data[j].name = yumChartData.chart.series[i].data[j].labelx || "";
                    echartsChartData.series[i].data[j].value = (yumChartData.chart.series[i].data[j].x !== undefined) ? yumChartData.chart.series[i].data[j].x : "-";
                }
            }

            echartsChartData.toolbox.feature.magicType.show = false;
            /* <--- END OF GRAPH SETTING CONVERSION ASSIGNMENTS ---> */
            break;

        /*
         * 如果图标种类不存在，提示错误
         */
        default:
            console.log("[YumStone.YumChart.__convertData__] Invalid graph type!");
            break;
    }
} catch (e) {
    console.log("[YumStone.YumChart.__convertData__] _convertData: " + e.message);
}