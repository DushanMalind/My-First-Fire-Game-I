
window.addEventListener("DOMContentLoaded", game);

const sprite=new Image();
const spriteExplosion=new Image();

//send background add
//sprite.src='![](../img/sprite.png)';
sprite.src='./assets/img/sprite.png';
//fire effect
window.onload=function (){
    spriteExplosion.src='./assets/img/explosion.png';
};

let background=document.getElementById("bac1");
let shoot=document.getElementById("fire");
let loading=document.getElementById("load");



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
            shoot.play();
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
                        loading.play();
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

    function fire(){
        var distance;
        for (var i=0;i<bullets.length;i++){
            if (!bullets[i].destroyed){
                ctx.save();
                ctx.translate(cW/2,cH/2);
                ctx.rotate(bullets[i].deg);

                ctx.drawImage(
                    sprite,
                    211,
                    100,
                    50,
                    75,
                    bullets[i].x,
                    bullets[i].y -= 20,
                    19,
                    30
                );

                ctx.restore();

                //Real coords
                bullets[i].realX = (0) - (bullets[i].y + 10) * Math.sin(bullets[i].deg);
                bullets[i].realY = (0) + (bullets[i].y + 10) * Math.cos(bullets[i].deg);

                bullets[i].realX += cW/2;
                bullets[i].realY += cH/2;

                for (var j=0;j<asteroids.length;j++){
                    if (!asteroids[j].destroyed){
                        distance=Math.sqrt(Math.pow(asteroids[j].realX-bullets[i].realX,2)+
                            Math.pow(asteroids[j].realY-bullets[i].realY,2));

                        if (distance < (((asteroids[j].width/asteroids[j].size) / 2) - 4) + ((19 / 2) - 4)) {
                            destroyed += 1;
                            asteroids[j].destroyed = true;
                            bullets[i].destroyed   = true;
                            explosions.push(asteroids[j]);
                        }
                    }
                }
            }
        }
    }

    function planet() {
        ctx.save();
        ctx.fillStyle   = 'white';
        ctx.shadowBlur    = 100;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        ctx.shadowColor   = "#999";

        ctx.arc(
            (cW/2),
            (cH/2),
            100,
            0,
            Math.PI * 2
        );
        ctx.fill();

        //Planet rotation
        ctx.translate(cW/2,cH/2);
        ctx.rotate((_planet.deg += 0.1) * (Math.PI / 180));
        ctx.drawImage(sprite, 0, 0, 200, 200, -100, -100, 200,200);
        ctx.restore();
    }

    function _player() {
        ctx.save();
        ctx.translate(cW/2,cH/2);

        ctx.rotate(player.deg);
        ctx.drawImage(
            sprite,
            200,
            0,
            player.width,
            player.height,
            player.posX,
            player.posY,
            player.width,
            player.height
        );

        ctx.restore();
        if(bullets.length - destroyed && playing) {
            fire();
        }
    }

    function start() {
        background.play();
        if(!gameOver) {
            //Clear
            ctx.clearRect(0, 0, cW, cH);
            ctx.beginPath();

            //Planet
            planet();
            //Player
            _player();

            if(playing) {
                _asteroids();

                ctx.font = "20px Verdana";
                ctx.fillStyle = "white";
                ctx.textBaseline = 'middle';
                ctx.textAlign = "left";
                ctx.fillText('Record: '+record+'', 20, 30);

                ctx.font = "40px Verdana";
                ctx.fillStyle = "white";
                ctx.strokeStyle = "black";
                ctx.textAlign = "center";
                ctx.textBaseline = 'middle';
                ctx.strokeText(''+destroyed+'', cW/2,cH/2);
                ctx.fillText(''+destroyed+'', cW/2,cH/2);

            } else {
                ctx.drawImage(sprite, 428, 12, 70, 70, cW/2 - 35, cH/2 - 35, 70,70);
            }
        } else if(count < 1) {
            count = 1;
            ctx.fillStyle = 'rgba(0,0,0,0.75)';
            ctx.rect(0,0, cW,cH);
            ctx.fill();

            ctx.font = "60px Verdana";
            ctx.fillStyle = "white";
            ctx.textAlign = "center";
            ctx.fillText("GAME OVER",cW/2,cH/2 - 150);

            ctx.font = "20px Verdana";
            ctx.fillStyle = "white";
            ctx.textAlign = "center";
            ctx.fillText("Total destroyed: "+ destroyed, cW/2,cH/2 + 140);

            record = destroyed > record ? destroyed : record;

            ctx.font = "20px Verdana";
            ctx.fillStyle = "white";
            ctx.textAlign = "center";
            ctx.fillText("RECORD: "+ record, cW/2,cH/2 + 185);

            ctx.drawImage(sprite, 500, 18, 70, 70, cW/2 - 35, cH/2 + 40, 70,70);

            canvas.removeAttribute('class');
        }
    }

    function init() {
        window.requestAnimationFrame(init);
        start();
    }

    init();

    //Utils
    function random(from, to) {
        return Math.floor(Math.random() * (to - from + 1)) + from;
    }

    if(~window.location.href.indexOf('full')) {
        var full = document.getElementsByTagName('a');
        full[0].setAttribute('style', 'display: none');
    }


}
