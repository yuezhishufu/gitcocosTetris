cc.Class({
    extends: cc.Component,

    properties: {
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad:function(){
        this.node.on('touchstart',function(){
            cc.director.end();
        },this);
    },

    start () {

    },

    // update (dt) {},
});
