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
import sfxHit from "./game/soundbox/sfx_hit.js";
import sfxSplash from "./game/soundbox/sfx_splash.js";
import sfxCoin from "./game/soundbox/sfx_coin.js";
import musicGame from "./game/soundbox/music_game.js";
import PrerenderProgress from "./game/objects/prerenderprogress.js";
import Text from "./game/objects/text.js";

function addTerrainRectangle(scene, x, y, width, height) {
    for(let i = 0; i < width; i+=100) {
        for(let j = 0; j < height; j+=50) {
            scene.addObject(new Terrain(scene, {x: x+i, y: y+j}));
        }
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("mainCanvas");
    canvas.focus(); // Focus the canvas for keyboard input
    window.game = new Game(canvas);
    window.imagebuffer =new ImageBuffer();

    game.sfxPlayer.add("shoot", sfxShoot);
    game.sfxPlayer.add("hit", sfxHit);
    game.sfxPlayer.add("splash", sfxSplash);
    game.sfxPlayer.add("coin", sfxCoin);
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


    const menuScene = game.addScene(new Scene("menu", game));
    menuScene.setup((scene) => {
        scene.addObject(new TitleLogo(scene, {x: 960, y: 20, width: 200, height: 100}));
        scene.addObject(new PrerenderProgress(scene, {
            x: 960, y: 400, 
            finishedCallback: () => {
                canvas.focus();
                registerPointerEvents(game, canvas); // Register mouse events
                registerGamepadEvents(game, canvas); // Register gamepad events

                game.sfxPlayer.playAudio("gamemusic"); // Play the game music

                addTerrainRectangle(scene, 560, 450, 900, 550); 
                scene.addObject(new Player(scene, {x: 960, y: 820}));


                let colorActive = '#060'; // Set active color to green
                let colorInactive = '#000'; // Set inactive color to black
                let bgColorActive = '#ff08'; // Set active background color to light green
                let bgColorInactive = '#0003'; // Set inactive background color to light gray
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
                    text: "Move with WASD or Arrow keys. Or use a gamepad with analog sticks."
                }));

                scene.addObject(new Text(scene, {
                    x: 960, y: 650, width: 1, height: 1, 
                    text: "Walk into the buttons to switch/activate"
                }));

                    

            }
        }));
        
    });
    menuScene.initialize();

    const level1 = game.addScene(new Scene("level1", game));
    level1.setup((scene) => {
        
        addTerrainRectangle(scene, 200, 200, 550, 550);
        scene.addObject(new Player(scene, {x: 300, y: 300}));
        scene.addObject(new Coin(scene, {x: 650, y: 650, r:20, nextLevel: 'level2'}));
        scene.addObject(new Text(scene, {
            x: 650, y: 800, width: 1, height: 1, color: '#fff',
            text: "Collect the coin to go to the next level"
        }));
    });
    
   
    const level2 = game.addScene(new Scene("level2", game));
    level2.setup((scene) => {
        
        addTerrainRectangle(scene, 200, 400, 200, 200);
        addTerrainRectangle(scene, 1500, 700, 200, 200);
        addTerrainRectangle(scene, 400, 500, 600, 50);
        addTerrainRectangle(scene, 900, 550, 100, 200);
        addTerrainRectangle(scene, 900, 750, 600, 50);
        scene.addObject(new Player(scene, {x: 200, y: 450}));
        scene.addObject(new Coin(scene, {x: 1550, y: 750, r:20, nextLevel: 'level3'}));
        scene.addObject(new Text(scene, {
            x: 960, y: 400, width: 1, height: 1, color: '#fff',
            text: "Keep your balance! Don't fall!"
        }));
    });

    
    const level3 = game.addScene(new Scene("level3", game));
    level3.setup((scene) => {
        
        addTerrainRectangle(scene, 200, 350, 200, 200);
        addTerrainRectangle(scene, 1600, 500, 200, 200);
        addTerrainRectangle(scene, 400, 500, 1200, 50);

        addTerrainRectangle(scene, 500, 250, 900, 50);
        scene.addObject(new Fox(scene, {x: 800, y: 270}));

        addTerrainRectangle(scene, 500, 700, 900, 50);
        scene.addObject(new Fox(scene, {x: 800, y: 720}));

        scene.addObject(new Player(scene, {x: 250, y: 400}));
        scene.addObject(new Coin(scene, {x: 1650, y: 600, r:20, nextLevel: 'level4'}));
        scene.addObject(new Text(scene, {
            x: 960, y: 400, width: 1, height: 1, color: '#fff',
            text: "The coin will only appear when the foxes are gone!"
        }));
        
        scene.addObject(new Text(scene, {
            x: 960, y: 600, width: 1, height: 1, color: '#fff',
            text: "Use your trusty \"Balanc-R™\" carrot gun to make them loose their balance!"
        }));
    });

    const level4 = game.addScene(new Scene("level4", game));
    level4.setup((scene) => {
        
        addTerrainRectangle(scene, 200, 200, 300, 200);
        addTerrainRectangle(scene, 800, 200, 300, 200);
        addTerrainRectangle(scene, 200, 700, 300, 200);
        addTerrainRectangle(scene, 800, 700, 300, 200);


        addTerrainRectangle(scene, 500, 250, 300, 50);
        addTerrainRectangle(scene, 500, 850, 300, 50);
        addTerrainRectangle(scene, 200, 400, 100, 300);
        addTerrainRectangle(scene, 800, 400, 100, 300);

        
        addTerrainRectangle(scene, 900, 500, 500, 50);
        
        addTerrainRectangle(scene, 1300, 400, 300, 200);
        scene.addObject(new Coin(scene, {x: 1450, y: 500, r:20, nextLevel: 'levelEnd'}));

        
        scene.addObject(new Player(scene, {x: 250, y: 250}));
        scene.addObject(new Fox(scene, {x: 850, y: 250}));
        scene.addObject(new Wolf(scene, {x: 200, y: 800}));
        
        scene.addObject(new Text(scene, {
            x: 500, y: 450, width: 1, height: 1, color: '#fff',
            text: "Oh No! One fox is back!"
        }));
        scene.addObject(new Text(scene, {
            x: 400, y: 550, width: 1, height: 1, color: '#fff',
            text: "And here comes a wolf!"
        }));
        scene.addObject(new Text(scene, {
            x: 570, y: 650, width: 1, height: 1, color: '#fff',
            text: "Dont let them get you!"
        }));
    });





    const levelEnd = game.addScene(new Scene("levelEnd", game));
    levelEnd.setup((scene) => {
        
        addTerrainRectangle(scene, 200, 550, 200, 150);
        addTerrainRectangle(scene, 1500, 550, 200, 150);
        addTerrainRectangle(scene, 300, 700, 100, 200);
        addTerrainRectangle(scene, 1500, 700, 100, 200);
        addTerrainRectangle(scene, 400, 850, 1100, 50);

        
        addTerrainRectangle(scene, 500, 150, 200, 150);
        addTerrainRectangle(scene, 1200, 150, 200, 150);

        scene.addObject(new Player(scene, {x: 250, y: 600}));
        scene.addObject(new Coin(scene, {x: 1550, y: 600, r:20, nextLevel: 'menu'}));
        scene.addObject(new Text(scene, {
            x: 900, y: 400, width: 1, height: 1, color: '#fff',
            text: "That's it, so far..."
        }));
        scene.addObject(new Text(scene, {
            x: 900, y: 450, width: 1, height: 1, color: '#fff',
            text: "Thanks for playing the 13 kilobyte version of Unnatural Balance!"
        }));
        scene.addObject(new Text(scene, {
            x: 900, y: 700, width: 1, height: 1, color: '#fff',
            text: "No pixel-files were harmed in the making of this game!"
        }));
        scene.addObject(new Text(scene, {
            x: 900, y: 720, width: 1, height: 1, color: '#fff',
            text: "Everything is created with code! :-)"
        }));
        scene.addObject(new Text(scene, {
            x: 900, y: 950, width: 1, height: 1, color: '#fff',
            text: "This is a gamedev.js gamejam entry for 2025 by Christoph Schansky (DerBenniBanni)"
        }));
        
        scene.addObject(new Text(scene, {
            x: 1550, y: 500, width: 1, height: 1, color: '#fff',
            text: "The coin will restart the game!"
        }));
    });
   
   


    // Start the game loop
    game.start();
    //game.switchToSceneName("levelEnd"); // Start with level scene for development

});
