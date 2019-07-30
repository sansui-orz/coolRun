const {ccclass, property} = cc._decorator;

@ccclass
export default class Floor extends cc.Component {

    @property(cc.JsonAsset)
    FloorJson: cc.JsonAsset = null;

    @property([cc.Prefab])
    FloorEle: cc.Prefab[] = [];

    onLoad () {
      this.node.zIndex = 3;
      const Json = this.FloorJson.json;
      this.node.width = Json['floor-length'];
      const list = Json['floor-list'];
      for (let i = 0; i < list.length; i++) {
        const item = list[i];
        const Block = cc.instantiate(this.FloorEle[item.type]);
        Block.x = item.position.x;
        Block.y = item.position.y;
        this.node.addChild(Block);
      }

      // const action: cc.Action = cc.moveBy(Json['floor-length'] / Json.speed, -Json['floor-length'], 0);
      // const action: cc.Action = cc.moveBy(2, 300, 0);
      // this.node.runAction(action);
    }

    start () {

    }

    // update (dt) {}
}
