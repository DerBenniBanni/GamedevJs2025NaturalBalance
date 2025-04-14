let foxRedFill = 'f00';
let foxRedStroke = 'a00';
let foxWhiteFill = 'fff';
let foxWhiteStroke = 'aaa';
let foxBlackFill = '000';
let foxBlackStroke = '777';

const stackDefFox = {
    def:[
        // Box: base-height, height, top, left, width, depth, fillcolor, strokecolor
        // Tail
        ['B', 0, 10, -40, -5, 20, 10, foxRedFill, foxRedStroke], 
        ['B', 1, 8, -50, -4, 10, 8, foxWhiteFill, foxWhiteStroke],
        ['B', 2, 6, -55, -3, 5, 5, foxBlackFill, foxBlackStroke],
        // Schnauze
        ['B', 9, 9, 19, -10, 15, 20, foxRedFill, foxRedStroke], 
        ['B', 5, 4, 19, -8, 14, 16, foxWhiteFill,],
        // Nase
        ['B', 15, 4, 34, -2, 3, 4, foxBlackFill,], 
        // Body
        ['B', 0, 35, -20, -20, 40, 40, foxRedFill, foxRedStroke], 
        // Eyes
        ['B', 18, 6, 19, -10, 2, 3, foxBlackFill,], 
        ['B', 20, 6, 19, 7, 2, 3, foxBlackFill,],
        // left Ear
        ['B', 35, 10, 13, -18, 5, 10, foxRedFill, foxRedStroke],
        ['B', 45, 3, 13, -17, 5, 8, foxWhiteFill,],
        ['B', 48, 3, 13, -16, 5, 6, foxBlackFill,],
        ['B', 35, 7, 17, -16, 1, 6, foxRedStroke,],
        // right Ear
        ['B', 35, 10, 13, 8, 5, 10, foxRedFill, foxWhiteStroke],
        ['B', 45, 3, 13, 9, 5, 8, foxWhiteFill,],
        ['B', 48, 3, 13, 10, 5, 6, foxBlackFill,],
        ['B', 35, 7, 17, 10, 1, 6, foxRedStroke,],
    ]
};
export default stackDefFox;
export {stackDefFox};