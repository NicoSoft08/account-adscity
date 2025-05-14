
export const formatDate = (timestamp) => {
    if (timestamp && timestamp._seconds) {
        const date = new Date(timestamp._seconds * 1000); // Convert to milliseconds
        let formattedDate = date.toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' });

        // Capitalize the first letter
        return formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
    }
    return '';
};