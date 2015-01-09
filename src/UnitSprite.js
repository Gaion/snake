var UnitSprite = cc.Sprite.extend({
	isMoved : false,
	onEnter:function () {
		this._super();
		//this.addTouchEventListenser();
	},
	addTouchEventListenser : function() {
		this.touchListener = cc.EventListener.create({
			event: cc.EventListener.TOUCH_ONE_BY_ONE,
			swallowTouches: true,
			onTouchBegan : function(touch, event) {
				var pos = touch.getLocation(); //获取点击的坐标
				var target = event.getCurrentTarget(); //获取事件所绑定的 target
				if ( cc.rectContainsPoint(target.getBoundingBox(),pos)) { //点中了
					this.ismoved = true;
				}
				return true;
			},
			onTouchEnded : function(touch, event) {
				this.ismoved = false;
				return true;
			},
			onTouchMoved : function(touch, event) {
				if(this.ismoved) {
					event.getCurrentTarget().attr({
						x: touch.getLocationX(),
						y: touch.getLocationY(),
					});
					return true;
				}
				return false;
			}
		});
		cc.eventManager.addListener(this.touchListener,this);
	}
});