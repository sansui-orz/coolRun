const {ccclass, property} = cc._decorator;
import globalData from '../GlobalData';

@ccclass
export default class GameBaseView extends cc.Component {

    @property(cc.Button)
    lie: cc.Button = null;

    @property(cc.Button)
    jump: cc.Button = null;

    @property([cc.Prefab])
    HeroList: cc.Prefab[] = [];

    private lock: boolean = false;
    private hero: any = null;

    @property(cc.Node)
    Hero: cc.Node = null;

    onLoad () {
      cc.director.preloadScene('HomeScene');
      // 开启碰撞
      const manager: cc.CollisionManager = cc.director.getCollisionManager();
      manager.enabled = true;
      // manager.enabledDebugDraw = true;

      const Hero: cc.Node = this.Hero;
      this.hero = Hero.getComponent('Hero');

      this.lie.node.zIndex = 10;
      this.jump.node.zIndex = 10;

      const physics = this.Hero.getComponent(cc.PhysicsBoxCollider);

      this.lie.node.on('touchstart', () => {
        if (this.hero.status !== 'run') return;
        physics.size.height= 70;
        physics.apply();
        this.hero.play('lie');
      });
      this.lie.node.on('touchend', () => {
        if (this.hero.status !== 'lie') return;
        physics.size.height= 103;
        physics.apply();
        this.hero.play('run');
      });
      this.lie.node.on('touchcancel', () => {
        if (this.hero.status !== 'lie') return;
        physics.size.height= 103;
        physics.apply();
        this.hero.play('run');
      });
    }

    start () {

    }

    onButton(): void {
      this.hero.jump();
    }

    playAgain() {
      cc.director.loadScene('GameScene');
      cc.director.resume();
    }

    goHome() {
      cc.director.loadScene('HomeScene');
    }

    // update (dt) {}
}
