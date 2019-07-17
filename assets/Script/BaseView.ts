const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Animation)
    hero: cc.Animation = null;

    @property(cc.Button)
    lie: cc.Button = null;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
      this.lie.node.on('touchstart', () => {});
      this.lie.node.on('touchend', () => {});
    }

    start () {

    }

    onButton(): void{
      // const seq: cc.ActionInstant = cc.sequence(
      //   cc.moveBy(1, 0, 70).easing(cc.),
      //   cc.moveBy(1, 0, -70),
      //   cc.callFunc(function() {
      //     this.hero.play('run');
      //   }, this)
      // );
      // this.hero.node.runAction(seq);
      this.hero.play('jump');
    }

    // update (dt) {}
}
