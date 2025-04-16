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

document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("mainCanvas");
    window.game = new Game(canvas);

    registerKeys(game); // Register actions with the game
    game.registerActions(config.actions); // Register keyboard events

    registerPointerEvents(game, canvas); // Register mouse events

    const level1 = game.addScene(new Scene("level1", game));
    level1.setup((scene) => {
        scene.addObject(new Bullet(scene, {x: 200, y: 300, r:20, color: '#0f0'}));
        scene.addObject(new Player(scene, {x: 200, y: 400, width: 50, height: 50, color: '#0ff'}));
        scene.addObject(new Fox(scene, {x: 200, y: 500, r:20, color: '#0f0'}));
        scene.addObject(new Wolf(scene, {x: 200, y: 600, r:20, color: '#0f0'}));
        scene.addObject(new Lynx(scene, {x: 200, y: 700, r:20, color: '#0f0'}));
        let trigger = scene.addObject(new Trigger(scene, {x: 500, y: 300, width: 200, height: 300}));
        trigger.addListener('enter', (trigger, player) => {
            console.log('Player entered the trigger area!');
            game.switchToSceneName("level2"); // Switch to level2 scene
        });
        trigger.addListener('exit', (trigger, player) => {
            console.log('Player exited the trigger area!');
        });
    });
    level1.initialize();
    
   
    const level2 = game.addScene(new Scene("level2", game));
    level2.setup((scene) => {
        scene.addObject(new Player(scene, {x: 50, y: 50, width: 50, height: 50, color: '#f00'}));
    });
   


    // Start the game loop
    game.start();

});
