const {ccclass, property} = cc._decorator;

@ccclass
export default class Floor extends cc.Component {

    @property(cc.JsonAsset)
    FloorJson: cc.JsonAsset = null;

    @property([cc.Prefab])
    FloorEle: cc.Prefab[] = [];

    onLoad () {
    }

    start () {

    }

    // update (dt) {}
}
