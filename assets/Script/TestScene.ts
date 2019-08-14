const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    FloorCamera: cc.Node = null;

    @property(cc.Node)
    Hero: cc.Node = null;

    private speed: number = 20;

    onLoad () {
      // 开启物理系统
      cc.director.getPhysicsManager().enabled = true;
      cc.director.getPhysicsManager().debugDrawFlags = cc.PhysicsManager.DrawBits.e_shapeBit;
    }

    start () {

    }

    update (dt) {
      if (this.FloorCamera.x < 2000) {
        this.FloorCamera.x += dt * this.speed;
      }
    }
}
