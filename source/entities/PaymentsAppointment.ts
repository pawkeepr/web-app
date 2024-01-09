import { GenericObject } from '~/store/helpers/types';
import { IPaymentsAppointment } from '~/store/slices/appointment-vet/types';

type PaymentAppointmentProps = IPaymentsAppointment;

class PaymentAppointment implements PaymentAppointmentProps {
    form_payment: string;
    value_payment: string;
    coin: string;
    number_installments: string;
    status_payment: string;
    date_payment: string;

    private constructor() {
        this.form_payment = '';
        this.value_payment = '';
        this.coin = '';
        this.number_installments = '';
        this.status_payment = '';
        this.date_payment = '';
    }

    defineFormPayment(form_payment: string): PaymentAppointment {
        this.form_payment = form_payment;
        return this;
    }

    defineValuePayment(value_payment: string): PaymentAppointment {
        this.value_payment = value_payment;
        return this;
    }

    defineCoin(coin: string): PaymentAppointment {
        this.coin = coin;
        return this;
    }

    defineNumberInstallments(
        number_installments: string | GenericObject,
    ): PaymentAppointment {
        this.number_installments =
            typeof number_installments === 'object'
                ? number_installments.value
                : number_installments;
        return this;
    }

    defineStatusPayment(status_payment: string): PaymentAppointment {
        this.status_payment = status_payment;
        return this;
    }

    defineDatePayment(date_payment: string): PaymentAppointment {
        this.date_payment = date_payment;
        return this;
    }

    static build(props: PaymentAppointmentProps): PaymentAppointment {
        const entity = new PaymentAppointment();

        return entity
            .defineFormPayment(props.form_payment)
            .defineValuePayment(props.value_payment)
            .defineCoin(props.coin)
            .defineNumberInstallments(props.number_installments)
            .defineStatusPayment(props.status_payment)
            .defineDatePayment(props.date_payment);
    }
}

export default PaymentAppointment;
