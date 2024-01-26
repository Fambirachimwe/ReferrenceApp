

// let reportNumberCount = 0  // this should be saved in the database 


export function generateGeneralReportNumber(department, reportNumberCount) {
    // Ensure reportNumber is a valid number
    reportNumberCount = parseInt(reportNumberCount) + 1;
    if (isNaN(reportNumberCount)) {
        throw new Error("Report Number must be a valid number.");
    }

    // Get the current year
    const currentYear = new Date().getFullYear();



    // Ensure department is provided
    if (!department || typeof department !== "string") {
        throw new Error("Department must be a valid string.");
    }

    // Format the report number
    const formattedReportNumber = reportNumberCount.toString().padStart(2, "0");

    // Generate and return the reference number
    return `RPT-${department}-${currentYear}-${formattedReportNumber}`;
}

export function generateProjectReportNumber(projectNumber, reportNumberCount) {
    // Ensure reportNumber is a valid number
    reportNumberCount = parseInt(reportNumberCount) + 1;
    if (isNaN(reportNumberCount)) {
        throw new Error("Report Number must be a valid number.");
    }

    // Get the current year
    const currentYear = new Date().getFullYear();


    // Ensure department is provided
    // if (!projectNumber || typeof projectNumber !== "string") {
    //     throw new Error("Department must be a valid string.");
    // }

    // Format the report number
    const formattedReportNumber = reportNumberCount.toString().padStart(2, "0");

    // Generate and return the reference number
    return `RPT-${projectNumber}-${currentYear}-${formattedReportNumber}`;
}



// letters

const getInitials = (fullName) => {
    // Split the full name into individual words
    const words = fullName?.split(' ');
    // Get the first letter of each word and convert to uppercase
    const initials = words?.map(word => word.charAt(0).toUpperCase());
    // Join the initials into a single string
    return initials.join('');
}

export function generateGeneralLetterNumber(department, reportNumberCount, createdBy) {
    // Ensure reportNumber is a valid number
    reportNumberCount = parseInt(reportNumberCount) + 1;
    if (isNaN(reportNumberCount)) {
        throw new Error("Letter Number must be a valid number.");
    }



    // Format the report number
    const formattedReportNumber = reportNumberCount.toString().padStart(2, "0");

    // Generate and return the reference number

    // L-[initials]-[Dpt]-[No]
    return `L-${getInitials(createdBy)}-${department}-${formattedReportNumber}`;
}

export function generateProjectLetterNumber(projectNumber, reportNumberCount, createdBy) {
    // Ensure reportNumber is a valid number
    reportNumberCount = parseInt(reportNumberCount) + 1;
    if (isNaN(reportNumberCount)) {
        throw new Error("Letter Number must be a valid number.");
    }



    // Format the report number
    const formattedReportNumber = reportNumberCount.toString().padStart(2, "0");

    // Generate and return the reference number
    // L-[initials]-[Proj]-[No]
    return `L-${getInitials(createdBy)}-${projectNumber}-${formattedReportNumber}`;
}