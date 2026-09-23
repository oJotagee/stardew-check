// Dados dos conjuntos do Centro Comunitário (versão padrão, não remixada).
// Fonte: https://pt.stardewvalleywiki.com/Conjuntos
//
// Estações de cada item: P = Primavera, V = Verão, O = Outono, I = Inverno.
// Item sem estação definida pode ser obtido o ano todo.
// `img` é o nome do arquivo na wiki em inglês (baixado para public/icons).

const ALL = 'PVOI'

const i = (name, img, hint, s = ALL, extra = {}) => ({ name, img, hint, s, ...extra })

export const SEASONS = {
  P: { label: 'Primavera', color: '#6dbf4b' },
  V: { label: 'Verão', color: '#f2b705' },
  O: { label: 'Outono', color: '#d9661f' },
  I: { label: 'Inverno', color: '#5fa8d3' },
}

export const ROOMS = [
  {
    id: 'artesanato',
    name: 'Sala de Artesanato',
    reward: 'Reparo da ponte (acesso à Pedreira)',
    bundles: [
      {
        id: 'rec-primavera',
        name: 'Recursos de Primavera',
        reward: 'Sementes de Primavera (30)',
        items: [
          i('Raiz-forte', 'Wild_Horseradish', 'Colete durante a Primavera.', 'P'),
          i('Narciso', 'Daffodil', 'Colete na Primavera; Pierre vende na Dança das Flores.', 'P'),
          i('Alho-poró', 'Leek', 'Colete durante a Primavera.', 'P'),
          i('Dente-de-leão', 'Dandelion', 'Colete na Primavera; Pierre vende na Dança das Flores.', 'P'),
        ],
      },
      {
        id: 'rec-verao',
        name: 'Recursos de Verão',
        reward: 'Sementes de Verão (30)',
        items: [
          i('Uva', 'Grape', 'Colete no Verão ou cultive no Outono.', 'VO'),
          i('Café de Jardim', 'Spice_Berry', 'Colete no Verão; Caverna da Fazenda (Morcegos).', 'V'),
          i('Ervilha-de-cheiro', 'Sweet_Pea', 'Colete durante o Verão.', 'V'),
        ],
      },
      {
        id: 'rec-outono',
        name: 'Recursos de Outono',
        reward: 'Sementes de Outono (30)',
        items: [
          i('Cogumelo Comum', 'Common_Mushroom', 'Colete no Outono; Bosque Secreto (Primavera/Outono); Caverna de Cogumelos.', 'PO'),
          i('Ameixa Selvagem', 'Wild_Plum', 'Colete durante o Outono.', 'O'),
          i('Avelã', 'Hazelnut', 'Colete durante o Outono.', 'O'),
          i('Amora', 'Blackberry', 'Colete no Outono; Caverna da Fazenda (Morcegos).', 'O'),
        ],
      },
      {
        id: 'rec-inverno',
        name: 'Recursos de Inverno',
        reward: 'Sementes de Inverno (30)',
        items: [
          i('Raiz de Inverno', 'Winter_Root', 'Enxada no solo/pontos de artefato no Inverno; Gosmas azuis (minas 41-79).', 'I'),
          i('Fruta de Cristal', 'Crystal_Fruit', 'Colete no Inverno; Espíritos da Poeira (minas 41-79).', 'I'),
          i('Inhame da Neve', 'Snow_Yam', 'Enxada no solo ou pontos de artefato no Inverno.', 'I'),
          i('Flor de Açafrão', 'Crocus', 'Colete durante o Inverno.', 'I'),
        ],
      },
      {
        id: 'construcao',
        name: 'Construção',
        reward: 'Carvoaria (1)',
        items: [
          i('Madeira', 'Wood', 'Corte árvores ou galhos com o Machado.', ALL, { qty: 99 }),
          i('Madeira', 'Wood', 'Corte árvores ou galhos com o Machado.', ALL, { qty: 99 }),
          i('Pedra', 'Stone', 'Quebre pedras com a Picareta.', ALL, { qty: 99 }),
          i('Madeira de Lei', 'Hardwood', 'Tocos/Troncos grandes com Machado melhorado; caixas nas Minas.', ALL, { qty: 10 }),
        ],
      },
      {
        id: 'rec-exoticos',
        name: 'Recursos Exóticos',
        reward: 'Prato de Outono (5)',
        required: 5,
        items: [
          i('Coco', 'Coconut', 'Colete no Deserto.'),
          i('Fruto do Cacto', 'Cactus_Fruit', 'Colete no Deserto.'),
          i('Cenoura Subterrânea', 'Cave_Carrot', 'Minas: caixas ou enxada no solo.'),
          i('Cogumelo Vermelho', 'Red_Mushroom', 'Minas; Bosque Secreto (Verão/Outono); Caverna de Cogumelos.'),
          i('Cogumelo Roxo', 'Purple_Mushroom', 'Minas; Caverna de Cogumelos; Fazenda da Floresta (Outono).'),
          i('Xarope de Ácer', 'Maple_Syrup', 'Extrator em um Ácer.'),
          i('Resina de Carvalho', 'Oak_Resin', 'Extrator em um Carvalho.'),
          i('Alcatrão de Pinho', 'Pine_Tar', 'Extrator em um Pinheiro.'),
          i('Morel', 'Morel', 'Bosque Secreto na Primavera; Caverna de Cogumelos.', 'P'),
        ],
      },
    ],
  },
  {
    id: 'copa',
    name: 'Copa',
    reward: 'Estufa',
    bundles: [
      {
        id: 'plant-primavera',
        name: 'Plantações de Primavera',
        reward: 'Solo Foliar (20)',
        items: [
          i('Chirívia', 'Parsnip', 'Cultive na Primavera.', 'P'),
          i('Vagem', 'Green_Bean', 'Cultive na Primavera.', 'P'),
          i('Couve-flor', 'Cauliflower', 'Cultive na Primavera.', 'P'),
          i('Batata', 'Potato', 'Cultive na Primavera.', 'P'),
        ],
      },
      {
        id: 'plant-verao',
        name: 'Plantações de Verão',
        reward: 'Aspersor de Qualidade (1)',
        items: [
          i('Tomate', 'Tomato', 'Cultive no Verão.', 'V'),
          i('Pimenta Picante', 'Hot_Pepper', 'Cultive no Verão.', 'V'),
          i('Mirtilo', 'Blueberry', 'Cultive no Verão.', 'V'),
          i('Melão', 'Melon', 'Cultive no Verão.', 'V'),
        ],
      },
      {
        id: 'plant-outono',
        name: 'Plantações de Outono',
        reward: 'Apiário (1)',
        items: [
          i('Milho', 'Corn', 'Cultive no Verão ou Outono.', 'VO'),
          i('Berinjela', 'Eggplant', 'Cultive no Outono.', 'O'),
          i('Abóbora', 'Pumpkin', 'Cultive no Outono.', 'O'),
          i('Inhame', 'Yam', 'Cultive no Outono.', 'O'),
        ],
      },
      {
        id: 'plant-qualidade',
        name: 'Plantações de Qualidade',
        reward: 'Jarra de Conserva (1)',
        required: 3,
        items: [
          i('Chirívia', 'Parsnip', 'Qualidade ouro. Cultive na Primavera.', 'P', { qty: 5, quality: 'ouro' }),
          i('Melão', 'Melon', 'Qualidade ouro. Cultive no Verão.', 'V', { qty: 5, quality: 'ouro' }),
          i('Abóbora', 'Pumpkin', 'Qualidade ouro. Cultive no Outono.', 'O', { qty: 5, quality: 'ouro' }),
          i('Milho', 'Corn', 'Qualidade ouro. Cultive no Verão ou Outono.', 'VO', { qty: 5, quality: 'ouro' }),
        ],
      },
      {
        id: 'animal',
        name: 'Animal',
        reward: 'Prensa de Queijo (1)',
        required: 5,
        items: [
          i('Leite Grande', 'Large_Milk', 'Vaca com boa amizade.'),
          i('Ovo Grande Marrom', 'Large_Brown_Egg', 'Galinha marrom com boa amizade.'),
          i('Ovo Grande', 'Large_Egg', 'Galinha branca com boa amizade.'),
          i('Leite Grande de Cabra', 'Large_Goat_Milk', 'Cabra com boa amizade.'),
          i('Lã', 'Wool', 'Ovelha ou Coelho.'),
          i('Ovo de Pata', 'Duck_Egg', 'Pato.'),
        ],
      },
      {
        id: 'artesao',
        name: 'Artesão',
        reward: 'Barril (1)',
        required: 6,
        items: [
          i('Óleo de Trufas', 'Truffle_Oil', 'Trufa na Máquina de Óleo.', 'PVO'),
          i('Tecido', 'Cloth', 'Lã no Tear; Máquina de Reciclagem.'),
          i('Queijo de Cabra', 'Goat_Cheese', 'Leite de cabra na Prensa de Queijo.'),
          i('Queijo', 'Cheese', 'Leite na Prensa de Queijo.'),
          i('Mel', 'Honey', 'Apiário (exceto no Inverno).', 'PVO'),
          i('Geleia', 'Jelly', 'Fruta na Jarra de Conserva.'),
          i('Maçã', 'Apple', 'Macieira no Outono.', 'O'),
          i('Damasco', 'Apricot', 'Damasqueiro na Primavera.', 'P'),
          i('Laranja', 'Orange', 'Laranjeira no Verão.', 'V'),
          i('Pêssego', 'Peach', 'Pessegueiro no Verão.', 'V'),
          i('Romã', 'Pomegranate', 'Romãzeira no Outono.', 'O'),
          i('Cereja', 'Cherry', 'Cerejeira na Primavera.', 'P'),
        ],
      },
    ],
  },
  {
    id: 'aquario',
    name: 'Aquário',
    reward: 'Remoção da rocha brilhante (Peneira de cobre do Willy)',
    bundles: [
      {
        id: 'peixes-rio',
        name: 'Peixes de Rio',
        reward: 'Isca (30)',
        items: [
          i('Peixe-sol', 'Sunfish', 'Rios, 6h–19h.', 'PV'),
          i('Bagre', 'Catfish', 'Rios com chuva (Primavera/Outono); Bosque Secreto no Verão.', 'PVO'),
          i('Alocine', 'Shad', 'Rios com chuva, 9h–2h.', 'PVO'),
          i('Salmão Híbrido', 'Tiger_Trout', 'Rios, 6h–19h.', 'OI'),
        ],
      },
      {
        id: 'peixes-lago',
        name: 'Peixes de Lago',
        reward: 'Isca Artificial (1)',
        items: [
          i('Achigã', 'Largemouth_Bass', 'Lago da montanha, 6h–19h.'),
          i('Carpa', 'Carp', 'Lago da montanha, qualquer horário.', 'PVO'),
          i('Peixe-gato-cabeçudo', 'Bullhead', 'Lago da montanha, qualquer horário.'),
          i('Esturjão', 'Sturgeon', 'Lago da montanha, 6h–19h.', 'VI'),
        ],
      },
      {
        id: 'peixes-oceano',
        name: 'Peixes de Oceano',
        reward: 'Totem de Teletransporte: Praia (5)',
        items: [
          i('Sardinha', 'Sardine', 'Oceano, 6h–19h.', 'POI'),
          i('Atum', 'Tuna', 'Oceano, 6h–19h.', 'VI'),
          i('Cioba', 'Red_Snapper', 'Oceano com chuva, 6h–19h.', 'VO'),
          i('Tilápia', 'Tilapia', 'Oceano, 6h–14h.', 'VO'),
        ],
      },
      {
        id: 'pesca-noturna',
        name: 'Pesca Noturna',
        reward: 'Anel de Brilho Pequeno (1)',
        items: [
          i('Picão-verde', 'Walleye', 'Rios/lagos com chuva, 12h–2h.', 'O'),
          i('Brema', 'Bream', 'Rios, 18h–2h.'),
          i('Enguia', 'Eel', 'Oceano com chuva, 16h–2h.', 'PO'),
        ],
      },
      {
        id: 'covo',
        name: 'Covo',
        reward: 'Covo (3)',
        required: 5,
        items: [
          i('Lagosta', 'Lobster', 'Covo no oceano.'),
          i('Lagostim', 'Crayfish', 'Covo em água doce.'),
          i('Caranguejo', 'Crab', 'Covo no oceano; caranguejos das minas.'),
          i('Berbigão', 'Cockle', 'Covo no oceano; colete na praia.'),
          i('Mexilhão', 'Mussel', 'Covo no oceano; colete na praia.'),
          i('Camarão', 'Shrimp', 'Covo no oceano.'),
          i('Lesma', 'Snail', 'Covo em água doce.'),
          i('Caramujo', 'Periwinkle', 'Covo em água doce.'),
          i('Ostra', 'Oyster', 'Covo no oceano; colete na praia.'),
          i('Concha', 'Clam', 'Covo no oceano; colete na praia.'),
        ],
      },
      {
        id: 'peixes-especiais',
        name: 'Peixes Especializados',
        reward: 'Prato do Mar (5)',
        items: [
          i('Baiacu', 'Pufferfish', 'Oceano no sol, 12h–16h.', 'V'),
          i('Peixe-fantasma', 'Ghostfish', 'Lagos das minas (andares 20 e 60).'),
          i('Areinha', 'Sandfish', 'Lago do Deserto, 6h–20h.'),
          i('Madeirão', 'Woodskip', 'Bosque Secreto (ou lagos da Fazenda da Floresta).'),
        ],
      },
    ],
  },
  {
    id: 'caldeira',
    name: 'Sala da Caldeira',
    reward: 'Carrinhos de mina',
    bundles: [
      {
        id: 'ferreiro',
        name: 'Ferreiro',
        reward: 'Fornalha (1)',
        items: [
          i('Barra de Cobre', 'Copper_Bar', 'Funda minério de cobre na Fornalha.'),
          i('Barra de Ferro', 'Iron_Bar', 'Funda minério de ferro na Fornalha.'),
          i('Barra de Ouro', 'Gold_Bar', 'Funda minério de ouro na Fornalha.'),
        ],
      },
      {
        id: 'geologo',
        name: 'Geólogo',
        reward: 'Omnigeodo (5)',
        items: [
          i('Quartzo', 'Quartz', 'Colete em qualquer andar das minas.'),
          i('Cristal de Terra', 'Earth_Crystal', 'Minas 1–39 ou geodos.'),
          i('Lágrima Congelada', 'Frozen_Tear', 'Minas 40–79 ou geodos congelados.'),
          i('Quartzo de Fogo', 'Fire_Quartz', 'Minas 80–120 ou geodos de magma.'),
        ],
      },
      {
        id: 'aventureiro',
        name: 'Aventureiro',
        reward: 'Anel de Ímã Pequeno (1)',
        required: 2,
        items: [
          i('Gosma', 'Slime', 'Derrote gosmas.', ALL, { qty: 99 }),
          i('Asa de Morcego', 'Bat_Wing', 'Derrote morcegos.', ALL, { qty: 10 }),
          i('Essência Solar', 'Solar_Essence', 'Fantasmas, Múmias, Cabeças de Metal.'),
          i('Essência Nula', 'Void_Essence', 'Brutos Sombrios, Serpentes.'),
        ],
      },
    ],
  },
  {
    id: 'mural',
    name: 'Mural de Recados',
    reward: 'Amizade com os moradores',
    bundles: [
      {
        id: 'cozinheiro',
        name: 'Cozinheiro',
        reward: 'Bolo Rosa (3)',
        items: [
          i('Xarope de Ácer', 'Maple_Syrup', 'Extrator em um Ácer.'),
          i('Broto de Samambaia', 'Fiddlehead_Fern', 'Bosque Secreto no Verão.', 'V'),
          i('Trufa', 'Truffle', 'Porcos (fora do Inverno).', 'PVO'),
          i('Papoula', 'Poppy', 'Cultive no Verão.', 'V'),
          i('Hossomaki', 'Maki_Roll', 'Cozinhe (receita no Rainbow Saloon).'),
          i('Ovo Frito', 'Fried_Egg', 'Cozinhe um ovo.'),
        ],
      },
      {
        id: 'tinta',
        name: 'Tinta',
        reward: 'Gerador de Sementes (1)',
        items: [
          i('Cogumelo Vermelho', 'Red_Mushroom', 'Minas; Bosque Secreto (Verão/Outono).'),
          i('Ouriço-do-mar', 'Sea_Urchin', 'Praia, lado leste (após reparo da ponte).'),
          i('Girassol', 'Sunflower', 'Cultive no Verão ou Outono.', 'VO'),
          i('Pena de Pato', 'Duck_Feather', 'Pato com boa amizade.'),
          i('Água-marinha', 'Aquamarine', 'Nós de minério e caixas nas minas.'),
          i('Repolho Roxo', 'Red_Cabbage', 'Cultive no Verão (sementes a partir do ano 2).', 'V'),
        ],
      },
      {
        id: 'pesquisa-campo',
        name: 'Pesquisa de Campo',
        reward: 'Máquina de Reciclagem (1)',
        items: [
          i('Cogumelo Roxo', 'Purple_Mushroom', 'Minas; Caverna de Cogumelos.'),
          i('Concha de Náutilo', 'Nautilus_Shell', 'Colete na praia no Inverno.', 'I'),
          i('Esquálio', 'Chub', 'Rios e lago da montanha.'),
          i('Geodo Congelado', 'Frozen_Geode', 'Minas 40–79.'),
        ],
      },
      {
        id: 'forragem',
        name: 'Forragem',
        reward: 'Aquecedor (1)',
        items: [
          i('Trigo', 'Wheat', 'Cultive no Verão ou Outono.', 'VO', { qty: 10 }),
          i('Palha', 'Hay', 'Compre na Marnie ou corte grama com silo.', ALL, { qty: 10 }),
          i('Maçã', 'Apple', 'Macieira no Outono.', 'O', { qty: 3 }),
        ],
      },
      {
        id: 'encantador',
        name: 'Encantador',
        reward: 'Barra de Ouro (5)',
        items: [
          i('Resina de Carvalho', 'Oak_Resin', 'Extrator em um Carvalho.'),
          i('Vinho', 'Wine', 'Fruta no Barril.'),
          i('Pé de Coelho', 'Rabbit\'s_Foot', 'Coelhos; Serpentes na Caverna da Caveira.'),
          i('Romã', 'Pomegranate', 'Romãzeira no Outono; Caverna da Fazenda (Morcegos).', 'O'),
        ],
      },
    ],
  },
  {
    id: 'cofre',
    name: 'Cofre',
    reward: 'Ônibus consertado (acesso ao Deserto)',
    bundles: [
      { id: 'cofre-2500', name: '2.500 ouros', reward: 'Bolo de Chocolate (3)', items: [i('2.500g', 'Gold', 'Pague no cofre.')] },
      { id: 'cofre-5000', name: '5.000 ouros', reward: 'Fertilizante de Qualidade (30)', items: [i('5.000g', 'Gold', 'Pague no cofre.')] },
      { id: 'cofre-10000', name: '10.000 ouros', reward: 'Para-raios (1)', items: [i('10.000g', 'Gold', 'Pague no cofre.')] },
      { id: 'cofre-25000', name: '25.000 ouros', reward: 'Cristalário (1)', items: [i('25.000g', 'Gold', 'Pague no cofre.')] },
    ],
  },
  {
    id: 'joja',
    name: 'Mercado Joja Abandonado',
    reward: 'Cinema',
    bonus: true,
    bundles: [
      {
        id: 'desaparecido',
        name: 'O Conjunto Desaparecido',
        reward: 'Cinema',
        required: 5,
        items: [
          i('Vinho', 'Wine', 'Qualidade prata ou melhor. Barril + Adega.', ALL, { quality: 'prata' }),
          i('Maionese de Dinossauro', 'Dinosaur_Mayonnaise', 'Ovo de dinossauro na Máquina de Maionese.'),
          i('Fragmento Prismático', 'Prismatic_Shard', 'Minas profundas / Caverna da Caveira.'),
          i('Fruta Antiga', 'Ancient_Fruit', 'Qualidade ouro. Cultive (semente antiga).', ALL, { qty: 5, quality: 'ouro' }),
          i('Salmão Nulo', 'Void_Salmon', 'Qualidade ouro. Pântano da Bruxa.', ALL, { quality: 'ouro' }),
          i('Caviar', 'Caviar', 'Ova de Esturjão na Jarra de Conserva.'),
        ],
      },
    ],
  },
]

// Chave única de cada item: "<bundleId>:<índice>"
export const itemKey = (bundle, idx) => `${bundle.id}:${idx}`
export const requiredOf = (bundle) => bundle.required ?? bundle.items.length
