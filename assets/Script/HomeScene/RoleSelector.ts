const {ccclass, property} = cc._decorator;
const Card = require('Card').default;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    listContent: cc.Node = null;

    @property(cc.Prefab)
    card: cc.Prefab = null;

    onLoad () {
	    const newCard = new Card({
	    	type: 0,
	    	heroID: 0,
	    	isNew: true,
	    	isHot: false,
	    	has: true,
	    	goldCoin: 500,
	    	diamond: 200,
	    	descript: '英雄的介绍',
	    	name: '帅哥',
	    	power: 342
	    });
    }

    start () {

    }

    // update (dt) {}
}
