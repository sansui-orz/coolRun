const {ccclass, property} = cc._decorator;
import globalData from 'GlobalData';

interface IHeroProperty {
  id: number;
  name: string;
  has: boolean;
  type: number;
};

@ccclass
export default class Card extends cc.Component {
  @property(cc.SpriteAtlas)
  private cardSpriteAtlas: cc.SpriteAtlas = null;

  @property([cc.Prefab])
  private HeroList: cc.Prefab[] = [];


  onLoad () {
  }

  start () {

  }

  init(props: IHeroProperty) {
    const NameLabel = this.node.getChildByName('NameLabel');
    NameLabel.getComponent(cc.Label).string = props.name;
    // 如果type是1，则是黄色背景
    if (props.type === 1) {
      const Bg: cc.Node = this.node.getChildByName('Bg');
      const yellowBgSprite: cc.SpriteFrame = this.cardSpriteAtlas.getSpriteFrame('天天酷跑.00178_07');
      Bg.getComponent(cc.Sprite).spriteFrame = yellowBgSprite;
    }

    const hero = cc.instantiate(this.HeroList[props.id]);
    hero.anchorX = 0.5;
    hero.anchorY = 0.5;
    const HeroBox = this.node.getChildByName('HeroBox');
    // HeroBox.removeAllChildren();
    HeroBox.addChild(hero);

    const Btn = this.node.getChildByName('Btn');
    Btn.on('touchend', () => {
      this.checkoutHero(props.id);
    });
  }

  // 切换英雄
  checkoutHero(HeroID: number) {
    globalData.HeroID = HeroID;
    const MainScript = this.root.getComponent('Main');
    MainScript.onRoleBack();
  }

  // update (dt) {}
}
