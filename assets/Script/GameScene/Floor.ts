const {ccclass, property} = cc._decorator;

@ccclass
export default class Floor extends cc.Component {

    @property(cc.JsonAsset)
    FloorJson: cc.JsonAsset = null;

    @property([cc.Prefab])
    FloorEle: cc.Prefab[] = [];

    constructor() {
      super();
      console.log(3);
    }

    onLoad () {
      console.log(4);
      this.node.zIndex = 3;
      const Json = this.FloorJson.json;
      console.log(Json);
      this.node.width = Json['floor-length'];
      const list = Json['floor-list'];
      for (let i = 0; i < list.length; i++) {
        const item = list[i];
        const Block = cc.instantiate(this.FloorEle[0]);
        Block.x = item.postion.x;
        Block.y = item.postion.y;
        this.node.addChild(Block);
      }

    }

    start () {

    }

    // update (dt) {}
}
