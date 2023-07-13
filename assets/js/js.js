
window.addEventListener("DOMContentLoaded", game);

const sprite=new Image();
const spriteExplosion=new Image();

//send background add
sprite.src='![](../img/sprite.png)';

//fire effect
window.onload=function (){
    spriteExplosion.src='![](../img/explosion.png)';
};

function game(){

    var canvas=document.getElementById('canvas'),
        ctx=canvas.getContext('2d'),
        cH=ctx.canvas.height=window.innerHeight,
        cW=ctx.canvas.width=window.innerWidth;

    //Array save
     //game basic function (import)

    /**
     *  $(window).mousemove(function (e) {});
      **/

    var bullets=[],
        asteroids=[],
        explosions=[],
        destroyed  = 0,
        record     = 0,
        count      = 0,
        playing    = false,
        gameOver   = false,
        _planet    = {deg: 0};

    var player = {
        posX   : -35,
        posY   : -(100+82),
        width  : 70,
        height : 79,
        deg    : 0
    };

    //action read to...
    canvas.addEventListener('click', action);
    canvas.addEventListener('mousemove', action);
    window.addEventListener('resize', update);

    function update() {
        cH = ctx.canvas.height = window.innerHeight;
        cW = ctx.canvas.width = window.innerWidth;
    }

    function move(e){
        player.deg = Math.atan2(e.offsetX - (cW/2), -(e.offsetY - (cH/2)));
    }


    function action(e){
        e.preventDefault();
        if (playing){
            var bullet={
                x: -8,
                y: -179,
                sizeX : 2,
                sizeY : 10,
                realX : e.offsetX,
                realY : e.offsetY,
                dirX  : e.offsetX,
                dirY  : e.offsetY,
                deg   : Math.atan2(e.offsetX - (cW/2), -(e.offsetY - (cH/2))),
                destroyed: false
            };
            bullets.push(bullet);

        }else {
            var dist;
            if (gameOver){
                dist = Math.sqrt(((e.offsetX - cW/2) * (e.offsetX - cW/2)) + ((e.offsetY - (cH/2 + 45 + 22)) * (e.offsetY - (cH/2+ 45 + 22))));
                if (dist<27){
                    if (e.type=='click'){
                        gameOver   = false;
                        count      = 0;
                        bullets    = [];
                        asteroids  = [];
                        explosions = [];
                        destroyed  = 0;
                        player.deg = 0;
                        canvas.removeEventListener('contextmenu', action);
                        canvas.removeEventListener('mousemove', move);
                        canvas.style.cursor = "default";
                    }else {
                        canvas.style.cursor="pointer";
                    }
                }else {
                    canvas.style.cursor="default";
                }
            }else {
                dist = Math.sqrt(((e.offsetX - cW/2) * (e.offsetX - cW/2)) + ((e.offsetY - cH/2) * (e.offsetY - cH/2)));

                if (dist<27){
                    if (e.type=='click'){
                        playing=true;
                        canvas.removeEventListener("mousemove",action);
                        canvas.addEventListener("contextmenu",action);
                        canvas.addEventListener("mousemove",move);
                        canvas.setAttribute("class","playing");
                        canvas.style.cursor="default";
                    }else {
                        canvas.style.cursor="pointer";
                    }
                }else {
                    canvas.style.cursor="default";
                }
            }
        }


    }
}
