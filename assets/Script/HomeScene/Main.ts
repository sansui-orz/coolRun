const {ccclass, property} = cc._decorator;

@ccclass
export default class HomeMain extends cc.Component {

  @property(cc.Node)
  BaseView: cc.Node = null;

  @property(cc.Node)
  RoleSelector: cc.Node = null;

  onLoad () {
    cc.director.preloadScene('GameScene');
    this.RoleSelector.active = false;
  }

  onEnable() {

  }

  start () {

  }

  onRoleBtnClick() {
    this.BaseView.active = false;
    this.RoleSelector.active = true;
  }

  onRoleBack() {
    this.BaseView.active = true;
    this.RoleSelector.active = false;
  }

  playGame() {
    cc.director.loadScene('GameScene');
  }

  // update (dt) {}
}
