const ExamsTypes = {
    hematology: 'hematology',
    biochemistry: 'biochemistry',
    parasitology: 'parasitology',
    immunology: 'immunology',
    urinalysis: 'urinalysis',
    lesion_location: 'lesion location',
    ultrasound_radiology: 'ultrasound/radiology',
    lesion_description: 'lesion description',
} as const

export type KeyOfExamsTypes = keyof typeof ExamsTypes
export type Exams = {
    id: number
    exam: string
    type: keyof typeof ExamsTypes
}

export const exams: Exams[] = [
    // Hematologia
    { id: 1, exam: 'Hemograma Completo', type: 'hematology' },
    { id: 2, exam: 'Leucograma', type: 'hematology' },
    { id: 3, exam: 'Fibrinogênio', type: 'hematology' },
    { id: 4, exam: 'T3 e T4 Total', type: 'hematology' },
    { id: 5, exam: 'Exame diferencial de leucócitos', type: 'hematology' },
    { id: 6, exam: 'Contagem de reticulócitos', type: 'hematology' },
    { id: 7, exam: 'Eritrograma', type: 'hematology' },
    { id: 8, exam: 'Cortisol Basal', type: 'hematology' },
    { id: 9, exam: 'Tempo de coagulação', type: 'hematology' },
    { id: 10, exam: 'Pesquisa de célula L. E.', type: 'hematology' },
    { id: 11, exam: 'Pesquisa de leishmania', type: 'hematology' },
    { id: 12, exam: 'T4 livre pós Diálise', type: 'hematology' },
    { id: 13, exam: 'Contagem Plaquetas', type: 'hematology' },
    { id: 14, exam: 'Hemoglobina', type: 'hematology' },
    { id: 15, exam: 'Pesquisa de Parasitas', type: 'hematology' },
    { id: 16, exam: 'TSH quimioluminescência', type: 'hematology' },

    // Bioquímica
    { id: 17, exam: 'Ácido Úrico', type: 'biochemistry' },
    { id: 18, exam: 'Albumina', type: 'biochemistry' },
    { id: 19, exam: 'ALT/TGP', type: 'biochemistry' },
    { id: 20, exam: 'Amilase', type: 'biochemistry' },
    { id: 21, exam: 'Colesterol LDL', type: 'biochemistry' },
    { id: 22, exam: 'Colesterol Total', type: 'biochemistry' },
    { id: 23, exam: 'Creatinina Alcalina', type: 'biochemistry' },
    { id: 24, exam: 'Ferro', type: 'biochemistry' },
    { id: 25, exam: 'Fosfatase alcalina', type: 'biochemistry' },
    { id: 26, exam: 'Fosfato', type: 'biochemistry' },
    { id: 27, exam: 'LDM', type: 'biochemistry' },
    { id: 28, exam: 'Lipase', type: 'biochemistry' },
    { id: 29, exam: 'Magnésio', type: 'biochemistry' },
    { id: 30, exam: 'Potássio', type: 'biochemistry' },
    { id: 31, exam: 'Proteína Total', type: 'biochemistry' },
    { id: 32, exam: 'Sódio', type: 'biochemistry' },
    { id: 33, exam: 'Triglicerídeos', type: 'biochemistry' },
    { id: 34, exam: 'Ureia', type: 'biochemistry' },
    { id: 35, exam: 'Cálcio Total', type: 'biochemistry' },
    { id: 36, exam: 'Cálcio Iônico', type: 'biochemistry' },
    { id: 37, exam: 'AST/TGO', type: 'biochemistry' },
    { id: 38, exam: 'Bilirrubina total e frações', type: 'biochemistry' },
    { id: 39, exam: 'GGT', type: 'biochemistry' },
    { id: 40, exam: 'Glicose', type: 'biochemistry' },
    { id: 41, exam: 'CK', type: 'biochemistry' },
    { id: 42, exam: 'Colesterol HDL', type: 'biochemistry' },
    { id: 43, exam: 'Ácido Biliares', type: 'biochemistry' },
    { id: 44, exam: 'PTF', type: 'biochemistry' },

    // Parasitologia
    { id: 45, exam: 'Coproparasitológico completo', type: 'parasitology' },
    { id: 46, exam: 'Coproparasitológico seriado', type: 'parasitology' },
    { id: 47, exam: 'Pesquisa de ovos', type: 'parasitology' },
    { id: 48, exam: 'Pesquisa de coccídeos', type: 'parasitology' },
    { id: 49, exam: 'OPG', type: 'parasitology' },
    { id: 50, exam: 'Pesquisa de microfilárias', type: 'parasitology' },
    { id: 51, exam: 'Pesquisa de giárdia', type: 'parasitology' },
    { id: 52, exam: 'Pesquisa de sangue oculto', type: 'parasitology' },
    { id: 53, exam: 'Coprocultura', type: 'parasitology' },

    // Imunologia
    { id: 54, exam: 'Babesia Canis IgG', type: 'immunology' },
    { id: 55, exam: 'Brucelose Canina', type: 'immunology' },
    { id: 56, exam: 'Cinomose - Antígeno', type: 'immunology' },
    { id: 57, exam: 'Cinomose IgM anticorpos', type: 'immunology' },
    { id: 58, exam: 'Coronavírus Felino (PIF)', type: 'immunology' },
    { id: 59, exam: 'Dirofilariose', type: 'immunology' },
    { id: 60, exam: 'Ehrlichia Canis', type: 'immunology' },
    { id: 61, exam: 'Erliquiose', type: 'immunology' },
    { id: 62, exam: 'Fator Reumatoide Canino', type: 'immunology' },
    { id: 63, exam: 'FIV/FELV', type: 'immunology' },
    { id: 64, exam: 'Leishmaniose Canina', type: 'immunology' },
    { id: 65, exam: 'Leptospirose', type: 'immunology' },
    { id: 66, exam: 'Lyme', type: 'immunology' },
    { id: 67, exam: 'Neospora', type: 'immunology' },
    { id: 68, exam: 'Toxoplasmose IgG Cães', type: 'immunology' },
    { id: 69, exam: 'Toxoplasmose IgG Gatos', type: 'immunology' },

    // Urinálise
    { id: 70, exam: 'Urinálise Completo', type: 'urinalysis' },
    { id: 71, exam: 'Densidade Urinária', type: 'urinalysis' },
    { id: 72, exam: 'Sedimentoscopia', type: 'urinalysis' },
    { id: 73, exam: 'Exame Físico-Químico', type: 'urinalysis' },
    { id: 74, exam: 'Qualificação de cálculos', type: 'urinalysis' },
    { id: 75, exam: 'OEA’s', type: 'urinalysis' },
    { id: 76, exam: 'Creatinina Urinário', type: 'urinalysis' },
    { id: 77, exam: 'Cortisol Urinário', type: 'urinalysis' },
    { id: 78, exam: 'Pesquisa de Mioglobina', type: 'urinalysis' },
    { id: 79, exam: 'Creatinina (UPC)', type: 'urinalysis' },

    // Local da Lesão
    { id: 80, exam: 'Abdome', type: 'lesion_location' },
    { id: 81, exam: 'Tórax', type: 'lesion_location' },
    { id: 82, exam: 'Membros', type: 'lesion_location' },
    { id: 83, exam: 'Crânio', type: 'lesion_location' },
    { id: 84, exam: 'Coluna', type: 'lesion_location' },

    // Ultrassonografia / Radiologia
    { id: 85, exam: 'Ultrassonografia Abdominal', type: 'ultrasound_radiology' },
    { id: 86, exam: 'Radiografia Tórax', type: 'ultrasound_radiology' },
    { id: 87, exam: 'Radiografia Membros', type: 'ultrasound_radiology' },
    { id: 88, exam: 'Radiografia Crânio', type: 'ultrasound_radiology' },
    { id: 89, exam: 'Radiografia Coluna', type: 'ultrasound_radiology' },
    { id: 90, exam: 'Mielografia', type: 'ultrasound_radiology' },
    { id: 91, exam: 'Cistografia', type: 'ultrasound_radiology' },
    { id: 92, exam: 'Urografia Excretora', type: 'ultrasound_radiology' },
    { id: 93, exam: 'Ultrassonografia Geral', type: 'ultrasound_radiology' },
    { id: 94, exam: 'Trânsito Gastrointestinal', type: 'ultrasound_radiology' },
    { id: 95, exam: 'Eletrocardiograma', type: 'ultrasound_radiology' },

    // Descrição de Lesões
    { id: 96, exam: 'Descrição de Lesões', type: 'lesion_description' },
]
