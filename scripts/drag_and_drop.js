/* --- Mobile Drag and Drop Variables --- */
let dragTimer;
let isMobileDragging = false;
let mobileDragElement = null;
let mobileDragClone = null;
let currentTouchTargetColumn = null;
const LONG_PRESS_DURATION = 250;
let autoScrollSpeed = 0;
let autoScrollFrame = null;
const SCROLL_ZONE_SIZE = 200;
const MAX_SCROLL_SPEED = 15;

/**
 * Initializes touch listeners for all task cards.
 */
function initMobileDragAndDrop() {
  const cards = document.querySelectorAll(".style_task_card");

  cards.forEach((card) => {
    card.removeEventListener("touchstart", handleTouchStart);
    card.removeEventListener("touchmove", handleTouchMove);
    card.removeEventListener("touchend", handleTouchEnd);
    card.addEventListener("touchstart", handleTouchStart, { passive: false });
    card.addEventListener("touchmove", handleTouchMove, { passive: false });
    card.addEventListener("touchend", handleTouchEnd, { passive: false });
  });
}


/**
 * Executes the auto-scroll loop.
 */
function processAutoScroll() {
  if (autoScrollSpeed !== 0) {
    window.scrollBy(0, autoScrollSpeed);
    autoScrollFrame = requestAnimationFrame(processAutoScroll);
  } else {
    autoScrollFrame = null;
  }
}


/**
 * Handle Touch Start: Starts the timer for Long Press
 */
function handleTouchStart(e) {
  if (e.touches.length > 1) return; // Ignore multi-touch

  const card = e.target.closest(".style_task_card");
  if (!card) return;

  // Start Timer
  dragTimer = setTimeout(() => {
    startMobileDrag(e, card);
  }, LONG_PRESS_DURATION);
}


/**
 *  Handles touch movement
 */
function handleTouchMove(e) {
  if (!isMobileDragging) return clearTimeout(dragTimer);
  if (e.cancelable) e.preventDefault();

  const { clientX, clientY } = e.touches[0];
  moveClone(clientX, clientY);
  detectDropZone(clientX, clientY);

  autoScrollSpeed = calculateScrollSpeed(clientY);
  if (autoScrollSpeed !== 0 && !autoScrollFrame) processAutoScroll();
}


/**
 * Calculates the scroll speed based on the touch Y position relative to the scroll zones.
 */
function calculateScrollSpeed(y) {
  const limit = window.innerHeight - SCROLL_ZONE_SIZE;

  if (y < SCROLL_ZONE_SIZE) {
    return -Math.floor(
      ((SCROLL_ZONE_SIZE - y) / SCROLL_ZONE_SIZE) * MAX_SCROLL_SPEED,
    );
  }
  if (y > limit) {
    return Math.floor(((y - limit) / SCROLL_ZONE_SIZE) * MAX_SCROLL_SPEED);
  }
  return 0;
}


/**
 * Handle Touch End
 */
async function handleTouchEnd(e) {
  clearTimeout(dragTimer); 

  if (isMobileDragging) {
    e.preventDefault();
    await finishMobileDrop();
  }
}


/**
 * Activates Drag Mode: initializes state, triggers haptic feedback
 */
function startMobileDrag(e, card) {
    isMobileDragging = true;
    mobileDragElement = card;

    if (navigator.vibrate && (!navigator.userActivation || navigator.userActivation.hasBeenActive)) navigator.vibrate(50);

    const match = card.getAttribute("ondragstart")?.match(/startDragging\(\w+,\s*(\d+),\s*'([^']+)'\)/);
    if (match) {
        currentDraggedElementIndex = parseInt(match[1]);
        currentDraggedElementID = match[2];
    }

    createMobileClone(card);
    card.classList.add("mobile-drag-active-original");
}


/**
 * Creates a visual clone of the card attached to the body
 */
function createMobileClone(original) {
  const rect = original.getBoundingClientRect();
  mobileDragClone = original.cloneNode(true);
  mobileDragClone.style.width = `${rect.width}px`;
  mobileDragClone.style.height = `${rect.height}px`;
  mobileDragClone.style.left = `${rect.left}px`;
  mobileDragClone.style.top = `${rect.top}px`;
  mobileDragClone.classList.add("mobile-drag-clone");
  document.body.appendChild(mobileDragClone);
}


/**
 * Moves the clone to follow finger
 */
function moveClone(x, y) {
  if (mobileDragClone) {
    const width = mobileDragClone.offsetWidth;
    const height = mobileDragClone.offsetHeight;
    mobileDragClone.style.left = `${x - width / 2}px`;
    mobileDragClone.style.top = `${y - height / 2}px`;
  }
}


/**
 * Detects which column is currently under the finger
 */
function detectDropZone(x, y) {
  mobileDragClone.style.display = "none";
  let elemBelow = document.elementFromPoint(x, y);
  mobileDragClone.style.display = "block";
  if (!elemBelow) return;
  let column = elemBelow.closest('[id^="board_column_"]');
  removeHighlight("todo", "inProgress", "awaitFeedback", "done");
  if (column) {
    let status = column.id.replace("board_column_", "");
    highlight(status); 
    currentTouchTargetColumn = status;
  } else {
    currentTouchTargetColumn = null;
  }
}


/**
 * Finalizes the mobile drop: stops auto-scroll, removes temporary DOM elements,
 * clears highlights, executes the drop logic, and resets all state variables.
 */
async function finishMobileDrop() {
    autoScrollSpeed = 0;
    if (autoScrollFrame) cancelAnimationFrame(autoScrollFrame), autoScrollFrame = null;

    mobileDragClone?.remove();
    mobileDragElement?.classList.remove("mobile-drag-active-original");
    removeHighlight("todo", "inProgress", "awaitFeedback", "done");

    if (currentTouchTargetColumn) await drop(currentTouchTargetColumn);

    isMobileDragging = false;
    mobileDragElement = mobileDragClone = currentTouchTargetColumn = null;
}


/**
 * Sets the currently dragged task.
 */
function startDragging(event, index, taskID) {
  currentDraggedElementIndex = index;
  currentDraggedElementID = taskID;
  let card = event.target;

  if (!card.classList.contains("style_task_card")) {
    card = card.closest(".style_task_card");
  }

  if (card) {
    card.classList.add("dragged_task_visual");
  }
}


/**
 * Removes the visual feedback when dragging stops.
 */
function stopDragging(event) {
  let card = event.target;

  if (!card.classList.contains("style_task_card")) {
    card = card.closest(".style_task_card");
  }

  if (card) {
    card.classList.remove("dragged_task_visual");
  }
}


/**
 * Allows dropping an element on a drop target by preventing the default behavior.
 */
function allowDrop(event) {
  event.preventDefault();
}


/**
 * Handles dropping a task onto a category column
 */
async function drop(category) {
  await updateTaskStatus(category);
  await loadContentBoard();
}


/**
 * Hightlight 
 */
function highlight(...ids) {
  ids.forEach((id) => {
    let element = document.getElementById("board_column_" + id);
    if (element) {
      element.classList.add("drag_area_highlight"); 
    }
  });
}


/**
 * Remove Highlight
 */
function removeHighlight(...ids) {
  ids.forEach((id) => {
    let element = document.getElementById("board_column_" + id);
    if (element) {
      element.classList.remove("drag_area_highlight");
    }
  });
}
