import Link from 'next/link'

import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'

const ProfessionalExperience = () => {
    const currentYear = new Date().getFullYear()
    const listOfYears = Array.from(
        { length: 100 },
        (_, index) => currentYear - index,
    )
    return (
        <Form>
            <div id="newlink">
                <div id="1">
                    <Row>
                        <Col lg={6}>
                            <div className="mb-3">
                                <Form.Label
                                    htmlFor="jobTitle"
                                    className="form-label"
                                >
                                    Título
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    className="form-control"
                                    id="jobTitle"
                                    placeholder=""
                                    defaultValue=""
                                />
                            </div>
                        </Col>

                        <Col lg={6}>
                            <div className="mb-3">
                                <Form.Label
                                    htmlFor="companyName"
                                    className="form-label"
                                >
                                    Nome da empresa
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    className="form-control"
                                    id="companyName"
                                    placeholder=""
                                />
                            </div>
                        </Col>

                        <Col>
                            <Row>
                                <Col lg={6}>
                                    <div className="mb-3">
                                        <Form.Label
                                            htmlFor="experienceYear"
                                            className="form-label"
                                        >
                                            Início
                                        </Form.Label>
                                        <Row>
                                            <Col lg={5} widths={['xs']}>
                                                <Form.Select
                                                    className="form-control"
                                                    data-choices
                                                    data-choices-search-false
                                                    name="experienceYear"
                                                    id="experienceYear"
                                                    defaultValue=""
                                                >
                                                    <option value="">Mês</option>
                                                    <option value="1">
                                                        Janeiro
                                                    </option>
                                                    <option value="2">
                                                        Fevereiro
                                                    </option>
                                                    <option value="3">Março</option>
                                                    <option value="4">Abril</option>
                                                    <option value="5">Maio</option>
                                                    <option value="6">Junho</option>
                                                    <option value="7">Julho</option>
                                                    <option value="8">
                                                        Agosto
                                                    </option>
                                                    <option value="9">
                                                        Setembro
                                                    </option>
                                                    <option value="10">
                                                        Outubro
                                                    </option>
                                                    <option value="11">
                                                        Novembro
                                                    </option>
                                                    <option value="12">
                                                        Dezembro
                                                    </option>
                                                </Form.Select>
                                            </Col>

                                            <div className="col-auto align-self-center">
                                                de
                                            </div>

                                            <Col lg={5} widths={['xs']}>
                                                <Form.Select
                                                    className="form-control"
                                                    data-choices
                                                    data-choices-search-false
                                                    name="choices-single-default2"
                                                    defaultValue=""
                                                >
                                                    <option value="">Ano</option>
                                                    {listOfYears?.map((year) => (
                                                        <option
                                                            key={year}
                                                            value={year}
                                                        >
                                                            {year}
                                                        </option>
                                                    ))}
                                                </Form.Select>
                                            </Col>
                                        </Row>
                                    </div>
                                </Col>

                                <Col lg={6}>
                                    <div className="mb-3">
                                        <Form.Label
                                            htmlFor="experienceYear"
                                            className="form-label"
                                        >
                                            Término
                                        </Form.Label>
                                        <Row>
                                            <Col lg={5} widths={['xs']}>
                                                <Form.Select
                                                    className="form-control"
                                                    data-choices
                                                    data-choices-search-false
                                                    name="experienceYear"
                                                    id="experienceYear"
                                                    defaultValue=""
                                                >
                                                    <option value="">Mês</option>
                                                    <option value="1">
                                                        Janeiro
                                                    </option>
                                                    <option value="2">
                                                        Fevereiro
                                                    </option>
                                                    <option value="3">Março</option>
                                                    <option value="4">Abril</option>
                                                    <option value="5">Maio</option>
                                                    <option value="6">Junho</option>
                                                    <option value="7">Julho</option>
                                                    <option value="8">
                                                        Agosto
                                                    </option>
                                                    <option value="9">
                                                        Setembro
                                                    </option>
                                                    <option value="10">
                                                        Outubro
                                                    </option>
                                                    <option value="11">
                                                        Novembro
                                                    </option>
                                                    <option value="12">
                                                        Dezembro
                                                    </option>
                                                </Form.Select>
                                            </Col>

                                            <div className="col-auto align-self-center">
                                                de
                                            </div>

                                            <Col lg={5} widths={['xs']}>
                                                <Form.Select
                                                    className="form-control"
                                                    data-choices
                                                    data-choices-search-false
                                                    name="choices-single-default2"
                                                >
                                                    <option value="">Ano</option>
                                                    {listOfYears?.map((year) => (
                                                        <option
                                                            key={year}
                                                            value={year}
                                                        >
                                                            {year}
                                                        </option>
                                                    ))}
                                                </Form.Select>
                                            </Col>
                                        </Row>
                                    </div>
                                </Col>
                            </Row>
                        </Col>

                        <Col lg={12}>
                            <div className="mb-3">
                                <Form.Label
                                    htmlFor="jobDescription"
                                    className="form-label"
                                >
                                    Descrição
                                </Form.Label>
                                <Form.Control
                                    as="textarea"
                                    className="form-control"
                                    id="jobDescription"
                                    rows={3}
                                    placeholder="crie uma breve descrição sobre o cargo"
                                />
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
            <div id="newForm" style={{ display: 'none' }} />

            <Col lg={12}>
                <div className="hstack gap-2">
                    <button type="submit" className="btn btn-success">
                        Atualizar
                    </button>
                    <Link href="#" className="btn btn-primary">
                        Adicionar
                    </Link>
                </div>
            </Col>
        </Form>
    )
}

export default ProfessionalExperience
