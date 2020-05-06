new ClipboardJS('.btn');
let counter = 0;
let deletionBuffer = 2;

const init = async () => {
  textareaResize('output');
  textareaResize('text');
  for (const key of await createEntryArray()) {
    addEntry(key);
  }
};

const makeid = (length) => {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return text;
};

const deleteKey = (key) => {
  if (deletionBuffer > 0) if (!confirm(`Are you sure you want to delete ${key}?`)) return;
  deletionBuffer--;
  localStorage.removeItem(key);
  document.querySelector(`#${key}`).remove();
};

const addEntry = (key) => {
  document.querySelector('#history').innerHTML = `
    <div class="card mb-3 hover" id="${key}">
      <div class="d-flex">
        <div>
          <div class="input-group" id="copy-${key}">
            ${localStorage.getItem(key)}
          </div>  
        </div>
        <div class="ml-auto mt-auto mb-auto">
          <div class="container">
            <button class="btn btn-warning hover" data-clipboard-target="#copy-${key}">
              <i class="far fa-copy"></i> copy
            </button>
            <button class="btn btn-danger hover" onclick="deleteKey('${key}')" id="delete-${
    key.split('-')[1]
  }">
              <i class="far fa-trash-alt"></i> delete
            </button>
          </div>
        </div>
      </div>
    </div>
  ${document.querySelector('#history').innerHTML}`;
};

const createEntryArray = () =>
  new Promise((res) => {
    currentEntryCount();
    let entries = [];
    if (localStorage.length === 0) return;
    for (const key in localStorage) {
      if (key.startsWith('text')) {
        entries.push(key);
        entries.sort();
      }
    }
    res(entries);
  });

const currentEntryCount = () => {
  for (const key in localStorage) {
    if (!key.startsWith('text')) return;
    counter++;
  }
};
const textareaResize = (id) => {
  let observe;
  if (window.attachEvent) {
    observe = (element, event, handler) => {
      element.attachEvent(`on${event}`, handler);
    };
  } else {
    observe = (element, event, handler) => {
      element.addEventListener(event, handler, false);
    };
  }
  const text = document.querySelector(`#${id}`);
  function resize() {
    if (text.scrollHeight > 1000) return;
    text.style.height = 'auto';
    text.style.height = `${text.scrollHeight}px`;
  }
  function delayedResize() {
    window.setTimeout(resize, 0);
  }
  observe(text, 'change', resize);
  observe(text, 'cut', delayedResize);
  observe(text, 'paste', delayedResize);
  observe(text, 'drop', delayedResize);
  observe(text, 'keydown', delayedResize);

  text.focus();
  text.select();
  resize();
};

document.querySelector('#text').addEventListener('input', () => {
  document.querySelector('#output').innerText = window.weebify(
    document.querySelector('#text').value
  );
});

document.querySelector('#copy').onclick = () => {
  if (
    !document.querySelector('#output').value ||
    document.querySelector('#output').value === 'youw text wiww be shown hewe ʕ•ᴥ•ʔ'
  )
    return;
  const key = `text-${counter}-${makeid(20)}`;
  localStorage.setItem(key, document.querySelector('#output').innerText);
  addEntry(key);
  counter++;
};

init();
