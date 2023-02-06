export default function isObjectEmpty(objectName) {
    return (
        Object.keys(objectName).length === 0 &&
        objectName.constructor === Object);
}
