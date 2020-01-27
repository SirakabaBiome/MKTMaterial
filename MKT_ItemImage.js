// ======================
//  MKT_ItemImage.js
// ======================
/*:ja
 * @plugindesc アイテムのメニューで表示されるアイコンをアイテムアイコンの番号の画像に置き換えます。
 * @author 白樺まこと
 *
 * @help
 * アイテムのメニューで表示されるアイコンをアイテムアイコンの番号の画像に置き換えます。
 * 例えばアイテムアイコンで149番のを選んだらメニューで149.pngというのが表示されます。
 *
 * 使い方は作者HP https://diary.sirakababiome.com/2020/01/rpgmv.html をご覧ください。
 *
 * 規約
 * 白樺まことの表記をわかりやすいどこかに残しておけば改変した上での再配布・改変に制限はありません。商用利用も可能です。
 * ただし、作者を偽ったりこのプラグイン単体で販売するのは禁止します。使用して生じた損害等も責任を負いません。規約の改変やソースコードを貼り付ける形での掲載も許可しません。
 * また、クレジットに「白樺まこと https://diary.sirakababiome.com」を記述していただけると幸いです。
 *
 * 連絡先 Twitter maou_2chica
 *
 * 更新履歴
 * 0.1 - 2020/01/27　とりあえず完成？
 *
 * @param preloadItemImage
 * @desc 事前に読み込むアイテムアイコンの番号
 * @type Number[]
 *
 * @param ItemWindowWidth
 * @desc アイテムウィンドウサイズ
 * @type number
 * @default 816
 *
 * @param ItemCols
 * @desc 横に並べる数
 * @type number
 * @default 4
 *
 * @param ItemHeight
 * @desc 画像の縦の大きさ
 * @type number
 * @default 222
 *
 * @param NameVisible
 * @desc アイテムの名前を表示するか
 * @type boolean
 * @on 表示する
 * @off 表示しない
 * @default true
 *
 */
  (function() {
    'use strict'

    const pluginName = 'MKT_ItemImage';

    var parameters = PluginManager.parameters(pluginName);
    var mktItemWinWid = Number(parameters.ItemWindowWidth);
    var mktItemCols = Number(parameters.ItemCols);
    var mktItemHeight = Number(parameters.ItemHeight);
    var mktPreImg = JSON.parse(parameters.preloadItemImage);
    var mktNV = parameters.NameVisible;
    var mktII = mktItemWinWid / mktItemCols;

    var _Scene_Boot_loadSystemImages = Scene_Boot.loadSystemImages;

    Scene_Boot.loadSystemImages = function() {
      _Scene_Boot_loadSystemImages.call(this);
      for (var i = 0; i < mktPreImg.length; i++) {
        ImageManager.reserveItemImage(mktPreImg[i]);
      }
    };

    ImageManager.reserveItemImage = function(filename, hue) {
        return this.reserveBitmap('img/system/item/', filename, hue, false);
    };

    Window_ItemList.prototype.maxCols = function() {
        return mktItemCols;
    };

    Window_ItemList.prototype.textPadding = function() {
        return 0;
    };

    Window_ItemList.prototype.standardPadding = function() {
        return 0;
    };


    Window_ItemList.prototype.spacing = function() {
        return 0;
    };

    ImageManager.loadItemImage = function(filename, hue) {
        return this.loadBitmap('img/system/item/', filename, hue, false);
    };

    Window_ItemList.prototype.drawIcon = function(iconIndex, x, y) {
        var bitmap = ImageManager.loadItemImage(iconIndex);
        var pw = mktII;
        var ph = mktItemHeight;
        this.contents.blt(bitmap, 0, 0, pw, ph, x, y);
    };

    Window_ItemList.prototype.drawItem = function(index) {
        var item = this._data[index];
        if (item) {
            var numberWidth = this.numberWidth();
            var rect = this.itemRect(index);
            rect.width;
            this.changePaintOpacity(this.isEnabled(item));
            this.drawItemName(item, rect.x, rect.y, rect.width - numberWidth);
            this.drawItemNumber(item, rect.x, rect.y, rect.width);
            this.changePaintOpacity(1);
        }
    };

    Window_ItemList.prototype.drawItemName = function(item, x, y, width) {
        width = width || 312;
        if (item) {
            var iconBoxWidth = Window_Base._iconWidth + 4;
            this.resetTextColor();
            this.drawIcon(item.iconIndex, x + 2, y + 2);
            if (mktNV == 'true') {
              this.drawText(item.name, x, y, mktII - iconBoxWidth);
            }
        }
    };

    Window_ItemList.prototype.lineHeight = function() {
        return mktItemHeight;
    };
  })();
