// This function calculates the minimum cost of connecting the given ropes.
function connectRopes(ropes) {
  // Create a priority queue to store the lengths of the ropes.
  const priorityQueue = new PriorityQueue();
  for (const rope of ropes) {
    priorityQueue.enqueue(rope);
  }

  // Initialize the total cost.
  let totalCost = 0;

  // While there are more than one rope in the queue, connect the two shortest ropes.
  while (priorityQueue.size() > 1) {
    const firstRope = priorityQueue.dequeue();
    const secondRope = priorityQueue.dequeue();

    const cost = firstRope + secondRope;
    totalCost += cost;

    // Enqueue the connected rope back into the queue.
    priorityQueue.enqueue(cost);
  }

  // Return the total cost.
  return totalCost;
}

// A priority queue implementation.
class PriorityQueue {
  constructor() {
    this.queue = [];
  }

  enqueue(element) {
    this.queue.push(element);
    this.heapifyUp(this.queue.length - 1);
  }

  dequeue() {
    const min = this.queue[0];
    this.queue[0] = this.queue[this.queue.length - 1];
    this.queue.pop();
    this.heapifyDown(0);
    return min;
  }

  size() {
    return this.queue.length;
  }

  heapifyUp(index) {
    const parentIndex = Math.floor((index - 1) / 2);
    if (parentIndex >= 0 && this.queue[index] < this.queue[parentIndex]) {
      [this.queue[index], this.queue[parentIndex]] = [this.queue[parentIndex], this.queue[index]];
      this.heapifyUp(parentIndex);
    }
  }

  heapifyDown(index) {
    const leftChildIndex = 2 * index + 1;
    const rightChildIndex = 2 * index + 2;

    let smallestChildIndex = index;
    if (leftChildIndex < this.queue.length && this.queue[leftChildIndex] < this.queue[smallestChildIndex]) {
      smallestChildIndex = leftChildIndex;
    }
    if (rightChildIndex < this.queue.length && this.queue[rightChildIndex] < this.queue[smallestChildIndex]) {
      smallestChildIndex = rightChildIndex;
    }

    if (smallestChildIndex !== index) {
      [this.queue[index], this.queue[smallestChildIndex]] = [this.queue[smallestChildIndex], this.queue[index]];
      this.heapifyDown(smallestChildIndex);
    }
  }
}

// Get the comma-separated integers from the input element.
const ropes = document.getElementById('input').value.split(',');

// Convert the strings to integers.
for (let i = 0; i < ropes.length; i++) {
  ropes[i] = parseInt(ropes[i]);
}

// Calculate the minimum cost of ropes.
const totalCost = connectRopes(ropes);

// Display the total cost in the result element.
document.getElementById('result').innerHTML = totalCost;