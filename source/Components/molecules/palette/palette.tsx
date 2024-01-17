import styles from './palette.module.scss'

const Colors = () => {
    return (
        <div className="bg-white grid grid-cols-1 p-2">
            <div className="col-span-1 flex ">
                <div className={styles['green-50']}>50</div>
                <div className={styles['green-100']}>100</div>
                <div className={styles['green-200']}>200</div>
                <div className={styles['green-300']}>300</div>
                <div className={styles['green-400']}>400</div>
                <div className={styles['green-500']}>Default-500</div>
                <div className={styles['green-600']}>600</div>
                <div className={styles['green-700']}>700</div>
                <div className={styles['green-800']}>800</div>
                <div className={styles['green-900']}>900</div>
            </div>

            <div className="col-span-1 flex">
                <div className={styles['orange-50']}>50</div>
                <div className={styles['orange-100']}>100</div>
                <div className={styles['orange-200']}>200</div>
                <div className={styles['orange-300']}>300</div>
                <div className={styles['orange-400']}>400</div>
                <div className={styles['orange-500']}>Default-500</div>
                <div className={styles['orange-600']}>600</div>
                <div className={styles['orange-700']}>700</div>
                <div className={styles['orange-800']}>800</div>
                <div className={styles['orange-900']}>900</div>
            </div>

            <div className="col-span-1 flex">
                <div className={styles['blue-50']}>50</div>
                <div className={styles['blue-100']}>100</div>
                <div className={styles['blue-200']}>200</div>
                <div className={styles['blue-300']}>300</div>
                <div className={styles['blue-400']}>400</div>
                <div className={styles['blue-500']}>Default-500</div>
                <div className={styles['blue-600']}>600</div>
                <div className={styles['blue-700']}>700</div>
                <div className={styles['blue-800']}>800</div>
                <div className={styles['blue-900']}>900</div>
            </div>
        </div>
    )
}

export default Colors
