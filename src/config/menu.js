define(function (require) {
    return [
        {
            label: 'File',
            cmd: 'show-file',
            children: [
                {label: 'Open', cmd: 'pop-open', hotKey: 'ctrl + o'},
                {label: 'Save', cmd: 'pop-save', hotKey: 'ctrl + s'},
                {label: 'Save As', cmd: 'pop-saveas', hotKey: 'ctrl + shift + s'},
                {label: 'Import', cmd: 'pop-import'},
                {label: 'Export', cmd: 'pop-export'}
            ]
        },
        {
            label: 'Geometry',
            cmd: 'show-geometry',
            children: [
                {label: 'Plane', cmd: 'create-plane'}
            ]
        }
    ];
});