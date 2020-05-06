new ClipboardJS('.btn');
let counter = 0;
let deletionBuffer = 2;

const init = async () => {
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
    <div class="card mb-3" id="${key}">
      <div class="d-flex">
        <div>
          <p class="card-text" style="text-align: left !important;">
            <div class="form-group mb-3" id="copy-${key}">
              ${localStorage.getItem(key)}
            </div>   
          </p>
        </div>
        <div class="ml-auto mt-auto mb-auto">
          <button class="btn btn-warning" data-clipboard-target="#copy-${key}">
            copy
          </button>
          <button class="btn btn-danger" onclick="deleteKey('${key}')" id="delete-${
    key.split('-')[1]
  }">
            delete
          </button>
        </div>
      </div>
    </div>
  ${document.querySelector('#history').innerHTML}`;
};

const createEntryArray = () => {
  return new Promise((res) => {
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
};

const currentEntryCount = () => {
  for (const key in localStorage) {
    if (!key.startsWith('text')) return;
    counter++;
  }
};

document.querySelector('#text').addEventListener('input', () => {
  document.querySelector('#output').innerText = window.weebify(
    document.querySelector('#text').value
  );
});

document.querySelector('#copy').onclick = () => {
  if (
    !document.querySelector('#output').innerText ||
    document.querySelector('#output').innerText === 'youw text wiww be shown hewe ʕ•ᴥ•ʔ'
  )
    return;
  const key = `text-${counter}-${makeid(20)}`;
  localStorage.setItem(key, document.querySelector('#output').innerText);
  addEntry(key);
  counter++;
};

init();
