export const format12HourTime = (timestamp) => {
    const date = new Date(timestamp);
    const options = {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
    };

    return date.toLocaleTimeString('en-US', options);
    // return date.toLocaleDateString('en-US', options).replace(',', '') + ' ' + date.toLocaleTimeString('en-US', options);
};

export const USDCurrencyFormat = (amount) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(amount);
};

export const formatNumber = (number) => {
    return number.toFixed(2);
};


// export const capitalizeString = (str) => {
//     return str.charAt(0).toUpperCase() + str.slice(1);
// };