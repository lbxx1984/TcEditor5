/**
 * @file 2D物体, 用于2D平面编辑器
 * @author Haitao Li
 * @mail 279641976@qq.com
 */
define(function (require) {

    var math = require('math');

    /**
     * 构造函数
     *
     * @constructor
     * @param {Object} 配置信息
     * @param {Object3D} param.mesh 3D物体
     * @param {Stage2D} param.stage 2D舞台 
     */
    function Mesh2D(param) {
        // 对应3D物体
        this.mesh = param.mesh;
        // 2D舞台参数
        this.param = param.stage.param;
        // 物体颜色，物体的本色
        this.color = null;
        // 渲染颜色
        this.renderColor = null;
        // 本物体绘制几何中心
        this.center = [0, 0];
        // 物体所有顶点的2D坐标
        this.vertices = [];
        // 物体所有面的连接状态
        this.faces = [];
        // 创建数据
        this.reset();
        return;     
    }


    /**
     * 重计算物体所有信息
     */
    Mesh2D.prototype.reset = function() {
        this.vertices = [];
        this.faces = [];
        this.createVertices();
        this.createFaces();
        this.color = this.mesh[window.editorKey].color.toString(16);
        while(this.color.length < 6) {this.color = '0' + this.color;}
        this.color = '#' + this.color;
    };


    /**
     * 绘制物体
     *
     * @param {Object} ctx canvas的绘制器
     * @param {?number} x 鼠标位置
     * @param {?number} y 鼠标位置
     * @return {boolean} 鼠标是否在物体上
     */
    Mesh2D.prototype.render = function(ctx, x, y) {
        var faces = this.faces;
        var points = this.vertices;
        var isMouseIn = false;
        ctx.beginPath();
        ctx.lineStyle = 2;
        ctx.fillStyle = this.renderColor || this.color;
        for (var n = 0; n < faces.length; n++) {
            var a = faces[n][0];
            var b = faces[n][1];
            var c = faces[n][2];
            this.line(points[a][0], points[a][1], points[b][0], points[b][1], ctx);
            this.line(points[b][0], points[b][1], points[c][0], points[c][1], ctx);
            this.line(points[c][0], points[c][1], points[a][0], points[a][1], ctx);
        }
        isMouseIn = !isNaN(x) && !isNaN(y) && ctx.isPointInPath(x, y);
        ctx.fill();
        return isMouseIn;
    };


    /**
     * 在画布上绘制一条线, 使用这个方法代替lineTo()的意图详见：
     * http://blog.csdn.net/lbxx1984/article/details/40988337
     *
     * @param {number} x0 起点的x坐标
     * @param {number} y0 起点的y坐标
     * @param {number} x1 终点的x坐标
     * @param {number} y1 终点的y坐标
     * @param {Object} ctx canvas的绘制器
     */
    Mesh2D.prototype.line = function(x0, y0, x1, y1, ctx) {
        var d = Math.sqrt((x0 - x1) * (x0 - x1) + (y0 - y1) * (y0 - y1));
        var r = 1;
        var sina = (x1 - x0) / d;
        var cosa = (y1 - y0) / d;
        ctx.moveTo(x0 + r * cosa, y0 - r * sina);
        ctx.lineTo(x0 + r * cosa + x1 - x0, y0 - r * sina + y1 - y0);
        ctx.lineTo(x0 - r * cosa + x1 - x0, y0 + r * sina + y1 - y0);
        ctx.lineTo(x0 - r * cosa, y0 + r * sina);
        ctx.lineTo(x0 + r * cosa, y0 - r * sina);
    };


    /**
     * 将3D物体内部的faces信息转换成本物体使用的faces数组
     */
    Mesh2D.prototype.createFaces = function() {
        var faces = this.mesh.geometry.faces;
        for (var n = 0; n < faces.length; n++) {
            this.faces.push([faces[n].a, faces[n].b, faces[n].c]);
        }
    };


    /**
     * 将3D物体中每个顶点的3D坐标转换成本物体的2D投影坐标
     */
    Mesh2D.prototype.createVertices = function () {
        var matrix = math.getRotateMatrix(this.mesh);
        this.vertices = [];
        this.center = this.RectangularToDisplay(math.local2world(0, 0, 0, matrix, this.mesh));
        var vertices = this.mesh.geometry.vertices;
        for (var n = 0; n < vertices.length; n++) {
            var vertice = vertices[n];
            vertice = math.local2world(vertice.x, vertice.y, vertice.z, matrix, this.mesh);
            vertice = this.RectangularToDisplay(vertice);
            this.vertices.push(vertice);
        }
    };


    /**
     * 将3D世界坐标转换成绘制坐标
     * 此方法根据2D编辑器的显示方式进行3D到2D的映射
     * 再根据舞台的偏移、缩放等信息进行换算
     *
     * @param {Array.<number>} pos 3D世界坐标
     * @return {Array.<number>} 对应的可以在canvas直接使用的2D坐标
     */
    Mesh2D.prototype.RectangularToDisplay = function (pos) {
        var param = this.param;
        var type = param.eyes;
        var x = (type === 'zoy') ? pos[2] : pos[0];
        var y = (type === 'xoz') ? pos[2] : pos[1];
        x = param.width * 0.5 + (x + param.cameraLookAt.x) / param.scale;
        y = param.height * 0.5 - (y + param.cameraLookAt.y) / param.scale;
        return [x, y];
    };


    /**
     * 将2D增量转换成3D增量
     *
     * @param {number} dx x轴方向增量
     * @param {number} dy y轴方向增量
     * @return {Array.<number>} 3D增量，缺少的维度为0
     */
    Mesh2D.prototype.DisplayToRectangular = function (dx, dy) {
        var param = this.param;
        var type = param.eyes;
        dy = (- dy) * param.scale - param.cameraLookAt.y;
        dx = dx * param.scale - param.cameraLookAt.x;
        var x = (type === 'zoy') ? 0 : dx;
        var y = (type === 'xoz') ? 0 : dy;
        var z = (type === 'xoy') ? 0 : ((type === 'zoy' ? dx : dy));
        return [x, y, z];
    };


    return Mesh2D;
});
