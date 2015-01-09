
var HelloWorldLayer = cc.LayerColor.extend({
    sprite:null,
    size : {},
    dire : 2, //方向，1=上，2=右，3=下，4=左
    ctor:function (color, width, height) {
    	this._super(color, width, height);
        this.size = cc.winSize;
        
        this.sprite = new UnitSprite(res.Unit_png);
        this.sprite.attr({
        	x: this.size.width / 4,
        	y: this.size.height / 2,
        });
        this.addChild(this.sprite);
        this.addTouchEventListenser();
        this.schedule(this.timeCallback, 0.01);
        return true;
    },
    timeCallback : function() { //定时调用
    	if(this.sprite.x + 5 >= this.size.width) {
    		this.unschedule(this.timeCallback);
    	}
    	cc.log(this.dire);
    	var p = {
    		x : 0,
    		y : 0
    	};
    	switch(this.dire) {
    	case 1 : p.y++; break;
    	case 2 : p.x++; break;
    	case 3 : p.y--; break;
    	case 4 : p.x--; break;
    	default : break;
    	}
    	this.sprite.attr({
    		x: this.sprite.x + p.x,
    		y: this.sprite.y + p.y,
    	});
    },
    addTouchEventListenser : function() {
    	cc.eventManager.addListener(cc.EventListener.create({
    		event: cc.EventListener.TOUCH_ONE_BY_ONE,
    		swallowTouches: true,
    		onTouchBegan : function(touch, event) {
    			this.bp = touch.getLocation();
    			return true;
    		},
    		onTouchEnded : function(touch, event) {
    			this.ep = touch.getLocation();
    			var target = event.getCurrentTarget()
    			if(Math.abs(this.ep.x - this.bp.x) < Math.abs(this.ep.y - this.bp.y) //X方向位移小于Y方向位移
    					&& this.bp.y < this.ep.y) { //起始点Y小于终结点Y，上滑
    				target.dire = 1;
    			}

    			if(Math.abs(this.ep.x - this.bp.x) > Math.abs(this.ep.y - this.bp.y) //X方向位移大于Y方向位移
    					&& this.bp.x < this.ep.x) { //起始点X小于终结点X，右滑
    				target.dire = 2;
    			}

    			if(Math.abs(this.ep.x - this.bp.x) < Math.abs(this.ep.y - this.bp.y) //X方向位移小于Y方向位移
    					&& this.bp.y > this.ep.y) { //起始点Y大于终结点Y，下滑
    				target.dire = 3;
    			}

    			if(Math.abs(this.ep.x - this.bp.x) > Math.abs(this.ep.y - this.bp.y) //X方向位移大于Y方向位移
    					&& this.bp.x > this.ep.x) { //起始点X大于终结点X，左滑
    				target.dire = 4;
    			}
    			return true;
    		}
    	}),this);
    }
});

var HelloWorldScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new HelloWorldLayer(cc.color(255,0,0,0));
        this.addChild(layer);
    }
});

