const {ccclass, property} = cc._decorator;

@ccclass
export default class Hero extends cc.Component {

  private rigidbody: cc.RigidBody = null;

  private animation: cc.Animation = null;

  public status: string = 'run';

  private onGround: boolean = false;

  private jumpStatus: number = 1;

  private speedX: number = 0;

  private x: number = 0;

  private score: number = 0;

  @property(cc.Node)
  camera: cc.Node = null;

  @property(cc.Label)
  ScoreLabel: cc.Label = null;

  @property(cc.Node)
  GameOver: cc.Node = null;

  onLoad () {
    // 开启物理系统
    cc.director.getPhysicsManager().enabled = true;

    cc.director.getPhysicsManager().debugDrawFlags = cc.PhysicsManager.DrawBits.e_shapeBit;

    this.rigidbody = this.node.getComponent(cc.RigidBody);
    this.animation = this.node.getComponent(cc.Animation);
    this.speedX = this.rigidbody.linearVelocity.x;
    this.x = this.node.x;
  }

  update() {
    if (!this.onGround && this.status !== 'jump' && this.status !== 'lie') {
      const speedY = this.rigidbody.linearVelocity.y;
      if (speedY > 0 && this.status !== 'up') {
        // 向上跳
        this.play('up');
      } else if (speedY < 0 && this.status !== 'down') {
        // 向下掉落
        this.play('down');
      } else if (speedY === 0 && this.status !== 'delay') {
        // 刚好处在最顶端
        this.play('delay');
      }
    } else if (this.status !== 'run' && this.onGround && this.status !== 'lie') {
      this.play('run');
    }
  }

  play(animationName: string) {
    // console.log(animationName);
    this.status = animationName;
    this.animation.play(animationName);
  }

  // 跳起来
  jump() {
    function applyLinearImpulse(up: number):void {
      // 给HERO刚体施加向上的冲量
      const p = this.rigidbody.getLocalCenter();
      this.rigidbody.applyLinearImpulse(cc.v2(0, p.y + up), p, true);
    }

    if (this.status === 'run') {
      this.jumpStatus = 1;      
      applyLinearImpulse.call(this, 400);
    } else if ((this.status === 'up' || this.status === 'down' || this.status === 'delay') && this.jumpStatus === 1) {
      this.jumpStatus = 2;
      this.rigidbody.linearVelocity = cc.v2(this.rigidbody.linearVelocity.x, 0);
      applyLinearImpulse.call(this, 300);
      this.play('jump');
      const finished = function() {
        this.animation.off('finished', finished, this);
        this.play('down');
      };
      this.animation.on('finished', finished, this);
    }
  }

  addScore(score) {
    this.score += score;
    this.ScoreLabel.string = '当前分数: ' + this.score;
  }

  // 当碰撞产生的时候调用(刚体)
  onBeginContact(contact, selfCollider, otherCollider) {
    if (otherCollider.tag === 1) {
      // 接触到地板
      this.onGround = true;
    } else if (otherCollider.tag === 2) {
    } else if (otherCollider.tag === 4) {
      // 地刺, 皮皮虾
      // 碰撞到之后，则判定游戏结束。
      this.GameOver.active = true;
      cc.director.pause();
    } else if (otherCollider.tag === 5) {
      // 碰到了皮皮虾
      // 跳起来
      this.jumpStatus = 1; 
      // this.play('up');
      this.addScore(20);
      const p = this.rigidbody.getLocalCenter();
      this.rigidbody.applyLinearImpulse(cc.v2(0, p.y + 400), p, true);
      // this.play('up');
      const parent: cc.Node = otherCollider.node.parent;
      otherCollider.node.active = false;
      parent.getChildByName('DieArea').active = false;
      parent.removeComponent(cc.Sprite);
      const particleBox = parent.getChildByName('particle');
      const particle = particleBox.getComponent(cc.ParticleSystem);
      particle.resetSystem();
    } else if (otherCollider.tag === 6) {
      // 碰到弹簧
      this.jumpStatus = 1; 
      // this.play('up');
      const p = this.rigidbody.getLocalCenter();
      this.rigidbody.applyLinearImpulse(cc.v2(0, p.y + 700), p, true);
    }
  }

  // 刚刚体碰撞结束时调用(刚体)
  onEndContact(contact, selfCollider, otherCollider) {
    cc.log(otherCollider.tag);
    if (otherCollider.tag === 1) {
      // 离开地板
      this.onGround = false;
    } else if (otherCollider.tag === 2) {
      // 阻拦的墙壁
      const speedX = this.rigidbody.linearVelocity.x;
      if (speedX !== this.speedX) {
        this.rigidbody.linearVelocity = cc.v2(this.speedX, this.rigidbody.linearVelocity.y);
        const action = cc.moveBy(1, this.camera.x - this.node.x + this.x, this.node.y);
        this.node.runAction(action);
      } else {
      }
    } else {
      // 其他
    }
  }

  onCollisionEnter(other, self) {
    if (other.tag === 3) {
      // 吃到金币
      this.addScore(10);
      const particleNode: cc.Node = other.node.parent.getChildByName('_particle');
      const particle: cc.ParticleSystem = particleNode.getComponent(cc.ParticleSystem);
      particle.resetSystem();
      other.node.active = false;
    }
  }
}
