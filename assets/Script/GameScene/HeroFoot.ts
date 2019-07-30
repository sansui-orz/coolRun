const {ccclass, property} = cc._decorator;

@ccclass
export default class HeroFoot extends cc.Component {
    // onLoad () {}
    public downing: boolean = false;

    start () {
      console.log(this.node.parent);
      this.node.parent.y = 200;
    }

    // onCollisionEnter() {
    //   console.log('进入碰撞');
    //   this.downing = false;
    // }

    // onCollisionStay() {
    //   // console.log('正在发生碰撞');
    // }

    // onCollisionExit() {
    //   console.log('离开碰撞');
    //   this.downing = true;
    // }

    // update() {
    //   if (this.downing) {
    //     console.log('??', this.node.parent.y);
    //     // this.node.parent.y = this.node.parent.y - 1;
    //     // this.node.parent.y = 100;
    //     this.node.parent.setPosition(0, this.node.parent.y - 1);
    //   }
    // }
}
