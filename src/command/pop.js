define(function (require) {


    var Dialog = require('uiTool/dialog');
    var Alert = require('uiTool/alert');


    /**
     * 打开explorer
     *
     * @param {Object} me routing对象
     * @param {string} mode explorer工作模式，open,save
     * @param {Function} callback 成功选择文件或创建文件后的回调，回传文件路径
     *                            explorer不负责创建文件，只回传路径
     */
    function openExplorer(me, mode, callback) {
        var hotkey = '|backspace|enter|esc|';
        var dialog = new Dialog({
            onClose: function () {
                me.keyboard.removeListener(hotkey);
            }
        });
        me.keyboard.addListener(hotkey, function (e) {
            switch (e) {
                case 'backspace': dialog.ui.content.upClickHandler();break;
                case 'enter': dialog.ui.content.enterClickHandler();break;
                case 'esc': dialog.close();break;
                default: break;
            }
        });
        dialog.pop({
            title: mode === 'save' ? 'Save' : 'Open',
            content: require('component/explorer.jsx'),
            focus: 'inputbox',
            props: {
                fs: me.fs,
                mode: mode,
                button1: mode === 'save' ? 'Save' : 'Open',
                onEnter: function (path) {
                    callback(path);
                    dialog.close();
                }
            }
        });
    }


    /**
     * 保存editor配置到本地
     *
     * @param {Object} me routing对象
     * @param {Function} callback 保存成功后回调
     */
    function writeEditorConf(me, callback) {
        var confPath = '/' + window.editorKey + '/' + window.editorKey + 'conf';
        var editorConf = new Blob([me.io.getEditorConf()]);
        me.fs.write(confPath, {data: editorConf}, function (result) {
            if (result instanceof FileError) {
                var alert = new Alert();
                alert.pop({message: 'Fail to Save System Configuration!'});
            }
            if (typeof callback === 'function') callback();
        });
    }


    /**
     * 保存当前文件
     *
     * @param {Object} me routing对象
     * @param {Function} callback 保存成功后回调
     */
    function writeFile(me, callback) {
        var filePath = me.filePath;
        var fileContent = {
            meshes: me.io.getMeshes(),
            lights: me.io.getLights(),
            camera: me.io.getCamera(),
            groups: me.io.getGroups()
        };
        fileContent = new Blob([JSON.stringify(fileContent)]);
        me.fs.write(filePath, {data: fileContent}, function (result) {
            var alert = new Alert();
            if (result instanceof FileError) {
                alert.pop({message: 'File Save Failed!'});
            }
            else {
                alert.pop({message: 'File Saved!'});
            }
            if (typeof callback === 'function') callback(result);
        });
    }


    /**
     * 读取文件
     *
     * @param {Object} me routing对象
     * @param {string} path 文件路径
     * @param {Function} callback 读取成功后的回调，回传文件内容''
     */
    function readFile(me, path, callback) {
        me.fs.read(path, function (result) {
            var fileContent = '';
            var fail = false;
            if (result instanceof ProgressEvent && result.target.result.length > 0) {
                fileContent = result.target.result;
                try {
                    fileContent = JSON.parse(fileContent)
                }
                catch (e) {
                    fail = true;
                }
            }
            else {
                fail = true;
            }
            if (fail) {
                fileContent = null;
                new Alert().pop({message: 'Fail to open "' + path + '"'});
            }
            if (typeof callback === 'function') callback(fileContent);
        });
    }


    /**
     * 导入文件内容到舞台
     *
     * @param {Object} me routing对象
     * @param {Object} content 已经解析好的文件内容
     */
    function loadFile(me, content) {
        if (content.hasOwnProperty('lights') && content.lights instanceof Array && content.lights.length > 0) {
            me.light.removeAll();
            me.io.setLights(content.lights);
        }
        if (content.hasOwnProperty('camera')) {
            me.io.setCamera(content.camera);
        }
        if (content.hasOwnProperty('groups') && content.groups instanceof Array) {
            me.io.setGroups(content.groups);
        }
        if (content.hasOwnProperty('meshes') && content.meshes instanceof Array && content.meshes.length > 0) {
            me.stage.removeAll();
            me.io.setMeshes(content.meshes);
        }
        // TODO: 检测文件保存状态
    }


    return {
        open: function () {
            var me = this;
            openExplorer(me, 'open', gotFilePath);
            function gotFilePath(path) {
                readFile(me, path, function (content) {
                    if (content == null) return;
                    document.title = 'TcEditor ' + path.split('/').pop();
                    me.filePath = path;
                    loadFile(me, content);
                });
            }
        },
        save: function () {
            var me = this;
            writeEditorConf(me, function () {
                if (me.filePath === null) {
                    openExplorer(me, 'save', gotFilePath);
                }
                else {
                    writeFile(me, wroteFile);
                }
            });
            function gotFilePath(path) {
                me.filePath = path;
                writeFile(me, wroteFile);
            }
            function wroteFile(result) {
                if (result instanceof FileError) {
                    me.filePath = null;
                }
            }
        },
        saveas: function () {
            var me = this;
            writeEditorConf(me, function () {
                openExplorer(me, 'save', gotFilePath);
            });
            function gotFilePath(path) {
                me.filePath = path;
                writeFile(me, wroteFile);
            }
            function wroteFile(result) {
                if (result instanceof FileError) {
                    me.filePath = null;
                }
            }
        }
    };
});
