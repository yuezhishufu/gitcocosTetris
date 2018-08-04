
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
        var frame=this.frame.getComponent("frame");
        this.node.on('touchstart',function(){
            var curShape=frame.curShape;
            if(curShape.points[1]<70){
                curShape.moveD();
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
