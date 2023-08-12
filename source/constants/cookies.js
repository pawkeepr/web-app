const optionsCookies = {
    token: {
        name: 'pawkeepr.token',
        expires: 60 * 60 * 1, // 1 hour
    },
    remember: {
        name: 'pawkeepr.remember',
        expires: 60 * 60 * 24 * 30 * 12 * 10, // 10 years
    },
    layoutMode: {
        name: 'pawkeepr.layout-mode',
        expires: 60 * 60 * 24 * 30 * 12 * 10, // 10 years
    }
}

export default optionsCookies