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
    label: string
    type: keyof typeof ExamsTypes
}

export const exams: Exams[] = [
    // Hematologia
    { id: 1, label: 'Hemograma Completo', type: 'hematology' },
    { id: 2, label: 'Leucograma', type: 'hematology' },
    { id: 3, label: 'Fibrinogênio', type: 'hematology' },
    { id: 4, label: 'T3 e T4 Total', type: 'hematology' },
    { id: 5, label: 'Exame diferencial de leucócitos', type: 'hematology' },
    { id: 6, label: 'Contagem de reticulócitos', type: 'hematology' },
    { id: 7, label: 'Eritrograma', type: 'hematology' },
    { id: 8, label: 'Cortisol Basal', type: 'hematology' },
    { id: 9, label: 'Tempo de coagulação', type: 'hematology' },
    { id: 10, label: 'Pesquisa de célula L. E.', type: 'hematology' },
    { id: 11, label: 'Pesquisa de leishmania', type: 'hematology' },
    { id: 12, label: 'T4 livre pós Diálise', type: 'hematology' },
    { id: 13, label: 'Contagem Plaquetas', type: 'hematology' },
    { id: 14, label: 'Hemoglobina', type: 'hematology' },
    { id: 15, label: 'Pesquisa de Parasitas', type: 'hematology' },
    { id: 16, label: 'TSH quimioluminescência', type: 'hematology' },

    // Bioquímica
    { id: 17, label: 'Ácido Úrico', type: 'biochemistry' },
    { id: 18, label: 'Albumina', type: 'biochemistry' },
    { id: 19, label: 'ALT/TGP', type: 'biochemistry' },
    { id: 20, label: 'Amilase', type: 'biochemistry' },
    { id: 21, label: 'Colesterol LDL', type: 'biochemistry' },
    { id: 22, label: 'Colesterol Total', type: 'biochemistry' },
    { id: 23, label: 'Creatinina Alcalina', type: 'biochemistry' },
    { id: 24, label: 'Ferro', type: 'biochemistry' },
    { id: 25, label: 'Fosfatase alcalina', type: 'biochemistry' },
    { id: 26, label: 'Fosfato', type: 'biochemistry' },
    { id: 27, label: 'LDM', type: 'biochemistry' },
    { id: 28, label: 'Lipase', type: 'biochemistry' },
    { id: 29, label: 'Magnésio', type: 'biochemistry' },
    { id: 30, label: 'Potássio', type: 'biochemistry' },
    { id: 31, label: 'Proteína Total', type: 'biochemistry' },
    { id: 32, label: 'Sódio', type: 'biochemistry' },
    { id: 33, label: 'Triglicerídeos', type: 'biochemistry' },
    { id: 34, label: 'Ureia', type: 'biochemistry' },
    { id: 35, label: 'Cálcio Total', type: 'biochemistry' },
    { id: 36, label: 'Cálcio Iônico', type: 'biochemistry' },
    { id: 37, label: 'AST/TGO', type: 'biochemistry' },
    { id: 38, label: 'Bilirrubina total e frações', type: 'biochemistry' },
    { id: 39, label: 'GGT', type: 'biochemistry' },
    { id: 40, label: 'Glicose', type: 'biochemistry' },
    { id: 41, label: 'CK', type: 'biochemistry' },
    { id: 42, label: 'Colesterol HDL', type: 'biochemistry' },
    { id: 43, label: 'Ácido Biliares', type: 'biochemistry' },
    { id: 44, label: 'PTF', type: 'biochemistry' },

    // Parasitologia
    { id: 45, label: 'Coproparasitológico completo', type: 'parasitology' },
    { id: 46, label: 'Coproparasitológico seriado', type: 'parasitology' },
    { id: 47, label: 'Pesquisa de ovos', type: 'parasitology' },
    { id: 48, label: 'Pesquisa de coccídeos', type: 'parasitology' },
    { id: 49, label: 'OPG', type: 'parasitology' },
    { id: 50, label: 'Pesquisa de microfilárias', type: 'parasitology' },
    { id: 51, label: 'Pesquisa de giárdia', type: 'parasitology' },
    { id: 52, label: 'Pesquisa de sangue oculto', type: 'parasitology' },
    { id: 53, label: 'Coprocultura', type: 'parasitology' },

    // Imunologia
    { id: 54, label: 'Babesia Canis IgG', type: 'immunology' },
    { id: 55, label: 'Brucelose Canina', type: 'immunology' },
    { id: 56, label: 'Cinomose - Antígeno', type: 'immunology' },
    { id: 57, label: 'Cinomose IgM anticorpos', type: 'immunology' },
    { id: 58, label: 'Coronavírus Felino (PIF)', type: 'immunology' },
    { id: 59, label: 'Dirofilariose', type: 'immunology' },
    { id: 60, label: 'Ehrlichia Canis', type: 'immunology' },
    { id: 61, label: 'Erliquiose', type: 'immunology' },
    { id: 62, label: 'Fator Reumatoide Canino', type: 'immunology' },
    { id: 63, label: 'FIV/FELV', type: 'immunology' },
    { id: 64, label: 'Leishmaniose Canina', type: 'immunology' },
    { id: 65, label: 'Leptospirose', type: 'immunology' },
    { id: 66, label: 'Lyme', type: 'immunology' },
    { id: 67, label: 'Neospora', type: 'immunology' },
    { id: 68, label: 'Toxoplasmose IgG Cães', type: 'immunology' },
    { id: 69, label: 'Toxoplasmose IgG Gatos', type: 'immunology' },

    // Urinálise
    { id: 70, label: 'Urinálise Completo', type: 'urinalysis' },
    { id: 71, label: 'Densidade Urinária', type: 'urinalysis' },
    { id: 72, label: 'Sedimentoscopia', type: 'urinalysis' },
    { id: 73, label: 'Exame Físico-Químico', type: 'urinalysis' },
    { id: 74, label: 'Qualificação de cálculos', type: 'urinalysis' },
    { id: 75, label: 'OEA’s', type: 'urinalysis' },
    { id: 76, label: 'Creatinina Urinário', type: 'urinalysis' },
    { id: 77, label: 'Cortisol Urinário', type: 'urinalysis' },
    { id: 78, label: 'Pesquisa de Mioglobina', type: 'urinalysis' },
    { id: 79, label: 'Creatinina (UPC)', type: 'urinalysis' },

    // Local da Lesão
    { id: 80, label: 'Abdome', type: 'lesion_location' },
    { id: 81, label: 'Tórax', type: 'lesion_location' },
    { id: 82, label: 'Membros', type: 'lesion_location' },
    { id: 83, label: 'Crânio', type: 'lesion_location' },
    { id: 84, label: 'Coluna', type: 'lesion_location' },

    // Ultrassonografia / Radiologia
    { id: 85, label: 'Ultrassonografia Abdominal', type: 'ultrasound_radiology' },
    { id: 86, label: 'Radiografia Tórax', type: 'ultrasound_radiology' },
    { id: 87, label: 'Radiografia Membros', type: 'ultrasound_radiology' },
    { id: 88, label: 'Radiografia Crânio', type: 'ultrasound_radiology' },
    { id: 89, label: 'Radiografia Coluna', type: 'ultrasound_radiology' },
    { id: 90, label: 'Mielografia', type: 'ultrasound_radiology' },
    { id: 91, label: 'Cistografia', type: 'ultrasound_radiology' },
    { id: 92, label: 'Urografia Excretora', type: 'ultrasound_radiology' },
    { id: 93, label: 'Ultrassonografia Geral', type: 'ultrasound_radiology' },
    { id: 94, label: 'Trânsito Gastrointestinal', type: 'ultrasound_radiology' },
    { id: 95, label: 'Eletrocardiograma', type: 'ultrasound_radiology' },

    // Descrição de Lesões
    { id: 96, label: 'Descrição de Lesões', type: 'lesion_description' },
]
