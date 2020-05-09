var fontSize = document.documentElement;
var screenWidth = document.documentElement.offsetWidth;
/* var screenHeight = document.documentElement.offsetHeight;
console.log(screenWidth);
console.log(screenHeight); */
fontSize.style.fontSize = screenWidth * 0.01 + "px";
/* console.log("fontSize：" + screenWidth * 0.01); */
$(window).resize(function () {
    /*  console.log("窗口大小改变了"); */
    /* location.reload() */
});
var enter = document.getElementById("enter");
enter.addEventListener("click", function () {
    var background = document.getElementById("background");
    background.className = "moveRight";
});
var maskbar = document.getElementById("maskbar");
maskbar.addEventListener("click", function () {
    var background = document.getElementById("background");
    background.className = "moveLeft";
});



/* map ArcGis */
/* 底图 */
require([
    "esri/Map",
    "esri/views/MapView",
    "esri/widgets/Compass",
    "esri/widgets/ScaleBar",
    "esri/Graphic",
    "esri/layers/GraphicsLayer",
    "esri/widgets/Legend",
    "esri/layers/FeatureLayer"
], function (Map, MapView, Compass, ScaleBar,Graphic, GraphicsLayer,Legend, FeatureLayer) {
var layer1 = new FeatureLayer({
    url: "http://www.arcgisonline.cn/server/rest/services/Hosted/0505%E5%85%A8%E7%90%83%E7%96%AB%E6%83%85%E4%BF%A1%E6%81%AF/FeatureServer"
});
    var map = new Map({
        basemap: "topo-vector",
    layers: [layer1]
    });

    var view = new MapView({
        container: "middle_right",
        map: map,
        center: [-118.265878,34.0433], // longitude, latitude
        zoom: 12
    });
    //图例
    
  var legend = new Legend({
    view: view,
    layerInfos: [{
        layer: layer1,
        title: "全球疫情信息"
    }]
});
    view.ui.add(legend, "top-right");
    /* 坐标信息 */
    var coordsWidget = document.createElement("coordinate");
    coordsWidget.id = "coordsWidget";
    coordsWidget.className = "esri-widget esri-component";
    coordsWidget.style.padding = "7px 15px 5px";
    view.ui.add(coordsWidget, "bottom-right");
    /* 获取坐标函数 */
    function showCoordinates(pt) {
        var coords = "Lat/Lon " + pt.latitude.toFixed(3) + " " + pt.longitude.toFixed(3) +
            " | Scale 1:" + Math.round(view.scale * 1) / 1 +
            " | Zoom " + view.zoom;
        coordsWidget.innerHTML = coords;
    }
    /* 监听指针移动事件 */
    view.watch("stationary", function (isStationary) {
        showCoordinates(view.center);
    });

    view.on("pointer-move", function (evt) {
        showCoordinates(view.toMap({ x: evt.x, y: evt.y }));
    });
    /* 指南针 */
    var compass = new Compass({
        view: view
    });
    view.ui.add(compass, "top-left");
    /* 比例尺 */
    var scaleBar = new ScaleBar({
        view: view
    });
    view.ui.add(scaleBar, {
        position: "bottom-left"
    });
    /* 多边形 */
    var graphicsLayer = new GraphicsLayer();
    map.add(graphicsLayer);
    /* 点 */
    var point = {
        type: "point",
        longitude: -118.265936,
        latitude: 34.043318
      };

      var simpleMarkerSymbol = {
        type: "simple-marker",
        color: [226, 119, 40],  // orange
        outline: {
          color: [255, 255, 255], // white
          width: 1
        }
      };

      var pointGraphic = new Graphic({
        geometry: point,
        symbol: simpleMarkerSymbol
      });

      graphicsLayer.add(pointGraphic);
      /* 线 */
      var simpleLineSymbol = {
        type: "simple-line",
        color: [226, 119, 40], // orange
        width: 2
      };

      var polyline = {
        type: "polyline",
        paths: [
            [151.20358,-33.870175],//澳大利亚达令港
            [78.042155,27.175015],//印度
            [37.620795,55.75393],//红
            [-112.113001,36.106964],//大峡谷
          [-118.265936,34.043318],//nba
          [151.20358,-33.870175],//澳大利亚达令港
        ]
      };

      var polylineGraphic = new Graphic({
        geometry: polyline,
        symbol: simpleLineSymbol
      })

      graphicsLayer.add(polylineGraphic);
      /* 多边形 */
      var polygon = {
        type: "polygon",
        rings: [
            [151.20358,-33.870175],//澳大利亚达令港
            [78.042155,27.175015],//印度
            [37.620795,55.75393],//红
            [-112.113001,36.106964],//大峡谷
          [-118.265936,34.043318],//nba
          [151.20358,-33.870175],//澳大利亚达令港
        ]
      };

      var simpleFillSymbol = {
        type: "simple-fill",
        color: [227, 139, 79, 0.8],  // orange, opacity 80%
        outline: {
          color: [255, 255, 255],
          width: 1
        }
      };

      var polygonGraphic = new Graphic({
        geometry: polygon,
        symbol: simpleFillSymbol
      });

      graphicsLayer.add(polygonGraphic);
      
});
