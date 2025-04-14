let carrotOrangeFill = 'fa0';
let carrotOrangeStroke = 'a60';
let carrotGreenFill = '090';

const stackDefBulletCarrot = {
    def:[
        // Box: base-height, height, top, left, width, depth, fillcolor, strokecolor
        ['B', 2, 4, 0, -2, 5, 4, carrotOrangeFill, carrotOrangeStroke], 
        ['B', 1, 6, -7, -3, 7, 6, carrotOrangeFill, carrotOrangeStroke], 
        ['B', 0, 8, -17, -4, 10, 8, carrotOrangeFill, carrotOrangeStroke], 
        ['B', 3, 2, -27, -1, 10, 2, carrotGreenFill,],
        ['B', 1, 2, -33, -1, 15, 2, carrotGreenFill,],
        ['B', 0, 8, -30, -1, 2, 2, carrotGreenFill,],
        ['B', 3, 2, -27, -4, 2, 8, carrotGreenFill,],
        
    ]
};
export default stackDefBulletCarrot;
export {stackDefBulletCarrot};