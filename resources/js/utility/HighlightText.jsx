// Helper function to highlight occurrences of searchQuery in the title
export const highlightSearchQuery = (title, searchQuery) => {
    // Ensure that the input is a string; if not, return the original title
    if (typeof title !== 'string') {
      return title;
    }

    // Use a regular expression with global (g) and case-insensitive (i) flags
    const regex = new RegExp(searchQuery, 'gi');

    // Use the replace() method to replace occurrences with highlighted version
    return title.replace(regex, (match) => `<span class="text-yellow-300 bg-slate-800">${match}</span>`);
  };
