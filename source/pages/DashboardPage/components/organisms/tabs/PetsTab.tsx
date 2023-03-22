import React from 'react';
import Row from 'react-bootstrap/Row';
import ModalAddTutor from '~/Components/modals/modal-add-tutor/modal-add-tutor';
import CardTutors from '~/Components/molecules/card-tutors/card-tutors';

const PetsTab = () => {

    return (
        <React.Fragment>
            <Row className="g-4 mb-3">
                <div className="col-sm">
                    <div className="d-flex">
                        <div className="search-box me-2">
                            <input type="text" className="form-control" placeholder="Search member..." />
                            <i className="ri-search-line search-icon"></i>
                        </div>
                    </div>
                </div>
                <div className="col-sm-auto">
                    <ModalAddTutor />
                </div>
            </Row>
            <div className="team-list list-view-filter">
                <CardTutors />
            </div>

        </React.Fragment>
    );
};

export default PetsTab;