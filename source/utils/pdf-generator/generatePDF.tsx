import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { IAppointmentVet } from '~/store/slices/appointment-vet/types';



export const generatePDF = async (appointment: IAppointmentVet) => {
    pdfMake.vfs = pdfFonts.pdfMake.vfs;

   

    // const dadosVeterinario = {
    //     nome: 'Dr. Veterinário',
    //     especialidade: 'Especialidade Veterinária',
    //     telefone: '123-456-789',
    //     email: 'veterinario@example.com',
    //     // logo: '' // Insira o link para a imagem da logo aqui
    //   };
      
    //   const dadosConsulta = {
    //     nomePet: 'Nome do Pet',
    //     especie: 'Espécie do Pet',
    //     raça: 'Raça do Pet',
    //     sexo: 'Sexo do Pet',
    //     dataNascimento: '01/01/2020',
    //     tutor: {
    //       nome: 'Nome do Tutor',
    //       endereco: 'Endereço do Tutor',
    //       telefone: '987-654-321',
    //       email: 'tutor@example.com'
    //     }
    //   };
      
   // Criando o documento PDF
const docDefinition = {
    header: {
      columns: [
        // { 
        // image: 'sampleImage.jpg',
        // width: 150,
        // opacity: 0.5,
        // alignment: 'right' }, // Logo da clínica à direita
      ],
      margin: [0, 0, 0, 0] // Margem: superior, direita, inferior, esquerda
    },
    content: [
        { text: 'Consulta Veterinária', style: 'header', alignment: 'center', bold: true, fontSize: 16, margin: [0, 0, 0, 20] }, // Subheader 'Consulta Veterinária'
        {
            table: {
            widths: ['33%', '33%', '33%'], // Distribuição igual de largura para as três colunas
            styles: {
                subheader: {
                  fontSize: 18,
                  bold: true,
                  margin: [0, 0, 0, 0] // Margem: superior, direita, inferior, esquerda
                }
              },
            body: [
              [
                { text: 'Informações do Pet', bold: true, margin: [0, 0, 0, 5], fontSize: 13 },
                { text: 'Informações do Tutor', bold: true, margin: [0, 0, 0, 5], fontSize: 13 },
                { text: 'Informações do Veterinário', bold: true, margin: [0, 0, 0, 5], fontSize: 13 }
              ],
              [
                {
                    text: `Nome: ${appointment?.pet_data.name_pet}\nEspécie: ${appointment?.pet_data.specie}\nRaça: ${appointment?.pet_data.race}\nSexo: ${appointment?.pet_data.sex}\nNascimento: ${appointment?.pet_data.date_birth}`,
                    fontSize: 11 // Definindo tamanho da fonte para as informações do Pet
                  },
                [
                  { text: `Nome: ${appointment.tutor_data.name}\nEndereço: ${appointment.tutor_data.city +'-'+ appointment.tutor_data.state}\nTelefone: ${appointment.tutor_data.phone}\nEmail: ${appointment.tutor_data.email}\n`, alignment: 'left', fontSize: 11 }
                ],
                [
                  { text: `Nome: ${appointment.vet_data.name}\nTelefone: ${appointment.vet_data.phone}\nEmail: ${appointment.vet_data.email}\n`, alignment: 'left', fontSize: 11  }
                ]
              ]
            ],
          },
          layout: 'noBorders',
        },
        
      ]
  };
  
  // Gerando o PDF
  const pdfDoc = pdfMake.createPdf(docDefinition);
  
  // Visualizando o PDF (substitua esta parte com o método correto para seu ambiente)
  pdfDoc.open();
}