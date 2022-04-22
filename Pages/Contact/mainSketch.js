import * as THREE from "https://unpkg.com/three@0.127.0/build/three.module.js";
import {TrackballControls} from "https://unpkg.com/three@0.127.0/examples/jsm/controls/TrackballControls.js";
import {GUI} from 'https://cdn.jsdelivr.net/npm/lil-gui@0.16/+esm';
import { TWEEN } from 'https://unpkg.com/three@0.127.0/examples/jsm/libs/tween.module.min'

(function() {

  var sample = window.sample || {};
  window.sample = sample;

  /**
   * メインビジュアルクラス
   * @param {number} numChars - 文字数 (正方形の数)
   * @param {number} charWidth - 文字の幅 [px]
   * @param {number} numTextureGridCols - テクスチャの1行文の文字列 [px]
   * @param {number} textureGridSize - テクスチャの1文字分の幅 [px]
   */
  sample.MainVisual = function(numChars, charWidth, numTextureGridCols, textureGridSize, fontFamily) {

    // 文字数 = 正方形の数
    this.numChars = numChars || 1000;

    // 文字の幅[px] (geometryの1文字の幅)
    this.charWidth = charWidth || 4;

    // テクスチャの1行文の文字列
    this.numTextureGridCols = numTextureGridCols || 14;

    // テクスチャの1文字分の幅
    this.textureGridSize = textureGridSize || 126;

    // 使用するフォント名
    this.fontFamily = fontFamily || 'Source Sans Pro'

    // アニメーション適用度
    // 頂点シェーダ内でアニメーションが3つ定義されており
    // それらを切り替えるための値
    this.animationValue1 = 0;
    this.animationValue2 = 1;
    this.animationValue3 = 0;

    // イニシャライズ
    this.init();
  }

  /**
   * イニシャライズ
   */
  sample.MainVisual.prototype.init = function() {
    var self = this;

    this.$window = $(window);

    // div#mainを取得
    this.$mainVisual = $('#main');

    // webGL renderer
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.$mainVisual.find('canvas').get(0),  // HTML上の#contents > #main > canvasのHTMLElementを指定
      alpha: true,
      antialias: true
    });

    // 高解像度ディスプレイ対応 (2倍がmax)
    var pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
    this.renderer.setPixelRatio(pixelRatio);

    // scene
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color( "rgb(255,255,255)" )

    // camera
    this.camera = new THREE.PerspectiveCamera(95, this.width / this.height, 1, 1000);
    this.camera.position.set(0, 0, 150);

    // controls
    // 第二引数にthis.renderer.domElementを指定しておかないと、dat.guiのGUIがうまく操作できない
    this.controls = new TrackballControls(this.camera, this.renderer.domElement);

    // ウィンドウリサイズイベント
    this.$window.on('resize', function(e) {
      // resizeメソッドを実行
      self.resize();
    });

    // THREE.Meshを拡張したFloatingCharsをイニシャライズ
    // 非同期処理が終了したらリサイズイベントを発火して、アニメーション開始
    this.initFloatingChars()
    .then(function() {
      // resizeイベントを発火してキャンバスサイズをリサイズ
      self.$window.trigger('resize');

      // アニメーション開始
      self.start();
    });
  }


  /**
   * floatingCharsをイニシャライズ
   */
  sample.MainVisual.prototype.initFloatingChars = function() {
    var self = this;

    return new Promise(function(resolve) {
      // webfont load event
      WebFont.load({
        // Google Fontを使用
        google: {
          families: [ self.fontFamily ]  // フォント名を指定
        },
        active: function(fontFamily, fontDescription) {
          // ロード完了
          console.log('webfonts loaded');

          // FloatingCharsインスタンス化
          self.floatingChars = new sample.FloatingChars(
            self.numChars,
            self.charWidth,
            self.numTextureGridCols,
            self.textureGridSize
          );

          // テクスチャをイニシャライズ
          // 第一引数は使用する文字 (ユニーク)
          // 第二引数は使用するフォント名
          // self.floatingChars.createTxtTexture('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_+-=[]{}|:;?<>,.', self.fontFamily);
          // self.floatingChars.createTxtTexture('MYNAMEISALESSIOMONTIANDIAMADESIGNER.ICREATEINTERACTIVEDATA-DRIVENINFORMATIONSYSTEMS.', self.fontFamily);
          // self.floatingChars.createTxtTexture('LOVEU!', self.fontFamily);
          self.floatingChars.createTxtTexture('TALK SOON!', self.fontFamily);


          // シーンに追加
          self.scene.add(self.floatingChars);

          // dat.guiのGUIを生成
          self.createDatGUIBox();

          // 完了
          resolve();
        }
      });
    });
  }


  /**
   * アニメーション開始
   */
  sample.MainVisual.prototype.start = function() {
    var self = this;

    var enterFrameHandler = function() {
      requestAnimationFrame(enterFrameHandler);
      self.update();
    };

    enterFrameHandler();
  }


  /**
   * アニメーションループ内で実行される
   */
  sample.MainVisual.prototype.update = function() {
    this.controls.update();
    TWEEN.update()
    this.floatingChars.update(this.camera);
    this.renderer.render(this.scene, this.camera);
  }


  /**
   * リサイズ処理
   * @param {jQuery.Event} e - jQueryのイベントオブジェクト
   */
  sample.MainVisual.prototype.resize = function() {
    this.width = this.$window.width();
    this.height = this.$window.height();

    // TrackballControlsのリサイズ処理を実行
    this.controls.handleResize();

    // カメラの設定を更新
    this.camera.aspect = this.width / this.height;
    this.camera.updateProjectionMatrix();

    // WebGLRendererの設定を更新
    this.renderer.setSize(this.width, this.height);
  }


  /**
   * dat.gui
   * dat.guiのコントローラーを定義
   */
  sample.MainVisual.prototype.createDatGUIBox = function() {
    var self = this;

    var gui = new GUI({width: 150});

    let animobj = {
      anim1: function(){
        let tween1 = new TWEEN.Tween( self.floatingChars.material.uniforms.animationValue1 ).to( {value:1}, 1000).start()
        let tween2 = new TWEEN.Tween( self.floatingChars.material.uniforms.animationValue2 ).to( {value:0.5}, 1000).start()
        let tween3 = new TWEEN.Tween( self.floatingChars.material.uniforms.animationValue3 ).to( {value:0.45}, 1000).start()
      },
      anim2: function(){
        let tween1 = new TWEEN.Tween( self.floatingChars.material.uniforms.animationValue1 ).to( {value:0}, 1000).start()
        let tween2 = new TWEEN.Tween( self.floatingChars.material.uniforms.animationValue2 ).to( {value:1}, 1000).start()
        let tween3 = new TWEEN.Tween( self.floatingChars.material.uniforms.animationValue3 ).to( {value:0}, 1000).start()
      },
      anim3: function(){
        let tween1 = new TWEEN.Tween( self.floatingChars.material.uniforms.animationValue1 ).to( {value:0}, 1000).start()
        let tween2 = new TWEEN.Tween( self.floatingChars.material.uniforms.animationValue2 ).to( {value:0}, 1000).start()
        let tween3 = new TWEEN.Tween( self.floatingChars.material.uniforms.animationValue3 ).to( {value:1}, 1000).start()
        }
      }

    // スライダーのGUIを追加
    var controller1 = gui.add(this, 'animationValue1', 0, 1).name('value 1');
    var controller2 = gui.add(this, 'animationValue2', 0, 1).name('value 2');
    var controller3 = gui.add(this, 'animationValue3', 0, 1).name('value 3');

    // 値をアニメーションさせるためのボタンを設置
    // それぞれをクリックすると、animation1, animation2, animation3メソッドが呼ばれる
    gui.add(animobj, 'anim1').name('snowglobe');
    gui.add(animobj, 'anim2').name('cylinder');
    gui.add(animobj, 'anim3').name('satellite');

    // 値の変更時にuniform変数の値を変更
    controller1.onChange(function(value) {
      self.floatingChars.setUniform('animationValue1', value);
    });
    controller2.onChange(function(value) {
      self.floatingChars.setUniform('animationValue2', value);
    });
    controller3.onChange(function(value) {
      self.floatingChars.setUniform('animationValue3', value);
    });
  }


  /**
   * animationValueを変更
   * @param {number} index - 1 | 2 | 3 (animationValue)
   */
  // sample.MainVisual.prototype.animate = function(index) {
  //   if(this.animateTween) {
  //     this.animateTween.kill();
  //   }
  //   var self = this;
  //
  //   this.animateTween = new TWEEN.Tween(this, 1,
  //     {
  //     ease: TWEEN.Easing.Cubic.Outt,
  //     animationValue1: (index == 1)? 1: 0,
  //     animationValue2: (index == 2)? 1: 0,
  //     animationValue3: (index == 3)? 1: 0,
  //     onUpdate: function() {
  //       self.floatingChars.setUniform('animationValue1', self.animationValue1);
  //       self.floatingChars.setUniform('animationValue2', self.animationValue2);
  //       self.floatingChars.setUniform('animationValue3', self.animationValue3);
  //     }
  //   });
  // }
  //
  // sample.MainVisual.prototype.animation1 = function() {
  //   this.animate(1);
  // }
  // sample.MainVisual.prototype.animation2 = function() {
  //   this.animate(2);
  // }
  // sample.MainVisual.prototype.animation3 = function() {
  //   this.animate(3);
  // }

})();
