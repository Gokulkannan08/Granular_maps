export const isObjectEmpty = (objectName: object) => {
    for (let prop in objectName) {
        if (objectName.hasOwnProperty(prop)) {
            return false;
        }
    }
    return true;
};