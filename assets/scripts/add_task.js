/**
 * Sets the active priority level in the UI by updating button visibility.
 * All priority buttons are first reset to the default (white) state,
 * and then the selected level's button is set to the filled (active) state.
 * 
 * @param {string} level - The priority level to activate ("urgent", "medium", or "low").
 * 
 * @returns {void} - This function does not return a value; it updates the UI only.
 */
function setPriority(level) {
  const priorities = ["urgent", "medium", "low"];

  priorities.forEach(prio => {
    document.getElementById(`${prio}_btn_default`).classList.remove("d_none");
    document.getElementById(`${prio}_btn_filled`).classList.add("d_none");
  });

  document.getElementById(`${level}_btn_default`).classList.add("d_none");
  document.getElementById(`${level}_btn_filled`).classList.remove("d_none");
}

setPriority("medium");


/**
 * Toggles the visibility of the category dropdown list.
 *
 * @function toggleCategoryList
 * @returns {void} - This function does not return a value. 
 */
function toggleCategoryList() {
  let list = document.getElementById("dropdown_list");
    
  if (list.style.display === "none") {
    list.style.display = "block";
  } else {
    list.style.display = "none";
  }
}