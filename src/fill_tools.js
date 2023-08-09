async function acceptSlotSuggestion() {
    const activeSlot = puzzle.getActiveSlot();
    if (!activeSlot) return;

    let modified = false;
    let r = (activeSlot.dir === Direction.ACROSS) ? activeSlot.rowNum : activeSlot.startRowNum;
    let c = (activeSlot.dir === Direction.ACROSS) ? activeSlot.startColNum : activeSlot.colNum;
    for (let i = 0; i < activeSlot.length; ++i) {
        const square = puzzle.grid[r][c];
        if (!square.char && square.fill) {
            square.fill.isOnlyOption = true;
            modified = true;
        }
        (activeSlot.dir === Direction.ACROSS) ? ++c : ++r;
    }
    if (modified) { 
        puzzle.acceptSlotCandidate();
    }
}