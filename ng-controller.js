angular.module('app.controller', ['ui-leaflet'])

    .controller('mapCtrl', function ($scope) {

        var radar_pl = {
            name: 'ข้อมูลฝนจาก Radar: พิษณุโลก',
            type: 'imageOverlay',
            visible: true,
            url: 'http://rain.tvis.in.th/output/PHS.png',
            bounds: [[19.094393, 102.475537], [14.411350, 97.983591]],
            layerParams: {
                noWrap: true,
                zIndex: 2
            },
            layerOptions: {
                format: "image/png",
                opacity: 1,
            },
            group: "Open Fire Map"
        };
        var province = {
            name: 'ขอบเขตจังหวัด',
            type: 'wms',
            visible: true,
            url: 'http://map.nu.ac.th/gs-alr2/ows?',
            layerParams: {
                layers: 'alr:ln9p_prov',
                format: 'image/png',
                transparent: true,
                CQL_FILTER: "prov_code IN ('65')",
                zIndex: 3
            },
            layerOptions: {
                format: "image/png",
                opacity: 1,
            },
            group: "Open Fire Map"
        };
        var amphoe = {
            name: 'ขอบเขตอำเภอ',
            type: 'wms',
            visible: true,
            url: 'http://map.nu.ac.th/gs-alr2/ows?',
            layerParams: {
                layers: 'alr:ln9p_amp',
                format: 'image/png',
                transparent: true,
                CQL_FILTER: "prov_code IN ('65')",
                zIndex: 4
            },
            layerOptions: {
                format: "image/png",
                opacity: 1,
            },
            group: "Open Fire Map"
        };

        var tambon = {
            name: 'ขอบเขตตำบล',
            type: 'wms',
            visible: true,
            url: 'http://map.nu.ac.th/gs-alr2/ows?',
            layerParams: {
                layers: 'alr:ln9p_tam',
                format: 'image/png',
                transparent: true,
                CQL_FILTER: "prov_code IN ('65')",
                zIndex: 5
            },
            layerOptions: {
                format: "image/png",
                opacity: 1,
            },
            group: "Open Fire Map"
        };

        var village = {
            name: 'หมู่บ้าน',
            type: 'wms',
            visible: true,
            url: 'http://map.nu.ac.th/gs-alr2/ows?',
            layerParams: {
                layers: 'alr:ln9p_vill',
                format: 'image/png',
                transparent: true,
                CQL_FILTER: "prov_code IN ('65')",
                zIndex: 6
            },
            layerOptions: {
                format: "image/png",
                opacity: 1,
            },
            group: "Open Fire Map"
        };

        var pos = {
            lat: 16.76961242260528,
            lng: 100.19834339618683,
        };

        var myhouse = {
                lat: pos.lat,
                lng: pos.lng,
                focus: true,
                message: "สังเกตุ, ถ้ามีกลุ่มเมฆในวงกลมแดง</br>แสดงว่ามีฝนใกล้ๆ บ้านเรา (10km)",
                draggable: false
            };
        var circleMarker = {
                    type: "circle",
                    weight: 1,
		            color: '#ff612f',
                    fillOpacity: 0.1,
                    radius: 10000,
                    latlngs: pos
                };
        

        angular.extend($scope, {
            center: {
                lat: pos.lat,
                lng: pos.lng,
                zoom: 10
            },
            markers: {
                    myhouse: angular.copy(myhouse)
                },
            
            paths: {
                    circleMarker
            },
            layercontrol: {
                icons: {
                    uncheck: "fa fa-toggle-off",
                    check: "fa fa-toggle-on"
                }
            },

            layers: {
                baselayers: {
                    cycle: {
                        name: 'OpenCycleMap',
                        type: 'xyz',
                        url: 'http://{s}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png',
                        layerOptions: {
                            subdomains: ['a', 'b', 'c'],
                            attribution: '&copy; <a href="http://www.opencyclemap.org/copyright">OpenCycleMap</a> contributors - &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
                            continuousWorld: true
                        }
                    },
                    osm: {
                        name: 'OpenStreetMap',
                        type: 'xyz',
                        url: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
                        layerOptions: {
                            subdomains: ['a', 'b', 'c'],
                            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
                            continuousWorld: true
                        }
                    }
                },
                overlays: {
                    province: province,
                    radar_pl: radar_pl
                }
            },           

            //village
            removeVillageLayer: function () {
                delete this.layers.overlays.village;
            },
            addVillageLayer: function () {
                this.layers.overlays.village = village
            },

            //tambon
            removeTambonLayer: function () {
                delete this.layers.overlays.tambon;
            },
            addTambonLayer: function () {
                this.layers.overlays.tambon = tambon
            },
            // case of exists
            // existsTambonLayer: function () {
            //     return ("tambon" in this.layers.overlays);
            // },

            //amphoe
            removeAmphoeLayer: function () {
                delete this.layers.overlays.amphoe;
            },
            addAmphoeLayer: function () {
                this.layers.overlays.amphoe = amphoe
            },

            //province
            removeProvinceLayer: function () {
                delete this.layers.overlays.province;
            },
            addProvinceLayer: function () {
                this.layers.overlays.province = province
            },

            //pl radar
            removeRadar_plLayer: function () {
                delete this.layers.overlays.radar_pl;
            },
            addRadar_plLayer: function () {
                this.layers.overlays.radar_pl = radar_pl
            },


        })

        //console.log($scope.center);

        $scope.checkboxModel = {
            vill: false,
            tambon: false,
            amphoe: false,            
            province: true,
            radar_pl: true
        };

        $scope.showLayers = function (val) {
            console.log(val);

            if (val == 'village') {
                if ($scope.checkboxModel.vill == true) {
                    $scope.addVillageLayer();
                } else {
                    $scope.removeVillageLayer();
                }
            } else if (val == 'tambon') {
                if ($scope.checkboxModel.tambon == true) {
                    $scope.addTambonLayer();
                } else {
                    $scope.removeTambonLayer();
                }
            }else if (val == 'amphoe') {
                if ($scope.checkboxModel.amphoe == true) {
                    $scope.addAmphoeLayer();
                } else {
                    $scope.removeAmphoeLayer();
                }
            }else if (val == 'province') {
                if ($scope.checkboxModel.province == true) {
                    $scope.addProvinceLayer();
                } else {
                    $scope.removeProvinceLayer();
                }
            }else if (val == 'radar_pl') {
                if ($scope.checkboxModel.radar_pl == true) {
                    $scope.addRadar_plLayer();
                } else {
                    $scope.removeRadar_plLayer();
                }
            }



        }

    })