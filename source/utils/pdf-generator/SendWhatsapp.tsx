import { Component } from 'react';

class SendWhatsapp extends Component {
    accountSid = 'sua-account-sid'; // Substituir com valor real
    authToken = 'seu-auth-token'; // Substituir com valor real
    client = { messages: { create: (props: any) => { return { sid: 2 } } } } // require('twilio')(this.accountSid, this.authToken);

    send = (pdfAppointment: any) => {

        try {
            // Substituir 'SEU_NUMERO_DO_WHATSAPP' pelo número de telefone do destinatário
            const message = this.client.messages.create({
                from: 'whatsapp:+14155238886', // Este é um número de teste do Twilio
                body: pdfAppointment,
                to: 'whatsapp:+SEU_NUMERO_DO_WHATSAPP',
                mediaUrl: 'data:application/pdf;base64,' + pdfAppointment.toString('base64'),
            });

            console.log('Mensagem enviada com sucesso:', message.sid);
        } catch (error) {
            console.error('Erro ao enviar a mensagem:', error);
        }
    };
}

export default SendWhatsapp;