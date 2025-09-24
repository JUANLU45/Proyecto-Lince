// POLYFILLS PARA JEST - PROYECTO LINCE

// TEXT ENCODER/DECODER
import { TextEncoder, TextDecoder } from 'util';

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

// FETCH POLYFILL
import 'whatwg-fetch';

// URL POLYFILL
import { URL, URLSearchParams } from 'url';

global.URL = URL;
global.URLSearchParams = URLSearchParams;

// INTERSECTION OBSERVER MOCK
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  observe() {
    return null;
  }
  disconnect() {
    return null;
  }
  unobserve() {
    return null;
  }
};

// RESIZE OBSERVER MOCK
global.ResizeObserver = class ResizeObserver {
  constructor() {}
  observe() {
    return null;
  }
  disconnect() {
    return null;
  }
  unobserve() {
    return null;
  }
};

// MUTATION OBSERVER MOCK
global.MutationObserver = class MutationObserver {
  constructor() {}
  observe() {
    return null;
  }
  disconnect() {
    return null;
  }
  takeRecords() {
    return [];
  }
};

// WEB CRYPTO API MOCK
Object.defineProperty(global.self, 'crypto', {
  value: {
    getRandomValues: (arr) => arr.map(() => Math.floor(Math.random() * 256)),
    subtle: {
      digest: jest.fn(() => Promise.resolve(new ArrayBuffer(32))),
    },
  },
});

// WINDOW LOCATION MOCK
Object.defineProperty(window, 'location', {
  value: {
    href: 'http://localhost:3000',
    origin: 'http://localhost:3000',
    pathname: '/',
    search: '',
    hash: '',
    assign: jest.fn(),
    replace: jest.fn(),
    reload: jest.fn(),
  },
  writable: true,
});

// MATCH MEDIA MOCK
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// REQUEST ANIMATION FRAME MOCK
global.requestAnimationFrame = (callback) => {
  setTimeout(callback, 0);
};

global.cancelAnimationFrame = (id) => {
  clearTimeout(id);
};

// PERFORMANCE MOCK
global.performance = {
  now: jest.fn(() => Date.now()),
  mark: jest.fn(),
  measure: jest.fn(),
  getEntriesByName: jest.fn(() => []),
  getEntriesByType: jest.fn(() => []),
};

// NAVIGATOR MOCK
Object.defineProperty(navigator, 'userAgent', {
  value: 'jest',
  configurable: true,
});

Object.defineProperty(navigator, 'platform', {
  value: 'test',
  configurable: true,
});

// LOCAL STORAGE MOCK
const localStorageMock = {
  getItem: jest.fn(() => null),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
  length: 0,
  key: jest.fn(() => null),
};

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

Object.defineProperty(window, 'sessionStorage', {
  value: localStorageMock,
});

// FILE READER MOCK
global.FileReader = class {
  constructor() {
    this.result = null;
    this.error = null;
    this.readyState = 0;
    this.onload = null;
    this.onerror = null;
    this.onabort = null;
    this.onloadstart = null;
    this.onloadend = null;
    this.onprogress = null;
  }
  
  readAsDataURL() {
    this.result = 'data:image/png;base64,test';
    if (this.onload) this.onload();
  }
  
  readAsText() {
    this.result = 'test content';
    if (this.onload) this.onload();
  }
  
  abort() {
    if (this.onabort) this.onabort();
  }
};

// BLOB MOCK
global.Blob = class {
  constructor(parts, options) {
    this.parts = parts;
    this.options = options;
    this.size = parts.reduce((size, part) => size + part.length, 0);
    this.type = options?.type || '';
  }
  
  slice() {
    return new Blob(this.parts, this.options);
  }
  
  stream() {
    return new ReadableStream();
  }
  
  text() {
    return Promise.resolve(this.parts.join(''));
  }
  
  arrayBuffer() {
    return Promise.resolve(new ArrayBuffer(this.size));
  }
};

// FILE MOCK
global.File = class extends Blob {
  constructor(parts, name, options) {
    super(parts, options);
    this.name = name;
    this.lastModified = Date.now();
    this.webkitRelativePath = '';
  }
};

// IMAGE MOCK
global.Image = class {
  constructor() {
    this.onload = null;
    this.onerror = null;
    this.src = '';
    this.width = 0;
    this.height = 0;
  }
  
  set src(value) {
    this._src = value;
    setTimeout(() => {
      this.width = 100;
      this.height = 100;
      if (this.onload) this.onload();
    }, 0);
  }
  
  get src() {
    return this._src;
  }
};

// AUDIO CONTEXT MOCK
global.AudioContext = class {
  constructor() {
    this.destination = {};
    this.listener = {};
    this.sampleRate = 44100;
    this.currentTime = 0;
    this.state = 'running';
  }
  
  createOscillator() {
    return {
      connect: jest.fn(),
      start: jest.fn(),
      stop: jest.fn(),
      frequency: { value: 440 },
      type: 'sine',
    };
  }
  
  createGain() {
    return {
      connect: jest.fn(),
      gain: { value: 1 },
    };
  }
  
  resume() {
    return Promise.resolve();
  }
  
  suspend() {
    return Promise.resolve();
  }
  
  close() {
    return Promise.resolve();
  }
};

// WEB AUDIO API MOCK
global.webkitAudioContext = global.AudioContext;