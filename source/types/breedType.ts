export const DogBreed = {
    labrador_retriever: 'labrador_retriever',
    golden_retriever: 'golden_retriever',
    german_shepherd: 'german_shepherd',
    french_bulldog: 'french_bulldog',
    poodle: 'poodle',
    shih_tzu: 'shih_tzu',
    yorkshire_terrier: 'yorkshire_terrier',
    lhasa_apso: 'lhasa_apso',
    rottweiler: 'rottweiler',
    beagle: 'beagle',
    dachshund: 'dachshund',
    border_collie: 'border_collie',
    bichon_frise: 'bichon_frise',
    pitbull: 'pitbull',
    boxer: 'boxer',
    pug: 'pug',
    cocker_spaniel: 'cocker_spaniel',
    chihuahua: 'chihuahua',
    maltese: 'maltese',
    mixed_breed: 'mixed_breed',
    other: 'other',
} as const
export type DogBreedKeys = keyof typeof DogBreed

export const CatBreed = {
    mixed_breed: 'mixed_breed',
    persian: 'persian',
    siamese: 'siamese',
    maine_coon: 'maine_coon',
    ragdoll: 'ragdoll',
    sphynx: 'sphynx',
    angora: 'angora',
    bengal: 'bengal',
    siberian: 'siberian',
    burmese: 'burmese',
    exotic: 'exotic',
    devon_rex: 'devon_rex',
    himalayan: 'himalayan',
    norwegian_forest: 'norwegian_forest',
    ocicat: 'ocicat',
    other: 'other',
} as const
export type CatBreedKeys = (typeof CatBreed)[keyof typeof CatBreed]

export const HorseBreed = {
    mangalarga_marchador: 'mangalarga_marchador',
    crioulo: 'crioulo',
    campolina: 'campolina',
    quarter_horse: 'quarter_horse',
    brazilian_sport_horse: 'brazilian_sport_horse',
    other: 'other',
    mixed_breed: 'mixed_breed',
} as const
export type HorseBreedKeys = (typeof HorseBreed)[keyof typeof HorseBreed]

export const FishBreed = {
    betta: 'betta',
    neon_tetra: 'neon_tetra',
    discus: 'discus',
    goldfish: 'goldfish',
    molly: 'molly',
    other: 'other',
    mixed_breed: 'mixed_breed',
} as const
export type FishBreedKeys = (typeof FishBreed)[keyof typeof FishBreed]

export const LizardBreed = {
    iguana: 'iguana',
    gecko: 'gecko',
    tegu: 'tegu',
    bearded_dragon: 'bearded_dragon',
    leopard_gecko: 'leopard_gecko',
    other: 'other',
} as const

export const SnakeBreed = {
    boa: 'boa',
    corn_snake: 'corn_snake',
    king_snake: 'king_snake',
    other: 'other',
} as const

export const TurtleBreed = {
    cagado: 'cagado',
    turtle: 'turtle',
    other: 'other',
} as const

export type LizardBreedKeys = (typeof LizardBreed)[keyof typeof LizardBreed]
export type SnakeBreedKeys = (typeof SnakeBreed)[keyof typeof SnakeBreed]
export type TurtleBreedKeys = (typeof TurtleBreed)[keyof typeof TurtleBreed]

export const CowBreed = {
    holstein: 'holstein',
    angus: 'angus',
    hereford: 'hereford',
    simmental: 'simmental',
    jersey: 'jersey',
    guernsey: 'guernsey',
    brown_swiss: 'brown_swiss',
    shorthorn: 'shorthorn',
    brahman: 'brahman',
    galloway: 'galloway',
    longhorn: 'longhorn',
    other: 'other',
} as const
export type CowBreedKeys = (typeof CowBreed)[keyof typeof CowBreed]

export const PigBreed = {
    yorkshire: 'yorkshire',
    berkshire: 'berkshire',
    duroc: 'duroc',
    hampshire: 'hampshire',
    landrace: 'landrace',
    poland_china: 'poland_china',
    spotted: 'spotted',
    tamworth: 'tamworth',
    large_black: 'large_black',
    other: 'other',
} as const
export type PigBreedKeys = (typeof PigBreed)[keyof typeof PigBreed]

export const BirdBreed = {
    belgian_canary: 'belgian_canary',
    budgerigar: 'budgerigar',
    cockatiel: 'cockatiel',
    lovebird: 'lovebird',
    cockatoo: 'cockatoo',
    parrot: 'parrot',
    other: 'other',
} as const
export type BirdBreedKeys = (typeof BirdBreed)[keyof typeof BirdBreed]

export const ChickenBreed = {
    rhode_island_red: 'rhode_island_red',
    leghorn: 'leghorn',
    sussex: 'sussex',
    plymouth_rock: 'plymouth_rock',
    orpington: 'orpington',
    wyandotte: 'wyandotte',
    marans: 'marans',
    silkie: 'silkie',
    other: 'other',
} as const
export type ChickenBreedKeys = (typeof ChickenBreed)[keyof typeof ChickenBreed]

export const RabbitBreed = {
    english_angora: 'english_angora',
    french_angora: 'french_angora',
    giant_angora: 'giant_angora',
    argente: 'argente',
    belgian_hare: 'belgian_hare',
    californian: 'californian',
    lionhead: 'lionhead',
    castor_rex: 'castor_rex',
    chinchilla: 'chinchilla',
    dutch_rabbit: 'dutch_rabbit',
    belgian_hare_rabbit: 'belgian_hare_rabbit',
    european_hare_rabbit: 'european_hare_rabbit',
    flemish_giant: 'flemish_giant',
    hotot: 'hotot',
    english_lop: 'english_lop',
    french_lop: 'french_lop',
    holland_lop: 'holland_lop',
    mini_lop: 'mini_lop',
    mini_rex: 'mini_rex',
    netherland_dwarf: 'netherland_dwarf',
    new_zealand: 'new_zealand',
    polish: 'polish',
    silver: 'silver',
    silver_fox: 'silver_fox',
    mixed_breed: 'mixed_breed',
    other: 'other',
} as const
export type RabbitBreedKeys = (typeof RabbitBreed)[keyof typeof RabbitBreed]

export type ObjectBreed =
    | typeof DogBreed
    | typeof CatBreed
    | typeof HorseBreed
    | typeof FishBreed
    | typeof LizardBreed
    | typeof SnakeBreed
    | typeof TurtleBreed
    | typeof BirdBreed
    | typeof ChickenBreed
    | typeof RabbitBreed
    | typeof CowBreed
    | typeof PigBreed

export type Breed =
    | DogBreedKeys
    | CatBreedKeys
    | HorseBreedKeys
    | FishBreedKeys
    | LizardBreedKeys
    | SnakeBreedKeys
    | TurtleBreedKeys
    | BirdBreedKeys
    | RabbitBreedKeys
    | ChickenBreedKeys
    | CowBreedKeys
    | PigBreedKeys
    | 'unknown'

export const BreedNames = {
    ...DogBreed,
    ...CatBreed,
    ...HorseBreed,
    ...FishBreed,
    ...LizardBreed,
    ...SnakeBreed,
    ...TurtleBreed,
    ...BirdBreed,
    ...RabbitBreed,
    ...ChickenBreed,
    ...CowBreed,
    ...PigBreed,
} as const
export type BreedNames = (typeof BreedNames)[keyof typeof BreedNames]
