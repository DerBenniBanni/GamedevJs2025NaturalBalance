import Vec2d from "./objects/vec2d.js";
import SFXPlayer from "./soundbox/sfxplayer.js";

export default class Game {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");

        this.lastUpdateTime = 0;
        this.deltaTime = 0;

        this.scenes = []; // Array to hold scenes
        this.currentScene = null; // Current active scene


        this.keys = {}; // Object to hold key states
        this.actions = []; // Array to hold game actions
        this.actionChecks = []; //Array to hold methods that check for the action state

        this.mousePos = new Vec2d(0,0);
        this.mousePosStart = new Vec2d(0,0);
        this.touches = [];

        this.gamepad = null;

        this.inputMode = 'keyboard'; // Default input mode

        this.sfxPlayer = new SFXPlayer(); // Sound effect player

        this.debug = false;
    }

    start() {
        this.lastUpdateTime = performance.now(); // Initialize last update time
        this.deltaTime = 0; // Initialize delta time
        this.gameLoop();
    }
    gameLoop() {
        const currentTime = performance.now();
        this.deltaTime = (currentTime - this.lastUpdateTime)/1000; // Calculate delta time
        this.lastUpdateTime = currentTime;
        this.update();
        this.render();
        requestAnimationFrame(() => this.gameLoop());
    }
    update() {
        if(this.gamepad) {
            this.gamepad.update(); // Update gamepad state
        }
        if (this.currentScene) {
            this.currentScene.update(this.deltaTime); // Update the current scene
        }
    }
    render() {
        if (this.currentScene) {
            this.currentScene.preRender(this.ctx); // Pre-render the current scene
            this.currentScene.render(this.ctx); // Render the current scene
            this.currentScene.postRender(this.ctx); // Post-render the current scene
        }
    }

    addScene(scene) {
        this.scenes.push(scene); // Add scene to the game
        if (this.currentScene === null) {
            this.currentScene = scene; // Set the current scene if none is set
        }
        return scene; // Return the added scene
    }

    switchToScene(scene) {
        this.currentScene = scene; // Switch to the new scene
        this.currentScene.initialize();
    }

    switchToSceneName(name) {
       let scene = this.getScene(name);
       if(scene) {
        this.switchToScene(scene);
       }
    }

    getScene(name) {
        return this.scenes.find(scene => scene.name === name); // Find and return the scene by name
    }

    

    registerActions(definitions) {
        definitions.forEach((definition) => {
            this.actions[definition.name] = definition; // Map action name to key codes
        });
    }


    actionActive(action) {
        //check if the action is active by any of the registered actionCheck methods
        return this.actionChecks.some(actionCheck => {
            if(actionCheck(this, action)) {
                return true;
            }
        });
    }

}