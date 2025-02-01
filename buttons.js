// First, add these buttons to your HTML before the collection-container
const filterButtons = `
<div class="filter-controls">
    <button onclick="filterByYear('all')" class="filter-btn">Show All</button>
    <button onclick="filterByYear('2022')" class="filter-btn">2022</button>
    <button onclick="filterByYear('2023')" class="filter-btn">2023</button>
    <button onclick="filterByYear('2024')" class="filter-btn">2024</button>
    <button onclick="filterByYear('2025')" class="filter-btn">2025</button>
    <button onclick="sortByDate('oldest')" class="filter-btn">Oldest First</button>
    <button onclick="sortByDate('newest')" class="filter-btn">Newest First</button>
</div>
`;

// Updated JavaScript with filtering and sorting functions
function getDateFromElement(element) {
    const dateParagraph = element.querySelector('p');
    if (!dateParagraph) {
        console.log('Date paragraph not found in element:', element);
        return new Date(0);
    }

    const dateText = dateParagraph.textContent;
    const dateMatch = dateText.match(/Collected on (.+)/);
    
    if (dateMatch) {
        const dateStr = dateMatch[1];
        const parsedDate = new Date(dateStr);
        
        if (!isNaN(parsedDate.getTime())) {
            return parsedDate;
        }
    }
    
    return new Date(0);
}

function filterByYear(year) {
    const container = document.querySelector('.collection-container');
    if (!container) return;

    const items = container.querySelectorAll('.sound-item');
    
    items.forEach(item => {
        const date = getDateFromElement(item);
        if (year === 'all' || date.getFullYear().toString() === year) {
            item.style.display = '';  // Show item
        } else {
            item.style.display = 'none';  // Hide item
        }
    });

    // Update active button state
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.textContent.includes(year) || (year === 'all' && btn.textContent === 'Show All')) {
            btn.classList.add('active');
        }
    });
}

function sortByDate(order = 'newest') {
    const container = document.querySelector('.collection-container');
    if (!container) return;

    const items = Array.from(container.querySelectorAll('.sound-item'));
    
    const sortedItems = items.sort((a, b) => {
        const dateA = getDateFromElement(a);
        const dateB = getDateFromElement(b);
        return order === 'newest' ? dateB - dateA : dateA - dateB;
    });
    
    // Remove existing items
    items.forEach(item => item.remove());
    
    // Add sorted items back
    sortedItems.forEach(item => container.appendChild(item));

    // Update active button state
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
        if ((order === 'newest' && btn.textContent === 'Newest First') ||
            (order === 'oldest' && btn.textContent === 'Oldest First')) {
            btn.classList.add('active');
        }
    });
}

// Add some basic styles
const styles = `
<style>
    .filter-controls {
        margin: 20px 0;
        display: flex;
        gap: 10px;
        flex-wrap: wrap;
        justify-content: center;
    }
    
    .filter-btn {
        padding: 8px 16px;
        border: 1px solid #ccc;
        background: white;
        border-radius: 4px;
        cursor: pointer;
        transition: all 0.2s;
    }
    
    .filter-btn:hover {
        background: #f0f0f0;
    }
    
    .filter-btn.active {
        background: #007bff;
        color: white;
        border-color: #0056b3;
    }
</style>
`;

// Initialize everything when the page loads
document.addEventListener('DOMContentLoaded', () => {
    // Add the buttons and styles to the page
    const container = document.querySelector('.collection-container');
    if (container) {
        container.insertAdjacentHTML('beforebegin', filterButtons);
        document.head.insertAdjacentHTML('beforeend', styles);
        
        // Set initial state to show all and sort by newest
        filterByYear('all');
        sortByDate('newest');
    }
});