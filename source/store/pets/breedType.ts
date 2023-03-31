export enum DogBreed {
    ViraLata = 'Vira-Lata',
    LabradorRetriever = 'Labrador Retriever',
    GoldenRetriever = 'Golden Retriever',
    PastorAlemao = 'Pastor Alemão',
    BulldogFrances = 'Buldogue Francês',
    Poodle = 'Poodle',
    ShihTzu = 'Shih Tzu',
    YorkshireTerrier = 'Yorkshire Terrier',
    LhasaApso = 'Lhasa Apso',
    Rottweiler = 'Rottweiler',
    Beagle = 'Beagle',
    Dachshund = 'Dachshund',
    BorderCollie = 'Border Collie',
    BichonFrise = 'Bichon Frisé',
    Pitbull = 'Pitbull',
    Boxer = 'Boxer',
    Pug = 'Pug',
    CockerSpaniel = 'Cocker Spaniel',
    Chihuahua = 'Chihuahua',
    Maltes = 'Maltês',
    // ...
}

enum CatBreed {
    ViraLata = 'Vira-Lata',
    Persa = 'Persa',
    Siames = 'Siamês',
    MaineCoon = 'Maine Coon',
    Ragdoll = 'Ragdoll',
    Sphynx = 'Sphynx',
    Angora = 'Angorá',
    Bengal = 'Bengal',
    Siberiano = 'Siberiano',
    Burmes = 'Burmês',
    Exotico = 'Exótico',
    DevonRex = 'Devon Rex',
    Himalaia = 'Himalaia',
    NorueguesDaFloresta = 'Norueguês da Floresta',
    Ocicat = 'Ocicat',
    // ...
}

export enum HorseBreed {
    MangalargaMarchador = 'Mangalarga Marchador',
    Crioulo = 'Crioulo',
    Campolina = 'Campolina',
    QuartoDeMilha = 'Quarto de Milha',
    BrasileiroDeHipismo = 'Brasileiro de Hipismo',
    Outros = 'Outros'
    // ...
}

export enum FishBreed {
    Betta = 'Betta',
    NeonCardinal = 'Neon Cardinal',
    AcaraDisco = 'Acará Disco',
    Kinguio = 'Kinguio',
    Molly = 'Molly',
    Outros = 'Outros'
    // ...
}

export enum ReptileBreed {
    Iguana = 'Iguana',
    Jabuti = 'Jabuti',
    Gecko = 'Gecko',
    Teiu = 'Teiú',
    Jiboia = 'Jiboia',
    Outros = 'Outros'
    // ...
}

export enum BirdBreed {
    CanarioBelga = 'Canário Belga',
    PeriquitoAustraliano = 'Periquito Australiano',
    Calopsita = 'Calopsita',
    Agapornis = 'Agapornis',
    Cacatua = 'Cacatua',
    Papagaio = 'Papagaio',
    Outros = 'Outros',
    // ...
}

export type Breed = DogBreed | CatBreed | HorseBreed | FishBreed | ReptileBreed | BirdBreed