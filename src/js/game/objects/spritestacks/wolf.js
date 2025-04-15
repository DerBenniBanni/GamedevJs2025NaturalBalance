let wolfFill = '777';
let wolfStroke = '333';
let wolfWhiteFill = 'fff';
let wolfWhiteStroke = 'aaa';
let wolfBlackFill = '000';
let wolfBlackStroke = '777';
let wolfTongueFill = 'a77';

const stackDefWolf = {
    def:[
        // Box: base-height, height, top, left, width, depth, fillcolor, strokecolor
        // Tail
        ['B', 0, 10, -40, -5, 20, 10, wolfFill, wolfStroke], 
        ['B', 4, 8, -50, -4, 10, 8, wolfFill, wolfStroke],
        ['B', 8, 6, -55, -3, 5, 5, wolfFill, wolfBlackStroke],
        // Schnauze
        ['B', 11, 7, 19, -10, 15, 20, wolfFill, wolfStroke], 
        ['B', 2, 3, 19, -8, 14, 16, wolfFill, wolfStroke],
        ['B', 3, 3, 19, -6, 12, 12, wolfTongueFill, ],
        ['B', 6, 6, 30, -9, 2, 2, wolfWhiteFill, ],
        ['B', 6, 6, 30, 7, 2, 2, wolfWhiteFill, ],
        ['B', 8, 4, 30, -6, 2, 12, wolfWhiteFill, ],
        ['B', 5, 2, 30, -6, 2, 12, wolfWhiteFill, ],
        
        // Nase
        ['B', 15, 4, 34, -2, 3, 4, wolfBlackFill,], 
        // Body
        ['B', 0, 35, -20, -20, 40, 40, wolfFill, wolfStroke], 
        // Eyes
        ['B', 18, 6, 19, -10, 2, 3, wolfBlackFill,], 
        ['B', 20, 6, 19, 7, 2, 3, wolfBlackFill,],
        // left Ear
        ['B', 35, 10, 13, -18, 5, 10, wolfFill, wolfStroke],
        ['B', 45, 3, 14, -17, 5, 8, wolfFill,wolfStroke],
        ['B', 48, 3, 15, -16, 5, 6, wolfFill,wolfStroke],
        ['B', 35, 7, 16, -16, 1, 6, wolfStroke,],
        // right Ear
        ['B', 35, 10, 13, 8, 5, 10, wolfFill, wolfStroke],
        ['B', 45, 3, 14, 9, 5, 8, wolfFill,wolfStroke],
        ['B', 48, 3, 16, 10, 5, 6, wolfFill,wolfStroke],
        ['B', 35, 7, 17, 10, 1, 6, wolfStroke,],
    ]
};
export default stackDefWolf;
export {stackDefWolf};