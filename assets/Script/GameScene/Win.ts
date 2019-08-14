const {ccclass, property} = cc._decorator;

@ccclass
export default class Win extends cc.Component {

  @property(cc.Node)
  Win: cc.Node = null;

  /**
   * 当碰撞产生的时候调用
   * @param  {Collider} other 产生碰撞的另一个碰撞组件
   * @param  {Collider} self  产生碰撞的自身的碰撞组件
   */
  onCollisionEnter(other, self) {
    this.Win.active = true;
    cc.director.pause();
  }
}
