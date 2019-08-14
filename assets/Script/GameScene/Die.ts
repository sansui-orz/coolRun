const {ccclass, property} = cc._decorator;

@ccclass
export default class Die extends cc.Component {
  @property(cc.Node)
  GameOver: cc.Node = null;

  /**
   * 当碰撞产生的时候调用
   * @param  {Collider} other 产生碰撞的另一个碰撞组件
   * @param  {Collider} self  产生碰撞的自身的碰撞组件
   */
  onCollisionEnter(other, self) {
    // 碰撞到之后，则判定游戏结束。
    this.GameOver.active = true;
    cc.director.pause();
  }
}
