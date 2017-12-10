/**
 * @file 主配置
 * @author Brian Li
 * @email lbxxlht@163.com
 */
export default {
    editorTitle: 'TcEditor 5',
    arrestedHotKey: [
        'ctrl + o',
        'ctrl + s',
        'ctrl + d',
        'ctrl + f',
        'ctrl + g',
        'ctrl + e',
        'ctrl + r',
        'ctrl + t',
        'ctrl + i',
        'alt + e',
        'alt + d',
        'f1',
        'f5'
    ],
    // 物体主要色配置
    colors: {
        normalMeshHover: [0xffff00, '#d97915'],
        selectedMesh: [0xd97915, '#d97915']
    },
    // 菜单配置
    menu: [
        {
            label: 'File',
            children: [
                {
                    label: 'New', value: 'file-new'
                },
                {
                    label: 'Open', value: 'file-open', hotKey: 'Ctrl + O'
                },
                {
                    label: 'Save', value: 'file-save', hotKey: 'Ctrl + S'
                },
                {
                    label: 'Save As', value: 'file-saveAs', hotKey: 'Ctrl + Shift + S'
                },
                {
                    label: 'Import', value: 'file-import', hotKey: 'Ctrl + Shift + I'
                },
                {
                    label: 'Export', value: 'file-export', hotKey: 'Ctrl + Shift + E'
                }
            ]
        },
        {
            label: 'View',
            key: 'view',
            children: [
                {
                    label: 'Mesh List', value: 'view-meshPanel', key: 'meshPanel'
                },
                {
                    label: 'Light List', value: 'view-lightPanel', key: 'lightPanel'
                },
                {
                    label: 'Geometry Editor', value: 'view-geoEditor', key: 'geoEditor'
                },
                {
                    label: 'Material Editor', value: 'view-mtlEditor', key: 'mtlEditor'
                }
            ]
        },
        {
            label: 'Geometry',
            children: [
                {
                    label: 'Plane', value: 'geometry-plane;tool'
                },
                {
                    label: 'Sphere', value: 'geometry-sphere;tool'
                }
            ]
        },
        {
            label: 'Help',
            children: [
                {
                    label: 'Hotkey', value: 'help-hotkey', hotKey: 'F1'
                }
            ]
        }
    ],
    // 命令栏配置
    command: [
        'VIEWS',
        {
            label: '3D', value: 'view-3d', title: '3D view (Alt + 1)'
        },
        {
            label: 'XOZ', value: 'view-xoz', title: 'XOZ view (Alt + 2)'
        },
        {
            label: 'XOY', value: 'view-xoy', title: 'XOY view (Alt + 3)'
        },
        {
            label: 'ZOY', value: 'view-zoy', title: 'ZOY view (Alt + 4)'
        },
        {
            icon: 'tc-icon-screen4', value: 'view-all', title: 'ALL view (Alt + 5)'
        },
        'TOOLS',
        {
            icon: 'tc-icon-pickup-mesh', value: 'tool-pickGeometry', title: 'pick up geometry (Ctrl + D)'
        },
        {
            icon: 'tc-icon-pickup-joint', value: 'tool-pickJoint', title: 'pick up joint (Ctrl + F)'
        },
        {
            icon: 'tc-icon-light', value: 'tool-pickLight', title: 'pick up light (Ctrl + G)'
        },
        'CAMERA',
        {
            icon: 'tc-icon-trans', value: 'camera-move', title: 'move camera (Ctrl + E)'
        },
        {
            icon: 'tc-icon-zoom-in', value: 'camera-zoomIn', title: 'zoom in (MOUSE WHEEL UP)'
        },
        {
            icon: 'tc-icon-zoom-out', value: 'camera-zoomOut', title: 'zoom out (MOUSE WHEEL DOWN)'
        },
        {
            icon: 'tc-icon-reset', value: 'camera-reset', title: 'reset camera'
        },
        'GRID',
        {
            icon: 'tc-icon-enlarge', value: 'stage-enlargeGrid', title: 'enlarge grid'
        },
        {
            icon: 'tc-icon-narrow', value: 'stage-narrowGrid', title: 'narrow grid'
        },
        {
            icon: 'tc-icon-visible', value: 'stage-helperVisible', title: 'hide/show stage helper'
        }
    ],
    // 变形工具集
    transformer3DTools: [
        {icon: 'tc-icon-trans', value: 'transformer-3d-mode-translate', title: '(Ctrl + R)'},
        {icon: 'tc-icon-rotate', value: 'transformer-3d-mode-rotate', title: '(Ctrl + R)'},
        {icon: 'tc-icon-plus', value: 'transformer-3d-size-enlarge'},
        {icon: 'tc-icon-minus', value: 'transformer-3d-size-narrow'},
        {icon: 'tc-icon-earth', value: 'transformer-3d-space'}
    ],
    morpher3DTools: [
        {icon: 'tc-icon-color', value: 'morpher-3d-anchor-color'},
        {icon: 'tc-icon-plus', value: 'morpher-3d-size-enlarge'},
        {icon: 'tc-icon-minus', value: 'morpher-3d-size-narrow'}
    ]
}
