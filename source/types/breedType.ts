export const DogBreed = {
    LabradorRetriever: 'Labrador Retriever',
    GoldenRetriever: 'Golden Retriever',
    PastorAlemao: 'Pastor Alemão',
    BulldogFrances: 'Buldogue Francês',
    Poodle: 'Poodle',
    ShihTzu: 'Shih Tzu',
    YorkshireTerrier: 'Yorkshire Terrier',
    LhasaApso: 'Lhasa Apso',
    Rottweiler: 'Rottweiler',
    Beagle: 'Beagle',
    Dachshund: 'Dachshund',
    BorderCollie: 'Border Collie',
    BichonFrise: 'Bichon Frisé',
    Pitbull: 'Pitbull',
    Boxer: 'Boxer',
    Pug: 'Pug',
    CockerSpaniel: 'Cocker Spaniel',
    Chihuahua: 'Chihuahua',
    Maltes: 'Maltês',
    SRD: 'Sem Raça Definida',
    Outro: 'Outro',
} as const
export type DogBreedKeys = keyof typeof DogBreed

export const CatBreed = {
    SRD: 'Sem Raça Definida',
    Persa: 'Persa',
    Siames: 'Siamês',
    MaineCoon: 'Maine Coon',
    Ragdoll: 'Ragdoll',
    Sphynx: 'Sphynx',
    Angora: 'Angorá',
    Bengal: 'Bengal',
    Siberiano: 'Siberiano',
    Burmes: 'Burmês',
    Exotico: 'Exótico',
    DevonRex: 'Devon Rex',
    Himalaia: 'Himalaia',
    NorueguesDaFloresta: 'Norueguês da Floresta',
    Ocicat: 'Ocicat',
    Outro: 'Outro',
} as const
export type CatBreedKeys = (typeof CatBreed)[keyof typeof CatBreed]

export const HorseBreed = {
    MangalargaMarchador: 'Mangalarga Marchador',
    Crioulo: 'Crioulo',
    Campolina: 'Campolina',
    QuartoDeMilha: 'Quarto de Milha',
    BrasileiroDeHipismo: 'Brasileiro de Hipismo',
    Outros: 'Outros',
    SRD: 'Sem Raça Definida',
    Outro: 'Outro',
} as const
export type HorseBreedKeys = (typeof HorseBreed)[keyof typeof HorseBreed]

export const FishBreed = {
    Betta: 'Betta',
    NeonCardinal: 'Neon Cardinal',
    AcaraDisco: 'Acará Disco',
    Kinguio: 'Kinguio',
    Molly: 'Molly',
    Outros: 'Outros',
    SRD: 'Sem Raça Definida',
    Outro: 'Outro',
} as const
export type FishBreedKeys = (typeof FishBreed)[keyof typeof FishBreed]

export const ReptileBreed = {
    Iguana: 'Iguana',
    Jabuti: 'Jabuti',
    Gecko: 'Gecko',
    Teiu: 'Teiú',
    Jiboia: 'Jiboia',
    Outros: 'Outros',
} as const
export type ReptileBreedKeys = (typeof ReptileBreed)[keyof typeof ReptileBreed]

export const BirdBreed = {
    CanarioBelga: 'Canário Belga',
    PeriquitoAustraliano: 'Periquito Australiano',
    Calopsita: 'Calopsita',
    Agapornis: 'Agapornis',
    Cacatua: 'Cacatua',
    Papagaio: 'Papagaio',
    Outros: 'Outros',
} as const
export type BirdBreedKeys = (typeof BirdBreed)[keyof typeof BirdBreed]

export const RabbitBreed = {
    AngoraIngles: 'Angorá Inglês',
    AngoraFrances: 'Angorá Francês',
    AngoraGigante: 'Angorá Gigante',
    Argente: 'Argente',
    BelgianHare: 'Belgian Hare',
    Californiano: 'Californiano',
    CabeçaDeLeão: 'Cabeça de Leão',
    CastorRex: 'Castor Rex',
    Chinchila: 'Chinchila',
    CoelhoHolandes: 'Coelho Holandês',
    CoelhoLebreBelga: 'Coelho Lebre Belga',
    CoelhoLebreEuropeu: 'Coelho Lebre Europeu',
    FlemishGiant: 'Flemish Giant',
    Hotot: 'Hotot',
    LopIngles: 'Lop Inglês',
    LopFrances: 'Lop Francês',
    LopHolland: 'Lop Holland',
    MiniLop: 'Mini Lop',
    MiniRex: 'Mini Rex',
    NetherlandDwarf: 'Netherland Dwarf',
    NovaZelandia: 'Nova Zelândia',
    Polish: 'Polish',
    Silver: 'Silver',
    SilverFox: 'Silver Fox',
    SRD: 'Sem Raça Definida',
    Outro: 'Outro',
} as const
export type RabbitBreedKeys = (typeof RabbitBreed)[keyof typeof RabbitBreed]

export type ObjectBreed =
    | typeof DogBreed
    | typeof CatBreed
    | typeof HorseBreed
    | typeof FishBreed
    | typeof ReptileBreed
    | typeof BirdBreed
    | typeof RabbitBreed

export type Breed =
    | DogBreedKeys
    | CatBreedKeys
    | HorseBreedKeys
    | FishBreedKeys
    | ReptileBreedKeys
    | BirdBreedKeys
    | RabbitBreedKeys
    | 'unknown'

export const BreedNames = {
    ...DogBreed,
    ...CatBreed,
    ...HorseBreed,
    ...FishBreed,
    ...ReptileBreed,
    ...BirdBreed,
    ...RabbitBreed,
} as const
export type BreedNames = (typeof BreedNames)[keyof typeof BreedNames]
