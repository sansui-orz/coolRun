const {ccclass, property} = cc._decorator;

@ccclass
export default class RoleSelector extends cc.Component {

    @property(cc.Node)
    listContent: cc.Node = null;

    @property(cc.Prefab)
    card: cc.Prefab = null;

    @property(cc.JsonAsset)
    HeroList: cc.JsonAsset = null;

    onLoad () {
      const json = this.HeroList.json;
      for (let i = 0; i < json.length; i++) {
        const card = cc.instantiate(this.card);
        const cardScript = card.getComponent('Card');
        cardScript.init(json[i]);
        cardScript.root = this.node.parent;
        this.listContent.addChild(card);
      }
    }

    start () {

    }

    // update (dt) {}
}
