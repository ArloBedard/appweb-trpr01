export interface Yarn {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  yarnType: string;
  color: string;
  weight: number;
}

let nextId: number = 0;

export let yarnTypes: string[] = [
  "cotton",
  "nylon",
  "mérinos",
  "chenille",
  "acrylique",
  "débutante",
];

export function Yarn(
  name: string,
  description: string,
  price: number,
  stock: number,
  yarnType: string,
  color: string,
  weight: number //en gramme
): Yarn {
  return {
    id: nextId++,
    name,
    description,
    price,
    stock,
    yarnType,
    color,
    weight,
  };
}

export let yellowCotton: Yarn = Yarn(
  "Laine jaune en cotton",
  "Cette laine est faite de cotton 100% bio. Elle est parfait pour les amigurumis ainsi que les vêtements légers.",
  6.5,
  10,
  yarnTypes[0],
  "jaune",
  50
);

export let greenChenille: Yarn = Yarn(
  "Laine chenille verte",
  "La laine chenille est parfaite pour la création de peluche ou de couverture.",
  12,
  18,
  yarnTypes[3],
  "vert",
  100
);

export let whiteMerino: Yarn = Yarn(
  "Laine mérinos blanche",
  "Laine de haute qualité qui vous tiendras chaud tout l'hiver!",
  20,
  0,
  yarnTypes[2],
  "blanc",
  100
);
