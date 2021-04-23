let g1Col = 8;
let g1Row = 4;
let g1 = "";
let g1Data = new Array("Freljord", "ShadowIsles", "ChampLevelUpIcon2", "Slow", "epic", "", "", "", "Demacia", "PiltoverZaun", "ChampLevelUpIcon1", "Fast", "rare", "", "", "", "Bilgewater", "Noxus", "Shurima", "Burst", "common", "champion", "", "", "Neutral", "Ionia", "Targon", "ChampLevelUpIcon3", "Focus", "LandmarkVisualOnly", "currency_bp", "currency_shards");
let g2Data = new Array("Barrier", "DoubleStrike", "Fleeting", "Immobile", "Regeneration", "Vulnerable", "Augment", "", "Aura", "Deep", "Fearsome", "Imbue", "Reckless", "Tough", "Fury", "Spellshield", "Attune", "Challenger", "Ephemeral", "GenericTrigger", "QuickStrike", "Strike", "Silenced", "Stunned", "AttackSkillMark", "Capture", "Elusive", "Frostbite", "LastBreath", "Lifesteal", "Overwhelm", "PlaySkillMark");

let g1Counter = 0;
let g1SpriteSize = 128;

for (let d=1; d<3; d++) {
    for(let i=0; i<g1Row; i++) {
        g1 +='<tr>';
        for(let j=0; j<g1Col; j++) {
            let style = 'background: url(img/grid'+d+'.png) '+-g1SpriteSize*j+'px '+-g1SpriteSize*i+'px;';
            g1 +='<td>';
            // Dynamic var name g1Data / g2Data with eval
            g1 +=eval('g'+d+'Data[g1Counter]')
            g1 += '<div  class="sprite" style="'+style+'"><div>'
            g1 +='</td>'
            g1Counter++;
        }
        g1 +='</tr>';
    }
    document.querySelector("#table-"+d).innerHTML=g1;
    g1Counter=0;
    g1="";
}

// let g2Col = 8;
// let g2Row = 4;
// let g2 = "";
//
// let g2Counter = 0;
// let g2SpriteSize = g1SpriteSize;
//
// for(let i=0; i<g2Row; i++) {
//     g2 +='<tr>';
//     for(let j=0; j<g2Col; j++) {
//         let style = 'background: url(img/grid2.png) '+-g1SpriteSize*j+'px '+-g1SpriteSize*i+'px;';
//         g2 +='<td>';
//         g2 +=g2Data[g2Counter]
//         g2 += '<div  class="sprite" style="'+style+'"><div>'
//         g2 +='</td>'
//         g2Counter++;
//     }
//     g2 +='</tr>';
// }
// document.querySelector("#table-2").innerHTML=g2;