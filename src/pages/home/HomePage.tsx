import { AssetApiService } from "@/api/services/AssetApiService";
import useUserEmailAccessCheck from "@/hooks/useUserEmailAccessCheck";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import type { Asset, AssetWell } from "../../types/asset";
import WellOverview from "./components/WellOverview";

const HomePage = () => {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedDeviceId = searchParams.get("deviceId");
  const from = searchParams.get("from");
  const to = searchParams.get("to");
  const { hasAccess, isLoaded } = useUserEmailAccessCheck();

  useEffect(() => {
    const fetchData = async () => {
      const data = await AssetApiService.getAssets();
      setAssets(data);
    };

    fetchData();
  }, []);

  const handleDeviceClick = (id: string) => {
    if (selectedDeviceId === id) {
      setSearchParams({});
      return;
    }
    setSearchParams({ deviceId: id });
  };

  const getDeviceItem = (device: AssetWell) => {
    const isSelected = selectedDeviceId === device.id;

    return (
      <li
        key={device.id}
        onClick={() => handleDeviceClick(device.id)}
        className={`
        text-sm flex justify-between p-2 rounded-md cursor-pointer transition-all
        ${
          isSelected
            ? "bg-yellow-400/10 text-yellow-600 font-medium border-r-4 border-yellow-400"
            : "text-gray-600 hover:bg-gray-100"
        }
      `}
      >
        <span>{device.name}</span>
        <span className={"text-green-500"}>●</span>
      </li>
    );
  };

  const getAssetItem = (asset: Asset) => {
    return (
      <div key={asset.id} className="group">
        <h3 className="font-bold text-gray-900 flex items-center gap-2">
          <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
          {asset.name}
        </h3>

        <ul className="mt-2 ml-4 space-y-2 border-l-2 border-gray-100 pl-4">
          {asset.wells.map((device) => getDeviceItem(device))}
        </ul>
      </div>
    );
  };

  const mainContent = () => {
    return (
      <div className="flex h-[calc(100vh-100px)] bg-gray-50">
        <aside className="w-80 bg-white border-r border-gray-200 overflow-y-auto p-4">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
            Асети & Пристрої
          </h2>

          <div className="space-y-6">
            {assets.map((asset) => getAssetItem(asset))}
          </div>
        </aside>

        <main className="flex-1 p-8">
          {selectedDeviceId ? (
            <WellOverview deviceId={selectedDeviceId} from={from} to={to} />
          ) : (
            <h1 className="text-2xl font-light text-gray-400">
              Виберіть асет для перегляду аналітики...
            </h1>
          )}
        </main>
      </div>
    );
  };

  const noAccess = () => {
    return (
      <div className="flex mt-[30vh] items-center justify-center">
        <div className="text-center rounded-2xl bg-white p-8 shadow-md max-w-md">
          <h1 className="text-2xl font-semibold text-gray-900">
            🚫 Немає доступу
          </h1>

          <p className="mt-3 text-gray-600">
            У вас немає дозволу переглядати цю сторінку.
          </p>

          <p className="mt-2 text-sm text-gray-500">
            Будь ласка зв'яжіться з розробниками, щоб отримати доступ.
          </p>
        </div>
      </div>
    );
  };

  const loading = () => {
    return (
      <div className="flex mt-[30vh] items-center justify-center ">
        <div className="text-center max-w-md">
          <h1 className="text-2xl font-semibold text-gray-900">
            Завантаження...
          </h1>
        </div>
      </div>
    );
  };

  return (
    <div>{!isLoaded ? loading() : hasAccess ? mainContent() : noAccess()}</div>
  );
};

export default HomePage;
