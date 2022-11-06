const sorting = (arraySort, arraySortedBy, sortedBy, callback) => {
    const arrayResult = [];
    arraySortedBy.sort(callback);
    arraySortedBy.forEach((element) => {
        arrayResult.push(arraySort.find((item) => item[sortedBy] === element));
    });

    return arrayResult;
};

export { sorting };
