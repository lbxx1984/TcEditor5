/**
 * @file 主配置
 * @author Brian Li
 * @email lbxxlht@163.com
 */
define(function (require) {


    return {
        menu: [
            {
                label: 'File',
                children: [
                    {
                        label: 'Open', value: 'file-open', hotKey: 'ctrl + o'
                    },
                    {
                        label: 'Save', value: 'file-save', hotKey: 'ctrl + s'
                    },
                    {
                        label: 'Save As', value: 'file-saveAs', hotKey: 'ctrl + shift + s'
                    },
                    {
                        label: 'Import', value: 'file-import'
                    },
                    {
                        label: 'Export', value: 'file-export'
                    }
                ]
            },
            {
                label: 'View',
                key: 'view',
                children: [
                    {
                        label: 'Show Meshes Panel', value: 'view-meshPanel', key: 'meshPanel'
                    },
                    {
                        label: 'Show Camera Panel', value: 'view-cameraPanel', key: 'cameraPanel'
                    }
                ]
            },
            {
                label: 'Geometry',
                children: [
                    {
                        label: 'Plane', value: 'geometry-plane;tool'
                    }
                ]
            }
        ],
        command: [
            'VIEWS',
            {
                label: '3D', value: 'view-3d', title: '3D view (1)'
            },
            {
                label: 'XOZ', value: 'view-xoz', title: 'XOZ view (2)'
            },
            {
                label: 'XOY', value: 'view-xoy', title: 'XOY view (3)'
            },
            {
                label: 'ZOY', value: 'view-zoy', title: 'ZOY view (4)'
            },
            'TOOLS',
            {
                icon: 'icon-yidong', value: 'tools-pickGeometry', title: 'pick up geometry (D)'
            },
            {
                icon: 'icon-shuxingxuanze', value: 'tools-pickJoint', title: 'pick up joints of geometry (F)'
            },
            {
                icon: 'icon-bulb', value: 'tools-pickLight', title: 'pick up light source (L)'
            },
            'CAMERA',
            {
                icon: 'icon-yidong1', value: 'camera-move', title: 'move camera (M)'
            },
            {
                icon: 'icon-fangda', value: 'camera-zoomIn', title: 'zoom in (MOUSE WHEEL UP)'
            },
            {
                icon: 'icon-suoxiao', value: 'camera-zoomOut', title: 'zoom out (MOUSE WHEEL DOWN)'
            },
            {
                icon: 'icon-reset', value: 'camera-reset', title: 'reset camera'
            },
            'GRID',
            {
                icon: 'icon-pingmufangda', value: 'stage-enlargeGrid', title: 'enlarge grid'
            },
            {
                icon: 'icon-pingmusuoxiao', value: 'stage-narrowGrid', title: 'narrow grid'
            },
            {
                icon: 'icon-kejian', value: 'stage-helperVisible', title: 'hide/show stage helper'
            }
        ]
    };


});
