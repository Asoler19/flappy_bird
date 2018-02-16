const Sun= function(xpos,ypos, ctx){
    this.xpos= xpos;
    this.ypos= ypos;
    this.ctx= ctx;
    this.velY = 0;
    this.width=160;
    this.height= 160;
    this.bgsun= document.getElementById('sun');
};
Sun.prototype.update = function(bird){
this.ypos += this.velY;
};

Sun.prototype.render= function(){
let renderX = this.xpos - this.width/2;
let renderY = this.ypos - this.height/2;
this.ctx.drawImage(this.bgsun, this.xpos-this.width/2 , this.ypos-this.height/2);
};