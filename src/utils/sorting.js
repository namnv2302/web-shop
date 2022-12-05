const sorting = (arraySort, arraySortedBy, sortedBy, callback) => {
    const arrayResult = [];
    arraySortedBy.sort(callback);
    arraySortedBy.forEach((element) => {
        const findItem = arraySort.find((item) => item[sortedBy] === element);
        arraySort = arraySort.filter((item) => item.id !== findItem.id);
        arrayResult.push(findItem);
    });

    return arrayResult;
};

export { sorting };
