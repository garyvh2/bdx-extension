import { LitElement, html, css } from './modules/lit-element/lit-element.js';
import { fileToJson } from './utils/file.js';
import { getCurrentTab } from './utils/tabs.js';

class AppMain extends LitElement {

  static get styles() {
    return css`
      .container {
        display: flex;
        flex-direction: column;
      }

      button {
        height: 30px;
        min-width: 120px;
        outline: none;
        margin: 10px;
        border: none;
        border-radius: 2px;
      }

      input {
        margin: 10px;
      }
    `;
  }

  get fileInput() {
    return this.shadowRoot.querySelector('#storeFileInput');
  }

  get fileName() {
    return this.shadowRoot.querySelector('#fileName');
  }

  render() {
    return html`
      <div class="container">
        <input @change="${this.filesChanged}" type="file" name="store" id="storeFileInput" hidden>
        <button @click="${this.import}">Import store</button>
        <button @click="${this.export}">Export store</button>
        <input id="fileName" type="text" value="state" placeholder="filename">
      </div>
    `
  }

  import = () => {
    this.fileInput.click();
  }

  export = async () => {
    const fileName = this.fileName.value;
    const tab = await getCurrentTab();
    chrome.storage.local.set({ fileName }, () => {
      chrome.scripting.executeScript({
        target: { tabId: tab.id, allFrames: true },
        files: ["scripts/export_store.js"]
      });
    });
  }

  filesChanged = async () => {
    const store = await fileToJson(this.fileInput?.files?.[0]);
    const tab = await getCurrentTab();
    chrome.storage.local.set({ store }, () => {
        chrome.scripting.executeScript({
            target: { tabId: tab.id, allFrames: true },
            files: ["scripts/import_store.js"]
        });
    });
  }
}
customElements.define('app-main', AppMain);