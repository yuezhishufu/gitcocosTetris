cc.Class({
    extends: cc.Component,

    properties: {
        frame:{
            default:null,
            type:cc.Node
        },
        label:{
            default:null,
            type:cc.Label
        },
        dr_l:{
            default:null,
            type:cc.Node
        },
        dr_r:{
            default:null,
            type:cc.Node
        },
        rs:{
            default:null,
            type:cc.Node
        },
        down:{
            default:null,
            type:cc.Node
        },
        bg:{
            default:null,
            type:cc.Node
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad:function(){
        this.node.on('touchstart',function(){
            if(this.label.string=="Pause"){
                this.dr_l.pauseSystemEvents(true);
                this.dr_r.pauseSystemEvents(true);
                this.rs.pauseSystemEvents(true);
                this.down.pauseSystemEvents(true);
                this.frame.getComponent('frame').unschedule(this.frame.getComponent('frame').callBack);
                this.bg.getComponent('bg').pause();
                this.label.string="Resume";
            }else if(this.label.string=="Resume"){
                this.dr_l.resumeSystemEvents(true);
                this.dr_r.resumeSystemEvents(true);
                this.rs.resumeSystemEvents(true);
                this.down.resumeSystemEvents(true);
                this.frame.getComponent('frame').schedule(this.frame.getComponent('frame').callBack,1);
                this.bg.getComponent('bg').resume();
                this.label.string="Pause";
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
