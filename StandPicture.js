// ======================
//  StandPicture.js
// ======================
/*:ja
 * @plugindesc 立ち絵の表示を楽にします[v0.5.4]
 * @author 白樺まこと
 *
 * @help
 *　このプラグインは
 *  EasingPicture.js(くらむぼん様) https://krmbn0576.github.io/rpgmakermv/homepage.html
 *  PictureAnimation.js(トリアコンタン様) https://triacontane.blogspot.com/2015/12/blog-post_20.html
 *  が必要です
 *
 *　プラグインコマンド等説明は配布ページを参照してください。
 *　https://diary.sirakababiome.com/2020/02/mvStand.html
 *
 * 更新履歴
 * 2020/05/27-キャラクターフォーカス時に動きがつく機能追加。瞬きの数が異常に増えるバグの修正。
 * 2020/04/15-トリアコンタン様に改修してもらい競合を修正してもらいました。
 * 2020/02/12-動きを選択できるようにした。
 *
 * 規約
 * 白樺まことの表記をわかりやすいどこかに残しておけば再配布・改変に制限はありません。商用利用も可能です。
 * ただし、作者を偽ったりこのプラグイン単体で販売するのは禁止します。
 * また、クレジットに「白樺まこと」を記述していただけると幸いです。
 *
 * 連絡先
 * Twitter maou_2chica
 *
 * スペシャルサンクス
 * トリアコンタン様
 *
 * @param FileNameAndCharacterName
 * @desc キャラクター名とピクチャ名を結びつけます
 * @type struct<mktSPIDName>[]
 *
 * @param CustomMove
 * @desc カスタムで動かします
 * @type struct<CustomMove>[]
 * @default []
 *
 * @param LeftPictureID
 * @desc 左の立ち絵を表示するIDです
 * @type number
 * @min 1
 * @max 100
 * @default 50
 *
 * @param PictureY
 * @desc 立ち絵を表示する縦の座標
 * @type number
 * @default 0
 *
 * @param CenterPictureX
 * @desc 真ん中の立ち絵を表示する横の座標
 * @type number
 * @default 272
 *
 * @param RightPictureX
 * @desc 右の立ち絵を表示する横の座標
 * @type number
 * @default 544
 *
 * @param Prefix
 * @desc 表示する名前の前につけている文字。
 * @type string
 * @default <
 *
 * @param NameAnd
 * @desc 左右の名前を繋げる文字。
 * @type string
 * @default ・
 *
 * @param StartX
 * @desc フェードインの開始位置（この値が大きいと幅が大きめに、小さいと幅が小さめになります）
 * @type number
 * @default 300
 *
 * @param textXS
 * @desc 口パクの長さ（1/1000秒単位）
 * @type number
 * @default 1000
 *
 * @param AutoErease
 * @desc 自動で消す機能のON/OFFを管理するスイッチです。ONで自動で消す機能がOFFになります。
 * @type switch
 * @default 0
 *
 * @param easing
 * @desc 動きのオプション。詳しくはEasingPicture.js(くらむぼん様)を読んでください。
 * @type select
 *
 * @option linear
 * @value linear
 *
 * @option easeInQuad
 * @value easeInQuad
 *
 * @option easeOutQuad
 * @value easeOutQuad
 *
 * @option easeInOutQuad
 * @value easeInOutQuad
 *
 * @option easeInCubic
 * @value easeInCubic
 *
 * @option easeOutCubic
 * @value easeOutCubic
 *
 * @option easeInOutCubic
 * @value easeInOutCubic
 *
 * @option easeInQuart
 * @value easeInQuart
 *
 * @option easeOutQuart
 * @value easeOutQuart
 *
 * @option easeInOutCirc
 * @value easeInOutCirc
 *
 * @option easeInElastic
 * @value easeInElastic
 *
 * @option easeOutElastic
 * @value easeOutElastic
 *
 * @option easeInOutElastic
 * @value easeInOutElastic
 *
 * @option easeInBack
 * @value easeInBack
 *
 * @option easeOutBack
 * @value easeOutBack
 *
 * @option easeInOutBack
 * @value easeInOutBack
 *
 * @option easeInBounce
 * @value easeInBounce
 *
 * @option easeOutBounce
 * @value easeOutBounce
 *
 * @option easeOutBounce
 * @value easeOutBounce
 *
 * @option easeInOutBounce
 * @value easeInOutBounce
 *
 * @default easeOutBack
 *
 * @param focusMove
 * @desc 明暗の他に動きをつけますか？
 * @type boolean
 * @default false
 */

 /*~struct~mktSPIDName:
 * @param CharacterName
 * @type string
 *
 * @param FileName
 * @type string
 *
 * @param Folder
 * @desc フォルダー分けをしますか？　0で利用しません。
 * @type string
 * @default 0
 *
 * @param PartIndex
 * @desc 顔と素体を分けていますか？
 * @type boolean
 * @default false
 *
 * @param PartBlink
 * @desc まばたきを利用しますか？ 0で利用しません。1以上でフレーム間隔になります。
 * @type number
 * @default 0
 *
 * @param PartBlinkSpeed
 * @desc まばたきの間隔です。0で利用しません。単位は千分の一秒です。
 * @type number
 * @default 0
 *
 * @param PartBlinkRate
 * @desc まばたきの確率です。0で利用しません。ここで入力した数字分の１の確率になります。
 * @type number
 * @default 0
 *
 * @param PartLip
 * @desc 口パクを利用しますか？ 0で利用しません。1以上でフレーム間隔になります。
 * @type number
 * @default 0
 *
 * @param CosVariable
 * @desc コスチュームを利用しますか？　利用する際は参照する変数を選択してください。
 * @type variable
 * @default 0

 * @param Cos
 * @desc コスチューム設定
 * @type struct<mktCos>[]
 * @default []
 */

  /*~struct~CustomMove:
  * @param minX
  * @desc 左に動かす数です
  * @type number
  * @default 0
  *
  * @param maxX
  * @desc 右に動かす数です
  * @type number
  * @default 0
	*
  * @param minY
  * @desc 上に動かす数です
  * @type number
  * @default 0
  *
  * @param maxY
  * @desc 下に動かす数です
  * @type number
  * @default 0
	*
	* @param wait
  * @desc ウェイトです。60で１フレームです。
  * @type number
  * @default 30
  */

  /*~struct~mktCos:
  * @param CosName
  * @desc 使用する衣装のファイル名
  * @type string
  * @default 0
  */

(function() {
	'use strict';

	const pluginName = 'StandPicture';

  var mktSPLN = -1;
  var mktSPRN = -1;
	var mktSPCN = -1;
	var mktSPLCN = -1;
	var mktSPRCN = -1;
	var mktSPCCN = -1;
	var mktSPLB = -1;
	var mktSPCB = -1;
	var mktSPRB = -1;
	var mktChange = 0;
  var parameters = PluginManager.parameters(pluginName);
  var paramKey = JSON.parse(parameters.FileNameAndCharacterName);
  var paramMove = JSON.parse(parameters.CustomMove);
	var mktLPID = Number(parameters.LeftPictureID);
	var mktRPID = Number(parameters.LeftPictureID) + 3;
	var mktCPID = Number(parameters.LeftPictureID) + 6;
	var mktPre = String(parameters.Prefix);
	var mktAnd = String(parameters.NameAnd);
	var mktPY = Number(parameters.PictureY);
	var mktRX = Number(parameters.RightPictureX);
	var mktCX = Number(parameters.CenterPictureX);
	var stX = Number(parameters.StartX);
	var autoEre = Number(parameters.AutoErease);
	var mktMoveFocus = parameters.focusMove;
	var partIndexL = 0;
	var partIndexR = 0;
	var partIndexC = 0;
	var partIndex = 0;
	var mktFolder = 0;
	var paramBSP = 0;
	var paramB = 0;
	var paramBR = 0;
	var paramBRL = 0;
	var paramBRR = 0;
	var paramBRC = 0;
	var paramL = 0;
	var paramLL = 0;
	var paramLR = 0;
	var paramLC = 0;
	var paramLLR = 0;
  var paramKeyT = 0;
	var partBlinkSetL = 0;
	var partBlinkSetR = 0;
	var partBlinkSetC = 0;
	var costume = 0;
	var textS = Number(parameters.textXS);
	var mktease = [String(parameters.easing)];
	var mktYM = mktPY + 20;
	var mktLXM = -100;
	var mktRXM = mktRX + 100;
	var linear = ['linear'];
	var interpreter;

//プラグインコマンド
  var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function(command, args) {
    _Game_Interpreter_pluginCommand.call(this, command, args);
	  interpreter = this;

    if ( command === 'MKTSP' ) {
      switch (args[0]) {

        case 'showL':
				if ( mktSPLB > 0 ) {
					clearInterval(partBlinkSetL);
				}
				if ( args[5] > 1 ) {
					mktSPLB = 1;
				} else {
					mktSPLB = -1;
				}
				costume = args[6];
				if ( mktSPLN == args[1]) {
					mktChange = true;
				} else {
					mktChange = false;
				}
				var autoET = $gameSwitches.value(autoEre);
				if ( autoET != true ) {
	        if ( args[1] == mktSPRN ) {
						mktHide(mktRPID,mktRX + stX,"R",partIndexR);
	        }
	        if ( mktSPCN == args[1] ) {
						mktHide(mktCPID,mktCX,"C",partIndexC);
	        }
				}
        for (var i = 0; i < paramKey.length; i++) {
        paramKeyT = JSON.parse(paramKey[i]);
          if ( String(args[1]) == paramKeyT['FileName'] ) {
	          mktSPLCN = paramKeyT['CharacterName'];
		        mktFolder = paramKeyT['Folder'];
						paramBSP = Number(paramKeyT['PartBlinkSpeed']);
						paramB = Number(paramKeyT['PartBlink']);
						paramBRL = Number(paramKeyT['PartBlinkRate']);
						paramL = Number(paramKeyT['PartLip']);
						paramLL = Number(paramKeyT['PartLip']);
						partIndexL = paramKeyT['PartIndex'];
						var mktCosV = Number(paramKeyT['CosVariable'])
						if ( mktCosV != 0 ) {
							var mktCosVN = Number($gameVariables.value(mktCosV));
							if ( mktCosVN > 0 ) {
								var mktCosL = JSON.parse(paramKeyT['Cos']);
								var mktCosN = JSON.parse(mktCosL[mktCosVN - 1]);
								costume = mktCosN['CosName'];
							}
						}
            break;
          }
        }
				paramLLR = 1;
				mktSPLN = args[1];
				mktStundPictureShow(0,mktPY,args[1],args[2],args[3],mktLPID,args[4],args[5],partIndexL);
          break;

        case 'showC':
				if ( mktSPCB > 0 ) {
					clearInterval(partBlinkSetC);
				}
				if ( args[5] > 1 ) {
					mktSPCB = 1;
				} else {
					mktSPCB = -1;
				}
				costume = args[6];
				if ( mktSPCN == args[1]) {
					mktChange = true;
				} else {
					mktChange = false;
				}
        mktSPCN = args[1];
				var autoET = $gameSwitches.value(autoEre);
				if ( autoET != true ) {
					if ( mktSPRN == args[1] ) {
						mktHide(mktRPID,mktRX + stX,"R",partIndexR);
					} else if ( mktSPLN == args[1] ) {
						mktHide(mktLPID,0 - stX,"L",partIndexL);
					}
				}
        for (var i = 0; i < paramKey.length; i++) {
        paramKeyT = JSON.parse(paramKey[i]);
          if ( String(args[1]) == paramKeyT['FileName'] ) {
	          mktSPCCN = paramKeyT['CharacterName'];
		        mktFolder = paramKeyT['Folder'];
						paramBSP = Number(paramKeyT['PartBlinkSpeed']);
						paramB = Number(paramKeyT['PartBlink']);
						paramBRC = Number(paramKeyT['PartBlinkRate']);
						paramL = Number(paramKeyT['PartLip']);
						paramLC = Number(paramKeyT['PartLip']);
						partIndexC = paramKeyT['PartIndex'];
						var mktCosV = Number(paramKeyT['CosVariable'])
						if ( mktCosV != 0 ) {
							var mktCosVN = Number($gameVariables.value(mktCosV));
							if ( mktCosVN > 0 ) {
								var mktCosL = JSON.parse(paramKeyT['Cos']);
								var mktCosN = JSON.parse(mktCosL[mktCosVN - 1]);
								costume = mktCosN['CosName'];
							}
						}
          }
        }
				mktSPCN = args[1];
				paramLLR = 3;
				mktStundPictureShow(mktCX,mktPY,args[1],args[2],args[3],mktCPID,args[4],args[5],partIndexC);
          break;

        case 'showR':
				if ( mktSPRB > 0 ) {
					clearInterval(partBlinkSetR);
				}
				if ( args[5] > 1 ) {
					mktSPRB = 1;
				} else {
					mktSPRB = -1;
				}
				costume = args[6];
				if ( mktSPRN == args[1]) {
					mktChange = true;
				} else {
					mktChange = false;
				}
				var autoET = $gameSwitches.value(autoEre);
				if ( autoET != true ) {
	        if ( mktSPLN == args[1] ) {
						mktHide(mktLPID,0 - stX,"L",partIndexL);
	        } else if ( mktSPCN == args[1] ) {
						mktHide(mktCPID,mktCX,"C",partIndexC)
	        }
				}
        for (var i = 0; i < paramKey.length; i++) {
        paramKeyT = JSON.parse(paramKey[i]);
          if ( String(args[1]) == paramKeyT['FileName'] ){
            mktSPRCN = paramKeyT['CharacterName'];
		        mktFolder = paramKeyT['Folder'];
						paramBSP = Number(paramKeyT['PartBlinkSpeed']);
						paramB = Number(paramKeyT['PartBlink']);
						paramBRR = Number(paramKeyT['PartBlinkRate']);
						paramL = Number(paramKeyT['PartLip']);
						paramLR = Number(paramKeyT['PartLip']);
						partIndexR = paramKeyT['PartIndex'];
						var mktCosV = Number(paramKeyT['CosVariable'])
						if ( mktCosV != 0 ) {
							var mktCosVN = Number($gameVariables.value(mktCosV));
							if ( mktCosVN > 0 ) {
								var mktCosL = JSON.parse(paramKeyT['Cos']);
								var mktCosN = JSON.parse(mktCosL[mktCosVN - 1]);
								costume = mktCosN['CosName'];
							}
						}
          }
        }
				mktSPRN = args[1];
				paramLLR = 2;
        mktStundPictureShow(mktRX,mktPY,args[1],args[2],args[3],mktRPID,args[4],args[5],partIndexR);
          break;

					case 'hideL':
						mktHide(mktLPID,0 - stX,"L",partIndexL);
					break;

					case 'hideR':
						mktHide(mktRPID,mktRX + stX,"R",partIndexR);
						break;

					case 'hideC':
						mktHide(mktCPID,mktCX,"C",partIndexC);
						break;

					case 'move':
					var mktPID = 0;
					var mktPIX = 0;
						if ( args[1] == 'L' ) {
							partIndex = partIndexL;
							mktPID = mktLPID;
							mktPIX = 0;
						} else if ( args[1] == 'R' ) {
							partIndex = partIndexR;
							mktPID = mktRPID;
							mktPIX = mktRX;
							mktSPRCN = 0;
						} else if ( args[1] == 'C' ) {
							partIndex = partIndexC;
							mktPID = mktCPID;
							mktPIX = mktCX;
						}
						mktMovePicture(mktPID,mktPIX,0,args[2],args[3],args[4],args[5]);
						break;

        	case 'finish':
						mktHide(mktLPID,0 - stX,"L",partIndexL);
						mktHide(mktRPID,mktRX + stX,"R",partIndexR);
						mktHide(mktCPID,mktCX,"C",partIndexC);
          	break;

      }
    }
  };



//立ち絵の消去

function mktHide(mktPictureID,x,pos,partIndex){
	_Game_Interpreter_pluginCommand.call(interpreter,'easing',mktease);
	$gameScreen.movePicture(mktPictureID,0,x,0,100,100,0,0,60);
	if ( partIndex == 'true' ) {
		$gameScreen.movePicture(mktPictureID + 1,0,x,0,100,100,0,0,60);
		$gameScreen.movePicture(mktPictureID + 2,0,x,0,100,100,0,0,60);
	}
	var mktStundPictureErasePer = function(partIndex,pos,mktPictureID){
		$gameScreen.erasePicture(mktPictureID);
		$gameScreen.erasePicture(mktPictureID + 1);
		$gameScreen.erasePicture(mktPictureID + 2);
		if ( partIndex != 'false' ) {
			if (pos == "L") {
				clearInterval(partBlinkSetL);
			}
			if ( pos == "R") {
				clearInterval(partBlinkSetR);
			}
			if ( pos == "C") {
				clearInterval(partBlinkSetC);
			}
		}
	}
	setTimeout(mktStundPictureErasePer, 500,partIndex,pos,mktPictureID);
	if (pos == "L") {
		mktSPLN = false;
		mktSPLCN = false;
	}
	if ( pos == "R") {
		mktSPRN = false;
		mktSPRCN = false;
	}
	if ( pos == "C") {
		mktSPCN = false;
		mktSPCCN = false;
	}
	_Game_Interpreter_pluginCommand.call(interpreter,'easing',linear);
}

//ピクチャの表示
  function mktStundPictureShow(x, y, pictureName,index,index2,pictureID,partLS,partBS,partIndex){
		var pictureID2 = pictureID + 1;
		var pictureID3 = pictureID + 2;
		var paratL = Number(partLS);
		var paratB = Number(partBS);
		var fileName = 0;
		var indexL = 0;
		var startX = x - 300;
		var startOpa = 0;
		if ( mktChange ) {
			startX = x;
			startOpa = 255;
			if ( partLS > 0 ) {
				$gameScreen.erasePicture(pictureID + 2);
			}
			if ( partBS > 0 ) {
				$gameScreen.erasePicture(pictureID + 1);
			}
		} else {
			switch ( paramLLR ) {
				case 1:
					startX = x - stX;
					break;
				case 2:
					startX = x + stX;
					break;
				case 3:
					startX = x;
					break;
			}
		}
		mktChange = false;
		if ( mktFolder != "0" ) {
			pictureName = mktFolder + '/' + pictureName;
		}
		if ( costume != undefined ) {
			fileName = pictureName + '_' + costume;
		} else {
			fileName = pictureName;
		}
		if (index2 != false) {
			indexL = index2;
		} else {
			indexL = index;
		}
		if ( paramL != false ) {
			if ( paratL > 0 ) {
    		var standPLip = [String(partLS),String(paramL),'H','0'];
				_Game_Interpreter_pluginCommand.call(interpreter,'PA_INIT',standPLip);
	  		$gameScreen.showPicture(pictureID3, pictureName + '_' + indexL + '_Lip', 0, startX, y, 100,100,100,startOpa,0);
			} else {
	  		$gameScreen.showPicture(pictureID3, pictureName + '_' + indexL + '_Lip', 0, startX, y, 100,100,100,startOpa,0);
			}
		}
		if ( paramB != false ) {
			if ( paratB > 0) {
    		var standPBlink = [String(partBS),String(paramB),'横','0'];
				_Game_Interpreter_pluginCommand.call(interpreter,'PA_INIT',standPBlink);
	  		$gameScreen.showPicture(pictureID2, pictureName + '_' + index + '_Blink', 0, startX, y, 100,100,100,startOpa,0);
				if ( paramLLR == 1 ) {
				partBlinkSetL = setInterval(mktLBlink,paramBSP);
			} else if ( paramLLR == 2 ) {
				partBlinkSetR = setInterval(mktRBlink,paramBSP);
			} else if ( paramLLR == 3 ) {
				partBlinkSetC = setInterval(mktCBlink,paramBSP);
			}
			} else {
				if ( paramLLR == 1 ) {
					clearInterval(partBlinkSetL);
				} else if ( paramLLR == 2 ) {
					clearInterval(partBlinkSetR);
				} else if ( paramLLR == 3 ) {
					clearInterval(partBlinkSetC);
				}
	  		$gameScreen.showPicture(pictureID2, pictureName + '_' + index + '_Blink', 0, startX, y, 100,100,100,startOpa,0);
			}
		}
		if ( partIndex == 'true' ) {
    	$gameScreen.showPicture(pictureID, fileName, 0, startX, y, 100,100,100,startOpa,0);
			if ( paramB == 0 ) {
	  	$gameScreen.showPicture(pictureID2, pictureName + '_' + index, 0, startX, y, 100,100,100,startOpa,0);
			}
		} else {
	  	$gameScreen.showPicture(pictureID, fileName + '_' + index, 0, startX, y, 100,100,100,startOpa,0);
		}
    _Game_Interpreter_pluginCommand.call(interpreter,'easing',mktease);
    $gameScreen.movePicture(pictureID,0,x,y,100,100,255,0,60);
		if ( partIndex == 'true' ) {
	    _Game_Interpreter_pluginCommand.call(interpreter,'easing',mktease);
	    $gameScreen.movePicture(pictureID2,0,x,y,100,100,255,0,60);
			if ( paramL != false ) {
		    _Game_Interpreter_pluginCommand.call(interpreter,'easing',mktease);
		    $gameScreen.movePicture(pictureID3,0,x,y,100,100,255,0,60);
			}
		}
	  _Game_Interpreter_pluginCommand.call(interpreter,'easing',linear);
  }

//動きの設定
	function mktMovePicture(pictureID,x,y,moveType,wait,count,ID){
		switch ( moveType ) {
			case 'Jump':
			_Game_Interpreter_pluginCommand.call(interpreter,'easing',mktease);
			var mktJumpC = 0;
			var mktJumpP = setInterval(mktJump, wait);
				function mktJump(){
					if ( (mktJumpC % 2) == 0 || mktJumpC == 0) {
			    	$gameScreen.movePicture(pictureID,0,x,y - 50,100,100,255,0,15);
						if ( partIndex == 'true' ) {
				    	$gameScreen.movePicture(pictureID + 1,0,x,y - 50,100,100,255,0,15);
					    $gameScreen.movePicture(pictureID + 2,0,x,y - 50,100,100,255,0,15);
						}
					}
					if ( (mktJumpC % 2) != 0) {
		    		$gameScreen.movePicture(pictureID,0,x,y + 20,100,100,255,0,30);
						if ( partIndex == 'true' ) {
							$gameScreen.movePicture(pictureID + 1,0,x,y + 20,100,100,255,0,30);
							$gameScreen.movePicture(pictureID + 2,0,x,y + 20,100,100,255,0,30);
						}
					}
					mktJumpC++;
					if ( mktJumpC > count * 2 ) {
			    	clearInterval( mktJumpP );
			    	$gameScreen.movePicture(pictureID,0,x,y,100,100,255,0,15);
						if ( partIndex == 'true' ) {
							$gameScreen.movePicture(pictureID + 1,0,x,y,100,100,255,0,15);
							$gameScreen.movePicture(pictureID + 2,0,x,y,100,100,255,0,15);
						}
					}
				}
			  _Game_Interpreter_pluginCommand.call(interpreter,'easing',linear);
				break;

			case 'Shake':
		  _Game_Interpreter_pluginCommand.call(interpreter,'easing',mktease);
			var mktShakeC = 0;
			var mktShakeP = setInterval(mktShake, wait);
				function mktShake(){
					if ( (mktShakeC % 2) == 0 || mktShakeC == 0) {
			    	$gameScreen.movePicture(pictureID,0,x - 25,y,100,100,255,0,5);
						if ( partIndex == 'true' ) {
							$gameScreen.movePicture(pictureID + 1,0,x - 25,y,100,100,255,0,5);
							$gameScreen.movePicture(pictureID + 2,0,x - 25,y,100,100,255,0,5);
						}
					}
					if ( (mktShakeC % 2) != 0) {
		    		$gameScreen.movePicture(pictureID,0,x + 25,y,100,100,255,0,5);
						if ( partIndex == 'true' ) {
							$gameScreen.movePicture(pictureID + 1,0,x + 25,y,100,100,255,0,5);
							$gameScreen.movePicture(pictureID + 2,0,x + 25,y,100,100,255,0,5);
						}
					}
					mktShakeC++;
					if ( mktShakeC > count * 2 ) {
			    	clearInterval( mktShakeP );
			    	$gameScreen.movePicture(pictureID,0,x,y,100,100,255,0,15);
						if ( partIndex == 'true' ) {
							$gameScreen.movePicture(pictureID + 1,0,x,y,100,100,255,0,15);
							$gameScreen.movePicture(pictureID + 2,0,x,y,100,100,255,0,15);
						}
					}
				}
			  _Game_Interpreter_pluginCommand.call(interpreter,'easing',linear);
				break;

				case 'Custom':
					var paramCustomMove = JSON.parse(paramMove[ID]);
					var minX = Number(paramCustomMove['minX']);
					var maxX = Number(paramCustomMove['maxX']);
					var minY = Number(paramCustomMove['minY']);
					var maxY = Number(paramCustomMove['maxY']);
					var customW = Number(paramCustomMove['wait']);
					var mktCustomC = 0;
					var mktCustomCP = setInterval(mktCustom, wait);
					function mktCustom(){
						if ( (mktCustomC % 2) == 0 || mktCustomC == 0) {
				    	$gameScreen.movePicture(pictureID,0, x - minX, y - minY,100,100,255,0,customW);
							if ( partIndex == 'true' ) {
								$gameScreen.movePicture(pictureID + 2,0,x - minX, y - minY,100,100,255,0,customW);
								$gameScreen.movePicture(pictureID + 4,0,x - minX, y - minY,100,100,255,0,customW);
							}
						}
						if ( (mktCustomC % 2) != 0) {
			    		$gameScreen.movePicture(pictureID,0,x + maxX, y + maxY,100,100,255,0,customW);
							if ( partIndex == 'true' ) {
								$gameScreen.movePicture(pictureID + 2,0,x + maxX, y + maxY,100,100,255,0,customW);
								$gameScreen.movePicture(pictureID + 4,0,x + maxX, y + maxY,100,100,255,0,customW);
							}
						}
						mktCustomC++;
						if ( mktCustomC > count * 2 ) {
				    	clearInterval( mktCustomCP );
				    	$gameScreen.movePicture(pictureID,0,x,y,100,100,255,0,customW);
							if ( partIndex == 'true' ) {
								$gameScreen.movePicture(pictureID + 2,0,x,y,100,100,255,0,customW);
								$gameScreen.movePicture(pictureID + 4,0,x,y,100,100,255,0,customW);
							}
						}
					}
				  _Game_Interpreter_pluginCommand.call(interpreter,'easing',mktease);
				  _Game_Interpreter_pluginCommand.call(interpreter,'easing',linear);
					break;

			}
		}

		var _Game_Message_add = Game_Message.prototype.add;

		Game_Message.prototype.add = function(text) {
			_Game_Message_add.call(this,text);
			mktSPM(text);
		};

		function mktSPM(text){
			var searchTextL = text.search(mktPre + mktSPLCN);
			var searchTextR = text.search(mktPre + mktSPRCN);
			var searchTextC = text.search(mktPre + mktSPCCN);
			var searchTextLR = text.search(mktPre + mktSPLCN + mktAnd + mktSPRCN);
			var searchTextLC = text.search(mktPre + mktSPLCN + mktAnd + mktSPCCN);
			var searchTextCR = text.search(mktPre + mktSPCCN + mktAnd + mktSPRCN);
			var searchTextLRC = text.search(mktPre + mktSPLCN + mktAnd + mktSPCCN + mktAnd + mktSPRCN);
			if ( searchTextLRC != -1 ) {
				mktSPCFocus();
				mktSPRFocus();
				mktSPLFocus();
				if ( paramLL > 0 ) {
					mktLipL();
				}
				if ( paramLC > 0 ) {
					mktLipC();
				}
				if ( paramLR > 0 ) {
					mktLipR();
				}
			} else if ( searchTextLC != -1 ) {
				mktSPCFocus();
				mktRDark();
				mktSPLFocus();
				if ( paramLL > 0 ) {
					mktLipL();
				}
				if ( paramLC > 0 ) {
					mktLipC();
				}
			} else if (searchTextLR != -1) {
				mktCDark();
				mktSPRFocus();
				mktSPLFocus();
				if ( paramLL > 0 ) {
					mktLipL();
				}
				if ( paramLR > 0 ) {
					mktLipR();
				}
			} else if ( searchTextCR != -1) {
					mktSPCFocus();
					mktSPRFocus();
					mktLDark();
					if ( paramLC > 0 ) {
						mktLipC();
					}
					if ( paramLR > 0 ) {
						mktLipR();
					}
			} else if (searchTextR != -1) {
				mktSPRFocus();
				mktLDark();
				mktCDark();
				if ( paramLR > 0 ) {
					mktLipR();
				}
			} else if (searchTextL != -1) {
				mktSPLFocus();
				mktCDark();
				mktRDark();
				if ( paramLL > 0 ) {
					mktLipL();
				}
			} else if (searchTextC != -1) {
				mktSPCFocus();
				mktLDark();
				mktRDark();
				if ( paramLC > 0 ) {
					mktLipC();
			} else {
				mktLDark();
				mktRDark();
				mktCDark();
			}
		}
		}

		function mktSPLFocus() {
				if ( mktMoveFocus == "true" ) {
		  		_Game_Interpreter_pluginCommand.call(interpreter,'easing',mktease);
					$gameScreen.movePicture(mktLPID,0,0,mktPY,100,100,255,0,30);
					$gameScreen.movePicture(mktLPID + 1,0,0,mktPY,100,100,255,0,30);
					$gameScreen.movePicture(mktLPID + 2,0,0,mktPY,100,100,255,0,30);
				  _Game_Interpreter_pluginCommand.call(interpreter,'easing',linear);
				}
				$gameScreen.tintPicture(mktLPID, [0,0,0,0], 30);
				$gameScreen.tintPicture(mktLPID + 1, [0,0,0,0], 30);
				$gameScreen.tintPicture(mktLPID + 2, [0,0,0,0], 30);
		}

		function mktSPRFocus() {
				if ( mktMoveFocus == "true" ) {
		  		_Game_Interpreter_pluginCommand.call(interpreter,'easing',mktease);
					$gameScreen.movePicture(mktRPID,0,mktRX,mktPY,100,100,255,0,30);
					$gameScreen.movePicture(mktRPID + 1,0,mktRX,mktPY,100,100,255,0,30);
					$gameScreen.movePicture(mktRPID + 2,0,mktRX,mktPY,100,100,255,0,30);
				  _Game_Interpreter_pluginCommand.call(interpreter,'easing',linear);
				}
				$gameScreen.tintPicture(mktRPID, [0,0,0,0], 30);
				$gameScreen.tintPicture(mktRPID + 1, [0,0,0,0], 30);
				$gameScreen.tintPicture(mktRPID + 2, [0,0,0,0], 30);
		}
		function mktSPCFocus() {
	  		_Game_Interpreter_pluginCommand.call(interpreter,'easing',mktease);
				$gameScreen.movePicture(mktCPID,0,mktCX,mktPY,100,100,255,0,30);
				$gameScreen.movePicture(mktCPID + 1,0,mktCX,mktPY,100,100,255,0,30);
				$gameScreen.movePicture(mktCPID + 2,0,mktCX,mktPY,100,100,255,0,30);
			  _Game_Interpreter_pluginCommand.call(interpreter,'easing',linear);
				$gameScreen.tintPicture(mktCPID, [0,0,0,0], 30);
				$gameScreen.tintPicture(mktCPID + 1, [0,0,0,0], 30);
				$gameScreen.tintPicture(mktCPID + 2, [0,0,0,0], 30);
		}

		function mktLDark() {
			if ( mktMoveFocus == "true" ) {
		  	_Game_Interpreter_pluginCommand.call(interpreter,'easing',mktease);
				$gameScreen.movePicture(mktLPID,0,mktLXM,mktYM,100,100,255,0,30);
				$gameScreen.movePicture(mktLPID + 1,0,mktLXM,mktYM,100,100,255,0,30);
				$gameScreen.movePicture(mktLPID + 2,0,mktLXM,mktYM,100,100,255,0,30);
				_Game_Interpreter_pluginCommand.call(interpreter,'easing',linear);
			}
			$gameScreen.tintPicture(mktLPID, [-128,-128,-128,0], 30);
			$gameScreen.tintPicture(mktLPID + 1, [-128,-128,-128,0], 30);
			$gameScreen.tintPicture(mktLPID + 2, [-128,-128,-128,0], 30);
		}
		function mktRDark() {
			if ( mktMoveFocus == "true" ) {
		  	_Game_Interpreter_pluginCommand.call(interpreter,'easing',mktease);
				$gameScreen.movePicture(mktRPID,0,mktRXM,mktYM,100,100,255,0,30);
				$gameScreen.movePicture(mktRPID + 1,0,mktRXM,mktYM,100,100,255,0,30);
				$gameScreen.movePicture(mktRPID + 2,0,mktRXM,mktYM,100,100,255,0,30);
				_Game_Interpreter_pluginCommand.call(interpreter,'easing',linear);
			}
			$gameScreen.tintPicture(mktRPID, [-128,-128,-128,0], 30);
			$gameScreen.tintPicture(mktRPID + 1, [-128,-128,-128,0], 30);
			$gameScreen.tintPicture(mktRPID + 2, [-128,-128,-128,0], 30);
		}
		function mktCDark() {
			if ( mktMoveFocus == "true" ) {
		  	_Game_Interpreter_pluginCommand.call(interpreter,'easing',mktease);
				$gameScreen.movePicture(mktCPID,0,mktCX,mktYM,100,100,255,0,30);
				$gameScreen.movePicture(mktCPID + 1,0,mktCX,mktYM,100,100,255,0,30);
				$gameScreen.movePicture(mktCPID + 2,0,mktCX,mktYM,100,100,255,0,30);
				_Game_Interpreter_pluginCommand.call(interpreter,'easing',linear);
			}
			$gameScreen.tintPicture(mktCPID, [-128,-128,-128,0], 30);
			$gameScreen.tintPicture(mktCPID + 1, [-128,-128,-128,0], 30);
			$gameScreen.tintPicture(mktCPID + 2, [-128,-128,-128,0], 30);
		}

		function mktLipL() {
			var standPLLip = [String(mktLPID + 2),'1'];
			var standPLLipEnd = setInterval(standLLipEnd,textS);
			var endCountL = 0;
			_Game_Interpreter_pluginCommand.call(interpreter,'PA_START_LOOP',standPLLip);
			function standLLipEnd(){
				endCountL++;
				if (endCountL => 1) {
					var standPLLEnd = [String(mktLPID + 2)];
					_Game_Interpreter_pluginCommand.call(interpreter,'PA_STOP',standPLLEnd);
					clearInterval(standPLLipEnd);
				}
			}
		}
		function mktLipR() {
			var standPRLip = [String(mktRPID + 2),'1'];
			var standPRLipEnd = setInterval(standRLipEnd,textS);
			var endCountR = 0;
			_Game_Interpreter_pluginCommand.call(interpreter,'PA_START_LOOP',standPRLip);
			function standRLipEnd(){
				endCountR++;
				if (endCountR => 1) {
					var standPRLEnd = [String(mktRPID + 2)];
					_Game_Interpreter_pluginCommand.call(interpreter,'PA_STOP',standPRLEnd);
					clearInterval(standPRLipEnd);
				}
			}
		}
		function mktLipC() {
			var standPCLip = [String(mktCPID + 2),'1'];
			var standPCLipEnd = setInterval(standCLipEnd,textS);
			var endCountC = 0;
			_Game_Interpreter_pluginCommand.call(interpreter,'PA_START_LOOP',standPCLip);
			function standCLipEnd(){
				endCountC++;
				if (endCountC => 1) {
					var standPCLEnd = [String(mktCPID + 2)];
					_Game_Interpreter_pluginCommand.call(interpreter,'PA_STOP',standPCLEnd);
					clearInterval(standPCLipEnd);
				}
			}
		}

		var mktLBlink = function(){
			var randomBlinkL = Math.floor( Math.random() * paramBRL );

			if (randomBlinkL == 0) {

				var standPLBlinks = [String(mktLPID + 1),'2'];

				_Game_Interpreter_pluginCommand.call(interpreter,'PA_START',standPLBlinks);

			}
		}
		var mktRBlink = function(){
			var randomBlinkR = Math.floor( Math.random() * paramBRR );

			if (randomBlinkR == 0) {

	    	var standPRBlinks = [String(mktRPID + 1),'2'];

				_Game_Interpreter_pluginCommand.call(interpreter,'PA_START',standPRBlinks);

			}

		}
		var mktCBlink = function(){
			var randomBlinkC = Math.floor( Math.random() * paramBRC );

			if (randomBlinkC == 0) {

				var standPCBlinks = [String(mktCPID + 1),'2'];

				_Game_Interpreter_pluginCommand.call(interpreter,'PA_START',standPCBlinks);

			}

		}



})()
