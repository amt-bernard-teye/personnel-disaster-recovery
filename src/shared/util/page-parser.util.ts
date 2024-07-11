export function pageParser(page: string) {
    let parsedPage = +page;

    if (Number.isNaN(parsedPage)) {
        parsedPage = 0;
    }

    return parsedPage;
}