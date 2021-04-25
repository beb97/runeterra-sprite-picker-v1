let grid1 = new Array("Freljord", "ShadowIsles", "ChampLevelUpIcon2", "Slow", "epic", "", "", "", "Demacia", "PiltoverZaun", "ChampLevelUpIcon1", "Fast", "rare", "", "", "", "Bilgewater", "Noxus", "Shurima", "Burst", "common", "champion", "", "", "Neutral", "Ionia", "Targon", "ChampLevelUpIcon3", "Focus", "LandmarkVisualOnly", "currency_bp", "currency_shards");
let grid1realLength = 24;
let grid2 = new Array("Barrier", "DoubleStrike", "Fleeting", "Immobile", "Regeneration", "Vulnerable", "Augment", "", "Aura", "Deep", "Fearsome", "Imbue", "Reckless", "Tough", "Fury", "Spellshield", "Attune", "Challenger", "Ephemeral", "GenericTrigger", "QuickStrike", "Strike", "Silenced", "Stunned", "AttackSkillMark", "Capture", "Elusive", "Frostbite", "LastBreath", "Lifesteal", "Overwhelm", "PlaySkillMark");
let sprites = new Array();
let colorNull = "#ffffff";
let datas = grid1.concat(grid2);
let rowByGrid = 4;
let gridColumns = 8;
let gridRows = datas.length/gridColumns;
let counter = 0;
let spriteIndex = 0;
let spriteSize = 128;
let spriteTemplate = document.querySelector("#sprite-container-template");
let currentCode=0;
let currentIndex=0;
let currentColor=document.querySelector("#color-picker").value;

counter = 0;
spriteIndex = 0;
let currentCell = document.querySelector("#grid");

class Sprite {
    constructor(code, col, row, index) {
        this.code = code;
        this.col = col;
        this.row = row;
        this.spriteIndex = index;
        this.gridIndex = col + row*gridColumns;
    }

    getOffsetX() {
        return -spriteSize * this.col;
    }

    getOffsetY() {
        return -spriteSize * this.row;
    }

    getGrid() {
        return 1 + Math.floor(this.row / rowByGrid);
    }

    isUsedSprite() {
        return this.code !== "";
    }
}

for(let i=0; i<gridRows; i++) {
    for(let j=0; j<gridColumns; j++) {
          // Counter
        sprites.push(new Sprite(datas[counter], j, i, spriteIndex));
        let spriteNode = spriteTemplate.cloneNode(true);
        spriteNode.removeAttribute("id");
        spriteNode.classList.remove("invisible");

        // Code
        let code = datas[counter];
        spriteNode.getElementsByClassName('sprite-code')[0].innerHTML=code;
        // Image
        let xOffset = -spriteSize * j +'px ';
        let yOffset = -spriteSize * i +'px ';
        let d = 1;
        let backgroundImage = 'url(img/grid'+(getCurrentGrid(counter))+'.png)';
        spriteNode.getElementsByClassName("sprite")[0].style.backgroundImage  = backgroundImage;
        spriteNode.getElementsByClassName("sprite")[0].style.backgroundPositionX = xOffset;
        spriteNode.getElementsByClassName("sprite")[0].style.backgroundPositionY = yOffset;
        if(code !== "") {

            currentCell.appendChild(spriteNode);
        }
        // Attribut code
        spriteNode.setAttribute("code", code);
        spriteNode.setAttribute("index", spriteIndex);
        if(code !== "") {
            spriteNode.getElementsByClassName('sprite-index')[0].innerHTML=spriteIndex;
            spriteIndex++;
        }
        counter++;
    }
}
updateTextDisplay();

function copyText() {
    let text = getSpriteCode();


    document.execCommand("copy");
    navigator.clipboard.writeText(text).then(function() {
        console.log('Copying to clipboard : '+text);
    }, function(err) {
        console.error('Could not copy text: ', err);
    });
}

function chooseSprite(sprite) {
    currentCode = sprite.getAttribute("code");
    currentIndex = sprite.getAttribute("index");

    let clone = sprite.getElementsByClassName("sprite")[0].cloneNode(true);

    document.querySelector("#sprite-container-anchor").innerHTML = "";
    document.querySelector("#sprite-container-anchor").appendChild(clone);

    updateTextDisplay();
}

function updateTextDisplay() {
    document.querySelector("#sprite-code-container").innerHTML = escapeHTML(getSpriteCode());
}

function updateColor() {
    currentColor = document.querySelector("#color-picker").value;
    let els = document.getElementsByClassName("sprite-container");
    for (let i = 0; i<=grid1realLength; i++) {
        let el = els[i];
        if(currentColor===colorNull) {
            currentColor = null;
        }
        el.style.backgroundColor=currentColor;
    };
    updateTextDisplay();
}

function resetColor() {
    document.querySelector("#color-picker").value = colorNull;
    updateColor()
}

function getSpriteCode() {
    let string;
    let color ="";
    let code ="";
    if(currentIndex<grid1realLength) {
        code = "sprite=" + currentIndex;

        if(currentColor!== "#ffffff" && currentColor!== null) {
            color = " color="+currentColor;
        }

    } else {
        code = "sprite name=" + currentCode;
    }


    string = "<" + code + "" + color + ">";
    return string;
}

function escapeHTML( string )
{
    var pre = document.createElement('pre');
    var text = document.createTextNode( string );
    pre.appendChild(text);
    return pre.innerHTML;
}

function toogleVisibility(e) {
    let visibilityAttribute = "invisible";
    if (e.hasAttributes(visibilityAttribute)) {
        e.removeAttribute(visibilityAttribute);
    } else {
        e.setAttribute(visibilityAttribute);
    }
}

function getCurrentGrid(index) {
    let grid = 1;
    if(index>=grid1.length) {
        grid = 2;
    }
    return grid;
}

