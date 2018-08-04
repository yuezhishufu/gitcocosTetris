
cc.Class({
    extends: cc.Component,

    properties: {
        gameover:{
            default:null,
            type:cc.Prefab
        },
        cake:{
            default:null,
            type:cc.Prefab
        },
        ck:{
            default:null,
            type:cc.Node
        },
        balloon:{
            default:null,
            type:cc.Prefab
        },
        balloons:{
            default:[],
            type:[cc.Node]
        },
        boy:{
            default:null,
            type:cc.Prefab
        },
        continue:{
            default:null,
            type:cc.Prefab
        },
        pauseframe:{
            default:null,
            type:cc.Prefab
        },
        dr_l:{
            default:null,
            type:cc.Node
        },
        dr_r:{
            default:null,
            type:cc.Node
        },
        down:{
            default:null,
            type:cc.Node
        },
        reshape:{
            default:null,
            type:cc.Node
        },
        pauseButton:{
            default:null,
            type:cc.Node
        }
    },
    gameOver:function(){
        this.node.removeChild(this.pauseButton);

        var gv=cc.instantiate(this.gameover);
        this.node.addChild(gv);
        gv.setPosition(-75,250);

        this.node.removeChild(this.dr_l);
        this.node.removeChild(this.dr_r);
        this.node.removeChild(this.down);
        this.node.removeChild(this.reshape);

        var ctn=cc.instantiate(this.continue);
        this.node.addChild(ctn);
        ctn.setPosition(-150,-1300);
        var x=0;
        this.schedule(function(){
            ctn.setPosition(-150,-1300+(x++)*50);
        },0.1,12);
        ctn.on('touchstart',function(){
            var size=ctn.getContentSize();
            ctn.setContentSize(size.width/2,size.height/2);
            cc.director.loadScene('game');
        },this);
    },
    missionComplete:function(){
        this.node.removeChild(this.pauseButton);

        var by=cc.instantiate(this.boy);
        this.node.addChild(by);
        by.setPosition(-160,246);

        this.node.removeChild(this.dr_l);
        this.node.removeChild(this.dr_r);
        this.node.removeChild(this.down);
        this.node.removeChild(this.reshape);

        var ctn=cc.instantiate(this.continue);
        this.node.addChild(ctn);
        ctn.setPosition(-150,-1300);
        var jj=0;
        this.schedule(function(){
            ctn.setPosition(-150,-1300+(jj++)*50);
        },0.1,12);

        ctn.on('touchstart',function(){
            var size=ctn.getContentSize();
            ctn.setContentSize(size.width/2,size.height/2);
            cc.audioEngine.stopAll();
            cc.director.loadScene('game');
        },this);

        var bl=cc.instantiate(this.balloon);
        this.node.addChild(bl);
        bl.setPosition(0,this.node.y-this.node.height/2);
        this.balloons.push(bl);

        bl=cc.instantiate(this.balloon);
        this.node.addChild(bl);
        bl.setPosition(50,this.node.y-this.node.height/2-150);
        this.balloons.push(bl);

        bl=cc.instantiate(this.balloon);
        this.node.addChild(bl);
        bl.setPosition(-50,this.node.y-this.node.height/2-300);
        this.balloons.push(bl);

        var xl=this.node.height/260;
        var x=1;
        this.schedule(function(){
            this.balloons[0].setPosition(0,this.node.y-this.node.height/2+(x++)*xl);
            this.balloons[1].setPosition(300,this.node.y-this.node.height/2-150+(x++)*xl);
            this.balloons[2].setPosition(-350,this.node.y-this.node.height/2-450+(x++)*xl);
        },0.01,260);
    },
    pause:function(){
        this.dr_l.opacity=0;
        this.dr_r.opacity=0;
        this.reshape.opacity=0;
        this.down.opacity=0;

        this.pframe=cc.instantiate(this.pauseframe);
        this.node.addChild(this.pframe);
        this.pframe.setPosition(-163,-712);
    },
    resume:function(){
        this.node.removeChild(this.pframe);

        this.dr_l.opacity=255;
        this.dr_r.opacity=255;
        this.reshape.opacity=255;
        this.down.opacity=255;
    },
    cakeShow:function(){
        this.ck=cc.instantiate(this.cake);
        this.node.addChild(this.ck);
        this.ck.setPosition(-100,100);
        var x=0;
        this.schedule(function(){
            if(x<=2){
                this.ck.rotation-=12;
                x++;
            }else if(x<=8){
                this.ck.rotation+=12;
                x++;
            }else{
                this.ck.rotation-=12;
                x++;
            }
        },0.08,11);
    },
    cakeDel:function(){
        this.node.removeChild(this.ck);
    },
    onLoad:function(){
    },
    start () {},
});
