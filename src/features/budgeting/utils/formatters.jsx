export function formatCurrencyWithMaxFigures(value, maxFigures) {
    const absValue = Math.abs(value);
    const sign = value < 0 ? '-' : '';

    if (absValue < Math.pow(10, maxFigures)) {
        return currencyFormatter.format(value);
    }

    let shortenedValue = absValue;
    let suffix;

    if (absValue >= 1e12) {
        shortenedValue = absValue / 1e12;
        suffix = 'T';
    } else if (absValue >= 1e9) {
        shortenedValue = absValue / 1e9;
        suffix = 'B';
    } else if (absValue >= 1e6) {
        shortenedValue = absValue / 1e6;
        suffix = 'M';
    } else if (absValue >= 1e3) {
        shortenedValue = absValue / 1e3;
        suffix = 'k';
    }

    // Since we check the num figures before rounding, there's an edge case where
    // we exceed max figures after rounding
    // Eg: 999,999 (in the k range), rounds to 1000.0k not 1.0M
    if (Math.round(shortenedValue) >= 1e3) {
        shortenedValue = shortenedValue / 1e3;

        switch (suffix) {
            case 'k':
                suffix = 'M'
                break;
            case 'M':
                suffix = 'B'
                break;
            case 'B':
                suffix = 'T'
                break;
        }
    }

    return `${sign}$${shortenedValue.toFixed(1)}${suffix}`;
};

export const currencyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
})


export function formatMonthYear(date) {
    const year = date.getFullYear();
    const month = date.getMonth(); // Month index (0-11)

    // Create a new Date object with the same year and month
    const monthDate = new Date(year, month);

    // Format the month using the Intl.DateTimeFormat object
    const monthFormatter = new Intl.DateTimeFormat('en-US', { month: 'long' });
    const formattedMonth = monthFormatter.format(monthDate);

    // Format the year to a two-digit format
    const formattedYear = `'${year.toString().slice(-2)}`;

    // Combine the formatted month and year
    return `${formattedMonth} ${formattedYear}`;
}
