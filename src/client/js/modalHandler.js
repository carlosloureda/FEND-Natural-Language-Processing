/**
 * Opens a modal for showing nicer error messages to the user
 * @param {string} errorMessage - The message error to be displayed on the modal
 * window
 */
export const openErrorModal = errorMessage => {
  let modal = document.getElementById("errorModal");
  document.getElementById("modal-body-content").innerHTML = errorMessage;
  modal.style.display = "block";
};

/**
 * Hanlder for adding event listeners for closing modal window
 */
export const errorModalHandler = () => {
  let modal = document.getElementById("errorModal");
  let span = document.querySelector(".modal-close");
  // When the user clicks on <span> (x), close the modal
  span.onclick = function() {
    document.getElementById("modal-body-content").innerHTML = "";
    modal.style.display = "none";
  };
  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    if (event.target == modal) {
      document.getElementById("modal-body-content").innerHTML = "";
      modal.style.display = "none";
    }
  };
};
