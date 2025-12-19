interface AppElements {
    taskInput: HTMLInputElement;
    addTaskBtn: HTMLButtonElement;
    taskList: HTMLUListElement;
    stockDisplay: HTMLSpanElement;
    currencyDisplay: HTMLSpanElement;
    errorBar: HTMLDivElement;
    errorMessage: HTMLSpanElement;
    refreshBtn: HTMLButtonElement;
}

let el: AppElements;

const initializeElements = () => {
    el = {
        taskInput: document.getElementById('task-input') as HTMLInputElement,
        addTaskBtn: document.getElementById('add-task-btn') as HTMLButtonElement,
        taskList: document.getElementById('task-list') as HTMLUListElement,
        stockDisplay: document.getElementById('stock-data-value') as HTMLSpanElement,
        currencyDisplay: document.getElementById('currency-data-value') as HTMLSpanElement,
        errorBar: document.getElementById('error-bar') as HTMLDivElement,
        errorMessage: document.getElementById('error-message') as HTMLSpanElement,
        refreshBtn: document.getElementById('refresh-data-btn') as HTMLButtonElement,
    };

    el.addTaskBtn.addEventListener('click', handleAddTask);

    el.refreshBtn.addEventListener('click', handleRefresh);

    setInterval(updateNumbers, 100);
};

if (typeof window !== 'undefined') {
    window.addEventListener('DOMContentLoaded', initializeElements);
}

let currentStockPrice: number = 1500.0;
let lastStockPrice: number = 1500.0;

let currentCurrencyPrice: number = 140.0;
let lastCurrencyPrice: number = 140.0;

const quotes: string[] = [
    '牛乳を買う',
    '本当にもう12月なのか確認する',
    'あれ、何話したかったんだっけ？',
];

export const getFakeTask = (list: string[]): string => {
    const index: number = Math.floor(Math.random() * list.length);
    return list[index];
};

const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms));

const updateNumbers = () => {
    const fluctuation: number = Math.random() - 0.5;
    currentStockPrice += fluctuation;
    currentCurrencyPrice -= fluctuation / 2;

    if (lastStockPrice < currentStockPrice) {
        el.stockDisplay.style.color = 'green';
        el.stockDisplay.textContent = '▲ ' + currentStockPrice.toFixed(2);
    } else if (lastStockPrice == currentStockPrice) {
        el.stockDisplay.style.color = 'darkgray';
    } else {
        el.stockDisplay.style.color = 'red';
        el.stockDisplay.textContent = '▼ ' + currentStockPrice.toFixed(2);
    }

    if (lastCurrencyPrice < currentCurrencyPrice) {
        el.currencyDisplay.style.color = 'green';
        el.currencyDisplay.textContent = '▲ ' + currentCurrencyPrice.toFixed(2);
    } else if (lastCurrencyPrice == currentCurrencyPrice) {
        el.currencyDisplay.style.color = 'darkgray';
    } else {
        el.currencyDisplay.style.color = 'red';
        el.currencyDisplay.textContent = '▼ ' + currentCurrencyPrice.toFixed(2);
    }

    lastStockPrice = currentStockPrice;
    lastCurrencyPrice = currentCurrencyPrice;
};

const handleAddTask = async () => {
    el.addTaskBtn.disabled = true;
    const originalText = el.addTaskBtn.textContent;
    el.addTaskBtn.textContent = '高度な同期中...';
    await sleep(3000);

    const fakeTask = getFakeTask(quotes);
    const newLi = document.createElement('li');
    newLi.textContent = fakeTask;

    el.taskList.appendChild(newLi);

    el.taskInput.value = '';
    el.addTaskBtn.disabled = false;
    el.addTaskBtn.textContent = originalText;

    displayError('警告：整合性レイヤーで未知の例外が発生しました');
};

const handleRefresh = async () => {
    el.refreshBtn.disabled = true;
    const originalText = el.refreshBtn.textContent;
    el.refreshBtn.textContent = '高度な整合性チェック中(危ない！)...';
    await sleep(5000);
    displayError('致命的なエラー：整合性チェック中に宇宙の法則が乱れました');
    el.taskList.innerHTML = '';
    currentStockPrice = 0.0;
    currentCurrencyPrice = 0.0;
    el.refreshBtn.textContent = originalText;
};

const displayError = (message: string) => {
    el.errorMessage.textContent = message;
    el.errorBar.style.display = 'block';

    setTimeout(() => el.errorBar.classList.add('show'), 10);
    setTimeout(() => {
        el.errorBar.classList.remove('show');
        setTimeout(() => {
            el.errorBar.style.display = 'none';
        }, 500);
    }, 5000);
};
