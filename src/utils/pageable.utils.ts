export class PageRequest {
    readonly pageNumber?: number;
    readonly pageSize: number;
    readonly sortBy?: Record<string, "desc" | "asc">;
    readonly skip?: number;
    readonly search?: string;

    constructor({
                    pageNumber = 1,
                    pageSize = 200,
                    sortBy = {"id": "desc"},
                    skip = (pageNumber * pageSize) - pageSize,
                    search = ""
                }:{
        pageNumber?: number,
        pageSize?: number,
        sortBy?: Record<string, "desc" | "asc">,
        skip?: number,
        search?: string
    }) {
        this.pageNumber = pageNumber;
        this.pageSize = pageSize;
        this.sortBy = sortBy;
        this.skip = skip;
        this.search = search;
    }
}
export class PageResponse<T> {
    readonly search?: string;
    readonly pageNumber?: number;
    readonly pageSize?: number;
    readonly pageCount?: number;
    readonly sortBy?: Record<string, "desc" | "asc">;
    readonly content: T[];

    constructor(pageRequest: PageRequest, content: T[], count: number) {
        this.search = pageRequest.search;
        this.pageNumber = pageRequest.pageNumber;
        this.pageSize = content.length < pageRequest.pageSize ? content.length : pageRequest.pageSize;
        this.pageCount = Math.ceil(count / (this.pageSize === 0 ? pageRequest.pageSize : this.pageSize));
        this.sortBy = pageRequest.sortBy;
        this.content = content;
    }
}

