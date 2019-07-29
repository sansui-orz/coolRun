const {ccclass, property} = cc._decorator;
import globalData from 'GlobalData';

@ccclass
export default class NewClass extends cc.Animation {
  @property([cc.Prefab])
  private HeroList: cc.Prefab[] = [];

  onLoad () {
    this.showHero(globalData.HeroID);
  }

  onEnable() {
    this.showHero(globalData.HeroID);
    // const animation = this.node.getComponent('BaseView');
    // animation.play('BaseView');
    this.play('BaseView');
    // this.play(this.name);
  }

  start () {

  }

  showHero(HeroID) {
    const HeroBox = this.node.getChildByName('HeroBox');
    HeroBox.removeAllChildren();
    const Hero = cc.instantiate(this.HeroList[HeroID]);
    HeroBox.addChild(Hero);
  }

  // update (dt) {}
}
