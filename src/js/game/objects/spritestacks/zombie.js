let rabbitWhiteFill = '5f5';
let rabbitWhiteStroke = '393';
let rabbitBlackFill = '000';
let rabbitBlackStroke = '777';
let rabbitNoseFill = 'f55';
let rabbitPinkFill = 'f77';
let red = 'f00';	
let yellow = 'ffa';
let white = 'fff';

const stackDefZombie = {
    def:[
        // Box: base-height, height, top, left, width, depth, fillcolor, strokecolor
        // Blume
        ['B', 0, 10, -30, -5, 10, 10, rabbitWhiteFill, rabbitWhiteStroke],
        // Schnauze
        ['B', 11, 7, 19, -10, 7, 20, rabbitWhiteFill, rabbitWhiteStroke], 
        ['B', 2, 3, 19, -8, 6, 16, rabbitWhiteFill, rabbitWhiteStroke],
        ['B', 3, 2, 19, -6, 7, 12, red, ],
        ['B', 6, 6, 23, -9, 2, 2, yellow, ],
        ['B', 6, 6, 23, 7, 2, 2, yellow, ],
        /*
        ['B', 8, 4, 30, -6, 2, 12, yellow, ],
        ['B', 5, 2, 30, -6, 2, 12, yellow, ],*/
        // Nose
        ['B', 15, 4, 24, -2, 3, 4, rabbitNoseFill,],
        // Body
        ['B', 0, 35, -20, -20, 40, 40, rabbitWhiteFill, rabbitWhiteStroke],
        // Eyes
        ['B', 18, 8, 19, -14, 2, 8, white,],
        ['B', 24, 3, 19, -14, 3, 4, rabbitBlackFill,],
        ['B', 22, 8, 19, 4, 2, 8, white,],
        ['B', 22, 3, 19, 7, 3, 3, rabbitBlackFill,],
        // left Ear
        ['B', 35, 10, 13, -18, 5, 10, rabbitWhiteFill, rabbitWhiteStroke],
        ['B', 42, 5, 13, -25, 9, 7, rabbitWhiteFill, rabbitWhiteStroke],
        ['B', 35, 8, 17, -16, 1, 6, rabbitPinkFill,],
        // right Ear
        ['B', 35, 20, 13, 8, 5, 10, rabbitWhiteFill, rabbitWhiteStroke],
        ['B', 35, 16, 17, 10, 1, 6, rabbitPinkFill,],
    ]
};
export default stackDefZombie;
export {stackDefZombie};