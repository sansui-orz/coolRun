const {ccclass, property} = cc._decorator;

@ccclass
export default class GameBaseView extends cc.Component {

    @property(cc.Animation)
    hero: cc.Animation = null;

    @property(cc.Button)
    lie: cc.Button = null;

    // LIFE-CYCLE CALLBACKS:

    private lock: boolean = false;

    onLoad () {
      this.lie.node.on('touchstart', () => {
        if (this.lock) return;
        this.hero.play('lie');
      });
      this.lie.node.on('touchend', () => {
        if (this.lock) return;
        this.hero.play('run');
      });
      this.lie.node.on('touchcancel', () => {
        if (this.lock) return;
        this.hero.play('run');
      });
    }

    start () {

    }

    onButton(): void {
      if (this.lock) return;
      this.lock = true;
      const seq: cc.ActionInstant = cc.sequence(
        cc.moveBy(1, 0, 100).easing(cc.easeCubicActionOut()),
        cc.moveBy(1, 0, -100).easing(cc.easeCubicActionIn()),
        cc.callFunc(() => {
          this.hero.play('run');
          this.lock = false;
        })
      );
      this.hero.node.runAction(seq);
      this.hero.play('jump');
    }

    // update (dt) {}
}
