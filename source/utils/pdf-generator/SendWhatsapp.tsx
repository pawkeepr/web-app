import { Component } from 'react';
import axios from 'axios';

class SendWhatsapp extends Component {
    accountSid = 'sua-account-sid'; // Substituir com valor real
    authToken = 'seu-auth-token'; // Substituir com valor real
    // client =  require('twilio')(this.accountSid, this.authToken);

    send = (pdfAppointment: any) => {
        axios.create({
            baseURL: "/2010-04-01/Accounts/ACb33f50f8531ffd88ddace8c7a84c10d7/Messages/SM4668463cf786f5123705e3675c00f8aa.json",
            auth: {
                username: this.accountSid,
                password: this.authToken,
            },
            headers: {
                from: 'whatsapp:+14155238886', // Este é um número de teste do Twilio
                body: pdfAppointment,
                to: 'whatsapp:+557996733389',
            }
        });
    };
}

export default SendWhatsapp;