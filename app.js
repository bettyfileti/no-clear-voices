// Function to extract date from the "Collected on" text
function getDateFromElement(element) {
    // Find the paragraph containing the date
    const dateParagraph = element.querySelector('p');
    if (!dateParagraph) {
        console.log('Date paragraph not found in element:', element);
        return new Date(0);
    }

    // Extract date string (e.g., "Collected on May 06, 2023")
    const dateText = dateParagraph.textContent;
    const dateMatch = dateText.match(/Collected on (.+)/);
    
    console.log('Original date text:', dateText);
    
    if (dateMatch) {
        const dateStr = dateMatch[1];
        const parsedDate = new Date(dateStr);
        
        console.log('Parsed date:', parsedDate);
        
        // Check if the date is valid
        if (!isNaN(parsedDate.getTime())) {
            return parsedDate;
        }
    }
    
    // Return oldest possible date if parsing fails
    return new Date(0);
}

// Function to sort and reorder elements
function sortSoundItems() {
    // Get the container with the correct class name
    const container = document.querySelector('.collection-container');
    if (!container) {
        console.error('Container with class "collection-container" not found');
        return;
    }

    // Get all sound items and convert to array
    const items = Array.from(container.querySelectorAll('.sound-item'));
    console.log('Found items:', items.length);
    
    // Sort items by date, newest first
    const sortedItems = items.sort((a, b) => {
        const dateA = getDateFromElement(a);
        const dateB = getDateFromElement(b);
        
        console.log('Comparing dates:', dateA, dateB);
        
        return dateB - dateA;  // For newest first
    });
    
    // Remove existing items
    items.forEach(item => item.remove());
    
    // Add sorted items back to container
    sortedItems.forEach(item => container.appendChild(item));
    
    console.log('Sorting complete');
}

// Run the sorting when the page loads
document.addEventListener('DOMContentLoaded', sortSoundItems);