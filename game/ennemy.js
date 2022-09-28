var Ennemy = function(name, color, position, direction) {

    this.name = name;
    this.position = position;
    this.bullets = new Array();
    this.direction = direction;
    this.speed = 1;

    this.material = new THREE.MeshLambertMaterial({
        color: color,
        });

    var singleGeometry = new THREE.Geometry();

    vehiculeMesh = new THREE.ConeGeometry(5, 20, 32);
    this.graphic = new THREE.Mesh(vehiculeMesh, this.material);
    this.graphic.position.z = 6;

    this.graphic.rotateOnAxis(new THREE.Vector3(0,0,1), this.direction+(3*Math.PI/2));
};

Ennemy.prototype.dead = function () {
    this.life--;
}

Ennemy.prototype.move = function () {
    var moveTo = new THREE.Vector3(
        this.speed * Math.cos(this.direction) + this.position.x,
        this.speed * Math.sin(this.direction) + this.position.y,
        this.graphic.position.z
    );

    this.position = moveTo;
    
    if ( this.position.x < -WIDTH / 2 ) {
        this.position.x = -WIDTH / 2;
        this.direction += 90;
    }
    if ( this.position.x > WIDTH / 2 ) {
        this.position.x = WIDTH / 2;
        this.direction -= 90;
    }
    if ( this.position.y < -HEIGHT / 2 ) {
        this.position.y = -HEIGHT / 2;
        this.direction += 90;
    }
    if ( this.position.y > HEIGHT / 2 ) {
        this.position.y = HEIGHT / 2;
        this.direction -= 90;
    }

    this.graphic.position.x = this.position.x;
    this.graphic.position.y = this.position.y;
    
    light1.position.x = this.position.x;
    light1.position.y = this.position.y;
   //light1.position.z = this.graphic.position.z + 500;
};
