export default function getDifficulty(name: string): any | undefined {
  const Difficulties: any = {
    //[starting_elements, starting_size]
    Easy: [2, 4],
    Medium: [3, 5],
    Hard: [4, 6],
    Insane: [5, 7],
  };
  return Difficulties[name];
}
