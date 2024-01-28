import _ from 'lodash'

export function findDifferences(
    object1: Record<string, unknown>,
    object2: Record<string, unknown>,
) {
    // Find properties in object1 that are different from object2
    const differences1 = _.omitBy(object1, (value, key) => {
        return _.isEqual(value, object2[key])
    })

    // Find properties in object2 that are different from object1
    const differences2 = _.omitBy(object2, (value, key) => {
        return _.isEqual(value, object1[key])
    })

    // Combine differences from both objects
    const combinedDifferences = _.merge(differences1, differences2)

    return combinedDifferences
}
