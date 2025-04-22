import Game from "./game/game.js";
import Scene from "./game/scene.js"; 
import Player from "./game/objects/player.js";
import config from "./config.js"; 
import registerKeys from "./game/input/keyboard.js";
import registerPointerEvents from "./game/input/pointer.js";
import Fox from "./game/objects/enemies/fox.js";
import Bullet from "./game/objects/bullets/bullet.js";
import Wolf from "./game/objects/enemies/wolf.js";
import Lynx from "./game/objects/enemies/lynx.js";
import Trigger from "./game/objects/trigger/trigger.js";
import ImageBuffer from "./game/imagebuffer.js";
import TitleLogo from "./game/objects/titlelogo.js";
import registerGamepadEvents from "./game/input/gamepad.js";
import Coin from "./game/objects/stuff/coin.js";
import Terrain from "./game/objects/terrain/terrain.js";

import sfxShoot from "./game/soundbox/sfx_shoot.js";
import musicGame from "./game/soundbox/music_game.js";

document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("mainCanvas");
    window.game = new Game(canvas);
    window.imagebuffer =new ImageBuffer();

    game.sfxPlayer.add("shoot", sfxShoot);
    game.sfxPlayer.add("gamemusic", musicGame, true);
    
    game.sfxPlayer.playAudio("gamemusic"); // Play background music
    let preRenderScene = new Scene("preRender", game);
    
    imagebuffer.preRender(new Player(preRenderScene, {x: 50, y: 50, width: 50, height: 50, color: '#f00'}), 120, 140);
    imagebuffer.preRender(new Fox(preRenderScene, {x: 50, y: 50, width: 50, height: 50, color: '#f00'}), 120, 140);
    /**/
    imagebuffer.preRender(new Wolf(preRenderScene, {x: 50, y: 50, width: 50, height: 50, color: '#f00'}), 120, 140);
    imagebuffer.preRender(new Lynx(preRenderScene, {x: 50, y: 50, width: 50, height: 50, color: '#f00'}), 120, 140);
    imagebuffer.preRender(new Coin(preRenderScene, {x: 50, y: 50, width: 50, height: 50, color: '#f00'}), 120, 140);
    /**/
    
    imagebuffer.preRenderVariation(new Terrain(preRenderScene, {x: 50, y: 50, width: 50, height: 50}), 140, 200,10);
   


    registerKeys(game); // Register actions with the game
    game.registerActions(config.actions); // Register keyboard events

    registerPointerEvents(game, canvas); // Register mouse events
    registerGamepadEvents(game, canvas); // Register gamepad events
    const menuScene = game.addScene(new Scene("menu", game));
    menuScene.setup((scene) => {
        scene.addObject(new TitleLogo(scene, {x: 400, y: 20, width: 200, height: 100}));
        //scene.addObject(new Terrain(scene, {x: 200, y: 450, width: 50, height: 50, color: '#0ff'}));
        
        for(let x = 200; x < 600; x+=100) {
            scene.addObject(new Terrain(scene, {x: x, y: 450, width: 50, height: 50, color: '#0ff'}));
        }
        for(let x = 200; x < 400; x+=100) {
            scene.addObject(new Terrain(scene, {x: x, y: 500, width: 50, height: 50, color: '#0ff'}));
        }
        for(let x = 600; x < 1200; x+=100) {
            for(let y = 450; y < 600; y+=50) {
                scene.addObject(new Terrain(scene, {x: x, y: y, width: 50, height: 50, color: '#0ff'}));
            }
        }
        for(let x = 1200; x < 1500; x+=100) {
            for(let y = 550; y < 800; y+=50) {
                scene.addObject(new Terrain(scene, {x: x, y: y, width: 50, height: 50, color: '#0ff'}));
            }
        }
        
        for(let x = 700; x < 900; x+=100) {
            for(let y = 600; y < 800; y+=50) {
                scene.addObject(new Terrain(scene, {x: x, y: y, width: 50, height: 50, color: '#0ff'}));
            }
        }
        
        for(let x = 700; x < 1300; x+=100) {
            for(let y = 800; y < 900; y+=50) {
                scene.addObject(new Terrain(scene, {x: x, y: y, width: 50, height: 50, color: '#0ff'}));
            }
        }
        
        scene.addObject(new Player(scene, {x: 200, y: 450, width: 50, height: 50, color: '#0ff'}));
        //scene.addObject(new Fox(scene, {x: 300, y: 450, width: 50, height: 50, color: '#0ff'}));
        /**/
        scene.addObject(new Fox(scene, {x: 1000, y: 460, r:20, color: '#0f0'}));
        scene.addObject(new Wolf(scene, {x: 600, y: 460, r:20, color: '#0f0'}));
        scene.addObject(new Lynx(scene, {x: 900, y: 560, r:20, color: '#0f0'}));
        /*
        scene.addObject(new Coin(scene, {x: 800, y: 660, r:20, color: '#0f0'}));
        /**/
    });
    menuScene.initialize();

    const level1 = game.addScene(new Scene("level1", game));
    level1.setup((scene) => {
        scene.addObject(new Coin(scene, {x: 200, y: 300, r:20, color: '#0f0'}));
        scene.addObject(new Player(scene, {x: 600, y: 450, width: 50, height: 50, color: '#0ff'}));
        scene.addObject(new Fox(scene, {x: 500, y: 300, r:20, color: '#0f0'}));
        scene.addObject(new Wolf(scene, {x: 650, y: 250, r:20, color: '#0f0'}));
        scene.addObject(new Lynx(scene, {x: 1300, y: 100, r:20, color: '#0f0'}));
        let trigger = scene.addObject(new Trigger(scene, {x: 500, y: 800, width: 200, height: 100}));
        trigger.addListener('enter', (trigger, player) => {
            console.log('Player entered the trigger area!');
            game.switchToSceneName("level2"); // Switch to level2 scene
        });
        trigger.addListener('exit', (trigger, player) => {
            console.log('Player exited the trigger area!');
        });
        scene.addObject(new TitleLogo(scene, {x: 400, y: 20, width: 200, height: 100}));
        
    });
    
   
    const level2 = game.addScene(new Scene("level2", game));
    level2.setup((scene) => {
        scene.addObject(new Player(scene, {x: 50, y: 50, width: 50, height: 50, color: '#f00'}));
        for(let i = 0; i < 100; i++) {
            scene.addObject(new Fox(scene, {x: Math.random() * 1920, y: Math.random()*1080, r:20, color: '#0f0'}));
            scene.addObject(new Wolf(scene, {x: Math.random() * 1920, y: Math.random()*1080, r:20, color: '#0f0'}));
            scene.addObject(new Lynx(scene, {x: Math.random() * 1920, y: Math.random()*1080, r:20, color: '#0f0'}));
        }
    });
   


    // Start the game loop
    game.start();

});
