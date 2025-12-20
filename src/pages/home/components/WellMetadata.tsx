import type { Well } from "@/types/well";

interface Props {
  well: Well;
}

const WellMetadata = ({ well }: Props) => {
  return (
    <div>
      <div>Id асета: {well.assetId}</div>
      <div>Ім'я асета: {well.assetName}</div>
      <div>Id асета: {well.id}</div>
      <div>Ім'я асета: {well.name}</div>
    </div>
  );
};

export default WellMetadata;
