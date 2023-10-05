// Function to calculate the minimum cost of connecting ropes
function minCostOfRopes(ropes) {
  // Create a min-heap to store rope lengths
  const minHeap = new MinHeap();

  // Insert all ropes into the min-heap
  for (const rope of ropes) {
    minHeap.insert(rope);
  }

  let totalCost = 0;

  // Connect ropes until only one rope remains
  while (minHeap.size() > 1) {
    // Extract the two smallest ropes
    const rope1 = minHeap.extractMin();
    const rope2 = minHeap.extractMin();

    // Calculate the cost of connecting these two ropes
    const cost = rope1 + rope2;

    // Add the cost to the total cost
    totalCost += cost;

    // Insert the connected rope back into the min-heap
    minHeap.insert(cost);
  }

  return totalCost;
}

// Min-heap implementation
class MinHeap {
  constructor() {
    this.heap = [];
  }

  size() {
    return this.heap.length;
  }

  insert(value) {
    this.heap.push(value);
    this.bubbleUp(this.heap.length - 1);
  }

  extractMin() {
    if (this.size() === 0) {
      return null;
    }

    const min = this.heap[0];
    const last = this.heap.pop();

    if (this.size() > 0) {
      this.heap[0] = last;
      this.sinkDown(0);
    }

    return min;
  }

  bubbleUp(index) {
    while (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2);
      if (this.heap[parentIndex] <= this.heap[index]) {
        break;
      }
      [this.heap[parentIndex], this.heap[index]] = [this.heap[index], this.heap[parentIndex]];
      index = parentIndex;
    }
  }

  sinkDown(index) {
    const leftChildIndex = 2 * index + 1;
    const rightChildIndex = 2 * index + 2;
    let smallest = index;

    if (leftChildIndex < this.size() && this.heap[leftChildIndex] < this.heap[smallest]) {
      smallest = leftChildIndex;
    }

    if (rightChildIndex < this.size() && this.heap[rightChildIndex] < this.heap[smallest]) {
      smallest = rightChildIndex;
    }

    if (smallest !== index) {
      [this.heap[index], this.heap[smallest]] = [this.heap[smallest], this.heap[index]];
      this.sinkDown(smallest);
    }
  }
}

// Get input from the user
const inputElement = document.getElementById("input");
const resultElement = document.getElementById("result");

inputElement.addEventListener("change", () => {
  const inputText = inputElement.value;
  const ropes = inputText.split(",").map(Number);

  // Calculate the minimum cost
  const minCost = minCostOfRopes(ropes);

  // Display the result in the resultElement
  resultElement.textContent = minCost.toString();
});
