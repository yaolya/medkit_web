import {useMemo} from "react";

export const useSortedPosts = (medicaments, sort) => {
    const sortedPosts = useMemo(() => {
        if(sort) {
            return [...medicaments].sort((a, b) => a[sort].localeCompare(b[sort]))
        }
        return medicaments;
    }, [sort, medicaments])

    return sortedPosts;
}

export const usePosts = (medicaments, sort, query) => {
    const sortedPosts = useSortedPosts(medicaments, sort);

    const sortedAndSearchedPosts = useMemo(() => {
        return sortedPosts.filter(medicament => medicament.name.toLowerCase().includes(query.toLowerCase()))
    }, [query, sortedPosts])

    return sortedAndSearchedPosts;
}