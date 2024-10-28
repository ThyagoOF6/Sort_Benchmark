const axios = require('axios');
const { performance } = require('perf_hooks');

function insertionSort(arr) {
    let array = [...arr];
    for (let i = 1; i < array.length; i++) {
        let key = array[i];
        let j = i - 1;
        while (j >= 0 && array[j] > key) {
            array[j + 1] = array[j];
            j = j - 1;
        }
        array[j + 1] = key;
    }
    return array;
}

function bubbleSort(arr) {
    let array = [...arr];
    let n = array.length;
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            if (array[j] > array[j + 1]) {
                [array[j], array[j + 1]] = [array[j + 1], array[j]];
            }
        }
    }
    return array;
}

function quickSort(arr) {
    if (arr.length <= 1) return arr;
    let pivot = arr[arr.length - 1];
    let left = [], right = [];
    for (let i = 0; i < arr.length - 1; i++) {
        if (arr[i] < pivot) left.push(arr[i]);
        else right.push(arr[i]);
    }
    return [...quickSort(left), pivot, ...quickSort(right)];
}

async function benchmark() {
    try {
        const response = await axios.get('https://gist.githubusercontent.com/acenelio/59418b088d462b5de89ca50844a0b0f1/raw');
        const arr = response.data.split('\n').map(line => line.trim()).filter(line => line);

        let start = performance.now();
        insertionSort(arr);
        let insertionSortTime = performance.now() - start;

        start = performance.now();
        bubbleSort(arr);
        let bubbleSortTime = performance.now() - start;

        start = performance.now();
        quickSort(arr);
        let quickSortTime = performance.now() - start;

        console.log(`Insertion Sort: ${insertionSortTime.toFixed(2)}ms`);
        console.log(`Bubble Sort: ${bubbleSortTime.toFixed(2)}ms`);
        console.log(`Quick Sort: ${quickSortTime.toFixed(2)}ms`);
    } catch (error) {
        console.error("Erro ao carregar o array:", error);
    }
}

benchmark();