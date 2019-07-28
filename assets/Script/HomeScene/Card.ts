const {ccclass, property} = cc._decorator;

interface cardProperty {
  type: number;
  heroID: number;
  isNew: boolean;
  isHot: boolean;
  has: boolean;
  goldCoin: number;
  diamond: number;
  descript: string;
  name: string;
  power: number;
};

@ccclass
export default class Card extends cc.Node {
    // LIFE-CYCLE CALLBACKS:
    public width: number = 80;
    public height: number = 150;

    public type: number = 0; // 蓝色卡片
    public heroID: number = 0; // 哪个英雄
    public isNew: boolean = false; // 是否需要新的标签
    public isHot: boolean = false; // 是否需要Hot的标签
    public has: boolean = false; // 是否已经拥有，拥有则可以直接召唤
    public goldCoin: number = 1000; // 金币的售价
    public diamond: number = 500; // 钻石的售价
    public descript: string = ''; // 英雄的描述
    public name: string = ''; // 英雄的名字
    public power: number = 100; // 英雄的战斗力

    constructor(props: cardProperty) {
    	super();
      console.log(props);
    }

    // onLoad () {}

    start () {

    }

    // update (dt) {}
}
