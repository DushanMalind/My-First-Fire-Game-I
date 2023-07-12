
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
    var bullets=[],
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
    window.addEventListener('resize', action);

}
