const emoticons = [
  '(*^ω^)',
  '(◕‿◕✿)',
  '(◕ᴥ◕)',
  'ʕ•ᴥ•ʔ',
  'ʕ￫ᴥ￩ʔ',
  '(*^.^*)',
  'owo',
  '(｡♥‿♥｡)',
  'uwu',
  '(*￣з￣)',
  '>w<',
  '^w^',
  '(つ✧ω✧)つ',
  '(/ =ω=)/',
];

const randomEmoticon = () => {
  return emoticons[Math.floor(Math.random() * emoticons.length)];
};

const weebify = (text) => {
  text = text.replace(/(?:l|r)/g, 'w'); // Replace l and r into w
  text = text.replace(/(?:L|R)/g, 'W'); // Replace L and R into W
  text = text.replace(/n([aeiou])/g, 'ny$1'); // n followed by random lowercase letter replaced to ny
  text = text.replace(/N([aeiou])/g, 'Ny$1'); // N followed by random lowercase letter replaced to Ny
  text = text.replace(/N([AEIOU])/g, 'NY$1'); // N followed by random uppercase letter replaced to NY
  text = text.replace(/ove/g, 'uv'); // "-ove" is changed to "-uv"
  text = text.replace(/!+/g, ` ${randomEmoticon()} `); // Append random emoticon
  text = text.replace(/\.+/g, ` ${randomEmoticon()} `); // Append random emoticon

  return text;
};

window.weebify = weebify;