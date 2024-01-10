type Generic = {
    [key: string]: any
    id: string
    active: boolean
}

export const toggleStatus = (
    id: string,
    actives: Array<Generic>,
    inatives: Array<Generic>,
) => {
    const indexActivate = actives.findIndex((item) => item.id?.toString() === id)
    const indexInactivate = inatives.findIndex((item) => item.id?.toString() === id)

    if (indexActivate !== -1) {
        actives[indexActivate].active = !actives[indexActivate].active
        inatives.push(actives[indexActivate])
        actives.splice(indexActivate, 1)
    }

    if (indexInactivate !== -1) {
        inatives[indexInactivate].active = !inatives[indexInactivate].active
        actives.push(inatives[indexInactivate])
        inatives.splice(indexInactivate, 1)
    }
}
