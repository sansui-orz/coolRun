const {ccclass, property} = cc._decorator;

@ccclass
export default class HomeMain extends cc.Component {

    @property(cc.Node)
    BaseView: cc.Node = null;

    @property(cc.Node)
    RoleSelector: cc.Node = null;

    onLoad () {
    	this.RoleSelector.active = false;
    }

    start () {

    }

    onRoleBtnClick() {
    	this.BaseView.active = false;
    	this.RoleSelector.active = true;
    }

    onRoleBack() {
    	this.RoleSelector.active = false;
    	this.BaseView.active = true;
    }

    // update (dt) {}
}
