import Link from 'next/link';

const Pagination = () => {
    return (
        <div className="row g-0 text-center text-sm-start align-items-center mb-3">
            <div className="col-sm-6">
                <div>
                    <p className="mb-sm-0">Showing 1 to 10 of 12 entries</p>
                </div>
            </div>
            <div className="col-sm-6">
                <ul className="pagination pagination-separated justify-content-center justify-content-sm-end mb-sm-0">
                    <li className="page-item disabled">
                        {' '}
                        <Link href="#" className="page-link">
                            <i className="mdi mdi-chevron-left" />
                        </Link>{' '}
                    </li>
                    <li className="page-item active">
                        {' '}
                        <Link href="#" className="page-link">
                            1
                        </Link>{' '}
                    </li>
                    <li className="page-item">
                        {' '}
                        <Link href="#" className="page-link">
                            2
                        </Link>{' '}
                    </li>
                    <li className="page-item">
                        {' '}
                        <Link href="#" className="page-link">
                            3
                        </Link>{' '}
                    </li>
                    <li className="page-item">
                        {' '}
                        <Link href="#" className="page-link">
                            4
                        </Link>{' '}
                    </li>
                    <li className="page-item">
                        {' '}
                        <Link href="#" className="page-link">
                            5
                        </Link>{' '}
                    </li>
                    <li className="page-item">
                        {' '}
                        <Link href="#" className="page-link">
                            <i className="mdi mdi-chevron-right" />
                        </Link>{' '}
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Pagination;
