import Game from "./game/game.js";
import Scene from "./game/scene.js"; 
import Player from "./game/objects/player.js";
import config from "./config.js"; 
import registerKeys from "./game/input/keyboard.js";
import registerPointerEvents from "./game/input/pointer.js";
import Bush from "./game/objects/obstacles/bush.js";
import registerOrientationEvents from "./game/input/orientation.js";

document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("mainCanvas");
    window.game = new Game(canvas);

    registerKeys(game); // Register actions with the game
    game.registerActions(config.actions); // Register keyboard events

    registerPointerEvents(game, canvas); // Register mouse events
    //registerOrientationEvents(game); // Register device orientation events

  
    const level1 = game.addScene(new Scene("level1", game));
    level1.setup((scene) => {
        scene.addObject(new Player(scene, {x: 800, y: 400, width: 50, height: 50, color: '#0ff'}));
        scene.addObject(new Bush(scene, {x: 350, y: 550, r:20, color: '#0f0'}));
    });
    level1.initialize();
    
   
    const level2 = game.addScene(new Scene("level2", game));
    level2.setup((scene) => {
        scene.addObject(new Player(scene, {x: 50, y: 50, width: 50, height: 50, color: '#f00'}));
    });
   


    // Start the game loop
    game.start();

});
