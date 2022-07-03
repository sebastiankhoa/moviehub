//conver [genres] to strings

export const useGenres = (selectedGenres) => {
  if (selectedGenres.length < 1) {
    return "";
  }

  const genId = selectedGenres.map((g) => g.id);
  return genId.reduce((acc, curr) => acc + "," + curr);
};
