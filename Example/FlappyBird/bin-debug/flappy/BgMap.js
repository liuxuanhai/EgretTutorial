var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var flappy;
(function (flappy) {
    var BgMap = (function (_super) {
        __extends(BgMap, _super);
        function BgMap() {
            var _this = _super.call(this) || this;
            // 場景移動速度
            _this.speed = 10;
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
            return _this;
        }
        BgMap.prototype.onAddToStage = function (event) {
            this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
            this.stageW = this.stage.stageWidth;
            this.stageH = this.stage.stageHeight;
            var texture = RES.getRes("bg_jpg");
            this.textureWidth = texture.textureWidth;
            this.textureHeight = texture.textureHeight;
            console.log(this.stageH, this.textureHeight);
            // 計算當前容器(或螢幕), 需要多少張圖片才能填滿
            this.rowCount = Math.ceil(this.stageW / this.textureWidth) + 1;
            this.bmpArr = [];
            // 將圖片並列在一起
            for (var i = 0; i < this.rowCount; i++) {
                var bgBmp = util.createBitmapByName("bg_jpg");
                bgBmp.x = this.textureWidth * i;
                console.log(bgBmp.x);
                this.bmpArr.push(bgBmp);
                this.addChild(bgBmp);
            }
        };
        /**
         * 開始滾動
         */
        BgMap.prototype.start = function () {
            this.removeEventListener(egret.Event.ENTER_FRAME, this.enterFrameHandler, this);
            this.addEventListener(egret.Event.ENTER_FRAME, this.enterFrameHandler, this);
        };
        /**
         * 滾動 - ENTER_FRAME
         */
        BgMap.prototype.enterFrameHandler = function (event) {
            var _this = this;
            for (var i = 0; i < this.rowCount; i++) {
                if (this.bmpArr[i].x <= -1 * this.textureWidth) {
                    var bgBmp = this.bmpArr[i];
                    bgBmp.x = this.bmpArr[this.rowCount - 1].x + this.textureWidth;
                    this.bmpArr.shift();
                    this.bmpArr.push(bgBmp);
                    // 處理位置跳格問題
                    this.bmpArr.forEach(function (bmp) {
                        bmp.x += _this.speed;
                    });
                }
                this.bmpArr[i].x -= this.speed;
            }
        };
        /**
         * 暫停滾動
         */
        BgMap.prototype.pause = function () {
            this.removeEventListener(egret.Event.ENTER_FRAME, this.enterFrameHandler, this);
        };
        return BgMap;
    }(egret.DisplayObjectContainer));
    flappy.BgMap = BgMap;
    __reflect(BgMap.prototype, "flappy.BgMap");
})(flappy || (flappy = {}));
//# sourceMappingURL=BgMap.js.map