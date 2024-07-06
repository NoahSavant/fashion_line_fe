import * as jwt_decode from 'jwt-decode';

export const getIds = (data) => {
    if(!data) return [];
    const ids = data.map(element => element.id);
    return ids;
}

export const fillNullValues = (data, fillValue) => {
    if (Array.isArray(data)) {
        return data.map(item => fillNullValues(item, fillValue));
    } else if (data !== null && typeof(data) === 'object') {
        return Object.fromEntries(
            Object.entries(data).map(([key, value]) => [key, fillNullValues(value, fillValue)])
        );
    } else {
        return data !== null ? data : fillValue;
    }
};

export const updateData = (newData, oldData, setData) => {
    const result = { ...oldData };

    for (const key in newData) {
        if (oldData.hasOwnProperty(key)) {
            result[key] = newData[key];
        }
    }
    setData(result);

    return result;
};

export const decodeToken = (jwtCode) => {
    try {
        const decodedToken = jwt_decode.jwtDecode(jwtCode);
        return decodedToken;
    } catch (error) {
        return null;
    }
};

export const checkObjectEmpty = (obj) => {
    return Object.keys(obj).length === 0
}

export const jsonToObject = (data) => {
    return JSON.parse(JSON.stringify(data));
}

export const calculateReadingTime = (content) => {
    const wordsPerMinute = 200; 
    const words = content.split(/\s+/).length; 
    const readingTimeMinutes = words / wordsPerMinute; 

    return formatReadingTime(readingTimeMinutes);
};

export const formatReadingTime = (minutes) => {
    if (minutes < 1) {
        const seconds = Math.ceil(minutes * 60);
        return `1 phút`;
    }

    const hours = Math.floor(minutes / 60);
    const remainingMinutes = Math.floor(minutes % 60);
    const days = Math.floor(hours / 24);
    const remainingHours = hours % 24;

    let formattedTime = '';

    if (days > 0) {
        formattedTime += `${days} giờ `;
    }
    if (remainingHours > 0) {
        formattedTime += `${remainingHours} phút `;
    }
    if (remainingMinutes > 0) {
        formattedTime += `${remainingMinutes} giây`;
    }

    return formattedTime.trim();
};
