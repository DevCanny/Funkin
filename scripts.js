// VARIABLES
// canvas settings
var canvasWidth = 1280
var canvasHeight = 720
var score = 0
var bpm = 0
var notes = []
var enemyNotes = []
var loadSong = new Audio()
var songs = [
    {song: "Dad Battle", path: "./songs/Dadbattle_Voices.ogg", songName: "DadBattle", inst: "./songs/Dadbattle_Inst.ogg", map: "./maps/test.json"},
    {song: "MILF", path: "./songs/Milf_Voices.ogg", songName: "Milf", inst: "./songs/Milf_Inst.ogg", map: "./maps/milf.json"},
    {song: "Roses", path: "./songs/Roses_Voices.ogg", songName: "Roses", inst: "./songs/Roses_Inst.ogg", map: "./maps/roses.json"},
    {song: "Best Girl", path: "./songs/BestGirl_Voices.ogg", songName: "Roses", inst: "./songs/BestGirl_Inst.ogg", map: "./maps/BestGirl.json"},
    {song: "Mass Homicide(Genocide)", path: "./songs/Genocide_Voices.ogg", songName: "Roses", inst: "./songs/Genocide_Inst.ogg", map: "./maps/Genocide.json"},
    // {song: "First Town", path: "./songs/FirstTown_Voices.ogg", songName: "Roses", inst: "./songs/FirstTown_Inst.ogg", map: "./maps/FirstTown.json"},
    // {song: "???", path: "./songs/Ghost_Voices.ogg", songName: "Roses", inst: "./songs/Ghost_Inst.ogg", map: "./maps/Ghost.json"},
]
var optionsList = [
    "KeyBinds"
]
var splashes = []
var cools = []
var autoplay = false
// settings
var midSong = false
var gamePaused = false
var chosenSong = ""
var selectedMenu = "freeplay"
var status = "menu"
var selectedSong = 0
var selectedOption = 0
var maxSongs = songs.length
var changingOption = false
// images
var bg = document.getElementById("bg")
var bgMagenta = document.getElementById("bgMagenta")
var bgBlue = document.getElementById("bgBlue")
var menuDesat = document.getElementById("menuDesat")
// hits
var sick = './images/extras/sick'
var good = './images/extras/good'
var bad = './images/extras/bad'
var miss = './images/extras/shit'
// options
var changingKey = false
var selectedChangingKey = 0
var selectedToChangeKey = false
var sicks = 0
var goods = 0
var bads = 0
var misses = 0
var accuracy = 0
// arrowPos
var ArrowHeight = 10
var LeftPosition = 700
var DownPosition = 800
var UpPosition = 900
var RightPosition = 1000

var EnemyLeftPosition = 100
var EnemyDownPosition = 200
var EnemyUpPosition = 300
var EnemyRightPosition = 400
// keybinds
var esc = 27
var enter = 13
var up = 38
var down = 40
var left = 37
var right = 39
var secondaryUp = 87
var secondaryDown = 83
var secondaryLeft = 65
var secondaryRight = 68
var debugMenu = 55
// canvas
const canvas = document.getElementById("canvas")
// canvas.requestFullscreen()
const ctx = canvas.getContext("2d")
canvas.width = canvasWidth
canvas.height = canvasHeight
// songs
var songInst = new Audio()
var songVoice = new Audio()
var sampleSong = new Audio()
var sampleVoice = new Audio()
// sounds
var intro1 = new Audio()
intro1.src = "./sounds/intro1.ogg"
var intro2 = new Audio()
intro2.src = "./sounds/intro2.ogg"
var intro3 = new Audio()
intro3.src = "./sounds/intro3.ogg"
var introGo = new Audio()
introGo.src = "./sounds/introGo.ogg"
var scrollMenu = new Audio()
scrollMenu.src = "./sounds/scrollMenu.ogg"
// arrow stats
var ClickingLeft = false
var ClickingRight = false
var ClickingUp = false
var ClickingDown = false
// selected arrow status
var selectedArrowHeight = 225
var selectedArrowWidth = ((canvasWidth / 2) / 1.5) - 100
// SCRIPTS
//LOAD STUFF
window.addEventListener("load", function(){
    for(var i = 0; i < songs.length; i++){
        loadSong.src = songs[i].path
        loadSong.src = songs[i].inst
        fetch(songs[i].map)
        .then(response => response.json())
        .then(json => {})
    }
    sampleSong.src = "./songs/freakyMenu.ogg"
    sampleSong.play()
    sampleSong.loop = true
})
// DATA
// var data = localStorage
// var dataKey = "KeyCodes"
// if(data.getItem(dataKey)){
// var foundKeyData = data.getItem(dataKey)
//     // secondaryLeft = foundKeyData[0]
//     // secondaryDown = foundKeyData[1]
//     // secondaryUp = foundKeyData[2]
//     // secondaryRight = foundKeyData[3]
// } else {
//     var tableToSave = ["A", "S", "W", "D"]
//     data.setItem(dataKey, tableToSave)
// }
// functions
function createSound(soundPath){
    let newSound = new Audio()
    newSound.src = soundPath + ".ogg"
    return newSound
}
function changeKey(key, lol){
    if(key != esc){
        if(lol == 0){
            secondaryLeft = key
        } else if(lol == 1){
            secondaryDown = key
        } else if(lol == 2){
            secondaryUp = key
        } else if(lol == 3) {
            secondaryRight = key
        }
    }
}
//ADD HEALTH SYSTEM?
function createArrow(arrow){
    let newArrow = new Image
    newArrow.src = arrow + ".png"
    return newArrow
}
function PushNotes(el, HTMLNote, postion, table, speed, bpm, songSpeed){
    el.sectionNotes.forEach(el => {
        if(el[1] != null){
            var deltaTime = 0
            var secPerBeat = 0
            deltaTime = (canvasHeight * speed) * songSpeed
            var dsptimesong = Audio.dsp
            var songPosition = Audio.dsp - dsptimesong
            var songPosInBeats = songPosition / secPerBeat
            if(table == notes){
                if(el[1] == 2){
                    postion = UpPosition
                    HTMLNote = "./arrows/colored/Up"
                } else if(el[1] == 1){
                    postion = DownPosition
                    HTMLNote = "./arrows/colored/Down"
                } else if(el[1] == 0){
                    postion = LeftPosition
                    HTMLNote = "./arrows/colored/Left"
                } else if(el[1] == 3){
                    postion = RightPosition
                    HTMLNote = "./arrows/colored/Right"
                }
            } else {
                if(el[1] == 2 || el[1] == 6){
                    postion = EnemyUpPosition
                    HTMLNote = "./arrows/colored/Up"
                } else if(el[1] == 1 || el[1] == 5){
                    postion = EnemyDownPosition
                    HTMLNote = "./arrows/colored/Down"
                } else if(el[1] == 0 || el[1] == 4){
                    postion = EnemyLeftPosition
                    HTMLNote = "./arrows/colored/Left"
                } else if(el[1] == 3 || el[1] == 7){
                    postion = EnemyRightPosition
                    HTMLNote = "./arrows/colored/Right"
                }
            }
            var NoteToPush = createArrow(HTMLNote)
            var toPush = {
                "note": NoteToPush,
                "postion": postion,
                "height": canvasHeight,
                "validtohit": "no",
                "typeOfArrow": el[1],
                "hit": false,
            }
            setTimeout(function(){
                table.push(toPush)
            }, el[0] - deltaTime / (speed * 10))
        }
    })
}
function loadmap(map){
    notes = []
    fetch(map)
    .then(response => response.json())
    .then(json => {
        json.forEach(el => {
            var postion = 0
            var HTMLNote = ""
            var speed = 1
            var stuff = 0
            speed = el.speed
            stuff = (el.bpm / 60) * speed
            bpm = el.bpm / 60
            bpm = (bpm * (canvasHeight / el.bpm) * speed)
            var songBPM = el.bpm
            el.notes.forEach(el => {
                if(el.bpm != null){
                    stuff = el.bpm / 60
                    bpm = el.bpm / 60
                    bpm = (bpm * speed * (canvasHeight / el.bpm))
                }
                if(el.mustHitSection == true){
                    PushNotes(el, HTMLNote, postion, notes, stuff, songBPM, speed)
                } else {
                    PushNotes(el, HTMLNote, postion, enemyNotes, stuff, songBPM, speed)
                }
            })
        })
    })
}
function ready(){
    songInst.play()
    songVoice.play()
}
function playSong(song, inst) {
    if(songInst.src !== inst){
        songInst.src = songs[selectedSong].inst
    }
    if(songVoice.src !== song){
        songVoice.src = songs[selectedSong].path
    }
    ready()
    // songVoice.addEventListener("DOMContentLoaded", ready)
} 
function pauseSong(){
    songVoice.pause()
    songInst.pause()
}
function unpauseSong(){
    songVoice.play()
    songInst.play()
}
var confirmMenu = createSound("./sounds/confirmMenu")
function menu() {
    midSong = false
    status = "freeplay"
    selectedArrowWidth = 0
    selectedArrowHeight = 25
    confirmMenu.play()
}
function openfreeplay(){
    status = "menu"
    selectedMenu = 'freeplay'
    confirmMenu.play()
    selectedArrowHeight = 225
    selectedArrowWidth = ((canvasWidth / 2) / 1.5) - 100
}
function freeplay() {
    confirmMenu.play()
}
function options(){
    confirmMenu.play()
    selectedArrowWidth = 0
    selectedArrowHeight = 25
    status = "options"
}
function changeOption(key){
    if(selectedOption == 0){
        if(changingKey == true){
            if(selectedToChangeKey == true){
                changeKey(key,selectedChangingKey)
                selectedToChangeKey = false
            }
        }
    }
}
function selectSong() {
    midSong = true
    sampleSong.pause()
    sampleVoice.pause()
    // intro3.play()
    // setTimeout(function(){
    //     intro2.play()
    // }, 1000)
    // setTimeout(function(){
    //     intro1.play()
    // }, 2000)
    // setTimeout(function(){
        // introGo.play()
        score = 0
        playSong()
        loadmap(songs[selectedSong].map)
    // }, 3000)
}
function scroll(status, width, height){
    scrollMenu.pause()
    scrollMenu.play()
    selectedMenu = status
    selectedArrowHeight = height
    selectedArrowWidth = width
}
function differentScroll(width, height, amount){
    if (amount == "up"){
        if(selectedSong == 0){
            selectedSong = 0
        } else {
            selectedSong -= 1
            selectedArrowWidth = width
            selectedArrowHeight = height
        }
    } else {
        if(maxSongs == selectedSong + 1){
            
        } else {
            selectedSong = selectedSong + 1
            selectedArrowWidth = width
            selectedArrowHeight = height
        }
    }
}
function scrollThroughSong(width, height, amount){
    differentScroll(width, height, amount)
    scrollMenu.pause()
    scrollMenu.play()
    // selectedArrowHeight = height
    // selectedArrowWidth = width
    sampleSong.src = songs[selectedSong].inst
    sampleSong.play()
    sampleVoice.src = songs[selectedSong].path
    // sampleVoice.muted = true
    sampleVoice.play()
}
function scrollThroughOptions(width, height, amount){
    differentScroll(width, height, amount, optionsList.length, selectedOption)
}
function calculateAccuracy(){
    var accuracyPoints = 0
    accuracyPoints += (sicks * 100)
    accuracyPoints += (goods * 75)
    accuracyPoints += (bads * 75)
    accuracyPoints += (misses * 25)
    var hits = (sicks + goods + bads + misses)
    accuracy = Math.floor(accuracyPoints / hits)
}
function changeScore(number, text){
    score += number
    if(text == sick){
        sicks += 1
    } else if(text == good){
        goods += 1
    } else if(text == bad){
        bads += 1
    } else {
        misses += 1
    }
    var gah = createArrow(text)
    var toPush = {
        'image': gah,
        'time': 1000,
        'height': 300,
    }
    cools.push(toPush)
    calculateAccuracy()
}
var clicked = [false,false,false,false]
function regiterHit(el, point, goodstuff, type){
    el.hit = true
    // notes[el] = null
    changeScore(point, goodstuff)
    if(goodstuff == sick){
        var toPush = {
            "width": 0,
            'time': 100,
            'img': "",
        }
        if(type==0){
            toPush.width = LeftPosition - 10
            toPush.img = createArrow("./arrows/hit/SplashLeft")
        } else if(type ==1){
            toPush.width = DownPosition - 10
            toPush.img = createArrow("./arrows/hit/SplashDown")
        } else if(type == 2){
            toPush.width = UpPosition - 10
            toPush.img = createArrow("./arrows/hit/SplashUp")
        } else {
            toPush.width = RightPosition - 10
            toPush.img = createArrow("./arrows/hit/SplashRight")
        }
        splashes.push(toPush)
    }
    return
}
function hit(key){
    if(clicked[key] == false){
        clicked[key] = true
        notes.forEach(el => {
            if(key == el.typeOfArrow){
                if(el.hit == false){
                    if(el.validtohit == "sick"){
                        regiterHit(el, 50, sick, el.typeOfArrow)
                    } else if(el.validtohit == "good"){
                        regiterHit(el, 25, good)
                    } else if(el.validtohit == "bad"){
                        regiterHit(el, 10, bad)
                    }
                }
            }
        })
    }
}
function UpEvent(key){
    clicked[key] = false
}
// keydown function
document.addEventListener("keydown", e => {
    changeOption(e.keyCode)
        if (e.keyCode == up || e.keyCode == secondaryUp){
            if(midSong == false){
                if (status == "freeplay"){
                    scrollThroughSong(selectedArrowWidth, selectedArrowHeight - 75, "up")
                } else if(status == "options"){
                    if(changingKey == true){
                        if(selectedChangingKey == 0){

                        } else {
                            selectedArrowHeight -= 100
                            selectedChangingKey -= 1
                        }
                    } else {
                        // scrollThroughOptions(selectedArrowWidth, selectedArrowHeight + 75, "up")
                    }
                } else {
                    if(selectedMenu == "options"){
                        scroll("freeplay", ((canvasWidth / 2) / 1.5) - 100, 225)
                    }
                }
            } else {
                hit(2)
                ClickingUp = true
            }
        } else if (e.keyCode == down || e.keyCode == secondaryDown){
            if(midSong==false){
                if (status == "freeplay"){
                    scrollThroughSong(selectedArrowWidth, selectedArrowHeight + 75, "down")
                } else if(status == "options"){
                    if(changingKey == true){
                        if(selectedChangingKey == 3){
                            
                        } else {
                            selectedArrowHeight += 100
                            selectedChangingKey += 1
                        }
                    } else {
                        // scrollThroughOptions(selectedArrowWidth, selectedArrowHeight + 75, "down")
                    }
                } else {
                    if(selectedMenu == "freeplay"){
                        scroll("options", ((canvasWidth / 2) / 1.5) - 75, 375)
                        selectedMenu = "options"
                    }
                }
            } else {
                ClickingDown = true
                hit(1)
            }
        } else if (e.keyCode == right || e.keyCode == secondaryRight){
            ClickingRight = true
            hit(3)
        } else if (e.keyCode == left || e.keyCode == secondaryLeft){
            ClickingLeft = true
            hit(0)
        } else if (e.keyCode == 27) {
            if(changingKey == false){
                if(status == "options" || status == "freeplay"){
                    if (midSong == true) {
                        if(gamePaused == false){
                            gamePaused = true
                            pauseSong()
                        }
                    } else {
                        openfreeplay()
                    }
                }
            } else {
                selectedToChangeKey = false
                changingKey = false
                selectedArrowWidth = 0
                selectedArrowHeight = 25
            }
        }
})
// keyup function
document.addEventListener("keyup", e => {
    if (e.keyCode == up || e.keyCode == secondaryUp){
        ClickingUp = false
        UpEvent(2)
    } else if (e.keyCode == down || e.keyCode == secondaryDown){
        ClickingDown = false
        UpEvent(1)
    } else if (e.keyCode == right || e.keyCode == secondaryRight){
        ClickingRight = false
        UpEvent(3)
    } else if (e.keyCode == left || e.keyCode == secondaryLeft){
        ClickingLeft = false
        UpEvent(0)
    }
})

document.addEventListener("keypress", e => {
    if (e.keyCode == enter) {
        if (status == "menu") {
            if(selectedMenu == "options"){
            options()
            } else {
                menu()
            }
        } else if (status == "freeplay") {
            freeplay()
            if(gamePaused == false && midSong == false){
                selectSong()
            } else {
                ready()
            }
        } else if(status == "options"){
            if(selectedOption == 0){
                if(selectedToChangeKey == true){
                    
                } else {
                    if(changingKey == false){
                        changingKey = true
                        selectedArrowWidth = 100
                        selectedArrowHeight = 100
                    } else {
                        selectedToChangeKey = true
                    }
                }
            }
        }
    }
})
songInst.onended = function(){
    sampleSong = "./songs/freakyMenu.ogg"
    selectedSong = 0
    sampleSong.play()
    menu()
}
document.addEventListener('visibilitychange', function() {
	if(document.hidden){
		if(midSong == true){
            pauseSong()
        }
    }else{
		if(midSong == true){
            unpauseSong()
        }
    }
});
// DRAWING ON CANVAS
// canvas variable
var arrowUp = createArrow("./arrows/original/Up")
var arrowDown = createArrow("./arrows/original/Down")
var arrowLeft = createArrow("./arrows/original/Left")
var arrowRight = createArrow("./arrows/original/Right")
var ColoredarrowUp = createArrow("./arrows/colored/Up")
var ColoredarrowLeft = createArrow("./arrows/colored/Left")
var ColoredarrowDown = createArrow("./arrows/colored/Down")
var ColoredarrowRight = createArrow("./arrows/colored/Right")
var SelectedStuff = createArrow("./arrows/colored/Right")
// var MapBG = createArrow("./images/MapBG")
// sprites
// var bfSprite = createArrow("./sprites/BOYFRIEND")
// var dadSprite = createArrow("./sprites/DADDY_DEAREST")
// spites info
var bfXPos = 1000
var bfYPos = 300
var bfXSize = 150
var bfYSize = 150

var dadXPos = 50
var dadYPos = 200
var dadXSize = 175
var dadYSize = 250
//arrow info
var arrowSizeY = 100
var arrowSizeX = 100
// updating canvas
function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    requestAnimationFrame(update)
    ctx.font = "bold 75px Helvetica, Arial, sans-serif"
    if (status == "menu") {
        ctx.drawImage(bg, 0, 0, canvasWidth, canvasHeight)
        ctx.fillStyle = "white"
        ctx.fillText("FREEPLAY",(canvasWidth / 2) / 1.5,300)
        ctx.fillText("OPTIONS",((canvasWidth / 2) / 1.5) + 25,450)
    } else if (status == "freeplay") {
        if (midSong == true) {
            // EXTRA
            // ctx.drawImage(MapBG,2560,1400,2560,1400,0,0,canvasWidth,canvasHeight)
            ctx.font = "bold 30px Helvetica, Arial, sans-serif"
            ctx.fillText("SCORE: " + score, 0, canvasHeight - 5, canvasWidth)
            ctx.fillText("MISSES: " + misses, 250, canvasHeight - 5, canvasWidth)
            if(accuracy >= 95){
                ctx.fillText("ACCURACY: " + accuracy +"%(S)", 500, canvasHeight - 5, canvasWidth)
            } else if(accuracy >= 85){
                ctx.fillText("ACCURACY: " + accuracy +"%(A)", 500, canvasHeight - 5, canvasWidth)
            } else if(accuracy >= 75){
                ctx.fillText("ACCURACY: " + accuracy +"%(B)", 500, canvasHeight - 5, canvasWidth)
            } else if(accuracy >= 60){
                ctx.fillText("ACCURACY: " + accuracy +"%(C)", 500, canvasHeight - 5, canvasWidth)
            } else {
                ctx.fillText("ACCURACY: " + accuracy +"%", 500, canvasHeight - 5, canvasWidth)
            }
            // ctx.drawImage(bfSprite, 0, 2344, 406, 392, bfXPos ,bfYPos, bfXSize, bfYSize)
            // ctx.drawImage(dadSprite, 1369, 730, 429, 767, dadXPos ,dadYPos, dadXSize, dadYSize)
            //YOUR ARROWS
            if(ClickingUp == false){
                ctx.drawImage(arrowUp,UpPosition,ArrowHeight,arrowSizeX,arrowSizeY)
            } else {
                ctx.drawImage(ColoredarrowUp,UpPosition,ArrowHeight,arrowSizeX,arrowSizeY)
            }
            if(ClickingDown == false){
                ctx.drawImage(arrowDown,DownPosition,ArrowHeight,arrowSizeX,arrowSizeY)
            } else {
                ctx.drawImage(ColoredarrowDown,DownPosition,ArrowHeight,arrowSizeX,arrowSizeY)
            }
            if(ClickingLeft == false){
                ctx.drawImage(arrowLeft,LeftPosition,ArrowHeight,arrowSizeX,arrowSizeY)
            } else {
                ctx.drawImage(ColoredarrowLeft,LeftPosition,ArrowHeight,arrowSizeX,arrowSizeY)
            }
            if(ClickingRight == false){
                ctx.drawImage(arrowRight,RightPosition,ArrowHeight,arrowSizeX,arrowSizeY)
            } else {
                ctx.drawImage(ColoredarrowRight,RightPosition,ArrowHeight,arrowSizeX,arrowSizeY)
            }
            // ENEMY ARROWS
            ctx.drawImage(arrowUp,EnemyUpPosition,ArrowHeight,arrowSizeX,arrowSizeY)
            ctx.drawImage(arrowDown,EnemyDownPosition,ArrowHeight,arrowSizeX,arrowSizeY)
            ctx.drawImage(arrowLeft,EnemyLeftPosition,ArrowHeight,arrowSizeX,arrowSizeY)
            ctx.drawImage(arrowRight,EnemyRightPosition,ArrowHeight,arrowSizeX,arrowSizeY)
            // ARROW HANDLERS
            notes.forEach(el => {
                el.height-=bpm
                if(el.height <= (0 - 200)){
                    if(el.hit != true){
                        el.validtohit = "missed"
                        // notes[el] = null
                        el.hit = true
                        changeScore(-50, miss)
                    }
                }
                else if(el.height <= 15){
                    el.validtohit = "sick"
                } else if(el.height <= 30){
                    el.validtohit = "good"
                } else if(el.height <= 50){
                    el.validtohit = "bad"
                } else {
                    el.validtohit = "no"
                }
                if(el.hit != true){
                    ctx.drawImage(el.note,el.postion,el.height,100,100)
                }
            })
            enemyNotes.forEach(el => {
                el.height-=bpm
                if(el.height <= 0){
                    
                } else {
                    ctx.drawImage(el.note,el.postion,el.height,100,100)
                }
            })
            // HIT HANDLER
            cools.forEach(el => {
                if(el.time >= 0){
                    el.time -= 50
                    ctx.drawImage(el.image, 425, el.height, 150, 100)
                    el.height-=5
                } else {
                    el = null
                }
            })
            //SPLASHES
            splashes.forEach(el => {
                if(el.time >= 0){
                    el.time -= 10
                    ctx.drawImage(el.img, el.width, ArrowHeight, arrowSizeX, arrowSizeY)
                } else {
                    el = null
                }
            })
        } else {
            ctx.drawImage(bgMagenta,0,0,canvasWidth,canvasHeight)
            var lastPosition = 100
            songs.forEach(el => {
                ctx.fillText(el.song,100,lastPosition)
                lastPosition+=75
            })
        }
    } else if(status == "options"){
        ctx.drawImage(bgMagenta,0,0,canvasWidth,canvasHeight)
        var lastPosition = 100
        optionsList.forEach(el => {
            ctx.fillText(el,100, lastPosition)
            lastPosition+=75
        })
        if(changingKey == true){
            ctx.fillStyle = 'rgba(0,0,0,0.5)'
            ctx.fillRect(200, 100, 800, 400)
            ctx.fillStyle = 'white'
            ctx.fillText("KEY ONE: " + String.fromCharCode(secondaryLeft),200,170)
            ctx.fillText("KEY TWO: " + String.fromCharCode(secondaryDown),200,270)
            ctx.fillText("KEY THREE: " + String.fromCharCode(secondaryUp),200,370)
            ctx.fillText("KEY FOUR: " + String.fromCharCode(secondaryRight),200,470)
        }
    }
    if(midSong==false){
        ctx.drawImage(SelectedStuff, selectedArrowWidth, selectedArrowHeight, 100, 100)
    }
}
update()