define(function (require) {
    return React.createClass({
        getInitialState: function () {
            return {
                light: {},
                selected: ''
            };
        },
        clickHandler: function (e) {
            var cmd = e.target.dataset.cmd || 'select';
            var uuid = e.target.dataset.light || e.target.parentNode.dataset.light;
            var cmd = 'tool-light' + cmd.replace(/(\w)/,function(v){return v.toUpperCase()});
            this.props.commandRouting(cmd, uuid);
        },
        render: function () {
            var lights = [];
            var me = this;
            for (var key in this.state.light) {
                if (!this.state.light.hasOwnProperty(key)) continue;
                lights.push(this.state.light[key]);
            }
            var boxProp = {
                className: 'mesh-tree light-list',
                style: {
                    display: lights.length ? 'block' : 'none'
                }
            };
            return (
                <div {...boxProp}>{lights.map(produceLight)}</div>
            );
            function produceLight(item) {
                var visible = 'iconfont icon-' + (item.visible ? 'kejian' : 'bukejian');
                var locked = 'iconfont icon-' + (item.locked ? 'suo1' : 'suo');
                var name = item.name || (item.type.replace('Light', '') + ' '
                    + new Date(item.birth).format('MM/DD hh:mm:ss'));
                var lightProp = {
                    className: 'mesh-item' + (me.state.selected.indexOf(item.uuid + ';') > -1 ? ' selected' : ''),
                    'data-light': item.uuid,
                    onClick: me.clickHandler
                };
                return (
                    <div {...lightProp}>
                        <div data-cmd="delete" className="iconfont icon-shanchu"></div>
                        <div data-cmd="visible" className={visible}></div>
                        <div data-cmd="lock" className={locked}></div>
                        <div className="label">{name}</div>
                    </div>
                );
            }
        }
    });
});
