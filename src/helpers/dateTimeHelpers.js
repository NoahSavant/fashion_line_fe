export const getDataTimeFormat = (dateTime) => {
    if(!dateTime) return '';
    const dateObject = getDateTimeZone(dateTime);
    const formattedDateTime = `${dateObject.getMonth() + 1}/${dateObject.getDate()}/${dateObject.getFullYear()} ${dateObject.getHours()}:${String(dateObject.getMinutes()).padStart(2, '0')}:${String(dateObject.getSeconds()).padStart(2, '0')}`;
    return formattedDateTime;
};

export const stringToDate = (dateString) => {
    const formattedDateString = dateString.replace(' ', 'T');
    const dateObject = new Date(formattedDateString);
    return dateObject;
}

export const getDateTimeZone = (dateString) => {
    const utcDate = new Date(dateString);
    const offset = 7 *60; 
    const timeZoneDate = new Date(utcDate.getTime() + (offset * 60 * 1000));
    return timeZoneDate;
}

export const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    // const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const month = date.getMonth(); 
    const day = date.getDate(); 
    const year = date.getFullYear();

    return `Tháng ${month + 1} ${day}, ${year}`;
};
