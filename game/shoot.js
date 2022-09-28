let bulletTime1 = 0;

let bullet_player1_material = new THREE.MeshLambertMaterial(
{
    color: 0x00ff00, 
    transparent: false
});

function shoot()
{
    if (keyboard.pressed("space") && bulletTime1 + 0.8 < clock.getElapsedTime())
    {
        bullet = new THREE.Mesh(
            new THREE.SphereGeometry(2),
            bullet_player1_material);
        scene.add(bullet);
        bullet.position.x = player1.graphic.position.x + 7.5 * Math.cos(player1.direction);
        bullet.position.y = player1.graphic.position.y + 7.5 * Math.sin(player1.direction);
        bullet.angle = player1.direction;
        player1.bullets.push(bullet);
        bulletTime1 = clock.getElapsedTime();
    } 

    // move bullets
    let moveDistance = 5;

    for (let i = 0; i < player1.bullets.length; i++)
    {
        player1.bullets[i].position.x += moveDistance * Math.cos(player1.bullets[i].angle);
        player1.bullets[i].position.y += moveDistance * Math.sin(player1.bullets[i].angle);
    }

}

function collisions()
{
    bullet_collision();
    player_collision();
    player_falling();
    ennemy_collision();
}

function bullet_collision()
{
    //collision between bullet and walls
    for (let i = 0; i < player1.bullets.length; i++)
    {
        if (Math.abs(player1.bullets[i].position.x) >= WIDTH / 2 ||
            Math.abs(player1.bullets[i].position.y) >= HEIGHT / 2)
        {
            scene.remove(player1.bullets[i]);
            player1.bullets.splice(i, 1);
            i--;
        }
    }

}

function player_collision()
{
    //collision between player and walls
    let x = player1.graphic.position.x + WIDTH / 2;
    let y = player1.graphic.position.y + HEIGHT / 2;

    if ( x < 0 )
        player1.graphic.position.x -= x;
    if ( x > WIDTH )
        player1.graphic.position.x -= x - WIDTH;
    if ( y < 0 )
        player1.graphic.position.y -= y;
    if ( y > HEIGHT )
        player1.graphic.position.y -= y - HEIGHT;

}

function ennemy_collision()
{
    //collision between player and ennemy
    let x = player1.graphic.position.x + WIDTH / 2;
    let y = player1.graphic.position.y + HEIGHT / 2;
    let ennemy_x = ennemy1.graphic.position.x + WIDTH / 2;
    let ennemy_y = ennemy1.graphic.position.y + HEIGHT / 2;

    if ( (x > ennemy_x - 10)
        && (x < ennemy_x + 10)
        && (y > ennemy_y - 10) 
        && (y < ennemy_y + 10))
    {
        console.log("HIT ENNEMY")
        player1.dead();
    }
}

function player_falling()
{
    let nb_tile = 10;
    let sizeOfTileX = WIDTH / nb_tile;
    let sizeOfTileY = HEIGHT / nb_tile;
    let x = player1.position.x | 0;
    let y = player1.position.y | 0;
    let element = null;

    for (let i = 0; i < noGround.length; i++) {
        element = noGround[i];


        let tileX = (element[0]) | 0;
        let tileY = (element[1]) | 0;
        let mtileX = (element[0] + sizeOfTileX) | 0;
        let mtileY = (element[1] + sizeOfTileY) | 0;

        if ((x > tileX)
            && (x < mtileX)
            && (y > tileY) 
            && (y < mtileY))
        {
            player1.dead();
        }
    }

}
