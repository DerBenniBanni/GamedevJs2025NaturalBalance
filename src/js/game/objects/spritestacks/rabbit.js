let rabbitWhiteFill = 'fff';
let rabbitWhiteStroke = 'aaa';
let rabbitBlackFill = '000';
let rabbitBlackStroke = '777';
let rabbitNoseFill = 'f55';
let rabbitPinkFill = 'f77';

const stackDefRabbit = {
    def:[
        // Box: base-height, height, top, left, width, depth, fillcolor, strokecolor
        // Blume
        ['B', 0, 10, -30, -5, 10, 10, rabbitWhiteFill, rabbitWhiteStroke],
        // Schnauze
        ['B', 5, 13, 19, -10, 6, 20, rabbitWhiteFill, rabbitWhiteStroke],
        // Nose
        ['B', 15, 4, 24, -2, 3, 4, rabbitNoseFill,],
        // Body
        ['B', 0, 35, -20, -20, 40, 40, rabbitWhiteFill, rabbitWhiteStroke],
        // Eyes
        ['B', 18, 6, 19, -10, 2, 3, rabbitBlackFill,],
        ['B', 18, 6, 19, 7, 2, 3, rabbitBlackFill,],
        // left Ear
        ['B', 35, 20, 13, -18, 5, 10, rabbitWhiteFill, rabbitWhiteStroke],
        ['B', 35, 16, 17, -16, 1, 6, rabbitPinkFill,],
        // right Ear
        ['B', 35, 20, 13, 8, 5, 10, rabbitWhiteFill, rabbitWhiteStroke],
        ['B', 35, 16, 17, 10, 1, 6, rabbitPinkFill,],
    ]
};
export default stackDefRabbit;
export {stackDefRabbit};