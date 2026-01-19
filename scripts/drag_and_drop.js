/**
 * Sets the currently dragged task.
 *
 * @param {number} index - The index of the task in the task list.
 * @param {string} taskID - The unique ID of the task being dragged.
 */
function startDragging(event,index, taskID){
    currentDraggedElementIndex = index;
    currentDraggedElementID = taskID;
    let card = event.target;
    

    if (!card.classList.contains('style_task_card')) {
        card = card.closest('.style_task_card');
    }

    if (card) {
        card.classList.add('dragged_task_visual');
    }
}


/**
 * Removes the visual feedback when dragging stops.
 * 
 * @param {DragEvent} event - The drag event.
 */
function stopDragging(event) {
    let card = event.target;
    
    if (!card.classList.contains('style_task_card')) {
        card = card.closest('.style_task_card');
    }

    if (card) {
        card.classList.remove('dragged_task_visual');
    }
}


/**
 * Allows dropping an element on a drop target by preventing the default behavior.
 *
 * @param {DragEvent} event - The dragover event triggered on the drop target.
 */
function allowDrop(event){
    event.preventDefault();
}


/**
 * Handles dropping a task onto a category column.
 * Updates the task's status and reloads the content board.
 *
 * @async
 * @param {string} category - The target category/status where the task is dropped.
 */
async function drop(category){
    await updateTaskStatus(category);
    await loadContentBoard();
}


// Wir nutzen "...ids", um alle Argumente, die übergeben werden, als Array zu erhalten
function highlight(...ids) {
    ids.forEach((id) => {
        // Wir müssen das Präfix "board_column_" hinzufügen, damit es zur HTML ID passt
        let element = document.getElementById('board_column_' + id);
        if (element) {
            element.classList.add('drag_area_highlight'); // KEIN PUNKT HIER!
        }
    });
}


// Du brauchst auch eine Funktion, um das Highlight wieder zu entfernen (z.B. bei ondragleave oder ondrop)
function removeHighlight(...ids) {
    ids.forEach((id) => {
        let element = document.getElementById('board_column_' + id);
        if (element) {
            element.classList.remove('drag_area_highlight');
        }
    });
}