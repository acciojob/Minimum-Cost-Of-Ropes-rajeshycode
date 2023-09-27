function calculateMinCost() {
  const inputElement = document.getElementById('ropesInput');
  const resultElement = document.getElementById('result');

  // Get the input values and split them by commas
  const inputValues = inputElement.value.split(',').map(Number);

  // Create a min-heap to store the rope lengths
  const minHeap = new MinHeap();

  // Add all rope lengths to the min-heap
  for (const length of inputValues) {
    minHeap.insert(length);
  }

  let totalCost = 0;

  // Merge the ropes until only one rope remains in the min-heap
  while (minHeap.size() > 1) {
    const firstRope = minHeap.extractMin();
    const secondRope = minHeap.extractMin();

    const cost = firstRope + secondRope;
    totalCost += cost;

    // Insert the merged rope back into the min-heap
    minHeap.insert(cost);
  }

  // Display the minimum cost in the result element
  resultElement.innerHTML = totalCost;
}

// MinHeap class to maintain the minimum element efficiently
class MinHeap {
  constructor() {
    this.heap = [];
  }

  size() {
    return this.heap.length;
  }

  insert(value) {
    this.heap.push(value);
    this.heapifyUp();
  }

  extractMin() {
    if (this.size() === 0) return null;

    if (this.size() === 1) return this.heap.pop();

    const min = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.heapifyDown();
    return min;
  }

  heapifyUp() {
    let currentIndex = this.size() - 1;
    while (currentIndex > 0) {
      const parentIndex = Math.floor((currentIndex - 1) / 2);
      if (this.heap[currentIndex] < this.heap[parentIndex]) {
        [this.heap[currentIndex], this.heap[parentIndex]] = [
          this.heap[parentIndex],
          this.heap[currentIndex],
        ];
        currentIndex = parentIndex;
      } else {
        break;
      }
    }
  }

  heapifyDown() {
    let currentIndex = 0;
    while (true) {
      const leftChildIndex = 2 * currentIndex + 1;
      const rightChildIndex = 2 * currentIndex + 2;
      let smallestIndex = currentIndex;

      if (
        leftChildIndex < this.size() &&
        this.heap[leftChildIndex] < this.heap[smallestIndex]
      ) {
        smallestIndex = leftChildIndex;
      }

      if (
        rightChildIndex < this.size() &&
        this.heap[rightChildIndex] < this.heap[smallestIndex]
      ) {
        smallestIndex = rightChildIndex;
      }

      if (currentIndex === smallestIndex) {
        break;
      }

      [this.heap[currentIndex], this.heap[smallestIndex]] = [
        this.heap[smallestIndex],
        this.heap[currentIndex],
      ];

      currentIndex = smallestIndex;
    }
  }
}
