
export function debounce(func, delay = 500) {
    let timeout;
    
    return function(...args) {
        if (timeout) {
            clearTimeout(timeout);
        }
        timeout = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
}