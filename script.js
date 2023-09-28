function calculateMinimumCost(ropeLengths) {
    // Function to build a min heap
    function buildMinHeap(arr) {
        const n = arr.length;
        for (let i = Math.floor(n / 2); i >= 0; i--) {
            heapify(arr, n, i);
        }
    }

    // Function to heapify a subtree rooted at index i
    function heapify(arr, n, i) {
        let smallest = i;
        const left = 2 * i + 1;
        const right = 2 * i + 2;

        if (left < n && arr[left] < arr[smallest]) {
            smallest = left;
        }

        if (right < n && arr[right] < arr[smallest]) {
            smallest = right;
        }

        if (smallest !== i) {
            // Swap arr[i] and arr[smallest]
            [arr[i], arr[smallest]] = [arr[smallest], arr[i]];

            // Recursively heapify the affected subtree
            heapify(arr, n, smallest);
        }
    }

    // Main function to calculate the minimum cost
    function minCost(ropeLengths) {
        const n = ropeLengths.length;
        let cost = 0;

        // Build a min heap
        buildMinHeap(ropeLengths);

        // Connect ropes until only one rope remains
        while (ropeLengths.length > 1) {
            // Extract the two smallest ropes
            const min1 = ropeLengths.shift();
            const min2 = ropeLengths.shift();

            // Calculate the cost of connecting them
            const currentCost = min1 + min2;

            // Add the current cost to the total cost
            cost += currentCost;

            // Insert the newly formed rope back into the heap
            ropeLengths.push(currentCost);

            // Rebuild the min heap
            buildMinHeap(ropeLengths);
        }

        return cost;
    }

    // Call the main function and return the result
    return minCost(ropeLengths);
}

// Example usage
const ropeLengths = [4, 2, 7, 6, 9];
const minimumCost = calculateMinimumCost(ropeLengths);
console.log(minimumCost); // Output: 62
