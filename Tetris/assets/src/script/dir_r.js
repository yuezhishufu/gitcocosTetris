
cc.Class({
    extends: cc.Component,

    properties: {
        frame:{
            default:null,
            type:cc.Node
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad:function () {
        this.node.on('touchstart',function(){
            var curShape=this.frame.getComponent("frame").curShape;
            if(curShape.points[3]%7!=6){
                curShape.moveR();
            }
            var size=this.node.getContentSize();
            this.node.setContentSize(size.width/2,size.height/2);
        },this);
        this.node.on('touchend',function(){
            var size=this.node.getContentSize();
            this.node.setContentSize(size.width*2,size.height*2);
        },this);
        this.node.on('touchcancel',function(){
            var size=this.node.getContentSize();
            this.node.setContentSize(size.width*2,size.height*2);
        },this)
    },

    start () {

    },

    // update (dt) {},
});
