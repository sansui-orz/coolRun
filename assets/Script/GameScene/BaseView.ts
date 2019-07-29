const {ccclass, property} = cc._decorator;
import globalData from 'GlobalData';

@ccclass
export default class GameBaseView extends cc.Component {

    @property(cc.Node)
    HeroBox: cc.Node = null;

    @property(cc.Button)
    lie: cc.Button = null;

    @property([cc.Prefab])
    HeroList: cc.Prefab[] = [];

    // LIFE-CYCLE CALLBACKS:

    private lock: boolean = false;
    private Hero: cc.Animation = null;

    onLoad () {
      // 开启碰撞
      const manager: cc.CollisionManager = cc.director.getCollisionManager();
      manager.enabled = true;
      manager.enabledDebugDraw = true;

      const Hero: cc.Node = cc.instantiate(this.HeroList[globalData.HeroID]);
      this.HeroBox.addChild(Hero);
      this.Hero = Hero.getComponent(cc.Animation);


      this.lie.zIndex = 10;

      this.lie.node.on('touchstart', () => {
        if (this.lock) return;
        this.Hero.play('lie');
      });
      this.lie.node.on('touchend', () => {
        if (this.lock) return;
        this.Hero.play('run');
      });
      this.lie.node.on('touchcancel', () => {
        if (this.lock) return;
        this.Hero.play('run');
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
          this.Hero.play('run');
          this.lock = false;
        })
      );
      this.Hero.node.runAction(seq);
      this.Hero.play('jump');
    }

    // update (dt) {}
}
