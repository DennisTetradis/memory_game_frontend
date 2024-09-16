export default function getDifficulty(name: string): any | undefined {
  const Difficulties: any = {
    //[starting_elements, starting_size]
    Easy: [3, 4],
    Medium: [4, 5],
    Hard: [5, 6],
    Insane: [6, 7],
  };
  return Difficulties[name];
}
