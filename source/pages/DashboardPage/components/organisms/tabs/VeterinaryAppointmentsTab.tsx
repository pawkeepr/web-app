import React from 'react';
import Row from 'react-bootstrap/Row';
import ModalAddTutor from '~/Components/modals/modal-add-tutor';
import SearchInput from '~/Components/molecules/search-input/search-input';

const VeterinaryAppointmentsTab = () => {

    return (
        <React.Fragment>
            <Row className="g-4 mb-3">
                <div className="col-sm">
                    <SearchInput className="form-control" placeholder='Busque a Consulta...' />
                </div>
                <div className="col-sm-auto">
                    <ModalAddTutor />
                </div>
            </Row>
            <div className="team-list list-view-filter">

            </div>

        </React.Fragment>
    );
};

export default VeterinaryAppointmentsTab;