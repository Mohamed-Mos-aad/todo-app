import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"

const ELLIPSIS_TOKEN = "ellipsis";

const buildPageHref = (page: number) => {
    return page <= 1 ? "/" : `/?page=${page}`;
}

const getVisiblePages = (currentPage: number, totalPages: number) => {
    if (totalPages <= 5) {
        return Array.from({ length: totalPages }, (_, index) => index + 1);
    }

    const pages: Array<number | typeof ELLIPSIS_TOKEN> = [];
    const start = Math.max(1, currentPage - 1);
    const end = Math.min(totalPages, currentPage + 1);

    if (start > 1) {
        pages.push(1);
    }

    if (start > 2) {
        pages.push(ELLIPSIS_TOKEN);
    }

    for (let page = start; page <= end; page += 1) {
        pages.push(page);
    }

    if (end < totalPages - 1) {
        pages.push(ELLIPSIS_TOKEN);
    }

    if (end < totalPages) {
        pages.push(totalPages);
    }

    return pages;
}

export function PaginationDemo({
    currentPage,
    totalPages,
}: {
    currentPage: number;
    totalPages: number;
}) {
    const previousPage = currentPage - 1;
    const nextPage = currentPage + 1;
    const visiblePages = getVisiblePages(currentPage, totalPages);

    return (
        <Pagination className="flex justify-end">
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious
                        href={buildPageHref(previousPage)}
                        className={currentPage <= 1 ? "pointer-events-none opacity-50" : undefined}
                    />
                </PaginationItem>

                {visiblePages.map((page, index) => {
                    if (page === ELLIPSIS_TOKEN) {
                        return (
                            <PaginationItem key={`${ELLIPSIS_TOKEN}-${index}`}>
                                <PaginationEllipsis />
                            </PaginationItem>
                        );
                    }

                    return (
                        <PaginationItem key={page}>
                            <PaginationLink href={buildPageHref(page)} isActive={currentPage === page}>
                                {page}
                            </PaginationLink>
                        </PaginationItem>
                    );
                })}

                <PaginationItem>
                    <PaginationNext
                        href={buildPageHref(nextPage)}
                        className={currentPage >= totalPages ? "pointer-events-none opacity-50" : undefined}
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    )
}
