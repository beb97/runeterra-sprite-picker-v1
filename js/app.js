let rawNames1 = ["Freljord", "ShadowIsles", "ChampLevelUpIcon2", "Slow", "epic", "", "", "", "Demacia", "PiltoverZaun", "ChampLevelUpIcon1", "Fast", "rare", "", "", "", "Bilgewater", "Noxus", "Shurima", "Burst", "common", "champion", "", "", "Neutral", "Ionia", "Targon", "ChampLevelUpIcon3", "Focus", "LandmarkVisualOnly", "currency_bp", "currency_shards"];
let rawNames2 = ["Barrier", "DoubleStrike", "Fleeting", "Immobile", "Regeneration", "Vulnerable", "Augment", "", "Aura", "Deep", "Fearsome", "Imbue", "Reckless", "Tough", "Fury", "Spellshield", "Attune", "Challenger", "Ephemeral", "GenericTrigger", "QuickStrike", "Strike", "Silenced", "Stunned", "AttackSkillMark", "Capture", "Elusive", "Frostbite", "LastBreath", "Lifesteal", "Overwhelm", "PlaySkillMark"];

let rawNames = rawNames1.concat(rawNames2);
let betterNames = [];
let cols = 8;
let nonNullIndex = 0;
for (let [i, value] of rawNames.entries() ) {

    betterNames.push({
        "index" :i,
        "indexNonNull": nonNullIndex,
        "col": i%cols,
        "row": Math.floor(i/cols),
        "code" : value
    });
    if(value !== "") {
        nonNullIndex++;
    }
}

var app = Vue.createApp({
    data() {
        return {
            sprites: betterNames,
            message : "hello",
            bonus : "message caché",
            defaultColor : "#ffffff",
            currentColor : "#ffffff",
            currentSprite : betterNames[0],
            visible: false
        }
    },
    computed: {
        getSpriteCode() {
            let codeSmall = `sprite=${this.currentSprite.indexNonNull}`;
            let codeBig = `sprite name=${this.currentSprite.code}`;
            let code =(this.currentSprite.index>=rawNames1.length)?codeBig:codeSmall;
            let colorHidden ="";
            let colorShown = " color="+this.currentColor;
            let color = this.isColorValide()?colorHidden:colorShown;
            return `<${code}${color}>`;
        }
    },
    methods:{
        isVisible() {
            return this.visible;
        },
        isColorValide() {
            return (this.currentColor===undefined
                || this.currentColor==this.defaultColor
                || this.currentSprite.index>=rawNames1.length);
        },
        selectSprite(sprite) {
            console.log("received : "+sprite)
            this.currentSprite = sprite;
        },
        resetColor() {
            this.currentColor = this.defaultColor;
        },
        copyToClipBoard() {
            document.execCommand("copy");
            navigator.clipboard.writeText(this.getSpriteCode).then(function() {
                console.log('Copying to clipboard : '+this.getSpriteCode);
            }, function(err) {
                console.error('Could not copy text: ', err);
            });
        }
    }
});

app.component('sprite', {
    props: ['sprite', 'currentColor'],
    emits: ['spriteselected'],
    data() {
        return {
        }
    },
    computed:{
      getCurrentColor() {
          return "white";
          // return this.currentColor;
      }
    },
    methods:{
        selectSprite() {
            this.$emit('spriteselected', this.sprite);
        },
        isVisible() {
            return this.sprite.code !== "";
        },
        getOffsetX() {
            return '-'+(this.sprite.col * 128)+'px';
        },
        getOffsetY() {
            return '-'+(this.sprite.row * 128)+'px';
        },
        getMaskOffset() {
          return this.getOffsetX()+" "+this.getOffsetY();
        },
        getBGImage() {
          return 'url(img/grid'+(this.getGrid(this.sprite.index))+'.png)';
        },
        getBGcolor() {
            let result = (app.currentSprite!=null && this.sprite.index === app.currentSprite.index)?`red`:"";
            console.log(result);
          return result;
          // return (this.sprite == app.currentSprite)?`${app.currentColor}`:"";
        },
        getGrid() {
            let grid = 1;
            if(this.sprite.index>=rawNames1.length) {
                grid = 2;
            }
            return grid;
        }
    },
    template: `
    <div @click="selectSprite" class="sprite-container card" v-if="isVisible()" v-bind:title="sprite.indexNonNull">
<!--        <div class="sprite-index"> {{sprite.indexNonNull}} </div>-->
        <div class="sprite-code" > {{sprite.code}} </div>
<!--        <div class="sprite-mask" v-bind:style="{ -->
<!--        'maskPosition': getMaskOffset(), -->
<!--        '-webkitMaskPosition': getMaskOffset(),-->
<!--        'backgroundColor': currentColor,-->
<!--         'maskImage': getBGImage(),-->
<!--         '-webkitMaskImage': getBGImage()-->
<!--          }">-->
            <div class="sprite" v-bind:style="{ 'backgroundPositionX': getOffsetX(), 
            'backgroundPositionY': getOffsetY(),
             'backgroundImage': getBGImage(),
              }"></div>
<!--          </div>-->
    </div>
    `
    // 'background-blend-mode': getBGBlend(),
    // 'backgroundColor': getBGcolor()
})

app.mount('#app');

// When the user scrolls the page, execute myFunction
window.onscroll = function() {toogleStickyness()};

// Get the header
var header = document.getElementById("currentSpriteBlock");

// Get the offset position of the navbar
var sticky = header.offsetTop;

// Add the sticky class to the header when you reach its scroll position. Remove "sticky" when you leave the scroll position
function toogleStickyness() {
    if (window.pageYOffset > sticky) {
        header.classList.add("sticky");
    } else {
        header.classList.remove("sticky");
    }
}