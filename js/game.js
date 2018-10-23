/// <reference path="C:/Users/Koda/source/phaser/typescript/phaser.d.ts" />
//your game's configuration
var config = {
    type: Phaser.AUTO,
    width: 1024,
    height: 576,
    physics: {
        default: "arcade",
        arcade: {
            gravity: 0,
            //debug: true
        },
    },
    scene: { preload: preload, create: create, update: update }
};
//create the game, and pas the configuration
var game = new Phaser.Game(config);
var player;
var playerGroup;
var cursors;
var dialog;
var currentItem;
var itemImage;
var npcItem = "goldCoin";
var npcItemImage;
var tradeCount = 0;
var gameGoing = true;
var gameState;
var timedEvent;
var npcs;
var npcBodies = [12];
//for npc paths
var balambStudent;
var path1;
var trabiaStudent;
var path2;
var shiva;
var path3;
var odin;
var path4;
var farris;
var path5;
var honeybee;
var path6;
var leblanc;
var path7;
var redXIII;
var path8;
var seed;
var path9;
var terra;
var path10;
var strago;
var path11;
var yang;
var path12;
var jecht;
var path13;
var onScreenItems;
function preload() {
    //loads dialog plug in
    this.load.plugin('DialogModalPlugin', 'js/dialog_plugin.js');
    //load images
    this.load.tilemapTiledJSON('map', 'assets/city.json');
    this.load.image('magecity', 'assets/magecity.png');
    this.load.spritesheet('balambStu', 'assets/balambstudent_m.png', { frameWidth: 32, frameHeight: 48 });
    this.load.spritesheet('farris', 'assets/farisscherwiz.png', { frameWidth: 32, frameHeight: 48 });
    this.load.spritesheet('honeybee', 'assets/honeybee3.png', { frameWidth: 32, frameHeight: 48 });
    this.load.spritesheet('jecht', 'assets/jecht.png', { frameWidth: 32, frameHeight: 48 });
    this.load.spritesheet('leblanc', 'assets/leblanc.png', { frameWidth: 32, frameHeight: 48 });
    this.load.spritesheet('odin', 'assets/odin.png', { frameWidth: 80, frameHeight: 80 });
    this.load.spritesheet('redxiii', 'assets/redxiii.png', { frameWidth: 48, frameHeight: 53 });
    this.load.spritesheet('seed', 'assets/seed_m.png', { frameWidth: 32, frameHeight: 48 });
    this.load.spritesheet('shiva', 'assets/shiva.png', { frameWidth: 42, frameHeight: 48 });
    this.load.spritesheet('strago', 'assets/stragomagus.png', { frameWidth: 32, frameHeight: 48 });
    this.load.spritesheet('terra', 'assets/terrabranford.png', { frameWidth: 32, frameHeight: 48 });
    this.load.spritesheet('trabiaStu', 'assets/trabiastudent_m.png', { frameWidth: 32, frameHeight: 48 });
    this.load.spritesheet('yang', 'assets/yangfangleiden.png', { frameWidth: 34, frameHeight: 48 });
    this.load.spritesheet('player', 'assets/edwardvonmuir.png', { frameWidth: 32, frameHeight: 48 });
    //item images
    this.load.spritesheet('horseShoe', 'assets/horseshoe.png', { frameWidth: 32, frameHeight: 32 });
    this.load.spritesheet('fish', 'assets/fish.png', { frameWidth: 32, frameHeight: 32 });
    this.load.spritesheet('goldCoin', 'assets/goldcoin.png', { frameWidth: 32, frameHeight: 32 });
    this.load.spritesheet('silverCoin', 'assets/silvercoin.png', { frameWidth: 32, frameHeight: 32 });
    this.load.spritesheet('bookGreen', 'assets/greenbook.png', { frameWidth: 32, frameHeight: 32 });
    this.load.spritesheet('noteBook', 'assets/notebook.png', { frameWidth: 32, frameHeight: 32 });
    this.load.spritesheet('sword', 'assets/sword.png', { frameWidth: 32, frameHeight: 32 });
    this.load.spritesheet('healingSalve', 'assets/healingsalve.png', { frameWidth: 32, frameHeight: 32 });
    this.load.spritesheet('scarf', 'assets/scarf.png', { frameWidth: 32, frameHeight: 32 });
    this.load.spritesheet('stone', 'assets/stone.png', { frameWidth: 32, frameHeight: 32 });
    this.load.spritesheet('bugNet', 'assets/net.png', { frameWidth: 32, frameHeight: 32 });
    this.load.spritesheet('milk', 'assets/milk.png', { frameWidth: 32, frameHeight: 32 });
    this.load.audio('backgroundMusic', ['assets/melody.mp3']);
}
function create() {
    var backgroundMusic = this.sound.add('backgroundMusic');
    backgroundMusic.play();
    var map = this.make.tilemap({ key: 'map' });
    var tileset = map.addTilesetImage('magecity');
    var collisionLayer = map.createDynamicLayer(0, tileset, 0, 0);
    collisionLayer.setCollisionByExclusion([-1]);
    var background = map.createStaticLayer(1, tileset, 0, 0);
    var topLayer1 = map.createStaticLayer(2, tileset, 0, 0);
    topLayer1.depth = 35;
    var topLayer2 = map.createStaticLayer(3, tileset, 0, 0);
    topLayer2.depth = 33;
    var topLayer3 = map.createStaticLayer(4, tileset, 0, 0);
    topLayer3.depth = 32;
    var topLayer4 = map.createStaticLayer(5, tileset, 0, 0);
    topLayer4.depth = 29;
    var topLayer5 = map.createStaticLayer(6, tileset, 0, 0);
    topLayer5.depth = 23;
    var topLayer6 = map.createStaticLayer(7, tileset, 0, 0);
    topLayer6.depth = 22;
    var topLayer7 = map.createStaticLayer(8, tileset, 0, 0);
    topLayer7.depth = 22.1;
    var topLayer8 = map.createStaticLayer(9, tileset, 0, 0);
    topLayer8.depth = 20;
    var topLayer9 = map.createStaticLayer(10, tileset, 0, 0);
    topLayer9.depth = 12;
    var topLayer10 = map.createStaticLayer(11, tileset, 0, 0);
    topLayer10.depth = 8;
    var topLayer11 = map.createStaticLayer(12, tileset, 0, 0);
    topLayer11.depth = 2;
    var topLayer12 = map.createStaticLayer(13, tileset, 0, 0);
    topLayer12.depth = 36;
    var topLayer13 = map.createStaticLayer(14, tileset, 0, 0);
    topLayer13.depth = 6;
    //players character
    player = this.physics.add.sprite(this.sys.game.config.width / 2, 556, 'player');
    player.name = "player";
    this.physics.world.enable(player);
    playerGroup = this.add.group();
    playerGroup.add(player);
    player.body.setSize(16, 12, false).setOffset(8, 30);
    //player.setCollideWorldBounds = true;
    //creates animations for walking directions
    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('player', { start: 4, end: 7 }),
        frameRate: 10,
        repeat: -1
    });
    this.anims.create({
        key: 'up',
        frames: this.anims.generateFrameNumbers('player', { start: 12, end: 15 }),
        frameRate: 10,
        repeat: -1
    });
    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('player', { start: 8, end: 11 }),
        frameRate: 10,
        repeat: -1
    });
    this.anims.create({
        key: 'down',
        frames: this.anims.generateFrameNumbers('player', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });
    this.anims.create({
        key: 'stand',
        frames: [{ key: 'player', frame: 2 }],
        frameRate: 20
    });
    cursors = this.input.keyboard.createCursorKeys();
    var npc = "npc";
    npcs = this.add.group();
    //STUDENTS
    //BALAMB STUDENT 
    path1 = new Phaser.Curves.Path(20, 40);
    path1.lineTo(100, 40);
    balambStudent = this.add.follower(path1, 20, 40, 'balambStu');
    this.physics.world.enable(balambStudent);
    balambStudent.body.setSize(16, 12, false).setOffset(8, 30);
    balambStudent.depth = 3;
    balambStudent.name = "balambStu";
    balambStudent.setData(npc, true);
    balambStudent.setData("name", "balambStu");
    npcBodies[0] = balambStudent.body;
    npcs.add(balambStudent);
    balambStudent.startFollow({
        ease: 'Linear',
        duration: 4000,
        yoyo: true,
        repeat: -1,
        _delay: 200,
        delay: 100
    });
    //TRABIA STUDENT
    path2 = new Phaser.Curves.Path(600, 510);
    path2.lineTo(825, 510);
    path2.lineTo(825, 405);
    trabiaStudent = this.add.follower(path2, 600, 510, 'trabiaStu');
    this.physics.world.enable(trabiaStudent);
    trabiaStudent.body.setSize(16, 12, false).setOffset(8, 30);
    trabiaStudent.setRotation();
    trabiaStudent.depth = 33;
    trabiaStudent.name = "trabiaStu";
    trabiaStudent.setData(npc, true);
    trabiaStudent.setData("name", "trabiaStu");
    npcBodies[1] = trabiaStudent.body;
    npcs.add(trabiaStudent);
    trabiaStudent.startFollow({
        ease: 'Linear',
        duration: 4000,
        yoyo: true,
        repeat: -1,
        _delay: 200,
        delay: 100
    });
    //GODS
    //SHIVA
    path3 = new Phaser.Curves.Path(550, 450);
    path3.lineTo(450, 450);
    path3.lineTo(450, 505);
    path3.lineTo(550, 505);
    path3.lineTo(550, 450);
    path3.lineTo(450, 450);
    shiva = this.add.follower(path3, 550, 450, 'shiva');
    this.physics.world.enable(shiva);
    shiva.body.setSize(16, 12, false).setOffset(13, 30);
    shiva.name = "shiva";
    shiva.setRotation();
    shiva.depth = 30;
    //ALT WAY TO GET NAME
    //shiva.name = "shiva";
    shiva.setData(npc, true);
    shiva.setData("name", "shiva");
    npcBodies[2] = shiva.body;
    npcs.add(shiva);
    shiva.startFollow({
        ease: 'Linear',
        duration: 6000,
        yoyo: true,
        repeat: -1,
        _delay: 200,
        delay: 100
    });
    console.log(shiva);
    console.log(player);
    //ODIN
    path4 = new Phaser.Curves.Path(300, 200);
    path4.lineTo(300, 400);
    path4.lineTo(400, 400);
    odin = this.add.follower(path4, 300, 200, 'odin');
    this.physics.world.enable(odin);
    odin.body.setSize(16, 12, false).setOffset(31, 60);
    odin.setRotation();
    odin.depth = 26;
    odin.name = "odin";
    odin.setData(npc, true);
    odin.setData("name", "odin");
    npcBodies[3] = odin.body;
    npcs.add(odin);
    odin.startFollow({
        ease: 'Linear',
        duration: 4400,
        yoyo: true,
        repeat: -1,
        _delay: 200,
        delay: 100
    });
    //HUMANS/MORTALS
    //FARRIS
    path5 = new Phaser.Curves.Path(440, 100);
    path5.lineTo(380, 100);
    farris = this.add.follower(path5, 440, 100, 'farris');
    this.physics.world.enable(farris);
    farris.body.setSize(16, 12, false).setOffset(8, 30);
    farris.setRotation();
    farris.depth = 8;
    farris.name = "farris";
    farris.setData(npc, true);
    farris.setData("name", "farris");
    npcBodies[4] = farris.body;
    npcs.add(farris);
    farris.startFollow({
        ease: 'Linear',
        duration: 4000,
        yoyo: true,
        repeat: -1,
        _delay: 200,
        delay: 100
    });
    //HONEYBEE;
    path6 = new Phaser.Curves.Path(660, 220);
    path6.lineTo(660, 380);
    path6.lineTo(700, 380);
    path6.lineTo(700, 220);
    path6.lineTo(660, 220);
    honeybee = this.add.follower(path6, 660, 220, 'honeybee');
    this.physics.world.enable(honeybee);
    honeybee.body.setSize(16, 12, false).setOffset(8, 30);
    honeybee.setRotation();
    honeybee.depth = 15;
    honeybee.name = "honeybee";
    honeybee.setData(npc, true);
    honeybee.setData("name", "honeybee");
    npcBodies[5] = honeybee.body;
    npcs.add(honeybee);
    honeybee.startFollow({
        ease: 'Linear',
        duration: 4000,
        yoyo: true,
        repeat: -1,
        _delay: 200,
        delay: 100
    });
    //LEBLANC
    path7 = new Phaser.Curves.Path(100, 370);
    path7.lineTo(200, 370);
    leblanc = this.add.follower(path7, 100, 370, 'leblanc');
    this.physics.world.enable(leblanc);
    leblanc.body.setSize(16, 12, false).setOffset(8, 30);
    leblanc.setRotation();
    leblanc.depth = 24;
    leblanc.name = "leblanc";
    leblanc.setData(npc, true);
    leblanc.setData("name", "leblanc");
    npcBodies[6] = leblanc.body;
    npcs.add(leblanc);
    leblanc.startFollow({
        ease: 'Linear',
        duration: 5500,
        yoyo: true,
        repeat: -1,
        _delay: 200,
        delay: 100
    });
    //REDXIII
    path8 = new Phaser.Curves.Path(330, 30);
    path8.lineTo(330, 80);
    redXIII = this.add.follower(path8, 330, 30, 'redxiii');
    this.physics.world.enable(redXIII);
    redXIII.body.setSize(16, 12, false).setOffset(16, 30);
    redXIII.setRotation();
    redXIII.depth = 3;
    redXIII.name = "redxiii";
    redXIII.setData(npc, true);
    redXIII.setData("name", "redxiii");
    npcBodies[7] = redXIII.body;
    npcs.add(redXIII);
    redXIII.startFollow({
        ease: 'Linear',
        duration: 6000,
        yoyo: true,
        repeat: -1,
        _delay: 200,
        delay: 100
    });
    //SEED
    path9 = new Phaser.Curves.Path(580, 100);
    path9.lineTo(680, 100);
    seed = this.add.follower(path9, 580, 100, 'seed');
    this.physics.world.enable(seed);
    seed.body.setSize(16, 12, false).setOffset(8, 30);
    seed.setRotation();
    seed.depth = 8;
    seed.name = "seed";
    seed.setData(npc, true);
    seed.setData("name", "seed");
    npcBodies[8] = seed.body;
    npcs.add(seed);
    seed.startFollow({
        ease: 'Linear',
        duration: 5000,
        yoyo: true,
        repeat: -1,
        _delay: 200,
        delay: 100
    });
    //TERRA
    path10 = new Phaser.Curves.Path(950, 120);
    path10.lineTo(950, 160);
    path10.lineTo(830, 160);
    path10.lineTo(830, 180);
    terra = this.add.follower(path10, 950, 120, 'terra');
    this.physics.world.enable(terra);
    terra.body.setSize(16, 12, false).setOffset(8, 30);
    terra.setRotation();
    terra.depth = 9;
    terra.name = "terra";
    terra.setData(npc, true);
    terra.setData("name", "terra");
    npcBodies[9] = terra.body;
    npcs.add(terra);
    terra.startFollow({
        ease: 'Linear',
        duration: 5500,
        yoyo: true,
        repeat: -1,
        _delay: 200,
        delay: 100
    });
    //STRAGO
    path11 = new Phaser.Curves.Path(900, 340);
    path11.lineTo(920, 340);
    path11.lineTo(920, 380);
    path11.lineTo(830, 380);
    strago = this.add.follower(path11, 900, 340, 'strago');
    this.physics.world.enable(strago);
    strago.body.setSize(16, 12, false).setOffset(8, 30);
    strago.setRotation();
    strago.depth = 23;
    strago.name = "strago";
    strago.setData(npc, true);
    strago.setData("name", "strago");
    npcBodies[10] = strago.body;
    npcs.add(strago);
    strago.startFollow({
        ease: 'Linear',
        duration: 4000,
        yoyo: true,
        repeat: -1,
        _delay: 200,
        delay: 100
    });
    //YANG
    path12 = this.add.path(530, 340);
    path12.lineTo(470, 340);
    yang = this.add.follower(path12, 530, 340, 'yang');
    this.physics.world.enable(yang);
    yang.body.setSize(16, 12, false).setOffset(8, 30);
    yang.depth = 22;
    yang.name = "yang";
    yang.setData(npc, true);
    yang.setData("name", "yang");
    npcBodies[11] = yang.body;
    npcs.add(yang);
    yang.startFollow({
        ease: 'Linear',
        duration: 2000,
        yoyo: true,
        repeat: -1,
        _delay: 2000,
        delay: 1000
    });
    //JECHT 
    path13 = this.add.path(430, 510);
    path13.lineTo(430, 540);
    path13.lineTo(550, 540);
    path13.lineTo(550, 510);
    jecht = this.add.follower(path13, 430, 510, 'jecht');
    this.physics.world.enable(jecht);
    jecht.body.setSize(16, 12, false).setOffset(8, 30);
    jecht.depth = 33;
    jecht.name = "jecht";
    jecht.setData(npc, true);
    jecht.setData("name", "jecht");
    npcBodies[12] = jecht.body;
    npcs.add(jecht);
    jecht.startFollow({
        ease: 'Linear',
        duration: 16000,
        yoyo: true,
        repeat: -1,
        _delay: 200,
        delay: 100
    });
    onScreenItems = this.children.list;
    for (var index = 0; index < onScreenItems.length; index++) {
        if (onScreenItems[index].getData("npc")) {
            //creates animations for walking directions
            this.anims.create({
                key: 'left' + onScreenItems[index].getData("name"),
                frames: this.anims.generateFrameNumbers(onScreenItems[index].getData("name"), { start: 4, end: 7 }),
                frameRate: 10,
                repeat: -1
            });
            this.anims.create({
                key: 'up' + onScreenItems[index].getData("name"),
                frames: this.anims.generateFrameNumbers(onScreenItems[index].getData("name"), { start: 12, end: 15 }),
                frameRate: 10,
                repeat: -1
            });
            this.anims.create({
                key: 'right' + onScreenItems[index].getData("name"),
                frames: this.anims.generateFrameNumbers(onScreenItems[index].getData("name"), { start: 8, end: 11 }),
                frameRate: 10,
                repeat: -1
            });
            this.anims.create({
                key: 'down' + onScreenItems[index].getData("name"),
                frames: this.anims.generateFrameNumbers(onScreenItems[index].getData("name"), { start: 0, end: 3 }),
                frameRate: 10,
                repeat: -1
            });
            this.anims.create({
                key: 'stand' + onScreenItems[index].getData("name"),
                frames: [{ key: onScreenItems[index].getData("name"), frame: 2 }],
                frameRate: 20
            });
        }
    }
    //install dialog plug in
    this.sys.install('DialogModalPlugin');
    console.log(this.sys.dialogModal);
    dialog = this.sys.dialogModal.init();
    this.sys.dialogModal.setDialogText('Welcome to the world of Lost Things. You are a wandering adventurer. One of your greatest skills is bartering. This is how you make your living. All you have to your name is the clothes on your back and a pouch big enough to hold 1 thing. But thats okay, the simple life is something you love! One day you find yourself walking into a village you have never been to before....', true);
    //NPC COLLISION
    this.physics.add.collider(player, npcs, collide, null, this);
    this.physics.add.collider(player, collisionLayer, null, null, this);
    console.log(balambStudent);
    console.log(player);
    console.log(collisionLayer);
    console.log(collisionLayer);
}
function collide(player, npc, axis) {
    if (!this.sys.dialogModal.isVisible()) {
        console.log(npc.name);
        var name_1 = npc.getData("name");
        getNPCsItem(name_1);
        var tempText = getDialogText(name_1);
        if (tempText !== undefined) {
            //toggles dialog modals
            this.sys.dialogModal.toggleWindow();
            this.sys.dialogModal.setDialogText(tempText, true);
        }
        if (npc.isFollowing()) {
            npc.pauseFollow();
        }
        //updates items on window
        if (currentItem !== undefined) {
            itemImage = this.add.sprite(912, 513, currentItem);
            itemImage.depth = 42;
            console.log(itemImage);
        }
        exchangeItem(name_1);
        npcItemImage = this.add.sprite(862, 513, npcItem);
        npcItemImage.depth = 42;
        console.log(npcItemImage);
    }
}
function update() {
    player.depth = (player.y + 16) / 16;
    balambStudent.depth = (balambStudent.y + 16) / 16;
    trabiaStudent.depth = (trabiaStudent.y + 16) / 16;
    shiva.depth = (shiva.y + 16) / 16;
    odin.depth = (odin.y + 16) / 16;
    farris.depth = (farris.y + 16) / 16;
    honeybee.depth = (honeybee.y + 16) / 16;
    leblanc.depth = (leblanc.y + 16) / 16;
    redXIII.depth = (redXIII.y + 16) / 16;
    seed.depth = (seed.y + 16) / 16;
    terra.depth = (terra.y + 16) / 16;
    strago.depth = (strago.y + 16) / 16;
    yang.depth = (yang.y + 16) / 16;
    jecht.depth = (jecht.y + 16) / 16;
    var onScreenItems = this.children.list;
    //checks if dialog window is open, and stops moving around if it is.
    if (this.sys.dialogModal.isVisible()) {
        player.setVelocityX(0);
        player.setVelocityY(0);
        this.physics.pause();
    }
    if (!this.sys.dialogModal.isVisible()) {
        for (var index = 0; index < onScreenItems.length; index++) {
            if (onScreenItems[index].getData("npc")) {
                onScreenItems[index].resumeFollow();
            }
        }
        this.physics.resume();
        if (itemImage != undefined) {
            itemImage.destroy();
        }
        if (npcItemImage != undefined) {
            npcItemImage.destroy();
        }
    }
    //NPC ANIMS
    for (var index = 0; index < onScreenItems.length; index++) {
        if (onScreenItems[index].getData("npc")) {
            var differenceX = onScreenItems[index].getData(("pathX")) - onScreenItems[index].x;
            var differenceY = onScreenItems[index].getData(("pathY")) - onScreenItems[index].y;
            if (differenceY > 0) {
                onScreenItems[index].anims.play('up' + onScreenItems[index].getData("name"), true);
            }
            else if (differenceY < 0) {
                onScreenItems[index].anims.play('down' + onScreenItems[index].getData("name"), true);
            }
            else if (differenceX > 0) {
                onScreenItems[index].anims.play('left' + onScreenItems[index].getData("name"), true);
            }
            else if (differenceX < 0) {
                onScreenItems[index].anims.play('right' + onScreenItems[index].getData("name"), true);
            }
            else {
                onScreenItems[index].anims.play('stand' + onScreenItems[index].getData("name"), true);
            }
            onScreenItems[index].setData("pathX", onScreenItems[index].x);
            onScreenItems[index].setData("pathY", onScreenItems[index].y);
        }
    }
    if (cursors.left.isDown) {
        //sets directional speed
        player.setVelocityX(-80);
        //prevents sliding
        player.setVelocityY(0);
        //plays left walking animation
        player.anims.play('left', true);
    }
    else if (cursors.right.isDown) {
        //sets directional speed
        player.setVelocityX(80);
        //prevents sliding
        player.setVelocityY(0);
        //plays right walking animation
        player.anims.play('right', true);
    }
    else if (cursors.up.isDown) {
        //sets directional speed
        player.setVelocityY(-80);
        //prevents sliding
        player.setVelocityX(0);
        //plays up walking animation
        player.anims.play('up', true);
    }
    else if (cursors.down.isDown) {
        //sets directional speed
        player.setVelocityY(80);
        //prevents sliding
        player.setVelocityX(0);
        //plays down walking animation
        player.anims.play('down', true);
    }
    else {
        //stops movement
        player.setVelocityX(0);
        player.setVelocityY(0);
        //makes player face camera
        player.anims.play('stand');
    }
}
function getDialogText(name) {
    switch (name) {
        case "balambStu":
            if (currentItem == "bookGreen" && tradeCount == 7) {
                tradeCount++;
                return "Balamb Student : Your awesome man! I never would have found this! Time to head to class..'";
            }
            else if (tradeCount < 7) {
                return "Balamb Student : 'Have you seen my book? I'll give you something in return if you can find it! Come back to me when you have located my GREEN BOOK.' ";
            }
            else {
                return "Balamb Student : 'Thanks again!'";
            }
            break;
        case "farris":
            if (currentItem == "healingSalve" && tradeCount == 3) {
                tradeCount++;
                return "Farris : 'Ahh, you have some. That is great. Take this noteBook, it may come in hand.'";
            }
            else if (tradeCount < 3) {
                return "Farris : 'Good day! My name is Farris. You must be new to town. Since you seem to have some free time, would you mind locating some HEALING SALVE for me? It would be much appriciated.' ";
            }
            else {
                return "Farris : 'I'm busy at this time, come bother me another time.";
            }
            break;
        case "honeybee":
            if (currentItem == "bugNet" && tradeCount == 6) {
                tradeCount++;
                return "HoneyBee Girl : 'You found it! Where was it. How could I lose such a precious thing!'";
            }
            else if (tradeCount < 6) {
                return "HoneyBee Girl : 'HAAAIIIA! Your face looks new! If your happen to stumble upon a bug net, can you bring it back to me. I seem to have misplaced it.'";
            }
            else {
                return "HoneyBee Girl : 'Buzz Buzz Buzz...'";
            }
            break;
        case "jecht":
            if (currentItem === undefined && tradeCount == 0) {
                tradeCount++;
                return "Jecht : 'Welcome to Ilstit! We are a small village, and simple folk, but have big hearts around these parts. If you ask around, people might have jobs for you to do. In fact since your here. Can you bring me my sword from SEED, he's up at the north end of town with his Lord Farris. Bring him this COIN for his troubles.'";
            }
            else if (currentItem == "sword" && tradeCount == 2) {
                currentItem = "healingSalve";
                tradeCount++;
                return "Jecht : 'Thank you so much! I hope it wasn't to much trouble. Here let me give you this HEALING SALVE. It may come in hand later. Its a dangerous world.'";
            }
            else {
                return "Jecht : 'You should find a place to hunker down for the night.'";
            }
            break;
        case "leblanc":
            if (currentItem == "scarf" && tradeCount == 5) {
                tradeCount++;
                return "Leblanc : 'Well I'll be. That cute little doll found my scarf. Take this, I think the Bug lady is looking for it...'";
            }
            else if (tradeCount < 5) {
                return "Leblanc : 'Hello sugar, you haven't seen a SCARF around have you?'";
            }
            else {
                return "Leblanc : 'I hear Strago has an extra bed, if you ask he might rent it to you while your here..'";
            }
            break;
        case "odin":
            if (currentItem == "horseShoe" && tradeCount == 8) {
                tradeCount++;
                return "Odin : 'Thank you Mortal. You will not regret doing me this favor...'";
            }
            else if (tradeCount < 8) {
                return "Odin : 'WHOOOOAAAAHH! Heel.. Heel... Whats wrong girl, why so antsy? aww looks like you lost a HORSE SHOE. You there BOY. Bring me a HORSE SHOE and you shall be rewarded!'";
            }
            else {
                return "Odin : 'Bahh, I don't have time for you mortal!";
            }
            break;
        case "redxiii":
            if (currentItem == "fish" && tradeCount == 10) {
                tradeCount++;
                return "Red XIII : 'I SMELL IT. GIMME GIMME! Take it, I don't even want this milk...'";
            }
            else if (tradeCount < 10) {
                return "Red XIII : 'Hello Human... You smell of FISH... delicious FISH.. I'd love some. I'd even give up my last bottle of MILK for a fresh FISH right now...'";
            }
            else {
                return "Red XIII : 'That was certainly the best fish I have EVER had, I wonder where it came from.......'";
            }
            break;
        case "seed":
            if (currentItem == "goldCoin" && tradeCount == 1) {
                tradeCount++;
                return "Seed : 'Oh? Jecht sent you? I just finished polishing it. It should be sharp enough to cut a falling leaf. I always do my best!'";
            }
            else if (tradeCount < 1) {
                return "Seed : 'Hello good Sir! My name is Seed, I am a squire to my Lord Farris. What can I do for you?'";
            }
            else {
                return "Seed : 'I'm sorry, I can't talk. I have to get back to work for Lord Farris.'";
            }
            break;
        case "shiva":
            if (currentItem == "stone" && tradeCount == 9) {
                tradeCount++;
                return "Shiva : 'You found the Philospher Stone! I can go home now. I appriciate everything you have done!'";
            }
            else if (tradeCount < 9) {
                return "Shiva : 'Ahh Mortal. I need a favor. Do this and you shant regret it. I need a SPECIAL STONE. HURRY!'";
            }
            else {
                return "Shiva : 'Many blessings traveler'";
            }
            break;
        case "strago":
            if (currentItem == "silverCoin" && tradeCount == 12) {
                gameGoing = false;
                tradeCount++;
                return "Strago : 'Well, looks like you worked yourself good today, I think you deserve a good night sleep, and a hot meal. In fact, I heard such Great things, tonight is on the house.'";
            }
            else if (tradeCount < 12) {
                return "Strago : 'Young man, welcome to my home. If you need a place to stay I could probably accomidate you, for a fee... Bring me a SILVER COIN and you'll have a room for the night.'";
            }
            break;
        case "terra":
            if (currentItem == "milk" && tradeCount == 11) {
                tradeCount++;
                return "Terra : 'OMGEEEE. Thank you SOOO much, it just wouldn't be a birthday without a cake! My Mother will be so pleased!'";
            }
            else if (tradeCount < 11) {
                return "Terra : 'Oh no! Oh no! oh NO!!!! What am I going to do?! Mom will be home tomorrow and I'm all out of MILK for her cake! Hey you! Can you go ask around to see if you can get me some MILK. I have a SILVER COIN I can give you. I would really appriciate it! I'm already so embarassed....'";
            }
            else {
                return "Terra : 'Your awesome, I hope you stick around awhile!'";
            }
            break;
        case "trabiaStu":
            if (currentItem == "noteBook" && tradeCount == 4) {
                tradeCount++;
                return "Trabia Student : 'You found it! I can get back to class.. Here I found this scarf! keep warm..'";
            }
            else if (tradeCount < 4) {
                return "Trabia Student : 'Aww.. where did that NOTE BOOK go. I know it was around here somewhere....'";
            }
            else {
                return "Trabia Student : 'Well I missed class.... Guess I was rushing for nothing..'";
            }
            break;
        case "yang":
            return "Yang: 'Welcome, I'm the Mayor around these parts. If you need any work. ask around, I'm sure someone will put you up for the night as well. If you need anything. Don't be afraid to ask around!'";
        default:
            break;
    }
}
function exchangeItem(name) {
    switch (name) {
        case "balambStu":
            if (currentItem == "bookGreen" && tradeCount == 8) {
                currentItem = npcItem;
            }
            break;
        case "farris":
            if (currentItem == "healingSalve" && tradeCount == 4) {
                currentItem = npcItem;
            }
            break;
        case "honeybee":
            if (currentItem == "bugNet" && tradeCount == 7) {
                currentItem = npcItem;
            }
            break;
        case "jecht":
            if (currentItem === undefined && tradeCount == 1) {
                currentItem = npcItem;
            }
            else if (currentItem == "sword" && tradeCount == 3) {
                currentItem = "healingSalve";
            }
            break;
        case "leblanc":
            if (currentItem == "scarf" && tradeCount == 6) {
                currentItem = npcItem;
            }
            break;
        case "odin":
            if (currentItem == "horseShoe" && tradeCount == 9) {
                currentItem = npcItem;
            }
            break;
        case "redxiii":
            if (currentItem == "fish" && tradeCount == 11) {
                currentItem = npcItem;
            }
            break;
        case "seed":
            if (currentItem == "goldCoin" && tradeCount == 2) {
                currentItem = npcItem;
            }
            break;
        case "shiva":
            if (currentItem == "stone" && tradeCount == 10) {
                currentItem = npcItem;
            }
            break;
        case "strago":
            if (currentItem == "silverCoin" && tradeCount == 13) {
                gameState = "over";
            }
            break;
        case "terra":
            if (currentItem == "milk" && tradeCount == 12) {
                currentItem = npcItem;
            }
            break;
        case "trabiaStu":
            if (currentItem == "noteBook" && tradeCount == 5) {
                currentItem = npcItem;
            }
            break;
        case "yang":
            break;
        default:
            break;
    }
}
function getNPCsItem(name) {
    switch (name) {
        case "balambStu":
            npcItem = "horseShoe";
            break;
        case "farris":
            npcItem = "noteBook";
            break;
        case "honeybee":
            npcItem = "bookGreen";
            break;
        case "jecht":
            npcItem = "goldCoin";
            break;
        case "leblanc":
            npcItem = "bugNet";
            break;
        case "odin":
            npcItem = "stone";
            break;
        case "redxiii":
            npcItem = "milk";
            break;
        case "seed":
            npcItem = "sword";
            break;
        case "shiva":
            npcItem = "fish";
            break;
        case "strago":
            npcItem = undefined;
            break;
        case "terra":
            npcItem = "silverCoin";
            break;
        case "trabiaStu":
            npcItem = "scarf";
            break;
        case "yang":
            break;
        default:
            break;
    }
}
//# sourceMappingURL=game.js.map