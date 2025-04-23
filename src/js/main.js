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
import PrerenderProgress from "./game/objects/prerenderprogress.js";
import Text from "./game/objects/text.js";

document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("mainCanvas");
    window.game = new Game(canvas);
    window.imagebuffer =new ImageBuffer();

    game.sfxPlayer.add("shoot", sfxShoot);
    game.sfxPlayer.add("gamemusic", musicGame, true);
    
    let preRenderScene = new Scene("preRender", game);
    
    imagebuffer.preRender(new Player(preRenderScene, {x: 50, y: 50, width: 50, height: 50, color: '#f00'}), 120, 140);
    imagebuffer.preRender(new Fox(preRenderScene, {x: 50, y: 50, width: 50, height: 50, color: '#f00'}), 120, 140);
    imagebuffer.preRender(new Wolf(preRenderScene, {x: 50, y: 50, width: 50, height: 50, color: '#f00'}), 120, 140);
    imagebuffer.preRender(new Lynx(preRenderScene, {x: 50, y: 50, width: 50, height: 50, color: '#f00'}), 120, 140);
    imagebuffer.preRender(new Coin(preRenderScene, {x: 50, y: 50, width: 50, height: 50, color: '#f00'}), 120, 140);

    imagebuffer.preRenderVariation(new Terrain(preRenderScene, {x: 50, y: 50, width: 50, height: 50}), 140, 200,10);
   
    registerKeys(game); // Register actions with the game
    game.registerActions(config.actions); // Register keyboard events

    registerPointerEvents(game, canvas); // Register mouse events
    registerGamepadEvents(game, canvas); // Register gamepad events

    const menuScene = game.addScene(new Scene("menu", game));
    menuScene.setup((scene) => {
        scene.addObject(new TitleLogo(scene, {x: 960, y: 20, width: 200, height: 100}));
        scene.addObject(new PrerenderProgress(scene, {
            x: 960, y: 400, 
            finishedCallback: () => {
                game.sfxPlayer.playAudio("gamemusic"); // Play the game music
                for(let x = 560; x <= 1360; x+=100) {
                    for(let y = 450; y <= 950; y+=50) {
                        scene.addObject(new Terrain(scene, {x: x, y: y, width: 50, height: 50, color: '#0ff'}));
                    }
                }
                let colorActive = '#060'; // Set active color to green
                let colorInactive = '#000'; // Set inactive color to black
                let bgColorActive = '#ff08'; // Set active background color to light green
                let bgColorInactive = '#0003'; // Set inactive background color to light gray
                scene.addObject(new Player(scene, {x: 960, y: 820, width: 50, height: 50, color: '#0ff'}));
                let trigger1 = scene.addObject(new Trigger(scene, {
                    x: 580, y: 820, width: 240, height: 100, 
                    text: "Keyboard Mode WASD", triggerName: "keyboardWASD"}));
                trigger1.color = colorActive; trigger1.bgColor = bgColorActive; // Set trigger color to green

                let trigger2 = scene.addObject(new Trigger(scene, {
                    x: 1140, y: 820, width: 240, height: 100, 
                    text: "Keyboard Mode Face", triggerName: "keyboardFace"}));
                trigger2.color = colorInactive; trigger2.bgColor = bgColorInactive;

                trigger1.addListener("enter", (trigger, player) => {
                    trigger.scene.game.keyboardMode = 'WASD'; // Set keyboard mode to WASD
                    trigger1.color = colorActive; trigger1.bgColor = bgColorActive;
                    trigger2.color = colorInactive; trigger2.bgColor = bgColorInactive;
                });
                trigger2.addListener("enter", (trigger, player) => {
                    trigger.scene.game.keyboardMode = 'Face'; // Set keyboard mode to Face
                    trigger2.color = colorActive; trigger2.bgColor = bgColorActive;
                    trigger1.color = colorInactive; trigger1.bgColor = bgColorInactive;
                });

                let triggerStart = scene.addObject(new Trigger(scene, {
                    x: 840, y: 490, width: 240, height: 100, 
                    text: "Start Game", triggerName: "keyboardWASD"}));
                triggerStart.addListener("enter", (trigger, player) => {
                    game.switchToSceneName("level1"); // Switch to level 1 scene
                });

                scene.addObject(new Text(scene, {
                    x: 960, y: 450, width: 1, height: 1, 
                    text: "Move with WASD or Arrow keys. Or use a gamepad with analog sticks."}));

                scene.addObject(new Text(scene, {
                    x: 960, y: 650, width: 1, height: 1, 
                    text: "Walk into the buttons to switch/activate"}));

                    

            }
        }));
        
    });
    menuScene.initialize();

    const level1 = game.addScene(new Scene("level1", game));
    level1.setup((scene) => {
        
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

        scene.addObject(new Fox(scene, {x: 1000, y: 460, r:20, color: '#0f0'}));
        scene.addObject(new Wolf(scene, {x: 600, y: 460, r:20, color: '#0f0'}));
        scene.addObject(new Lynx(scene, {x: 900, y: 560, r:20, color: '#0f0'}));
        /*
        scene.addObject(new Coin(scene, {x: 800, y: 660, r:20, color: '#0f0'}));
        /**/
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
