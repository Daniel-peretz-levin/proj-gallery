'use strict';

// NOTE: This is a global used only in the controller
var gLastRes = null;

$(document).ready(init);

function init() {
    createQuestsTree();
}

function onStartGuessing() {
    // TODO: hide the game-start section
    $('.game-start').hide();
    renderQuest();
    // TODO: show the quest section
    $('.quest').show();
}

function renderQuest() {
    // TODO: select the <h2> inside quest and update
    // its text by the currQuest text
    $('.quest h2').text(gCurrQuest.txt)
}

function onUserResponse(res) {

    // If this node has no children
    if (isChildless(getCurrQuest())) {
        if (res === 'yes') {
            $('.end-modal').show();
            $('.end-modal h2').text('Yes, I knew it!');
            // TODO: improve UX
        } else {
            // TODO: hide and show new-quest section
            $('.quest').hide();
            $('.new-quest').show();
        }
    } else {
        // TODO: update the lastRes global var
        gLastRes = res;
        moveToNextQuest(res);
        renderQuest();
    }
}

function onAddGuess() {
    // TODO: Get the inputs' values
    var newGuessTxt = $('#newGuess').val();
    var newQuestTxt = $('#newQuest').val();
    // TODO: Call the service addGuess
    var lastRes = gLastRes
    addGuess(newQuestTxt, newGuessTxt, lastRes)
    onRestartGame();
}


function onRestartGame() {
    $('.new-quest').hide();
    $('.game-start').show();
    gLastRes = null;
    restartGame();
}

function onExit() {
    $('.end-modal').hide();
    $('.quest').hide();
    onRestartGame();
}

