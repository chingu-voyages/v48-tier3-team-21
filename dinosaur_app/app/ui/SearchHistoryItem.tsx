const SearchHistoryItem = ({
  searchRelatedURL,
}: {
  searchRelatedURL: string;
}) => {
  const url = new URL(searchRelatedURL);
  const searchParams = url.searchParams;
  const name = searchParams.get("name") ?? null;
  const foundIn = searchParams.get("foundIn") ?? null;
  const diet = searchParams.get("diet") ?? null;
  const length = searchParams.get("length") ?? null;
  const weight = searchParams.get("weight") ?? null;
  const decade = searchParams.get("decade") ?? null;
  return (
    <p>
      {name && `${name}, `}
      {foundIn && `found In: ${foundIn}, `}
      {diet && `Diet is: ${diet}, `}
      {length && `with Length: ${length}M, `}
      {weight && `with Weight: ${weight}kg, `}
      {decade && `Discovered In the: ${decade}`}
    </p>
  );
};

export default SearchHistoryItem;
