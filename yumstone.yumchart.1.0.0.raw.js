var YumStone = YumStone || {};

if (typeof console === "undefined") {
    console = {
        log: function () {
        }
    }
}

var echarts = echarts || null;
if (echarts === null) {
    throw "[YumStone.YumChart] ERROR: ECharts is undefined!";
}

YumStone.YumChart = (function (module) {
    var VERSION = {
        MAJOR: 1,
        MINOR: 0,
        PATCH: 0
    };

    var COPYRIGHT = {
        company: "YumStone",
        website: "http://www.yumstone.com/"
    };


    var DEPENDENCIES = {
        echarts: "Baidu ECharts 3 - http://echarts.baidu.com/"
    };

    module.getVersion = function () {
        return VERSION.MAJOR + "." + VERSION.MINOR + "." + VERSION.PATCH;
    };


    module.getCopyright = function () {
        return COPYRIGHT.company + " " + COPYRIGHT.website;
    };


    module.getDependencies = function () {
        var _d = [];
        for (var dependency in DEPENDENCIES) {
            _d.push(DEPENDENCIES[dependency]);
        }
        return _d;
    };

    return module;
})(YumStone.YumChart || {});


YumStone.YumChart = (function (module) {
    module.__getType__ = function (_x_) {
        return Object.prototype.toString.call(_x_).slice(8, -1);
    };

    module.checkType = {};

    module.checkType.isArray = function (_x_) {
        return module.__getType__(_x_) === "Array";
    };

    module.checkType.isObject = function (_x_) {
        return module.__getType__(_x_) === "Object";
    };

    module.checkType.isString = function (_x_) {
        return module.__getType__(_x_) === "String";
    };

    module.checkType.isDate = function (_x_) {
        return module.__getType__(_x_) === "Date";
    };

    module.checkType.isNumber = function (_x_) {
        return module.__getType__(_x_) === "Number";
    };

    module.checkType.isFunction = function (_x_) {
        return module.__getType__(_x_) === "Function";
    };

    module.checkType.isRegex = function (_x_) {
        return module.__getType__(_x_) === "RegExp";
    };

    module.checkType.isBool = function (_x_) {
        return module.__getType__(_x_) === "Boolean";
    };

    module.checkType.isNull = function (_x_) {
        return module.__getType__(_x_) === "Null";
    };

    module.checkType.isUndefined = function (_x_) {
        return module.__getType__(_x_) === "Undefined";
    };

    return module;
})(YumStone.YumChart || {});


YumStone.YumChart = (function (module) {
    module._yumChartData = null;

    module._echartsChartData = {
        "toolbox": {
            "show"   : true,
            "feature": {
                "magicType"  : { "show": true, "type": ['stack', 'tiled'] },
                "saveAsImage": { "show": true }
            }
        },
        "title"  : {
            "show"     : true,
            "text"     : "",
            "left"     : "center",
            "textStyle": {
                "color"     : "#0055B6",
                "fontWeight": "normal",
                "fontSize"  : 24
            }
        },
        "legend" : {
            "data" : [{
                "name": ""
            }],
            "top"  : "5%",
            "right": "7%"
        },
        "xAxis"  : {
            "name"         : "",
            "axisLine"     : {
                "show": true
            },
            "nameLocation" : "middle",
            "nameTextStyle": {
                "fontSize": 16
            },
            "nameGap"      : 30,
            "type"         : "value",
            "data"         : []
        },
        "yAxis"  : {
            "name"         : "",
            "axisLine"     : {
                "show": true
            },
            "nameLocation" : "middle",
            "nameRotate"   : 90,
            "nameTextStyle": {
                "fontSize": 16
            },
            "nameGap"      : 50,
            "type"         : "value",
            "data"         : []
        },

        "series": [{
            "type"     : "line",
            "name"     : "",
            "data"     : [],
            "label"    : {
                "normal": {
                    "show"     : true,
                    "position" : "top",
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

    module._defaultEchartsChartData = {
        "toolbox": {
            "show"   : true,
            "feature": {
                "magicType"  : { "show": true, "type": ['stack', 'tiled'] },
                "saveAsImage": { "show": true }
            }
        },
        "title"  : {
            "show"     : true,
            "text"     : "",
            "left"     : "center",
            "textStyle": {
                "color"     : "#0055B6",
                "fontWeight": "normal",
                "fontSize"  : 24
            }
        },
        "legend" : {
            "data" : [{
                "name": ""
            }],
            "top"  : "5%",
            "right": "7%"
        },
        "xAxis"  : {
            "name"         : "",
            "axisLine"     : {
                "show": true
            },
            "nameLocation" : "middle",
            "nameTextStyle": {
                "fontSize": 16
            },
            "nameGap"      : 30,
            "type"         : "value",
            "data"         : []
        },
        "yAxis"  : {
            "name"         : "",
            "axisLine"     : {
                "show": true
            },
            "nameLocation" : "middle",
            "nameRotate"   : 90,
            "nameTextStyle": {
                "fontSize": 16
            },
            "nameGap"      : 50,
            "type"         : "value",
            "data"         : []
        },

        "series": [{
            "type"     : "line",
            "name"     : "",
            "data"     : [],
            "label"    : {
                "normal": {
                    "show"     : true,
                    "position" : "top",
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

    module.__tempYumChartInfo__ = {
        width : 400,
        height: 300,
        data  : null
    };

    function __convertData__() {
        try {
            switch (module._yumChartData.chart.type) {

                case "polyline":
                    var l = module._yumChartData.chart.series.length;
                    
                    module._echartsChartData.title.text =
                        (module._yumChartData.chart.title !== undefined) ?
                        module._yumChartData.chart.title : "";
                    module._echartsChartData.xAxis.name =
                        (module._yumChartData.chart.xtitle !== undefined) ?
                        module._yumChartData.chart.xtitle : "";
                    module._echartsChartData.yAxis.name =
                        (module._yumChartData.chart.ytitle !== undefined) ?
                        module._yumChartData.chart.ytitle : "";
                    module._echartsChartData.tooltip =
                    { show: true, trigger: "axis" };

                    for (var i = 0; i < l; i++) {
                        var n = module._yumChartData.chart.series[i].data.length;

                        module._echartsChartData.series[i] = {
                            name: "",
                            type: "",
                            data: []
                        };
                        module._echartsChartData.series[i].type = "line";
                        module._echartsChartData.series[i].name =
                            (module._yumChartData.chart.series[i].seriesName !==
                             undefined) ?
                            module._yumChartData.chart.series[i].seriesName :
                            "series" + i;
                        module._echartsChartData.legend.data[i] = { name: "" };
                        module._echartsChartData.legend.data[i].name =
                            (module._yumChartData.chart.series[i].seriesName !==
                             undefined) ?
                            module._yumChartData.chart.series[i].seriesName :
                            "series" + i;
                        module._echartsChartData.series[i].label = {
                            normal: {
                                show     : true,
                                position : "top",
                                textStyle: {
                                    fontWeight: "normal",
                                    fontSize  : 12
                                },
                                formatter: "{c}".split(",")[1]
                            }
                        };

                        module._echartsChartData.series[i].label.normal.show =
                            (module._yumChartData.chart.showLabel !==
                             undefined || "") ?
                            module._yumChartData.chart.showLabel : false;

                        for (var j = 0; j < n; j++) {
                            module._echartsChartData.series[i].data[j] = {
                                name : "",
                                value: 0
                            };
                            module._echartsChartData.series[i].data[j].name =
                                module._yumChartData.chart.series[i].data[j].labelx ||
                                "";
                            module._echartsChartData.series[i].data[j].value =
                                [];
                            module._echartsChartData.series[i].data[j].value[0] =
                                (module._yumChartData.chart.series[i].data[j].x !==
                                 undefined) ?
                                module._yumChartData.chart.series[i].data[j].x :
                                "-";
                            module._echartsChartData.series[i].data[j].value[1] =
                                (module._yumChartData.chart.series[i].data[j].y !==
                                 undefined) ?
                                module._yumChartData.chart.series[i].data[j].y :
                                "-";
                        }
                    }

                    break;
                
                case "bar_vertical_sidebyside":
                    var l = module._yumChartData.chart.series.length;

                    module._echartsChartData.title.text =
                        (module._yumChartData.chart.title !== undefined) ?
                        module._yumChartData.chart.title : "";
                    module._echartsChartData.xAxis.name =
                        (module._yumChartData.chart.xtitle !== undefined) ?
                        module._yumChartData.chart.xtitle : "";
                    module._echartsChartData.yAxis.name =
                        (module._yumChartData.chart.ytitle !== undefined) ?
                        module._yumChartData.chart.ytitle : "";
                    module._echartsChartData.tooltip = {
                        show       : true,
                        trigger    : "axis",
                        axisPointer: { type: "shadow" }
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
                        module._echartsChartData.series[i].name =
                            (module._yumChartData.chart.series[i].seriesName !==
                             undefined) ?
                            module._yumChartData.chart.series[i].seriesName :
                            "series" + i;
                        module._echartsChartData.legend.data[i] = { name: "" };
                        module._echartsChartData.legend.data[i].name =
                            (module._yumChartData.chart.series[i].seriesName !==
                             undefined) ?
                            module._yumChartData.chart.series[i].seriesName :
                            "series" + i;

                        module._echartsChartData.series[i].label = {
                            normal: {
                                show     : true,
                                position : "top",
                                textStyle: {
                                    fontWeight: "normal",
                                    fontSize  : 12
                                },
                                formatter: "{c}"
                            }
                        };

                        module._echartsChartData.series[i].label.normal.show =
                            (module._yumChartData.chart.showLabel !==
                             undefined || "") ?
                            module._yumChartData.chart.showLabel : false;

                        for (var j = 0; j < n; j++) {
                            module._echartsChartData.series[i].data[j] = {
                                name : "",
                                value: 0
                            };
                            module._echartsChartData.series[i].data[j].name =
                                module._yumChartData.chart.series[i].data[j].labelx ||
                                "";
                            module._echartsChartData.series[i].data[j].value =
                                [];
                            module._echartsChartData.series[i].data[j].value =
                                (module._yumChartData.chart.series[i].data[j].y !==
                                 undefined) ?
                                module._yumChartData.chart.series[i].data[j].y :
                                "-";
                            module._echartsChartData.xAxis.data[j] =
                                (module._yumChartData.chart.series[i].data[j].labelx !==
                                 undefined) ?
                                module._yumChartData.chart.series[i].data[j].labelx :
                                "";
                        }
                    }

                    break;

                case "bar_horizon_sidebyside":
                    var l = module._yumChartData.chart.series.length;

                    module._echartsChartData.title.text =
                        (module._yumChartData.chart.title !== undefined) ?
                        module._yumChartData.chart.title : "";
                    module._echartsChartData.xAxis.name =
                        (module._yumChartData.chart.xtitle !== undefined) ?
                        module._yumChartData.chart.xtitle : "";
                    module._echartsChartData.yAxis.name =
                        (module._yumChartData.chart.ytitle !== undefined) ?
                        module._yumChartData.chart.ytitle : "";
                    module._echartsChartData.tooltip = {
                        show       : true,
                        trigger    : "axis",
                        axisPointer: { type: "shadow" }
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
                        module._echartsChartData.series[i].name =
                            (module._yumChartData.chart.series[i].seriesName !==
                             undefined) ?
                            module._yumChartData.chart.series[i].seriesName :
                            "series" + i;

                        module._echartsChartData.legend.data[i] = { name: "" };
                        module._echartsChartData.legend.data[i].name =
                            (module._yumChartData.chart.series[i].seriesName !==
                             undefined) ?
                            module._yumChartData.chart.series[i].seriesName :
                            "series" + i;

                        module._echartsChartData.series[i].label = {
                            normal: {
                                show     : true,
                                position : "right",
                                textStyle: {
                                    fontWeight: "normal",
                                    fontSize  : 12
                                },
                                formatter: "{c}"
                            }
                        };

                        module._echartsChartData.series[i].label.normal.show =
                            (module._yumChartData.chart.showLabel !==
                             undefined || "") ?
                            module._yumChartData.chart.showLabel : false;

                        for (var j = 0; j < n; j++) {
                            module._echartsChartData.series[i].data[j] = {
                                name : "",
                                value: 0
                            };
                            module._echartsChartData.series[i].data[j].name =
                                (module._yumChartData.chart.series[i].data[j].labely !==
                                 undefined) ?
                                module._yumChartData.chart.series[i].data[j].labely :
                                "";
                            module._echartsChartData.series[i].data[j].value =
                                [];
                            module._echartsChartData.series[i].data[j].value =
                                (module._yumChartData.chart.series[i].data[j].x !==
                                 undefined) ?
                                module._yumChartData.chart.series[i].data[j].x :
                                "-";
                            module._echartsChartData.yAxis.data[j] =
                                (module._yumChartData.chart.series[i].data[j].labely !==
                                 undefined) ?
                                module._yumChartData.chart.series[i].data[j].labely :
                                "";
                        }
                    }

                    break;

                case "bar_vertical_stack":
                    var l = module._yumChartData.chart.series.length;

                    module._echartsChartData.title.text =
                        (module._yumChartData.chart.title !== undefined) ?
                        module._yumChartData.chart.title : "";
                    module._echartsChartData.xAxis.name =
                        (module._yumChartData.chart.xtitle !== undefined) ?
                        module._yumChartData.chart.xtitle : "";
                    module._echartsChartData.yAxis.name =
                        (module._yumChartData.chart.ytitle !== undefined) ?
                        module._yumChartData.chart.ytitle : "";
                    module._echartsChartData.tooltip = {
                        show       : true,
                        trigger    : "axis",
                        axisPointer: { type: "shadow" }
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
                        module._echartsChartData.series[i].name =
                            (module._yumChartData.chart.series[i].seriesName !==
                             undefined) ?
                            module._yumChartData.chart.series[i].seriesName :
                            "series" + i;
                        module._echartsChartData.series[i].stack = "stack";

                        module._echartsChartData.legend.data[i] = { name: "" };
                        module._echartsChartData.legend.data[i].name =
                            (module._yumChartData.chart.series[i].seriesName !==
                             undefined) ?
                            module._yumChartData.chart.series[i].seriesName :
                            "series" + i;

                        module._echartsChartData.series[i].label = {
                            normal: {
                                show     : true,
                                position : "inside",
                                textStyle: {
                                    fontWeight: "normal",
                                    fontSize  : 12
                                },
                                formatter: "{c}"
                            }
                        };

                        module._echartsChartData.series[i].label.normal.show =
                            (module._yumChartData.chart.showLabel !==
                             undefined || "") ?
                            module._yumChartData.chart.showLabel : false;

                        for (var j = 0; j < n; j++) {
                            module._echartsChartData.series[i].data[j] = {
                                name : "",
                                value: 0
                            };
                            module._echartsChartData.series[i].data[j].name =
                                module._yumChartData.chart.series[i].data[j].labelx ||
                                "";
                            module._echartsChartData.series[i].data[j].value =
                                [];
                            module._echartsChartData.series[i].data[j].value =
                                (module._yumChartData.chart.series[i].data[j].y !==
                                 undefined) ?
                                module._yumChartData.chart.series[i].data[j].y :
                                "-";
                            module._echartsChartData.xAxis.data[j] =
                                (module._yumChartData.chart.series[i].data[j].labelx !==
                                 undefined) ?
                                module._yumChartData.chart.series[i].data[j].labelx :
                                "";
                        }
                    }

                    break;

                case "bar_horizon_stack":
                    var l = module._yumChartData.chart.series.length;

                    module._echartsChartData.title.text =
                        (module._yumChartData.chart.title !== undefined) ?
                        module._yumChartData.chart.title : "";
                    module._echartsChartData.xAxis.name =
                        (module._yumChartData.chart.xtitle !== undefined) ?
                        module._yumChartData.chart.xtitle : "";
                    module._echartsChartData.yAxis.name =
                        (module._yumChartData.chart.ytitle !== undefined) ?
                        module._yumChartData.chart.ytitle : "";
                    module._echartsChartData.tooltip = {
                        show       : true,
                        trigger    : "axis",
                        axisPointer: { type: "shadow" }
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
                        module._echartsChartData.series[i].name =
                            (module._yumChartData.chart.series[i].seriesName !==
                             undefined) ?
                            module._yumChartData.chart.series[i].seriesName :
                            "series" + i;

                        module._echartsChartData.series[i].stack = "stack";
                        module._echartsChartData.legend.data[i] = { name: "" };
                        module._echartsChartData.legend.data[i].name =
                            (module._yumChartData.chart.series[i].seriesName !==
                             undefined) ?
                            module._yumChartData.chart.series[i].seriesName :
                            "series" + i;

                        module._echartsChartData.series[i].label = {
                            normal: {
                                show     : true,
                                position : "inside",
                                textStyle: {
                                    fontWeight: "normal",
                                    fontSize  : 12
                                },
                                formatter: "{c}"
                            }
                        };

                        module._echartsChartData.series[i].label.normal.show =
                            (module._yumChartData.chart.showLabel !==
                             undefined || "") ?
                            module._yumChartData.chart.showLabel : false;

                        for (var j = 0; j < n; j++) {
                            module._echartsChartData.series[i].data[j] = {
                                name : "",
                                value: 0
                            };
                            module._echartsChartData.series[i].data[j].name =
                                module._yumChartData.chart.series[i].data[j].labely ||
                                "";
                            module._echartsChartData.series[i].data[j].value =
                                [];
                            module._echartsChartData.series[i].data[j].value =
                                (module._yumChartData.chart.series[i].data[j].x !==
                                 undefined) ?
                                module._yumChartData.chart.series[i].data[j].x :
                                "-";
                            module._echartsChartData.yAxis.data[j] =
                                (module._yumChartData.chart.series[i].data[j].labely !==
                                 undefined) ?
                                module._yumChartData.chart.series[i].data[j].labely :
                                "";
                        }
                    }

                    break;

                case "pie":
                    var l = module._yumChartData.chart.series.length;

                    module._yumChartData.chart.pieAlignment =
                        (module._yumChartData.chart.pieAlignment !==
                         undefined || "") ?
                        module._yumChartData.chart.pieAlignment : "tiled";

                    var calcPos = {
                        getPercentPosPie: function () {
                            if (module._yumChartData.chart.pieAlignment ==
                                "polygon") {
                                if (l === 1) {
                                    return [{ x: "50%", y: "50%" }];

                                } else if (l === 2) {
                                    return [{ x: "33%", y: "50%" }, {
                                        x: "67%",
                                        y: "50%"
                                    }];

                                } else {
                                    var calcOffset = function (namVertices,
                                                               radius) {
                                        var _n = (namVertices !== undefined) ?
                                                 Math.round(namVertices) : 3;
                                        var _r = (radius !== undefined) ?
                                                 radius : 300;
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
                                            var vertX = Math.round(
                                                _r * Math.cos(A));
                                            var vertY = Math.round(
                                                _r * Math.sin(A));
                                            v.push({ x: vertX, y: vertY });
                                        }

                                        return v;
                                    };

                                    var calcMainRadius = function () {
                                        if (module.__tempYumChartInfo__.height <
                                            module.__tempYumChartInfo__.width) {
                                            return module.__tempYumChartInfo__.height *
                                                   0.50;
                                        } else {
                                            return module.__tempYumChartInfo__.width *
                                                   0.50;
                                        }
                                    };

                                    var offsetArray = calcOffset(l,
                                                                 calcMainRadius());

                                    var posArray = [];
                                    var percentPosArray = [];

                                    for (var p = 0; p < l; p++) {
                                        posArray[p] = {
                                            x: (module.__tempYumChartInfo__.width +
                                                offsetArray[p].x) / 2,
                                            y: (module.__tempYumChartInfo__.height +
                                                offsetArray[p].y + 50) / 2
                                        };

                                        percentPosArray[p] = {
                                            x: (posArray[p].x /
                                                module.__tempYumChartInfo__.width *
                                                100).toFixed(2) + "%",
                                            y: (posArray[p].y /
                                                module.__tempYumChartInfo__.height *
                                                100).toFixed(2) + "%"
                                        };
                                    }

                                    return percentPosArray;
                                }

                            } else if (module._yumChartData.chart.pieAlignment ==
                                       "tiled") {
                                if (l == 1) {
                                    return [[{ x: "50%", y: "50%" }]];

                                } else if (l == 2) {
                                    return [[{ x: "33%", y: "50%" }, {
                                        x: "67%",
                                        y: "50%"
                                    }]];

                                } else {
                                    var _posArray = [];
                                    var _nPlus1 = Math.ceil(Math.sqrt(l));
                                    var _extraNum = l - (Math.pow(
                                            Math.floor(Math.sqrt(l)), 2));

                                    var calcBasePxs = function () {
                                        var _c = 0;
                                        for (var y = 0; y < _nPlus1; y++) {
                                            _posArray[y] = [];
                                            for (var x = 0; x < _nPlus1; x++) {
                                                if (_extraNum === 0) {
                                                    _posArray[y][x] = {
                                                        y: ((module.__tempYumChartInfo__.height +
                                                             50) /
                                                            (_nPlus1 + 1)) *
                                                           (y + 1),
                                                        x: ((module.__tempYumChartInfo__.width) /
                                                            (_nPlus1 + 1)) *
                                                           (x + 1)
                                                    };

                                                } else if (x == _nPlus1 - 1 ||
                                                           y == _nPlus1 - 1) {
                                                    if (_c < _extraNum ||
                                                        _extraNum === 0) {
                                                        if (_extraNum <=
                                                            (_nPlus1 - 1)) {
                                                            _posArray[y][x] = {
                                                                y: ((module.__tempYumChartInfo__.height +
                                                                     50) /
                                                                    (_nPlus1)) *
                                                                   (y + 1),
                                                                x: (module.__tempYumChartInfo__.width /
                                                                    (_nPlus1 +
                                                                     1)) *
                                                                   (x + 1)
                                                            };
                                                        } else {
                                                            _posArray[y][x] = {
                                                                y: ((module.__tempYumChartInfo__.height +
                                                                     50) /
                                                                    (_nPlus1 +
                                                                     0.9)) *
                                                                   (y + 1),
                                                                x: (module.__tempYumChartInfo__.width /
                                                                    (_nPlus1 +
                                                                     1)) *
                                                                   (x + 1)
                                                            };
                                                        }
                                                        if (_extraNum !== 0) {
                                                            _c++;
                                                        }
                                                    } else {
                                                        _posArray[y][x] = null;
                                                    }

                                                } else {
                                                    if (_extraNum <=
                                                        (_nPlus1 - 1)) {
                                                        _posArray[y][x] = {
                                                            y: ((module.__tempYumChartInfo__.height +
                                                                 50) /
                                                                (_nPlus1)) *
                                                               (y + 1),
                                                            x: (module.__tempYumChartInfo__.width /
                                                                (_nPlus1 + 1)) *
                                                               (x + 1)
                                                        };
                                                    } else {
                                                        _posArray[y][x] = {
                                                            y: ((module.__tempYumChartInfo__.height +
                                                                 50) /
                                                                (_nPlus1 +
                                                                 0.9)) *
                                                               (y + 1),
                                                            x: (module.__tempYumChartInfo__.width /
                                                                (_nPlus1 + 1)) *
                                                               (x + 1)
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
                                            for (var j = 0; j <
                                                            p[i].length; j++) {
                                                if (p[i][j] !== null) {
                                                    r[i][j] = {};
                                                    r[i][j].x = (p[i][j].x /
                                                                 module.__tempYumChartInfo__.width *
                                                                 100).toFixed(
                                                            2) + "%";
                                                    r[i][j].y = (p[i][j].y /
                                                                 module.__tempYumChartInfo__.height *
                                                                 100).toFixed(
                                                            2) + "%";
                                                } else {

                                                }
                                            }
                                        }
                                        return r;
                                    };

                                    var ret = calcBasePxs();
                                    return percentPA(ret);
                                }

                            } else {
                                console.log(
                                    "[YumStone.YumChart.__convertData__]" +
                                    "WARNING: Invalid pie alignment!");
                            }
                        },

                        calcEachPieRadius: function () {
                            if (module._yumChartData.chart.pieAlignment ==
                                "polygon") {
                                if (l === 1) {
                                    return "75%";
                                } else if (l === 2) {
                                    return "40%";
                                } else {
                                    if (module.__tempYumChartInfo__.height <
                                        module.__tempYumChartInfo__.width) {
                                        return (module.__tempYumChartInfo__.height *
                                                (1 / l) /
                                                module.__tempYumChartInfo__.height) *
                                               100 + "%";

                                    } else {
                                        return (module.__tempYumChartInfo__.width *
                                                (1 / l) /
                                                module.__tempYumChartInfo__.width) *
                                               100 + "%";
                                    }
                                }
                            } else if (module._yumChartData.chart.pieAlignment ==
                                       "tiled") {
                                if (l === 1) {
                                    return "75%";
                                } else if (l === 2) {
                                    return "40%";
                                } else {
                                    var _nPlus1 = Math.ceil(Math.sqrt(l));
                                    if (module.__tempYumChartInfo__.height <
                                        module.__tempYumChartInfo__.width) {
                                        return ((module.__tempYumChartInfo__.height /
                                                (_nPlus1 + 1)) /
                                                (module.__tempYumChartInfo__.height) *
                                                100 + "%");
                                    } else {
                                        return ((module.__tempYumChartInfo__.width /
                                                (_nPlus1 + 1)) /
                                                (module.__tempYumChartInfo__.width) *
                                                100 + "%");
                                    }
                                }
                            } else {

                            }
                        }
                    };

                    var percentPos = calcPos.getPercentPosPie();

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

                    module._echartsChartData.title.text =
                        (module._yumChartData.chart.title !== undefined) ?
                        module._yumChartData.chart.title : "";
                    module._echartsChartData.tooltip =
                    { show: true, trigger: "item" };

                    delete module._echartsChartData.xAxis;
                    delete module._echartsChartData.yAxis;

                    for (var i = 0; i < l; i++) {
                        module._echartsChartData.series[i] = {
                            name: "",
                            type: "",
                            data: []
                        };
                        module._echartsChartData.series[i].type = "pie";
                        module._echartsChartData.series[i].name =
                            module._yumChartData.chart.series[i].seriesName ||
                            "series" + i;
                        module._echartsChartData.series[i].radius = "50%";

                        module._echartsChartData.legend.data[i] = { name: "" };
                        module._echartsChartData.legend.data[i].name =
                            module._yumChartData.chart.series[i].seriesName ||
                            "series" + i;

                        module._echartsChartData.series[i].radius =
                            calcPos.calcEachPieRadius();

                        module._echartsChartData.series[i].avoidLabelOverlap =
                            true;
                        module._echartsChartData.series[i].label = {
                            normal: {
                                show     : true,
                                position : "outside",
                                textStyle: {
                                    fontWeight: "normal",
                                    fontSize  : 12
                                },
                                formatter: "{b}: {c} ({d}%)"
                            }
                        };

                        module._echartsChartData.series[i].labelLine = {
                            normal: {
                                show: true
                            }
                        };

                        module._echartsChartData.series[i].label.normal.show =
                            (module._yumChartData.chart.showLabel !==
                             undefined || "") ?
                            module._yumChartData.chart.showLabel : false;
                        module._echartsChartData.series[i].labelLine.normal.show =
                            (module._yumChartData.chart.showLabel !==
                             undefined || "") ?
                            module._yumChartData.chart.showLabel : false;

                        module._echartsChartData.series[i].center = [];
                        module._echartsChartData.series[i].center[0] =
                            tempPPA[i].x;
                        module._echartsChartData.series[i].center[1] =
                            tempPPA[i].y;

                        var n = module._yumChartData.chart.series[i].data.length;
                        for (var j = 0; j < n; j++) {
                            module._echartsChartData.series[i].data[j] = {
                                name : "",
                                value: ""
                            };
                            module._echartsChartData.series[i].data[j].name =
                                module._yumChartData.chart.series[i].data[j].labelx ||
                                "";
                            module._echartsChartData.series[i].data[j].value =
                                (module._yumChartData.chart.series[i].data[j].x !==
                                 undefined) ?
                                module._yumChartData.chart.series[i].data[j].x :
                                "-";
                        }
                    }

                    module._echartsChartData.toolbox.feature.magicType.show =
                        false;

                    break;

                default:
                    console.log("[YumStone.YumChart.__convertData__]" +
                                " WARNING: Invalid graph type!");
                    break;
            }
        } catch (err) {
            console.log(
                "[YumStone.YumChart.__convertData__] ERROR: " + err.message);
        }
    }

    module.setYumChartData = function (data) {
        data = data || null;
        if (data === null) {
            console.log("[YumStone.YumChart.setYumChartData] WARNING: Missing" +
                        " data parameter");
        } else {
            if (module.checkType.isString(data)) {
                try {
                    data = JSON.parse(data);

                    if (data.doctype === "YumChartData") {
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
                    JSON.stringify(data);

                    if (data.doctype === "YumChartData") {
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

    module.getYumChartData = function () {
        return module._yumChartData;
    };

    module.resetYumChartData = function () {
        module._yumChartData = null;
    };

    module.setEchartsChartData = function (data) {
        data = data || null;

        if (!module.checkType.isNull(data)) {
            module._echartsChartData = data;
        } else {
            if (module.checkType.isNull(module._yumChartData)) {
                console.log("[YumStone.YumChart.setEchartsChartData]" +
                            " WARNING: Use setYumChartData FIRST, then call this" +
                            " function!");
            } else {
                __convertData__();
            }
        }

    };

    module.getEchartsChartData = function () {
        return module._echartsChartData;
    };

    module.resetEchartsChartData = function () {
        module._echartsChartData = module._defaultEchartsChartData;
    };

    return module;
})(YumStone.YumChart || {});


YumStone.YumChart = (function (module) {
    module.__tempYumChartInfo__ = module.__tempYumChartInfo__ || {
            width : 400,
            height: 300,
            data  : null
        };

    module._yumChartInstance = null;

    module._yumChartInstanceData = null;

    function __generateYumChart__(containerElementId) {
        containerElementId = containerElementId || null;

        if (!module.checkType.isNull(containerElementId) &&
            module.checkType.isString(containerElementId)) {
            try {
                module._yumChartInstance =
                    echarts.init(document.getElementById(containerElementId));
            } catch (err) {
                console.log("[YumStone.YumChart.__generateYumChart__]" +
                            " ERROR: " + err.message);
            }
        } else {
            console.log("[YumStone.YumChart.__generateYumChart__] WARNING:" +
                        " Invalid containerElementId. Must be a string.");
        }
    }

    module.getYumChartInstance = function (containerElementId) {
        containerElementId = containerElementId || null;

        if (!module.checkType.isNull(containerElementId) &&
            module.checkType.isString(containerElementId)) {
            try {
                module._yumChartInstance = echarts.getInstanceByDom(
                    document.getElementById(containerElementId));
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

    module.getYumChartInstanceData = function (containerElementId) {
        containerElementId = containerElementId || null;

        if (!module.checkType.isNull(containerElementId) &&
            module.checkType.isString(containerElementId)) {
            try {
                return module.getYumChartInstance(
                    containerElementId).getOption();
            } catch (err) {
                console.log(
                    "[YumStone.YumChart.getYumChartInstanceData] ERROR: " +
                    err.message);
            }

        } else {
            console.log("[YumStone.YumChart.getYumChartInstanceData] WARNING:" +
                        " containerElementId must be a valid string!");
        }

    };

    module.setYumChartInstanceData = function (yumChartData) {
        yumChartData = yumChartData || null;

        if (!module.checkType.isNull(yumChartData) &&
            module.checkType.isString(yumChartData) ||
            module.checkType.isObject(yumChartData)) {
            try {
                module.setYumChartData(yumChartData);
                module.setEchartsChartData();
                module._yumChartInstance.showLoading();

                module._yumChartInstance.setOption(
                    module.getEchartsChartData());
                window.onresize = module._yumChartInstance.resize;
                module._yumChartInstance.hideLoading();
            } catch (err) {
                console.log(
                    "[YumStone.YumChart.getYumChartInstanceData] ERROR: " +
                    err.message);
            }

        } else {
            console.log("[YumStone.YumChart.getYumChartInstanceData] WARNING:" +
                        " containerElementId must be a valid string!");
        }

    };

    module.drawChart = function (containerElementId, yumChartData) {
        containerElementId = containerElementId || null;
        yumChartData = yumChartData || null;

        module.resetYumChartData();
        module.resetEchartsChartData();

        if (!module.checkType.isNull(containerElementId) &&
            !module.checkType.isNull(yumChartData) &&
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

    return module;
})(YumStone.YumChart || {});


YumStone.YumChart = (function (module) {
    module.misc = {};

    module.misc.toggleToolbox = function (containerElementId, bool) {
        containerElementId = (module.checkType.isString(containerElementId)) ?
                             containerElementId : null;
        bool = (module.checkType.isBool(bool)) ? bool : false;

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

    module.misc.toggleTitle = function (containerElementId, bool) {
        containerElementId = (module.checkType.isString(containerElementId)) ?
                             containerElementId : null;
        bool = (module.checkType.isBool(bool)) ? bool : false;

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

    module.misc.changeTitleFontSize = function (containerElementId, newSize) {
        containerElementId = (module.checkType.isString(containerElementId)) ?
                             containerElementId : null;
        newSize = (module.checkType.isNumber(newSize)) ? newSize : null;

        if (!module.checkType.isNull(containerElementId) &&
            !module.checkType.isNull(newSize)) {
            try {
                module.getYumChartInstance(containerElementId);
                module.setEchartsChartData(module.getYumChartInstanceData(
                    containerElementId));
                module._echartsChartData.title[0].textStyle.fontSize = newSize;
                module._yumChartInstance.setOption(module._echartsChartData);
            } catch (err) {
                console.log(
                    "[YumStone.YumChart.misc.changeTitleFontSize] ERROR: " +
                    err.message);
            }
        } else {
            console.log(
                "[YumStone.YumChart.misc.changeTitleFontSize] WARNING:" +
                " containerElementId must be a valid string!");
        }
    };

    module.misc.toggleXAxisLine = function (containerElementId, bool) {
        containerElementId = (module.checkType.isString(containerElementId)) ?
                             containerElementId : null;
        bool = (module.checkType.isBool(bool)) ? bool : false;

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

    module.misc.toggleYAxisLine = function (containerElementId, bool) {
        containerElementId = (module.checkType.isString(containerElementId)) ?
                             containerElementId : null;
        bool = (module.checkType.isBool(bool)) ? bool : false;

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

    module.misc.changeXAxisTitleFontSize =
        function (containerElementId, newSize) {
            containerElementId =
                (module.checkType.isString(containerElementId)) ?
                containerElementId : null;
            newSize = (module.checkType.isNumber(newSize)) ? newSize : null;

            if (!module.checkType.isNull(containerElementId) &&
                !module.checkType.isNull(newSize)) {
                try {
                    module.getYumChartInstance(containerElementId);
                    module.setEchartsChartData(module.getYumChartInstanceData(
                        containerElementId));
                    module._echartsChartData.xAxis[0].nameTextStyle.fontSize =
                        newSize;
                    module._yumChartInstance.setOption(
                        module._echartsChartData);
                } catch (err) {
                    console.log(
                        "[YumStone.YumChart.misc.changeXAxisTitleFontSize] ERROR: " +
                        err.message);
                }
            } else {
                console.log(
                    "[YumStone.YumChart.misc.changeXAxisTitleFontSize] WARNING:" +
                    " containerElementId must be a valid string!");
            }
        };

    module.misc.changeYAxisTitleFontSize =
        function (containerElementId, newSize) {
            containerElementId =
                (module.checkType.isString(containerElementId)) ?
                containerElementId : null;
            newSize = (module.checkType.isNumber(newSize)) ? newSize : null;

            if (!module.checkType.isNull(containerElementId) &&
                !module.checkType.isNull(newSize)) {
                try {
                    module.getYumChartInstance(containerElementId);
                    module.setEchartsChartData(module.getYumChartInstanceData(
                        containerElementId));
                    module._echartsChartData.yAxis[0].nameTextStyle.fontSize =
                        newSize;
                    module._yumChartInstance.setOption(
                        module._echartsChartData);
                } catch (err) {
                    console.log(
                        "[YumStone.YumChart.misc.changeYAxisTitleFontSize] ERROR: " +
                        err.message);
                }
            } else {
                console.log(
                    "[YumStone.YumChart.misc.changeYAxisTitleFontSize] WARNING:" +
                    " containerElementId must be a valid string!");
            }
        };

    module.misc.toggleLabel = function (containerElementId, bool) {
        containerElementId = (module.checkType.isString(containerElementId)) ?
                             containerElementId : null;
        bool = (module.checkType.isBool(bool)) ? bool : false;

        if (!module.checkType.isNull(containerElementId)) {
            try {
                module.getYumChartInstance(containerElementId);
                module.setEchartsChartData(module.getYumChartInstanceData(
                    containerElementId));

                for (var i = 0; i <
                                module._echartsChartData.series.length; i++) {
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

    module.misc.toggleLabelLine = function (containerElementId, bool) {
        containerElementId = (module.checkType.isString(containerElementId)) ?
                             containerElementId : null;
        bool = (module.checkType.isBool(bool)) ? bool : false;

        if (!module.checkType.isNull(containerElementId)) {
            try {
                module.getYumChartInstance(containerElementId);
                module.setEchartsChartData(module.getYumChartInstanceData(
                    containerElementId));

                for (var i = 0; i <
                                module._echartsChartData.series.length; i++) {
                    module._echartsChartData.series[i].labelLine.normal.show =
                        bool;
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

    module.misc.changeChartColors = function (containerElementId, colorArray) {
        containerElementId = (module.checkType.isString(containerElementId)) ?
                             containerElementId : null;
        colorArray = (module.checkType.isArray(colorArray)) ? colorArray : null;

        if (!module.checkType.isNull(containerElementId) &&
            !module.checkType.isNull(colorArray)) {
            try {
                module.getYumChartInstance(containerElementId);
                module.setEchartsChartData(module.getYumChartInstanceData(
                    containerElementId));
                module._echartsChartData.color = colorArray;
                module._yumChartInstance.setOption(module._echartsChartData);
            } catch (err) {
                console.log(
                    "[YumStone.YumChart.misc.changeChartColors] ERROR: " +
                    err.message);
            }
        } else {
            console.log("[YumStone.YumChart.misc.changeChartColors] WARNING:" +
                        " containerElementId must be a valid string!");
        }
    };

    module.misc.changeLabelFontSize = function (containerElementId, newSize) {
        containerElementId = (module.checkType.isString(containerElementId)) ?
                             containerElementId : null;
        newSize = (module.checkType.isNumber(newSize)) ? newSize : null;

        if (!module.checkType.isNull(containerElementId) &&
            !module.checkType.isNull(newSize)) {
            try {
                module.getYumChartInstance(containerElementId);
                module.setEchartsChartData(module.getYumChartInstanceData(
                    containerElementId));

                for (var i = 0; i <
                                module._echartsChartData.series.length; i++) {
                    module._echartsChartData.series[i].label.normal.textStyle =
                    {};
                    module._echartsChartData.series[i].label.normal.textStyle.fontSize =
                        newSize;
                }

                module._yumChartInstance.setOption(module._echartsChartData);
            } catch (err) {
                console.log(
                    "[YumStone.YumChart.misc.changeLabelFontSize] ERROR: " +
                    err.message);
            }
        } else {
            console.log(
                "[YumStone.YumChart.misc.changeLabelFontSize] WARNING:" +
                " containerElementId must be a valid string!");
        }
    };

    return module;
})(YumStone.YumChart || {});
