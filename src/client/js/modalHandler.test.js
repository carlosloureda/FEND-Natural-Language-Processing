import { openErrorModal, errorModalHandler } from "./modalHandler";

beforeAll(() => {
  document.body.innerHTML = `
          <div id="errorModal" class="modal">
          <div class="modal-content">
            <div class="modal-header">
              <span class="modal-close">&times;</span>
              <h2>An error happened</h2>
            </div>
            <div class="modal-body">
              <p id="modal-body-content"></p>
            </div>
          </div>
        </div>`;
});

describe("#openErrorModal", () => {
  it("Opens the modal", () => {
    const errorMessage = "Test error message";
    openErrorModal(errorMessage);
    let modal = document.getElementById("errorModal");
    let modalContent = document.getElementById("modal-body-content");

    expect(modalContent.innerHTML).toEqual(errorMessage);
    expect(modal.style.display).toEqual("block");
  });

  it("Attaches proper handlers", () => {
    let modal = document.getElementById("errorModal");
    let span = document.querySelector(".modal-close");
    expect(span.onclick).toBeDefined();
    expect(window.onclick).toBeDefined();
  });
});
