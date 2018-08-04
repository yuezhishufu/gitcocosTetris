var point=cc.Class({
    properties:{
        x:0,
        y:0
    },
    setPos:function(x,y){
        this.x=x;
        this.y=y;
    },
});
var shape=cc.Class({
    properties:{
        frame:{
            default:null,
            type:cc.Node
        },
        square:{
            default:null,
            type:cc.Prefab  
        },
        shape:0,
        dir:0,
        squares:{
            default:[],
            type:[cc.Node]
        },
        points:{
            default:[],
            type:[cc.Integer]
        }
    },
    init:function(frame,sh){
        this.frame=frame;
        var i=Math.ceil(Math.random()*5);
        this.square=this.frame.kofs[i-1];
        this.shape=sh;
        switch(this.shape){
            case 1:{
                var p1=this.frame.points[3];
                var p2=this.frame.points[11];
                var p3=this.frame.points[10];
                var p4=this.frame.points[4];
                if(!this.canReshape(3,4,10,11)){
                    this.frame.gameOver();
                    return false;
                }
                this.addNewsquare(p1);
                this.addNewsquare(p2);
                this.addNewsquare(p3);
                this.addNewsquare(p4);
                this.addPoints(3,11,10,4);
                this.dir=1;
            };break;
            case 2:{
                var p1=this.frame.points[2];
                var p2=this.frame.points[10];
                var p3=this.frame.points[9];
                var p4=this.frame.points[11];
                if(!this.canReshape(2,9,10,11)){
                    this.frame.gameOver();
                    return false;
                }
                this.addNewsquare(p1);
                this.addNewsquare(p2);
                this.addNewsquare(p3);
                this.addNewsquare(p4);
                this.addPoints(2,10,9,11);
                this.dir=1;
            };break;
            case 3:{
                var p1=this.frame.points[3];
                var p2=this.frame.points[4];
                var p3=this.frame.points[2];
                var p4=this.frame.points[5];
                if(!this.canReshape(2,3,4,5)){
                    this.frame.gameOver();
                    return false;
                }
                this.addNewsquare(p1);
                this.addNewsquare(p2);
                this.addNewsquare(p3);
                this.addNewsquare(p4);
                this.addPoints(3,4,2,5);
                this.dir=1;
            };break;
            case 4:{
                var p1=this.frame.points[3];
                var p2=this.frame.points[10];
                var p3=this.frame.points[2];
                var p4=this.frame.points[11];
                if(!this.canReshape(2,3,10,11)){
                    this.frame.gameOver();
                    return false;
                }
                this.addNewsquare(p1);
                this.addNewsquare(p2);
                this.addNewsquare(p3);
                this.addNewsquare(p4);
                this.addPoints(3,10,2,11);
                this.dir=1;
            };break;
            case 5:{
                var p1=this.frame.points[3];
                var p2=this.frame.points[10];
                var p3=this.frame.points[2];
                var p4=this.frame.points[4];
                if(!this.canReshape(2,3,4,10)){
                    this.frame.gameOver();
                    return false;
                }
                this.addNewsquare(p1);
                this.addNewsquare(p2);
                this.addNewsquare(p3);
                this.addNewsquare(p4);
                this.addPoints(3,10,2,4);
                this.dir=1;
            };break;
            default:;break;
        }
        return true;
    },
    reInit:function(frame){
        this.frame=frame;
        this.shape=0;
        this.square=null;
        this.dir=0;
        this.squares.splice(0,this.squares.length);
        this.points.splice(0,this.points.length);
    },
    addNewsquare:function(p){
        var newSquare=cc.instantiate(this.square);
        this.frame.grid.addChild(newSquare);
        newSquare.setPosition(p.x,p.y);
        this.squares.push(newSquare);
    },
    addPoints:function(p1,p2,p3,p4){
        this.points.push(p1);
        this.points.push(p2);
        this.points.push(p3);
        this.points.push(p4);
    },
    changeShape:function(p1,p2,p3,p4){
        var points=this.frame.points;
        this.squares[0].setPosition(points[p1].x,points[p1].y);
        this.squares[1].setPosition(points[p2].x,points[p2].y);
        this.squares[2].setPosition(points[p3].x,points[p3].y);
        this.squares[3].setPosition(points[p4].x,points[p4].y);
        this.points[0]=p1;
        this.points[1]=p2;
        this.points[2]=p3;
        this.points[3]=p4;
    },
    moveL:function(){
        if(this.canReshape(this.points[0]-1,this.points[1]-1,this.points[2]-1,this.points[3]-1)){
            for(var i=0;i<4;i++){
                this.points[i]-=1;
                var pp=this.points[i];
                this.squares[i].setPosition(this.frame.points[pp].x,this.frame.points[pp].y);
            }
        }
    },
    moveR:function(){
        if(this.canReshape(this.points[0]+1,this.points[1]+1,this.points[2]+1,this.points[3]+1)){
            for(var i=0;i<4;i++){
                this.points[i]+=1;
                var pp=this.points[i];
                this.squares[i].setPosition(this.frame.points[pp].x,this.frame.points[pp].y);
            }
        }
    },
    moveD:function(){
        if(this.isEnd()){
            return;
        }
        for(var i=0;i<4;i++){
            this.points[i]+=7;
            var pp=this.points[i];
            this.squares[i].setPosition(this.frame.points[pp].x,this.frame.points[pp].y);
        }
    },
    canReshape:function(p1,p2,p3,p4){
        var squs=this.frame.squares;
        if(squs[p1]==0&&squs[p2]==0&&squs[p3]==0&&squs[p4]==0){
            return 1;
        }
        return 0;
    },
    reShape:function(){
        switch(this.shape){
            case 1:;break;
            case 2:{
                switch(this.dir){
                    case 1:{
                        var p1=this.points[0]+1;
                        var p4=p1+1;
                        var p3=p1+7;
                        var p2=p3+7;
                        if(p2<=76){
                            if(this.canReshape(p1,p2,p3,p4)){
                               this.changeShape(p1,p2,p3,p4);
                               this.dir=2;
                            }
                        }
                    };break;
                    case 2:{
                        var p1=this.points[2];
                        var p3=p1-1;
                        var p4=p1+1;
                        var p2=p4+7;
                        if((p3+1)%7==0){
                            p1+=1;
                            p2+=1;
                            p3+=1;
                            p4+=1;
                        }
                        if(this.canReshape(p1,p2,p3,p4)){
                           this.changeShape(p1,p2,p3,p4);
                           this.dir=3;
                        }
                    };break;
                    case 3:{
                        var p1=this.points[0]-7;
                        var p2=p1+14;
                        var p3=p2-1;
                        var p4=p1+7;
                        if(p1<0){
                           p1+=7;
                           p2+=7;
                           p3+=7;
                           p4+=7;
                        }
                        if(this.canReshape(p1,p2,p3,p4)){
                           this.changeShape(p1,p2,p3,p4);
                           this.dir=4;
                        }
                    };break;
                    case 4:{
                        var p1=this.points[0]-1;
                        var p3=p1+7;
                        var p2=p3+1;
                        var p4=p2+1;
                        if((p4-1)%7==6){
                            p1-=1;
                            p2-=1;
                            p3-=1;
                            p4-=1;            
                        }
                        if(this.canReshape(p1,p2,p3,p4)){
                           this.changeShape(p1,p2,p3,p4);
                           this.dir=1;
                        }
                    };break;
                    default:;break;
                }
            };break;
            case 3:{
                switch(this.dir){
                    case 1:{
                        var p1=this.points[0]-7;
                        var p3=p1+7;
                        var p4=p3+7;
                        var p2=p4+7;
                        if(p2<=76){
                            if(p1<0){
                                p1+=7;
                                p2+=7;
                                p3+=7;
                                p4+=7;
                            }
                            if(this.canReshape(p1,p2,p3,p4)){
                               this.changeShape(p1,p2,p3,p4);
                               this.dir=2;
                            }else if(this.canReshape(p1+1,p2+1,p3+1,p4+1)){
                                this.changeShape(p1+1,p2+1,p3+1,p4+1);
                                this.dir=2;
                            }
                        }
                    };break;
                    case 2:{
                        var p1=this.points[2];
                        var p2=p1+1;
                        var p3=p1-1;
                        var p4=p2+1;
                        if((p3+1)%7==0){
                            p1+=1;
                            p2+=1;
                            p3+=1;
                            p4+=1;
                        };
                        if((p4-1)%7==6){
                            p1-=1;
                            p2-=1;
                            p3-=1;
                            p4-=1;
                        }else if((p4-2)%7==6){
                            p1-=2;
                            p2-=2;
                            p3-=2;
                            p4-=2;
                        }
                        if(this.canReshape(p1,p2,p3,p4)){
                           this.changeShape(p1,p2,p3,p4);
                           this.dir=1;
                        }
                    };break;
                    default:;break;
                }
            };break;
            case 4:{
                switch(this.dir){
                    case 1:{
                        var p1=this.points[0];
                        var p4=p1+7;
                        var p3=p4-1;
                        var p2=p3+7;
                        if(p4<=76){
                            if(this.canReshape(p1,p2,p3,p4)){
                               this.changeShape(p1,p2,p3,p4);
                               this.dir=2;
                            }
                        }
                    };break;
                    case 2:{
                        var p1=this.points[0];
                        var p2=p1+7;
                        var p3=p1-1;
                        var p4=p2+1;
                        if((p4-1)%7==6){
                            p1-=1;
                            p2-=1;
                            p3-=1;
                            p4-=1;
                        }
                        if(this.canReshape(p1,p2,p3,p4)){
                           this.changeShape(p1,p2,p3,p4);
                           this.dir=1;
                        }
                    };break;
                    default:;break;
                }
            };break;
            case 5:{
                switch(this.dir){
                    case 1:{
                        var p1=this.points[0];
                        var p3=p1+7;
                        var p2=p3+7;
                        var p4=p3+1;
                        if(p4<=76){
                            if(this.canReshape(p1,p2,p3,p4)){
                               this.changeShape(p1,p2,p3,p4);
                               this.dir=2;
                            }
                        }
                    };break;
                    case 2:{
                        var p1=this.points[2];
                        var p2=p1+7;
                        var p3=p1-1;
                        var p4=p1+1;
                        if((p3+1)%7==0){
                            p1+=1;
                            p2+=1;
                            p3+=1;
                            p4+=1;
                        }
                        if(this.canReshape(p1,p2,p3,p4)){
                           this.changeShape(p1,p2,p3,p4);
                           this.dir=3;
                        }
                    };break;
                    case 3:{
                        var p1=this.points[0]-7;
                        var p4=p1+7;
                        var p3=p4-1;
                        var p2=p4+7;
                        if(p1<0){
                            p1+=7;
                            p2+=7;
                            p3+=7;
                            p4+=7;
                        }
                        if(this.canReshape(p1,p2,p3,p4)){
                           this.changeShape(p1,p2,p3,p4);
                           this.dir=4;
                        }
                    };break;
                    case 4:{
                        var p1=this.points[0];
                        var p2=p1+7;
                        var p3=p2-1;
                        var p4=p2+1;
                        if((p4-1)%7==6){
                            p1-=1;
                            p2-=1;
                            p3-=1;
                            p4-=1;
                        }
                        if(this.canReshape(p1,p2,p3,p4)){
                           this.changeShape(p1,p2,p3,p4);
                           this.dir=1;
                        }
                    };break;
                    default:;break;
                }
            };break;
            default:;break;
        }
    },
    isEnd:function(){
        var s=0;
        var squs=this.frame.squares;
        for(var i=0;i<this.points.length;i++){
            if(squs[this.points[i]+7]!=0){
                s=1;break;
            }
        }
        if(this.points[1]>=70||s){
            if(this.frame.topLine>parseInt(this.points[0]/7)){
                this.frame.topLine=parseInt(this.points[0]/7);
            }
            return 1;
        }
        return 0;
    }
});
cc.Class({
    extends: cc.Component,

    properties: {
        kofs:{
            default:[],
            type:[cc.Prefab]
        },
        grid:{
            default:null,
            type:cc.Node
        },
        frame2:{
            default:null,
            type:cc.Node
        },
        squares:{
            default:[],
            type:[cc.Integer]
        },
        points:{
            default:[],
            type:[cc.Class]
        },
        curShape:{
            default:null,
            type:cc.Class
        },
        nextShape:{
            default:null,
            type:cc.Class
        },
        topLine:11,
        scoreDisplay:{
            default:null,
            type:cc.Label
        },
        shapes:{
            default:[],
            type:[cc.Prefab]
        },
        bg:{
            default:null,
            type:cc.Node
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
        bgAudio:{
            default:null,
            url:cc.AudioClip
        },
        scoreAudio1:{
            default:null,
            url:cc.AudioClip
        },
        scoreAudio2:{
            default:null,
            url:cc.AudioClip
        },
        overAudio:{
            default:null,
            url:cc.AudioClip
        },
        succeedAudio:{
            default:null,
            url:cc.AudioClip
        }
    },

    onLoad:function () {
        //分数置零;
        this.score=0;
        this.score1=0;
        //占位数组初始化;
        for(var i=0;i<77;i++){
            this.squares.push(0);
        }
        //点阵坐标初始化;
        var xl=(this.grid.width-4)/7;
        var yl=(this.grid.height-7)/11;
        var xs=this.grid.x-this.grid.width/2+xl/2+xl;
        var ys=this.grid.y+this.grid.height/2-yl/2-yl*2+8;
        for(var i=0;i<11;i++){
            for(var j=0;j<7;j++){
                var xp=xs+xl*j;
                var yp=ys-yl*i;
                var p=new point();
                p.setPos(xp,yp);
                this.points.push(p);
            }
        }
        //当前形状与下一个形状创建;
        this.curShape=new shape();
        var cs=Math.ceil(Math.random()*5);
        this.curShape.init(this,cs);
        var ns=Math.ceil(Math.random()*5);
        while(ns==cs){
            ns=Math.ceil(Math.random()*5);
        }
        this.nextShape=cc.instantiate(this.shapes[ns-1]);
        this.frame2.addChild(this.nextShape);
        this.nextShape.setPosition(0,0);
        //背景音乐;
        this.audioID=cc.audioEngine.play(this.bgAudio, true,0.2);
        //定时器，定时调度;
        this.schedule(this.callBack=function(){
            if(this.curShape.isEnd()){
                var ps=this.curShape.points;
                for(var i=0;i<ps.length;i++){
                    this.squares[ps[i]]=1;
                }
                this.checkRows(this.curShape.points[0],this.curShape.points[1]);
                this.curShape.reInit(this);
                cs=ns;
                if(!this.curShape.init(this,cs))return;
                ns=Math.ceil(Math.random()*5);
                while(cs==ns){
                    ns=Math.ceil(Math.random()*5);
                }
                this.showNext(ns);
                return;
            }
            this.curShape.moveD();
        },1);
    },
    checkRows:function(top,bottom){
        var l=0;
        var btm=parseInt(bottom/7);
        var tp=parseInt(top/7);
        for(var i=tp;i<=btm;i++){
            if(this.isFull(i)){
                l++;
                this.destoryLine(i);
                this.tightenLines(i);
            }
        }
        if(l>0){
            this.gainScore(l);
        }
    },
    isFull:function(p){
        for(var i=p*7;i<(p+1)*7;i++){
            if(this.squares[i]!=1){
                return false;
            }
        }
        return true;
    },
    destoryLine:function(p){
        for(var i=p*7;i<(p+1)*7;i++){
                this.squares[i]=0;
                var n=this.findSquareByPos(this.points[i]);
                this.grid.removeChild(n);
        }
    },
    tightenLines:function(start){
        if(start==this.topLine){
            this.topLine++;
            return;
        }
        for(var i=start-1;i>=this.topLine;i--){
            this.downLine(i);
        }
        this.topLine++;
    },
    downLine:function(p){
        for(var i=p*7;i<(p+1)*7;i++){
            if(this.squares[i]==1){
                this.squares[i]=0;
                this.squares[i+7]=1;
                var sq=this.findSquareByPos(this.points[i]);
                sq.setPosition(this.points[i+7].x,this.points[i+7].y);
            }
        }
    },
    findSquareByPos:function(p){
        var children=this.grid.children;
        for(var i=0;i<children.length;i++){
            if(p.x==children[i].x&&p.y==children[i].y){
                return children[i];
            }
        }
    },
    gainScore:function(l){
        var s=1;
        for(var i=0;i<l;i++){
            s*=2;
        }
        this.score+=s-1;
        this.score1+=s-1;
        this.scoreDisplay.string='Score:\n'+this.score.toString();
        if(this.score>=100){
            this.missionComplete();
            return;
        }
        cc.audioEngine.play(this.scoreAudio1,false,0.4);
        if(l>1){
            cc.audioEngine.play(this.scoreAudio2,false,0.4);
        }
        if(this.score1>=30){
            this.score1=0;
            this.grid.removeAllChildren();
            for(var i=0;i<77;i++){
                if(this.squares[i]==1){
                    this.squares[i]=0;
                }
            }
            this.bg.getComponent('bg').cakeShow();
            this.schedule(function(){
                this.bg.getComponent('bg').cakeDel();
            },1.5,1);
        }
    },
    gameOver:function(){
        this.unscheduleAllCallbacks();
        cc.audioEngine.stop(this.audioID);
        cc.audioEngine.play(this.overAudio);
        this.dr_l.pauseSystemEvents(true);
        this.dr_r.pauseSystemEvents(true);
        this.rs.pauseSystemEvents(true);
        this.down.pauseSystemEvents(true);
        this.bg.getComponent('bg').gameOver();
    },
    missionComplete:function(){
        this.unscheduleAllCallbacks();
        cc.audioEngine.stop(this.audioID);
        cc.audioEngine.play(this.succeedAudio);
        this.dr_l.pauseSystemEvents(true);
        this.dr_r.pauseSystemEvents(true);
        this.rs.pauseSystemEvents(true);
        this.down.pauseSystemEvents(true);
        this.bg.getComponent('bg').missionComplete();
    },
    showNext:function(ns){
        this.frame2.removeChild(this.nextShape);
        this.nextShape=cc.instantiate(this.shapes[ns-1]);
        this.frame2.addChild(this.nextShape);
        this.nextShape.setPosition(0,0);
    },
    update:function (dt) {

    }
});
