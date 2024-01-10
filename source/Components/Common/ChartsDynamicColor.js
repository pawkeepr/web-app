const getChartColorsArray = (colors) => {
    colors = JSON.parse(colors)
    return colors.map((value) => {
        const newValue = value.replace(' ', '')
        if (newValue.indexOf(',') === -1) {
            let color = getComputedStyle(document.documentElement).getPropertyValue(
                newValue,
            )

            if (color.indexOf('#') !== -1) color = color.replace(' ', '')
            if (color) return color
            return newValue
        }
        const val = value.split(',')
        if (val.length === 2) {
            let rgbaColor = getComputedStyle(
                document.documentElement,
            ).getPropertyValue(val[0])
            rgbaColor = `rgba(${rgbaColor},${val[1]})`
            return rgbaColor
        }
        return newValue
    })
}

export default getChartColorsArray
