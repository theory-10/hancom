const MAX_HISTORY = 5;
const DISPLAY_OP = { '*': '×', '/': '÷', '+': '+', '-': '−', '%': '%' };

const state = {
  current: '',
  expression: '',
  justCalculated: false,
  history: [],
};

const resultEl = document.getElementById('result');
const expressionEl = document.getElementById('expression');
const historyPanel = document.getElementById('historyPanel');
const historyList = document.getElementById('historyList');

// --- 디스플레이 ---

function updateDisplay() {
  const val = state.current || '0';
  resultEl.textContent = val;
  resultEl.classList.toggle('small', val.length > 10);
}

function toDisplayExpr(expr) {
  return expr.replace(/[*/+\-%]/g, m => DISPLAY_OP[m] || m);
}

// --- 입력 처리 ---

function inputNum(n) {
  if (state.justCalculated) {
    state.current = '';
    state.expression = '';
    state.justCalculated = false;
  }
  if (state.current.length >= 15) return;
  state.current += n;
  updateDisplay();
}

function inputDot() {
  if (state.justCalculated) {
    state.current = '0';
    state.expression = '';
    state.justCalculated = false;
  }
  if (state.current.includes('.')) return;
  if (!state.current) state.current = '0';
  state.current += '.';
  updateDisplay();
}

function inputOp(op) {
  state.justCalculated = false;
  if (!state.current && !state.expression) return;

  if (state.current) {
    state.expression += state.current + op;
    state.current = '';
  } else {
    state.expression = state.expression.slice(0, -1) + op;
  }

  expressionEl.textContent = toDisplayExpr(state.expression);
}

function calculate() {
  if (!state.current && !state.expression) return;

  const full = state.expression + state.current;
  if (!full) return;

  const displayFull = toDisplayExpr(full);
  expressionEl.textContent = displayFull + ' =';

  let resultVal;
  try {
    let res = Function('"use strict"; return (' + full + ')')();
    if (!isFinite(res)) {
      resultVal = '오류';
    } else {
      res = parseFloat(res.toPrecision(12));
      resultVal = String(res);
    }
  } catch {
    resultVal = '오류';
  }

  if (resultVal !== '오류') {
    saveHistory(displayFull, resultVal);
  }

  state.current = resultVal;
  state.expression = '';
  state.justCalculated = true;
  updateDisplay();
}

function clearAll() {
  state.current = '';
  state.expression = '';
  state.justCalculated = false;
  expressionEl.textContent = '';
  updateDisplay();
}

function deleteLast() {
  if (state.justCalculated) { clearAll(); return; }
  state.current = state.current.slice(0, -1);
  updateDisplay();
}

// --- 히스토리 ---

function saveHistory(expr, result) {
  state.history.unshift({ expr, result });
  if (state.history.length > MAX_HISTORY) {
    state.history.pop();
  }
  localStorage.setItem('calc-history', JSON.stringify(state.history));
  renderHistory();
}

function loadHistory() {
  try {
    const saved = localStorage.getItem('calc-history');
    state.history = saved ? JSON.parse(saved) : [];
  } catch {
    state.history = [];
  }
  renderHistory();
}

function renderHistory() {
  historyList.innerHTML = '';

  if (!state.history.length) {
    historyPanel.classList.remove('visible');
    return;
  }

  historyPanel.classList.add('visible');
  state.history.forEach(({ expr, result }) => {
    const li = document.createElement('li');
    li.className = 'history-item';
    li.innerHTML = `
      <span class="history-expr">${expr}</span>
      <span class="history-result">${result}</span>
    `;
    li.addEventListener('click', () => {
      state.current = result;
      state.expression = '';
      state.justCalculated = true;
      updateDisplay();
      expressionEl.textContent = '';
    });
    historyList.appendChild(li);
  });
}

// --- 버튼 이벤트 ---

function addRipple(btn, e) {
  const ripple = document.createElement('span');
  ripple.classList.add('ripple');
  const rect = btn.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  ripple.style.cssText = `
    width: ${size}px; height: ${size}px;
    left: ${e.clientX - rect.left - size / 2}px;
    top: ${e.clientY - rect.top - size / 2}px;
  `;
  btn.appendChild(ripple);
  setTimeout(() => ripple.remove(), 400);
}

document.querySelector('.buttons').addEventListener('click', (e) => {
  const btn = e.target.closest('button');
  if (!btn) return;

  addRipple(btn, e);

  const { num, op, action } = btn.dataset;
  if (num !== undefined)  inputNum(num);
  else if (op !== undefined) inputOp(op);
  else if (action === 'dot')       inputDot();
  else if (action === 'calculate') calculate();
  else if (action === 'clear')     clearAll();
  else if (action === 'delete')    deleteLast();
});

// --- 키보드 ---

document.addEventListener('keydown', (e) => {
  if (e.key >= '0' && e.key <= '9') inputNum(e.key);
  else if (e.key === '.')           inputDot();
  else if (e.key === '+')           inputOp('+');
  else if (e.key === '-')           inputOp('-');
  else if (e.key === '*')           inputOp('*');
  else if (e.key === '/')           { e.preventDefault(); inputOp('/'); }
  else if (e.key === '%')           inputOp('%');
  else if (e.key === 'Enter' || e.key === '=') calculate();
  else if (e.key === 'Backspace')   deleteLast();
  else if (e.key === 'Escape')      clearAll();
});

// --- 초기화 ---

function init() {
  loadHistory();
  updateDisplay();
}

init();
