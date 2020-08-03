
const GUESSES = 'my-guesses';
var gQuestsTree;
var gCurrQuest;
var gPrevQuest = null;

function createQuestsTree() {
    gQuestsTree = loadFromStorage(GUESSES);
    if (!gQuestsTree) {
        gQuestsTree = createQuest('Male?');
        gQuestsTree.yes = createQuest('Gandhi');
        gQuestsTree.no = createQuest('Rita');
    }
    gCurrQuest = gQuestsTree;

    gPrevQuest = null;

}

function createQuest(txt) {
    return {
        txt: txt,
        yes: null,
        no: null
    }
}

function isChildless(node) {
    return (node.yes === null && node.no === null)
}

function moveToNextQuest(res) {
    // TODO: update the gPrevQuest, gCurrQuest global vars
    // console.log(gCurrQuest);
    gPrevQuest = gCurrQuest;
    gCurrQuest = gCurrQuest[res];
}

function addGuess(newQuestTxt, newGuessTxt, lastRes) {
    // TODO: Create and Connect the 2 Quests to the quetsions tree
    var newQuest = createQuest(newQuestTxt);
    newQuest.yes = createQuest(newGuessTxt);
    newQuest.no = gCurrQuest;
    // console.log( 'before', gQuestsTree);
    gPrevQuest[lastRes] = newQuest;
    // console.log( 'after', gQuestsTree);
    // console.log('prev', gPrevQuest, 'curr', gCurrQuest);
    saveToStorage(GUESSES, gQuestsTree);
}

function getCurrQuest() {
    return gCurrQuest
}
function restartGame() {
    gCurrQuest = gQuestsTree;
    gPrevQuest = null;
}



